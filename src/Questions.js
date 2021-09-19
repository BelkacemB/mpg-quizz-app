const questions = [
    {
        questionText: "Sélectionnez la ligue:",
        questionKey: "country",
        answerOptions: [
            { displayText: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", answerValue: "England"}, 
            { displayText: "🇫🇷", answerValue: "France"}, 
            { displayText: "🇮🇹", answerValue: "Italy"}, 
            { displayText: "🇪🇸", answerValue: "Spain"}, 
        ]
    },
    {
        questionText: "Critère pour les attaquants:",
        questionKey: "attCriteria",
        answerOptions: [
            { displayText: "Buts", answerValue: "goals"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Performance défensive", answerValue: "def_score"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Expected output", answerValue: "expected_output"}, 
        ]
    }, 
    {
        questionText: "Critère pour les milieux:",
        questionKey: "midCriteria",
        answerOptions: [
            { displayText: "Buts", answerValue: "goals"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Performance défensive", answerValue: "def_score"}, 
            { displayText: "Expected output", answerValue: "expected_output"}
        ]
    },
    {
        questionText: "Critère pour les défenseurs:",
        questionKey: "defCriteria",
        answerOptions: [
            { displayText: "Buts", answerValue: "goals"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Assists", answerValue: "assists"}, 
            { displayText: "Performance défensive", answerValue: "def_score"}, 
            { displayText: "Expected output", answerValue: "expected_output"}
        ]
    }
]

export default questions;