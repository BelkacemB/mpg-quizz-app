import React from 'react'
import questions from '../../Questions'
import PropTypes from 'prop-types';
import {InputLayout} from './InputLayout'
import { svgFlagPerCountry } from '../../styles/styles'
import { MenuItem, Select } from '@mui/material';


export const SelectQuestion = (props) => {
  return (
    <InputLayout name={props.displayName} icon={props.icon}>

        <Select className="flex-1 appearance-none border border-gray-300 w-full px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
        name={props.name} value={props.init} onChange={props.handler}>
            {questions.filter(q => q.questionKey === props.questionKey)[0].answerOptions.map(answer => (
                <MenuItem key={answer.answerValue} value={answer.answerValue}>
                  {answer.displayText}
                  {props.questionKey === 'country' && svgFlagPerCountry[answer.answerValue]}
                </MenuItem>
            )
            )}
        </Select>

    </InputLayout>
  )
}

SelectQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  questionKey: PropTypes.string.isRequired,
  init: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  icon: PropTypes.node
}