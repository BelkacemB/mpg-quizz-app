export const getPositionWeightedColor = (weight, position) => {
    let defStyle = {'background-color': `hsl(${positionColorMap[position]},100%,65%, ${weight})`};
    return defStyle;
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