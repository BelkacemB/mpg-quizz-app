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
        <div>
        <h2>Bids per department</h2>
        <Pie
          data={props.expenseData}
        />
        <br />

        {props.teamAnalytics && (
          <Radar data={props.teamAnalytics} options={radarChartOptions} />)}

      </div>
    )
}
