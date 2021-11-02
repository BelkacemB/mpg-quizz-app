import React from 'react'

export const Description = () => {
    return (
        <div className="w-80 m-5">
            <b className="italic">Comment ça marche ?</b>
            <p>- Choisissez votre ligue, le nombre de participants et vos critères préférés pour chaque secteur de jeu dans le formulaire suivant, et un algorithme d&apos;optimisation linéaire vous suggèrera une équipe et des enchères conformes à vos préférences.</p>
            <p>- Dans l&apos;écran &quot;Équipe proposée&quot;, plus la couleur sur une cellule d&apos;enchères est foncée, plus les chances d&apos;obtenir le joueur sont élevées.</p>
            <p>- L&apos;algorithme se base sur les performances des joueurs dans la saison en cours, mais ne prend pas en compte blessures et suspensions.</p>
        </div>
    )
}
