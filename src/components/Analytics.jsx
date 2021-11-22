/* eslint-disable react/prop-types */
import React from 'react';
import { Pie, Radar } from 'react-chartjs-2';

export const Analytics = (props) => {

  const radarChartOptions = {
    scale: {
      r: {
        suggestedMin: 4.8,
        suggestedMax: 7
      },
    },
  };


  return (
    <div className="m-2">
      <h2><strong>Données</strong></h2>
      <br />

      <h2>Enchères par secteur</h2>
      <Pie
        data={props.expenseData}
        className='m-2'
      />
      <br />

      {props.teamAnalytics && (
        <Radar data={props.teamAnalytics} options={radarChartOptions} className='m-2' />)}

      <p><b>xG/match:</b> {props.suggestedTeam.reduce((a, b) => a + b.xG, 0).toFixed(2)}</p>
      <p><b>Buts réels/match:</b> {props.suggestedTeam.reduce((a, b) => a + b.goals/b.games, 0).toFixed(2)}</p>
      <p><b>Total buts marqués:</b> {props.suggestedTeam.reduce((a, b) => a + b.goals, 0)}</p>

    </div>
  )
}
