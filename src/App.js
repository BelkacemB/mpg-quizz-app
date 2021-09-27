import './App.css';
import questions from './Questions';
import React, { useState } from 'react';
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';
import Footer from './Footer';
import { Header } from './Header';
import { trackPromise } from 'react-promise-tracker'
import { LoadingIndicator } from './LoadingIndicator';

function App() {

  const qs = questions

  const [userPrefs, setUserPrefs] = useState({
    // Default values
    league: "England",
    init_budget: 300,
    att_pref: 'average',
    mid_pref: 'average',
    def_pref: 'average',
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

  return (
    <div>
      <Header />
      <div className="p-10 justify-center md:flex">
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
              <LoadingIndicator className="justify-center" />
              {suggestedTeam.length > 0 &&
                suggestedTeam.map(player => (
                  // TODO Add solid borders between according to position 
                  <tr key={player.player_name}>
                    <td> {player.mpg_position} </td>
                    <td> <strong>{player.player_name}</strong> </td>
                    <td className="text-center"> {player.price} </td>
                    <td className="text-center" style={{ 'background-color': 'hsl(120,100%,75%)' }}> <strong>{player.bid}</strong> </td>
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
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )

}

export default App;
