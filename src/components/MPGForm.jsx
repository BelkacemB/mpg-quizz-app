/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FormControl, Button, Select, MenuItem, Slider } from '@material-ui/core';
import { Tooltip } from '@mui/material';
import questions from '../Questions';
import { svgFlagPerCountry } from '../styles/styles';
import { Paper, Box } from '@mui/material';

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

    const handleChange = (event) => {
        let updatedValue = {}
        updatedValue[event.target.name] = event.target.value
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



    const initBudgetKey = Object.keys(initAggressionMapper).find(key => initAggressionMapper[key] === props.initialUserPreferences.bid_aggression)

    return (
        <div className="md:flex">
            <FormControl className="border-2 rounded" >

                {/* League */}
                <Paper elevation={2} className="my-2">
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

                    <div >
                        <h2><strong>Mode</strong></h2>
                        <Select
                            labelId="format-select-label"
                            id="format-selected-id"
                            value={props.initialUserPreferences.mode}
                            onChange={handleChange}
                            name="mode"
                        >
                            {questions.filter(q => q.questionKey === 'mode')[0].answerOptions.map(answer => (
                                <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                            )
                            )}
                        </Select>
                    </div>

                    {/* Budget */}
                    {mode === 'league' &&
                        <div className="mx-4">
                            <Tooltip title="Plus les participants sont nombreux, plus les enchères seront aggressives">
                                <h2><strong>Nombre de participants</strong></h2>
                            </Tooltip>
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
                            />
                        </div>
                    }

                    {mode === 'tournament' &&
                        <div className="mx-4">
                            <h2><strong>Tactique</strong></h2>
                            <Select
                                labelId="tactic-select-label"
                                id="tactic-selected-id"
                                value={props.initialUserPreferences.formation}
                                onChange={handleChange}
                                name="formation"
                            >
                                {questions.filter(q => q.questionKey === 'formation')[0].answerOptions.map(answer => (
                                    <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                                )
                                )}
                            </Select>
                        </div>
                    }

                    <div className="m-4">
                        <Tooltip title="Pour éviter de dépendre de la forme d'une seule équipe">
                            <h2><strong>Joueurs maximum par club</strong></h2>
                        </Tooltip>
                        <Select
                            labelId="team-limit-label"
                            id="team-limit-id"
                            value={
                                mode === "tournament" ?
                                    3
                                    :
                                    props.initialUserPreferences.team_limit
                            }
                            onChange={handleChange}
                            name="team_limit"
                            disabled={props.initialUserPreferences.mode === 'tournament'}
                        >
                            {[2, 3, 4, 5].map(team_limit => (
                                <MenuItem key={team_limit} value={team_limit}>{team_limit}</MenuItem>
                            ))}
                        </Select>
                        <Box className="my-2">
                            <div className='mx-2'>
                                <h2><strong>Critère</strong></h2>

                                <Select
                                    labelId="target-metric-label"
                                    id="target-metric-id"
                                    name="target_metric"
                                    value={props.initialUserPreferences.target_metric}
                                    onChange={handleChange}
                                >
                                    {questions.filter(q => q.questionKey === 'criteria')[0].answerOptions.map(answer => (
                                        <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                                    )
                                    )}
                                </Select>


                            </div>
                        </Box>
                    </div>
                </Paper>

                <br />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={props.onSubmit}
                    style={{ maxWidth: '150px', alignSelf: 'center', marginBottom: '20px' }}
                >
                    Construire 🚀
                </Button>
            </FormControl>
        </div>
    )
}
