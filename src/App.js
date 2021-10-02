import './App.css';
import questions from './Questions';
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';
import Footer from './Footer';
import { Header } from './Header';
import { trackPromise } from 'react-promise-tracker'
import { LoadingIndicator } from './LoadingIndicator';
import ReactTooltip from 'react-tooltip';
import { getPositionWeightedBackgroundColor, getPositionWeightedColor } from './styles/styles'
import { Pie, Radar } from 'react-chartjs-2';

function App() {

  const qs = questions

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

  const biddingMarks = [
    {
      value: 1,
      label: 'x1'
    },
    {
      value: 2,
      label: 'x2'
    },
    {
      value: 3,
      label: 'x3'
    },
  ]

  const handleChange = (event) => {
    let updatedValue = {}
    updatedValue[event.target.name] = event.target.value
    setUserPrefs({ ...userPrefs, ...updatedValue })
  }

  const initBudgetMapper = {
    1: 400,
    2: 300,
    3: 200
  }

  const handleBidSlide = (...event) => {
    let updatedValue = {}
    updatedValue['init_budget'] = initBudgetMapper[event[1]]
    setUserPrefs({ ...userPrefs, ...updatedValue })
  }

  const handleAllocationChange = (...event) => {
    let updatedWeights = {}
    updatedWeights['gk_weight'] = event[1][0] / 100
    updatedWeights['def_weight'] = (event[1][1] - event[1][0]) / 100
    updatedWeights['mid_weight'] = (event[1][2] - event[1][1]) / 100
    updatedWeights['att_weight'] = (100 - event[1][2]) / 100
    setUserPrefs({ ...userPrefs, ...updatedWeights })
  }

  const handleTryAgain = () => {
    setSuggestedTeam([])
    setExpenseData({})
    setTeamAnalytics({})
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
    }
  }, [suggestedTeam])

  const radarChartOptions = {
    scale: {
      r: {
        suggestedMin: 4.8,
        suggestedMax: 7
      },
    },
  };


  return (
    <div>
      <Header />
      <div className="p-4 justify-center text-center md:flex">
        {suggestedTeam.length === 0 &&
          <FormControl>

            {/* League */}
            <div>
              <h2><strong>League</strong></h2>
              <Select
                labelId="league-select-label"
                id="league-selected-id"
                value={userPrefs.league}
                onChange={handleChange}
                name="league"
              >
                {qs.filter(q => q.questionKey === 'country')[0].answerOptions.map(answer => (
                  <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                )
                )}
              </Select>
            </div>
            <br />

            {/* Budget */}
            <div>
              <h2><strong>Bidding power</strong></h2>

              <Slider
                defaultValue={2}
                aria-labelledby="budget-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={biddingMarks}
                min={1}
                max={3}
                onChangeCommitted={handleBidSlide}
                name="init_budget"
              />
            </div>

            {/* Attack prefs */}
            <div>
              <h2><strong>Attack  - top criteria</strong></h2>
              <Select
                labelId="att-pref-label"
                id="att-prefs-id"
                value={userPrefs.att_pref}
                onChange={handleChange}
                name="att_pref"
              >
                {qs.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                  <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                )
                )}
              </Select>
            </div>

            <br />


            {/* Midfield prefs */}
            <div>
              <h2><strong>Midfield  - top criteria</strong></h2>
              <Select
                labelId="mid-pref-label"
                id="mid-prefs-id"
                name="mid_pref"
                value={userPrefs.mid_pref}
                onChange={handleChange}
              >
                {qs.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                  <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                )
                )}
              </Select>
            </div>
            <br />


            {/* Defence prefs */}
            <div>
              <h2><strong>Defence  - top criteria</strong></h2>
              <Select
                labelId="def-pref-label"
                id="def-prefs-id"
                name="def_pref"
                value={userPrefs.def_pref}
                onChange={handleChange}
              >
                {qs.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                  <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                )
                )}
              </Select>
            </div>
            <br />
            <div>
              <h2><strong>Budget allocation per department</strong></h2>
              <p className="italic text-center">GK / Def / Mid / Att</p>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={100}
                aria-labelledby="track-inverted-range-slider"
                defaultValue={[10, 40, 70]}
                onChangeCommitted={handleAllocationChange}
              />
            </div>
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handlePrefSubmit}
            >
              Build team 🚀
            </Button>
            <LoadingIndicator className="p-4 mx-8" />
          </FormControl>}



        {suggestedTeam.length > 0 && (
          <div id="results" className="p-4 md:flex">
            <div>
              <table className="table-auto mx-6 rounded-lg">
                <thead>
                  <tr>
                    <th className="mx-6">Player</th>
                    <th>Price</th>
                    <th>Bid</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestedTeam.length > 0 &&
                    suggestedTeam.map(player => (
                      // TODO Add solid borders between according to position 
                      <tr key={player.player_name} className="border-2 rounded">
                        <td >
                          <ReactTooltip id={`playerTooltip${player.player_name}`} type='info'>
                            <span>{`Team: ${player.Team}, games: ${player.games}, goals: ${player.goals}, assists: ${player.assists}, xG: ${player.xG.toFixed(2)}, MPG average rating: ${player.average}`}</span>
                          </ReactTooltip>
                          <span data-tip data-for={`playerTooltip${player.player_name}`}>{player.player_name}</span>
                        </td>
                        <td className="text-center"> {player.price} </td>
                        <td className="text-center" style={getPositionWeightedBackgroundColor(Math.min(1, player.bid / (player.price * 3)), player.mpg_position)}> <strong>{player.bid}</strong> </td>
                      </tr>
                    )
                    )
                  }
                  <tr className="total-row">
                    <td className="text-center"><strong>Σ</strong></td>
                    <td className="text-center">{suggestedTeam.length > 0 ? suggestedTeam.reduce(((a, b) => a + b.price), 0) : 0}</td>
                    <td className="text-center">{suggestedTeam.length > 0 ? suggestedTeam.reduce(((a, b) => a + b.bid), 0) : 0}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <span>Team MPG rating: <b>{suggestedTeam.length > 0 ? (suggestedTeam.reduce(((a, b) => a + b.average), 0) / suggestedTeam.length).toFixed(2) : 0}</b> / 10 </span>
            </div>
            <div>
              <h2><strong>Analytics</strong></h2>
              <br />
              {expenseData &&
                <div>
                  <Pie
                    data={expenseData}
                  />
                  <br />

                  {teamAnalytics && (
                    <Radar data={teamAnalytics} options={radarChartOptions} />)}

                </div>}
              <div><Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleTryAgain}
              >
                Try again
              </Button></div>


            </div>
          </div>)}
      </div>

      <div>

      </div>
      <div>
        <Footer />
      </div>
    </div>
  )

}

export default App;
