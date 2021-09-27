export const getPitchGreenWeightedColor = (weight) => {
    let defStyle = {'background-color': `hsl(120,100%,75%, ${weight})`};
    return defStyle;
}

export const StrikerColor = (weight) => `hsla(222, 100%, 60%, ${weight})`
export const MidfielderColor = (weight) => `hsl(360, 100%, 60%, ${weight})`

export const GKColor = (weight) => `hsl(50,100%,60%, ${weight})`

export const style_map = {
    'A' : {'background-color' : StrikerColor},
    'M' : {'background-color' : MidfielderColor},
    'D' : {'background-color' : getPitchGreenWeightedColor},
    'G' : {'background-color' : GKColor}
}