const questions = [
    {
        questionText: "Sélectionnez la ligue:",
        questionKey: "country",
        answerOptions: [
            { displayText: "Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿", answerValue: "England"}, 
            { displayText: "Ligue 1 🇫🇷", answerValue: "France"}, 
            { displayText: "Serie A 🇮🇹", answerValue: "Italy"}, 
            { displayText: "La Liga 🇪🇸", answerValue: "Spain"}, 
        ]
    },
    {
        questionText: "Critère pour les attaquants:",
        questionKey: "attCriteria",
        answerOptions: [
            { displayText: "Goals", answerValue: "goals"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Defensive performance", answerValue: "def_score"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Expected output (xG+xA)", answerValue: "expected_output"}, 
        ]
    }, 
    {
        questionText: "Critère pour les milieux:",
        questionKey: "midCriteria",
        answerOptions: [
            { displayText: "Goals", answerValue: "goals"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Defensive performance", answerValue: "def_score"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Expected output (xG+xA)", answerValue: "expected_output"}, 
        ]
    },
    {
        questionText: "Critère pour les défenseurs:",
        questionKey: "defCriteria",
        answerOptions: [
            { displayText: "Goals", answerValue: "goals"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Defensive performance", answerValue: "def_score"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Expected output (xG+xA)", answerValue: "expected_output"}, 
        ]
    }
]

export default questions;