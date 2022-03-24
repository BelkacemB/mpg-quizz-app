import React from 'react'

import FranceIcon from '../img/france.svg'
import ItalyIcon from '../img/italy.svg'
import SpainIcon from '../img/spain.svg'
import EnglandIcon from '../img/england.svg'

export const iconColor = ''

export const getPositionWeightedBackgroundColor = (weight, position) => {
    let defStyle = {'background-color': `hsl(${positionColorMap[position]},100%,65%, ${weight})`};
    return defStyle;
}

export const getPositionWeightedColor = (weight, position) => {
    let color = `hsl(${positionColorMap[position]},100%,65%, ${weight})`;
    return color;
}

export const positionColorMap = {
    'A' : '25',
    'M' : '55',
    'D' : '100',
    'G' : '215'
}

export const defaultLabelStyle = {
    fontSize: '8px',
    fontFamily: 'sans-serif',
  };

export const svgFlagPerCountry = {
    'France': (<img src={FranceIcon} width="20px" className="inline mx-2"/>),
    'England': (<img src={EnglandIcon} width="20px" className="inline mx-2"/>),
    'Spain': (<img src={SpainIcon} width="20px" className="inline mx-2"/>),
    'Italy': (<img src={ItalyIcon} width="20px" className="inline mx-2"/>),
} 