import './App.css';
import React, { useState, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker'
import { usePromiseTracker } from 'react-promise-tracker';
import { getPositionWeightedColor } from './styles/styles'
import { MPGForm } from './components/MPGForm';
import { TeamTable } from './components/TeamTable';
import { Analytics } from './components/Analytics';
import { LoadingIndicator } from './LoadingIndicator'
import { Dialog, DialogTitle } from '@material-ui/core';
import { TeamCount } from './components/TeamCount';
import { Footer } from './Footer'
import questions from './Questions';


function App() {

  const initPrefs = {
    // Default values
    league: "England",
    mode: "league",
    bid_aggression: 2,
    target_metric: 'xG',
    team_limit: 3,
    start_prob: 0.75,
    formation: questions.filter(q => q.questionKey === 'formation')[0].answerOptions[0].answerValue,
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

  const handlePrefSubmit = (event) => {
    event.preventDefault()
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

    const target_uri = process.env.REACT_APP_BACK_URL_LEAGUE
    trackPromise(
      fetch(target_uri, requestOptions)
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

  const getTotalBudget = (team) => {
    return team.reduce((preValue, curValue) => preValue + curValue.bid, 0)
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
            (getDepartmentTotal(suggestedTeam, 'A') * 100) / getTotalBudget(suggestedTeam),
            (getDepartmentTotal(suggestedTeam, 'M') * 100) / getTotalBudget(suggestedTeam),
            (getDepartmentTotal(suggestedTeam, 'D') * 100) / getTotalBudget(suggestedTeam),
            (getDepartmentTotal(suggestedTeam, 'G') * 100) / getTotalBudget(suggestedTeam)]
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
      <div className="p-4 text-center">
        <React.Fragment>
          {!promiseInProgress &&
            <div className="md:flex">
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

      <div> {!promiseInProgress && <Footer />} </div>

    </div>
  )

}

export default App;
