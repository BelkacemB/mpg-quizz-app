import './App.css';
import questions from './Questions';
import React, { useState } from 'react';
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';

function App() {

  const qs = questions

  const posEmoji = {
    'G': '🥊',
    'D': '⚔️', 
    'M': '🧠',
    'A': '⚽'
  }

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

    fetch("https://nrkf97hvad.execute-api.us-east-2.amazonaws.com/preproduction/opt", requestOptions)
      .then(response => response.json())
      .then(data => {
        setSuggestedTeam(data);
        console.log(data)
      }
      )
      .catch(error => console.log('error', error));
  }

  return (
    <div className="p-10 items-center justify-center flex flex-row">
      <FormControl>

        {/* League */}
        <div >
          <p >League</p>
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
          <p>Initial budget</p>

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
          <p>Attack preferences</p>
          <Select
            labelId="att-pref-label"
            id="att-prefs-id"
            value={userPrefs.att_pref}
            onChange={handleChange}
            name="att_pref"
          >
            {qs.filter(q => q.questionKey === 'attCriteria')[0].answerOptions.map(answer => (
              <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
            )
            )}
          </Select>
        </div>
        <br />


        {/* Midfield prefs */}
        <div>
          <p>Midfield preferences</p>
          <Select
            labelId="mid-pref-label"
            id="mid-prefs-id"
            name="mid_pref"
            value={userPrefs.mid_pref}
            onChange={handleChange}
          >
            {qs.filter(q => q.questionKey === 'midCriteria')[0].answerOptions.map(answer => (
              <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
            )
            )}
          </Select>
        </div>
        <br />


        {/* Defence prefs */}
        <div>
          <h1>Defence preferences</h1>
          <Select
            labelId="def-pref-label"
            id="def-prefs-id"
            name="def_pref"
            value={userPrefs.def_pref}
            onChange={handleChange}
          >
            {qs.filter(q => q.questionKey === 'defCriteria')[0].answerOptions.map(answer => (
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
      <div className="mx-8">
        {suggestedTeam.length > 0 && 
        <table className="table-auto border-solid border-2 rounded">
          <tr>
            <th>Player</th>
            <th>Price</th>
            <th>Bid</th>
          </tr>
          {suggestedTeam.length > 0 &&
            suggestedTeam.map(player => (
              // TODO Add solid borders between according to position 
              <tr key={player.player_name} className="bg-green-50 border-2">
                <td > { posEmoji[player.mpg_position] + " | " + player.player_name} </td>
                <td > {player.price} </td>
                <td > <strong>{player.bid}</strong> </td>
              </tr>
            ))
          }
        </table> }
      </div>
    </div>
  )

}

export default App;
