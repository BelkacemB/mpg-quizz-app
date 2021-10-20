/* eslint-disable react/prop-types */
import React from 'react'
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';
import questions from '../Questions';
import { svgFlagPerCountry } from '../styles/styles';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';

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
        <Paper elevation={2}>
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
                <div className="mx-4">
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
                <div id="departments" >
                    <div className='m-2'>
                        <br />
                        <p className="text-lg font-bold">Critères</p>
                    </div>

                    {/* Defence prefs */}
                    <Box className="my-2">
                        <div className='mx-2'>
                            <h2><strong>Défense</strong></h2>

                            <Select
                                labelId="def-pref-label"
                                id="def-prefs-id"
                                name="def_pref"
                                value={props.initialUserPreferences.def_pref}
                                onChange={handleChange}
                                fullWidth
                            >
                                {questions.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                                    <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                                )
                                )}
                            </Select>


                        </div>
                    </Box>

                    {/* Midfield prefs */}
                    <Box className="my-2">
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
                        </div>
                    </Box>

                    <Box className="my-2">
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
                        </div>
                    </Box>
                </div>
                <br />
                <div className="mx-4">
                    <h2><strong>Allocation budget</strong></h2>
                    <p className="italic text-center">GK / Def / Mid / Att</p>
                    <Select
                        labelId="allocation-label"
                        id="allocation-id"
                        name="allocation"
                        onChange={handleAllocationChange}
                        value='Attaque+'
                    >
                        {['Equilibrée', 'Attaque+', 'Milieu+', 'Défense+'].map(answer => (
                                    <MenuItem key={answer} value={answer}>{answer}</MenuItem>
                                )
                                )}
                    </Select>
                </div>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={props.onSubmit}
                    style={{ maxWidth: '150px', alignSelf: 'center', marginBottom: '20px' }}
                >
                    Build 🚀
                </Button>
            </FormControl>
        </Paper>
    )
}
