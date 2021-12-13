const questions = [
    {
        questionText: "Format",
        questionKey: "format",
        answerOptions: [
            { displayText: "Ligue", answerValue: "league"}, 
            { displayText: "Tournoi", answerValue: "tournament"}, 
        ],
    },
    {
        questionText: "Sélectionnez la ligue:",
        questionKey: "country",
        answerOptions: [
            { displayText: "Premier League", answerValue: "England"}, 
            { displayText: "Ligue 1", answerValue: "France"}, 
            { displayText: "Serie A", answerValue: "Italy"}, 
            { displayText: "La Liga", answerValue: "Spain"}, 
        ]
    },
    {
        questionKey: "criteria",
        answerOptions: [
            { displayText: "Buts", answerValue: "goals"}, 
            { displayText: "Passes décisives", answerValue: "assists"}, 
            { displayText: "Performance défensive", answerValue: "def_score"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Expected goals & expected assists", answerValue: "expected_output"}, 
            { displayText: "Note moyenne MPG", answerValue: "average"}, 
        ]
    }
]

export default questions;