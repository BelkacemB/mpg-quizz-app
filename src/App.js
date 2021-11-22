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
import { Description } from './components/Description';
import { TeamCount } from './components/TeamCount';

function App() {

  const initPrefs = {
    // Default values
    league: "England",
    init_budget: 300,
    att_pref: 'average',
    mid_pref: 'average',
    def_pref: 'average',
    att_weight: 0.3,
    mid_weight: 0.3,
    def_weight: 0.3,
    gk_weight: 0.1,
    team_limit: 3
  }
  const [userPrefs, setUserPrefs] = useState(initPrefs)

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
        labels: ['Attaque', 'Milieu', 'Défense', 'Gardiens'],
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
        labels: ['Attaque', 'Milieu', 'Défense'],
        datasets: [
          {
            label: "Note moyenne MPG par secteur",
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
      <div className="p-4 text-center md:flex">
        <React.Fragment>
          {!promiseInProgress &&
            <div className="md:flex">
              <Description />
              <MPGForm initialUserPreferences={userPrefs} setUserPreferences={setUserPrefs} onSubmit={handlePrefSubmit} />
            </div>
          }
          {promiseInProgress &&

            <LoadingIndicator className="fade-in" />
          }
        </React.Fragment>
        {suggestedTeam.length > 0 && (

          <Dialog
            open={modalOpen}
            onClose={handleModalClose}
            maxWidth="md"
            fullWidth={true}
            aria-describedby="modal-modal-description">
            <DialogTitle>Équipe proposée</DialogTitle>
            <div className="justify-center text-center md:flex bg-white shadow" >
              <TeamTable suggestedTeam={suggestedTeam} />
              <div>
                {expenseData &&
                  <Analytics expenseData={expenseData} teamAnalytics={teamAnalytics} suggestedTeam={suggestedTeam} />
                }
              </div>
            </div>

            <TeamCount suggestedTeam={suggestedTeam} />
          </Dialog>)}
      </div>

      <div>

      </div>

    </div>
  )

}

export default App;
