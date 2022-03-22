/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import questions from '../Questions';
import { Slider } from '@mui/material';

/* Form Tailwind element from: https://www.tailwind-kit.com/components/form */

export const MPGForm = (props) => {
    const [mode, setMode] = useState(props.initialUserPreferences.mode)

    const initAggressionMapper = {
        1: 1.5,
        2: 2,
        3: 2.5
    }

    const biddingMarks = [
        {
            value: 1.5,
            label: '4'
        },
        {
            value: 2,
            label: '6-8'
        },
        {
            value: 2.5,
            label: '10+'
        },
    ]

    const initBudgetKey = Object.keys(initAggressionMapper).find(key => initAggressionMapper[key] === props.initialUserPreferences.bid_aggression)

    const handleChange = (event) => {
        let updatedValue = {}
        // TODO Find a better way to do this
        if (event.target.name === 'formation') {
            let formationStr = event.target.value// .slice(1, -1)
            updatedValue[event.target.name] = formationStr.split(',').map(c => parseInt(c))
        } else if (event.target.name === 'team_limit') {
            updatedValue[event.target.name] = parseInt(event.target.value)
        } else {
            updatedValue[event.target.name] = event.target.value
        }
        props.setUserPreferences({ ...props.initialUserPreferences, ...updatedValue })
        if (event.target.name === 'mode') {
            setMode(event.target.value)
        }
    }

    const handleBidSlide = (...event) => {
        let updatedValue = {}
        updatedValue['bid_aggression'] = event[1]
        props.setUserPreferences({ ...props.initialUserPreferences, ...updatedValue })
    }

    return (

        <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex justify-center pt-12 pb-12 md:justify-start md:pl-12 md:-mb-24">
                    <img src="/soccer_ball2.svg" alt="MPG Scout Logo" height="10" width="60" />

                    <a href="#" className="p-4 text-xl font-bold text-black bg-white h">
                        MPG Scout
                    </a>
                </div>
                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <p className="text-3xl text-center">
                        Build your fantasy football team
                    </p>
                    <form className="flex flex-col pt-3 md:pt-8">
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className='flex-1 appearance-none italic w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>Format</span>

                                <select className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="mode" value={mode} onChange={handleChange}>
                                    {questions.filter(q => q.questionKey === 'mode')[0].answerOptions.map(answer => (
                                        <option key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col pt-4 mb-12">
                            <div className="flex relative ">
                                <span className='flex-1 appearance-none italic w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>League</span>

                                <select className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="league" value={props.initialUserPreferences.league} onChange={handleChange}>
                                    {questions.filter(q => q.questionKey === 'country')[0].answerOptions.map(answer => (
                                        <option key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</option>
                                    )
                                    )}
                                </select>
                            </div>
                        </div>

                        {mode === 'tournament' &&
                            <div className="flex flex-col pt-4 mb-4">
                                <div className="flex relative ">
                                    <span className='flex-1 appearance-none italic w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>Tactic</span>
                                    <select className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="formation" value={props.initialUserPreferences.formation} onChange={handleChange}>
                                        {questions.filter(q => q.questionKey === 'formation')[0].answerOptions.map(answer => (
                                            <option key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</option>
                                        )
                                        )}
                                    </select>
                                </div>
                            </div>}
                        {mode === 'league' &&
                            <div className="flex flex-col pt-4 mb-4">
                                <div className="flex relative ">
                                    <span className='flex-1 appearance-none italic w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>Size of league</span>

                                    {/* Budget */}

                                    <div className="flex-1 appearance-none  w-full px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">

                                        <Slider
                                            defaultValue={initBudgetKey}
                                            aria-labelledby="budget-slider"
                                            valueLabelDisplay="auto"
                                            step={0.5}
                                            marks={biddingMarks}
                                            min={1.5}
                                            max={2.5}
                                            onChangeCommitted={handleBidSlide}
                                            name="init_budget"
                                            color='secondary'
                                        />
                                    </div>

                                </div>
                            </div>
                        }

                        <div className="flex flex-col pt-4 mb-4">
                            <div className="flex relative ">
                                <span className='flex-1 appearance-none italic w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>Target metric</span>
                                <select className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="target_metric" value={props.initialUserPreferences.target_metric} onChange={handleChange}>
                                    {questions.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                                        <option key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</option>
                                    )
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col pt-4 mb-4">
                            <div className="flex relative ">
                                <span className='flex-1 appearance-none italic w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>Max players/club</span>
                                <select className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="team_limit" value={props.initialUserPreferences.team_limit} onChange={handleChange}>
                                    {[1, 2, 3, 4, 5].map(team_limit => (
                                        <option key={team_limit} value={team_limit}>{team_limit}</option>
                                    ))}
                                </select>
                            </div>
                        </div>



                        <button type="submit" className="w-1/2  ml-auto px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2" onSubmit={props.onSubmit} onClick={props.onSubmit}>
                            <span className="w-full">
                                Build 🚀
                            </span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-1/2 shadow-2xl">
                <img className="hidden object-cover w-full h-screen md:block" src="/goat.jpg" />
            </div>
        </div>

    )
}
