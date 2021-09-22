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
        questionKey: "criteria",
        answerOptions: [
            { displayText: "Goals", answerValue: "goals"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Defensive performance", answerValue: "def_score"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Expected output (xG+xA)", answerValue: "expected_output"}, 
            { displayText: "MPG average rating", answerValue: "average"}, 
        ]
    }
]

export default questions;