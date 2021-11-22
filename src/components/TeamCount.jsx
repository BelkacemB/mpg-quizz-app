/* eslint-disable react/prop-types */
import React from 'react'

export const TeamCount = (props) => {

    let nbPlayersPerTeam = props.suggestedTeam.reduce((acc, curr) => {
        if (!acc[curr.Team]) {
            acc[curr.Team] = 1
        } else {
            acc[curr.Team] += 1
        }
        return acc
    }, {})

    return (
        <div>
        <h2 className="block justify-center m-4"><strong>Nombre de joueurs par équipe</strong></h2>
            
        <div className="flex flex-wrap justify-center m-4">
            <br />
            {Object.keys(nbPlayersPerTeam).map(team => (
                <div key={team} className="w-1/3 p-2">
                    <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-2">
                        <div className="md:flex justify-center">
                            <div className="md:w-1/2">
                                <h3 className="text-center">{team}</h3>
                            </div>
                            <div className="md:w-1/2">
                                <h3 className="text-center">{nbPlayersPerTeam[team]}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}
