const questions = [
    {
        questionText: "Format",
        questionKey: "mode",
        answerOptions: [
            { displayText: "League", answerValue: "league"}, 
            { displayText: "Tournament", answerValue: "tournament"}, 
        ],
    },
    {
        questionText: "Sélectionnez la ligue:",
        questionKey: "country",
        answerOptions: [
            { displayText: "Premier League 🇬🇧", answerValue: "England"}, 
            { displayText: "Ligue 1 🇫🇷", answerValue: "France"}, 
            { displayText: "Serie A 🇮🇹", answerValue: "Italy"}, 
            { displayText: "La Liga 🇪🇸", answerValue: "Spain"}, 
        ]
    },
    {
        questionKey: "criteria",
        answerOptions: [
            { displayText: "Goals", answerValue: "goals"}, 
            { displayText: "Expected goals", answerValue: "xG"}, 
            { displayText: "Average MPG rating", answerValue: "average"}, 
        ]
    },
    {
        questionKey: "formation",
        answerOptions: [
            // displayText can be derived from answet value

            { displayText: "3-4-3", answerValue: [1, 3, 4, 3]},
            { displayText: "3-5-2", answerValue: [1, 3, 5, 2]},
         
            { displayText: "4-3-3", answerValue: [1, 4, 3, 3]},
            { displayText: "4-4-2", answerValue: [1, 4, 4, 2]},
            { displayText: "4-5-1", answerValue: [1, 4, 5, 1]},
             
            { displayText: "5-4-1", answerValue: [1, 5, 4, 1]},
            { displayText: "5-3-2", answerValue: [1, 5, 3, 2]}
        ]
    }
]

export default questions;