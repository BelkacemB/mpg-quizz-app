/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import { FormControl, Button, Select, MenuItem, Slider} from '@material-ui/core';
import { Tooltip } from '@mui/material';
import questions from '../Questions';
import { svgFlagPerCountry } from '../styles/styles';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';

export const MPGForm = (props) => {

    const [format, setFormat] = useState(props.initialUserPreferences.format)

    const initBudgetMapper = {
        1: 400,
        2: 350,
        3: 300
    }

    const biddingMarks = [
        {
            value: 1,
            label: '4'
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
        if (event.target.name === 'format') 
            setFormat(event.target.value) // Test this 
    }

    const handleBidSlide = (...event) => {
        let updatedValue = {}
        updatedValue['init_budget'] = initBudgetMapper[event[1]]
        props.setUserPreferences({ ...props.initialUserPreferences, ...updatedValue })
    }

    const budget_types = {
        'Equilibrée' : {
            gk_weight: 0.1,
            def_weight: 0.3,
            mid_weight: 0.3,
            att_weight: 0.3
        },
        'Attaque+' : {
            gk_weight: 0.1,
            def_weight: 0.2,
            mid_weight: 0.3,
            att_weight: 0.4
        },
        'Milieu+' : {
            gk_weight: 0.1,
            def_weight: 0.2,
            mid_weight: 0.4,
            att_weight: 0.3
        },
        'Défense+' : {
            gk_weight: 0.1,
            def_weight: 0.4,
            mid_weight: 0.2,
            att_weight: 0.3
        }

    }

    const handleAllocationChange = (event) => {
        props.setUserPreferences({...props.initialUserPreferences, ...budget_types[event.target.value]})
    }

    const initBudgetKey = Object.keys(initBudgetMapper).find(key => initBudgetMapper[key] === props.initialUserPreferences.init_budget)

    return (
        <Paper elevation={3} className="min-w-max p-6">
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
                        <h2><strong>Format</strong></h2>
                        <Select
                            labelId="format-select-label"
                            id="format-selected-id"
                            value={props.initialUserPreferences.format}
                            onChange={handleChange}
                            name="format"
                        >
                            {questions.filter(q => q.questionKey === 'format')[0].answerOptions.map(answer => (
                                <MenuItem key={answer.answerValue} value={answer.answerValue}>{answer.displayText}</MenuItem>
                            )
                            )}
                        </Select>
                    </div>

                    {/* Budget */}
                    { format === 'league' &&
                        <div className="mx-4">
                            <Tooltip title="Plus les participants sont nombreux, plus les enchères seront aggressives">
                            <h2><strong>Nombre de participants</strong></h2>
                            </Tooltip>
                            <Slider
                                defaultValue={initBudgetKey}
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
                    }
                    <div className="m-4">
                        <Tooltip title="Pour éviter de dépendre de la forme d'une seule équipe">
                            <h2><strong>Joueurs maximum par club</strong></h2>
                        </Tooltip>
                        <Select
                            labelId="team-limit-label"
                            id="team-limit-id"
                            value={props.initialUserPreferences.team_limit}
                            onChange={handleChange}
                            name="team_limit"
                        >
                            {[2, 3, 4, 5].map(team_limit => (
                                <MenuItem key={team_limit} value={team_limit}>{team_limit}</MenuItem>
                            ))}
                        </Select>  
                    </div>
                </Paper>
                <Paper elevation={2} className='my-2'>
                <div id="departments" >
                    <div className='m-2'>
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
                </Paper>
                <div className="mx-4">
                    <Tooltip title="Quel département prioriser pour les enchères ?">
                        <h2><strong>Allocation budget</strong></h2>
                    </Tooltip>
                    <Select
                        labelId="allocation-label"
                        id="allocation-id"
                        name="allocation"
                        onChange={handleAllocationChange}
                        defaultValue={'Equilibrée'}
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
