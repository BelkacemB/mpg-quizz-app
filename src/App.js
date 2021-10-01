import './App.css';
import questions from './Questions';
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';
import Footer from './Footer';
import { Header } from './Header';
import { trackPromise } from 'react-promise-tracker'
import { LoadingIndicator } from './LoadingIndicator';
import ReactTooltip from 'react-tooltip';
import { getPositionWeightedColor } from './styles/styles'
import { PieChart } from 'react-minimal-pie-chart';


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
  const [expenseData, setExpenseData] = useState([])

  const handleChange = (event) => {
    let updatedValue = {}
    updatedValue[event.target.name] = event.target.value
    setUserPrefs({ ...userPrefs, ...updatedValue })
  }

  const handleSlideChange = (...event) => {
    let updatedValue = {}
    updatedValue['init_budget'] = event[1]
    setUserPrefs({ ...userPrefs, ...updatedValue })
  }

  const handlePrefSubmit = () => {
    setSuggestedTeam([])
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

  useEffect(() => {
    if (suggestedTeam.length > 0) {
      setExpenseData([
        { title: 'Attack', value: getDepartmentTotal(suggestedTeam, 'A'), color: getPositionWeightedColor(0.6, 'A')['background-color'] },
        { title: 'Midfield', value: getDepartmentTotal(suggestedTeam, 'M'), color: getPositionWeightedColor(0.6, 'M')['background-color'] },
        { title: 'Defence', value: getDepartmentTotal(suggestedTeam, 'D'), color: getPositionWeightedColor(0.6, 'D')['background-color'] },
        { title: 'Goalkeepers', value: getDepartmentTotal(suggestedTeam, 'G'), color: getPositionWeightedColor(0.6, 'G')['background-color'] }
      ])
    }
  }, [suggestedTeam])


  return (
    <div>
      <Header />
      <div className="p-4 justify-center text-center md:flex">
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
            <h2><strong>Initial budget</strong></h2>

            <Slider
              defaultValue={300}
              aria-labelledby="budget-slider"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={100}
              max={500}
              onChangeCommitted={handleSlideChange}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handlePrefSubmit}
          >
            Build team 🚀
          </Button>
        </FormControl>

        {/* Suggested team */}
        <div>
          <LoadingIndicator />

          <table className="table-auto m-3">
            <thead>
              <tr>
                <th>Position</th>
                <th className="mx-6">Player</th>
                <th>Price</th>
                <th>Bid</th>
                <th>MPG average rating</th>
              </tr>
            </thead>
            <tbody>
              {suggestedTeam.length > 0 &&
                suggestedTeam.map(player => (
                  // TODO Add solid borders between according to position 
                  <tr key={player.player_name}>
                    <td> {player.mpg_position} </td>
                    <td >
                      <ReactTooltip id={`playerTooltip${player.player_name}`} type='info'>
                        <span>{`Team: ${player.Team}, games: ${player.games}, goals: ${player.goals}, assists: ${player.assists}, xG: ${player.xG.toFixed(2)}`}</span>
                      </ReactTooltip>
                      <strong data-tip data-for={`playerTooltip${player.player_name}`}>{player.player_name}</strong>
                    </td>
                    <td className="text-center"> {player.price} </td>
                    <td className="text-center" style={getPositionWeightedColor(Math.min(1, player.bid / (player.price * 3)), player.mpg_position)}> <strong>{player.bid}</strong> </td>
                    <td className="text-center"> {player.average} </td>
                  </tr>
                )
                )
              }
              <tr className="total-row">
                <td className="text-center"> Σ </td>
                <td className="text-center"><strong>Total</strong></td>
                <td className="text-center">{suggestedTeam.length > 0 ? suggestedTeam.reduce(((a, b) => a + b.price), 0) : 0}</td>
                <td className="text-center">{suggestedTeam.length > 0 ? suggestedTeam.reduce(((a, b) => a + b.bid), 0) : 0}</td>
                <td className="text-center">Team rating = {suggestedTeam.length > 0 ? (suggestedTeam.reduce(((a, b) => a + b.average), 0) / suggestedTeam.length).toFixed(2) : 0}</td>

              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Team analytics</h2>
          {expenseData.length > 0 &&
            <PieChart data={expenseData} style={{ height: '200px' }} />}
        </div>
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
