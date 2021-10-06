import './App.css';
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from 'react-promise-tracker';
import { getPositionWeightedColor } from './styles/styles'
import { MPGForm } from './components/MPGForm';
import { TeamTable } from './components/TeamTable';
import { Analytics } from './components/Analytics';
import { LoadingIndicator } from './LoadingIndicator'
import { Dialog, DialogTitle } from '@material-ui/core';

function App() {


  const [userPrefs, setUserPrefs] = useState({
    // Default values
    league: "England",
    init_budget: 300,
    att_pref: 'goals',
    mid_pref: 'assists',
    def_pref: 'def_score',
    att_weight: 0.3,
    mid_weight: 0.3,
    def_weight: 0.3,
    gk_weight: 0.1
  })

  const [suggestedTeam, setSuggestedTeam] = useState([])
  const [expenseData, setExpenseData] = useState({})
  const [teamAnalytics, setTeamAnalytics] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const { promiseInProgress } = usePromiseTracker();

  const handleModalClose = () => {
    setSuggestedTeam([])
    setExpenseData({})
    setTeamAnalytics({})
    setModalOpen(false)
  }

  const handlePrefSubmit = () => {
    setSuggestedTeam([])
    setExpenseData({})
    setTeamAnalytics({})
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...userPrefs
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    trackPromise(
      fetch("https://nrkf97hvad.execute-api.us-east-2.amazonaws.com/preproduction/opt", requestOptions)
        .then(response => response.json())
        .then(data => {
          setSuggestedTeam(data);
          console.log(data)
        }
        )
        .catch(error => console.log('error', error))
    );
  }

  const getDepartmentTotal = (team, department) => {
    let depPlayers = team.filter(p => p.mpg_position === department)
    return depPlayers.reduce((preValue, curValue) => preValue + curValue.bid, 0)
  };

  const computeAggScoreForDepartmentAndCriteria = (team, criteria, department = undefined) => {
    if (department) {
      team = team.filter(p => p.mpg_position === department)
    }
    let score = team.reduce((preValue, currentValue) => preValue + currentValue[criteria], 0) / team.length
    if (['xG', 'team_xG_against'].includes(criteria)) {
      score *= 18
    }
    return score.toFixed(2)
  }

  useEffect(() => {
    if (suggestedTeam.length > 0) {
      setExpenseData({
        labels: ['Attack', 'Midfield', 'Defence', 'Goalkeeping'],
        datasets: [{
          label: "% of bids",
          data: [
            (getDepartmentTotal(suggestedTeam, 'A') * 100) / 500,
            (getDepartmentTotal(suggestedTeam, 'M') * 100) / 500,
            (getDepartmentTotal(suggestedTeam, 'D') * 100) / 500,
            (getDepartmentTotal(suggestedTeam, 'G') * 100) / 500]
          ,
          backgroundColor: [
            getPositionWeightedColor(0.4, 'A'),
            getPositionWeightedColor(0.4, 'M'),
            getPositionWeightedColor(0.4, 'D'),
            getPositionWeightedColor(0.4, 'G')
          ],
          borderColor: [
            getPositionWeightedColor(1, 'A'),
            getPositionWeightedColor(1, 'M'),
            getPositionWeightedColor(1, 'D'),
            getPositionWeightedColor(1, 'G')
          ],
          borderWidth: 1
        }]
      })
      setTeamAnalytics({
        labels: ['Attack', 'Midfield', 'Defence'],
        datasets: [
          {
            label: "Team strengths",
            data: [
              computeAggScoreForDepartmentAndCriteria(suggestedTeam, 'average', 'A'),
              computeAggScoreForDepartmentAndCriteria(suggestedTeam, 'average', 'M'),
              computeAggScoreForDepartmentAndCriteria(suggestedTeam, 'average', 'D')],
            backgroundColor: 'rgba(97, 97, 97, 0.05)',
            borderColor: 'rgba(255, 98, 0, 1)',
            borderWidth: 1,
          }
        ]
      })
      setModalOpen(true)
    }
  }, [suggestedTeam])

  return (
    <div>
      <Header />
      <div className="p-4 justify-center text-center md:flex">
        <React.Fragment>
          {!promiseInProgress &&
            <MPGForm initialUserPreferences={userPrefs} setUserPreferences={setUserPrefs} onSubmit={handlePrefSubmit} />

          }
          {promiseInProgress &&

            <LoadingIndicator className="fade-in"/>
          }
        </React.Fragment>
        {suggestedTeam.length > 0 && (

          <Dialog
            open={modalOpen}
            onClose={handleModalClose}
            maxWidth="md"
            fullWidth={true}
            aria-describedby="modal-modal-description">
            <DialogTitle>Suggested team</DialogTitle>
            <div className="p-4 justify-center text-center md:flex bg-white shadow" >
              <TeamTable suggestedTeam={suggestedTeam} />
              <div>
                <h2><strong>Analytics</strong></h2>
                <br />
                {expenseData &&
                  <Analytics expenseData={expenseData} teamAnalytics={teamAnalytics} />
                }
              </div>
            </div>
          </Dialog>)}
      </div>

      <div>

      </div>

    </div>
  )

}

export default App;
