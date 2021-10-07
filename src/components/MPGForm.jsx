/* eslint-disable react/prop-types */
import React from 'react'
import { FormControl, Button, Select, MenuItem, Slider} from '@material-ui/core';
import questions from '../Questions';
import { svgFlagPerCountry } from '../styles/styles';

export const MPGForm = (props) => {
    // If you need to update the weights dynamically for each department: you need to have user prefs state here as well 

    const initBudgetMapper = {
        1: 400,
        2: 300,
        3: 200
    }

    const biddingMarks = [
        {
            value: 1,
            label: '-4'
        },
        {
            value: 2,
            label: '6-8'
        },
        {
            value: 3,
            label: '10+'
        },
    ]

    const handleChange = (event) => {
        let updatedValue = {}
        updatedValue[event.target.name] = event.target.value
        props.setUserPreferences({ ...props.initialUserPreferences, ...updatedValue })
    }

    const handleBidSlide = (...event) => {
        let updatedValue = {}
        updatedValue['init_budget'] = initBudgetMapper[event[1]]
        props.setUserPreferences({ ...props.initialUserPreferences, ...updatedValue })
    }

    const handleAllocationChange = (...event) => {
        let updatedWeights = {}
        updatedWeights['gk_weight'] = event[1][0] / 100
        updatedWeights['def_weight'] = (event[1][1] - event[1][0]) / 100
        updatedWeights['mid_weight'] = (event[1][2] - event[1][1]) / 100
        updatedWeights['att_weight'] = (100 - event[1][2]) / 100
        props.setUserPreferences({ ...props.initialUserPreferences, ...updatedWeights })
    }

    return (
        <FormControl className="border-2 rounded" >

            {/* League */}
            <div >
                <h2><strong>Ligue</strong></h2>
                <Select
                    labelId="league-select-label"
                    id="league-selected-id"
                    value={props.initialUserPreferences.league}
                    onChange={handleChange}
                    name="league"
                >
                    {questions.filter(q => q.questionKey === 'country')[0].answerOptions.map(answer => (
                        <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText} {svgFlagPerCountry[answer.answerValue]}</MenuItem>
                    )
                    )}
                </Select>
            </div>
            <br />

            {/* Budget */}
            <div>
                <h2><strong>Nombre de participants</strong></h2>

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
            {/* TODO Transform this into a table ? */}
            <div id="departments" className="flex">
                <div className='mx-2'>
                    <br/>
                    <p className="italic mt-0">Top critère</p>
                    <p className="italic mt-2">Budget</p>
                </div>
                
                {/* Defence prefs */}
                <div className='mx-2'>
                    <h2><strong>Défense</strong></h2>
                    <Select
                        labelId="def-pref-label"
                        id="def-prefs-id"
                        name="def_pref"
                        value={props.initialUserPreferences.def_pref}
                        onChange={handleChange}
                    >
                        {questions.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                            <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                        )
                        )}
                    </Select>
                    <br/>
                    <p>{ `${props.initialUserPreferences.def_weight * 100} %`}</p>
                </div>

                {/* Midfield prefs */}
                <div className='mx-2'>
                    <h2><strong>Milieu</strong></h2>
                    <Select
                        labelId="mid-pref-label"
                        id="mid-prefs-id"
                        name="mid_pref"
                        value={props.initialUserPreferences.mid_pref}
                        onChange={handleChange}
                    >
                        {questions.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                            <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                        )
                        )}
                    </Select>
                    <p>{ `${props.initialUserPreferences.mid_weight * 100} %`}</p>
                </div>
                <br />




                <div className='mx-2'>
                    <h2><strong>Attaque</strong></h2>
                    <Select
                        labelId="att-pref-label"
                        id="att-prefs-id"
                        value={props.initialUserPreferences.att_pref}
                        onChange={handleChange}
                        name="att_pref"
                    >
                        {questions.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                            <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                        )
                        )}
                    </Select>
                    <p>{ `${props.initialUserPreferences.att_weight * 100} %`}</p>
                </div>
            </div>
            <br />
            <div>
                <h2><strong>Budget par département</strong></h2>
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
                onClick={props.onSubmit}
            >
                Build 🚀
            </Button>
        </FormControl>
    )
}
