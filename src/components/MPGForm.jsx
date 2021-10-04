/* eslint-disable react/prop-types */
import React from 'react'
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';
import questions from '../Questions';

export const MPGForm = (props) => {

    const initBudgetMapper = {
        1: 400,
        2: 300,
        3: 200
      }

    const biddingMarks = [
        {
            value: 1,
            label: 'x1'
        },
        {
            value: 2,
            label: 'x2'
        },
        {
            value: 3,
            label: 'x3'
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
        <FormControl>

            {/* League */}
            <div>
                <h2><strong>League</strong></h2>
                <Select
                    labelId="league-select-label"
                    id="league-selected-id"
                    value={props.initialUserPreferences.league}
                    onChange={handleChange}
                    name="league"
                >
                    {questions.filter(q => q.questionKey === 'country')[0].answerOptions.map(answer => (
                        <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                    )
                    )}
                </Select>
            </div>
            <br />

            {/* Budget */}
            <div>
                <h2><strong>Bidding power</strong></h2>

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

            {/* Attack prefs */}
            <div>
                <h2><strong>Attack  - top criteria</strong></h2>
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
            </div>

            <br />


            {/* Midfield prefs */}
            <div>
                <h2><strong>Midfield  - top criteria</strong></h2>
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
            </div>
            <br />


            {/* Defence prefs */}
            <div>
                <h2><strong>Defence  - top criteria</strong></h2>
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
            </div>
            <br />
            <div>
                <h2><strong>Budget allocation per department</strong></h2>
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
                Build team 🚀
            </Button>
        </FormControl>
    )
}
