//stretch.js
// See if you can complete one or more of the following challenges:


// - [ ] Account for ties in your 'finals' data set
// - [ ] Create a function that takes country initials as a parameter and determines how many goals that country has scored in World Cup games since 1930.
// - [ ] Use `.map` to format country names into `<h1>` HTML headers.

import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('Stretch');
// - [ ] Create a function that takes country initials as a parameter and returns their total number of World Cup appearances.
function getWorldCupAppearances(data, initials){
    let totalGames = 0;
    data.forEach(game => {
        if (game["Home Team Initials"] === initials || game["Away Team Initials"] === initials){
            totalGames ++;
        }
    });
    return `${initials} appeared in a total of ${totalGames} World Cup Games from 1930 to 2014.`;
}
console.log(getWorldCupAppearances(fifaData, 'BRA'));
console.log(getWorldCupAppearances(fifaData, 'USA'));

// - [ ] Use `.map` to format country names into `<h1>` HTML headers.
function formatMatchesToHTML(data){
    const htmlGameTitles = data.map(game => {
        return `<h1>${game['Away Team Name']} versus ${game['Home Team Name']}</h1>`;
    })
    return htmlGameTitles;
}
console.log(formatMatchesToHTML(fifaData));