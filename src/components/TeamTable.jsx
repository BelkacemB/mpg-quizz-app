/* eslint-disable react/prop-types */
import React from 'react'
import ReactTooltip from 'react-tooltip';
import { getPositionWeightedBackgroundColor } from '../styles/styles';

export const TeamTable = (props) => {

    let suggestedTeam = props.suggestedTeam

    return (
        <div className='m-2'>
        <table className="table-auto md:mx-6 fade-in divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suggestedTeam.length > 0 &&
              suggestedTeam.map(player => (
                // TODO Add solid borders between according to position 
                <tr key={player.player_name} className="border-2 rounded">
                  <td className="md:px-6 py-2 whitespace-nowrap">
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
        <br />
      </div>
    )
}
