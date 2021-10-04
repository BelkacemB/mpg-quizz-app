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
        <Pie
          data={props.expenseData}
        />
        <br />

        {props.teamAnalytics && (
          <Radar data={props.teamAnalytics} options={radarChartOptions} />)}

      </div>
    )
}
