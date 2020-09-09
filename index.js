import { fifaData } from './fifa.js';
// console.log(fifaData);

// console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data */
console.log("Task 1");
const data2014 = fifaData.filter(item => item.Year === 2014);
const finals2014 = data2014.filter(item => item.Stage === "Final");
const worldCupFinal2014 = finals2014[0];
console.log(worldCupFinal2014);

// (a) Home Team name for 2014 world cup final

const homeTeam2014 = worldCupFinal2014["Home Team Name"];
console.log(homeTeam2014);

// (b) Away Team name for 2014 world cup final
const awayTeam2014 = worldCupFinal2014["Away Team Name"];
console.log(awayTeam2014);

// (c) Home Team goals for 2014 world cup final
const homeTeamGoals = worldCupFinal2014["Home Team Goals"];
console.log(homeTeamGoals);

// (d) Away Team goals for 2014 world cup final
const awayTeamGoals = worldCupFinal2014["Away Team Goals"];
console.log(awayTeamGoals);

// (e) Winner of 2014 world cup final
 const winner2014 = worldCupFinal2014["Win conditions"].split(" ")[0];
 console.log(winner2014);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */
//fifaData is missing finals data from 1950, Stage is "Group 6" instead of "Final"
// Uruguay beat Brazil 2 - 1

// console.log(fifaData.filter(item => item.Year === 1950));
console.log("Task 2 Finals Data - Missing 1950")

function getFinals(data) {
    return data.filter(item => item.Stage === "Final");
};
const finals = getFinals(fifaData);
console.log(finals);

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */
console.log("Task 3 - Return an array of all the years in the finals data set")
function getYears(callback, data) {
    return callback(data).map(item => item.Year);
};
const years = getYears(getFinals, fifaData);
console.log(years);

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 
console.log("Task 4 Return an array of winners of each final")
function getWinners(callback, data) {

   let finals =  callback(data);
   return finals.map(item => {
       if(item['Home Team Goals'] > item['Away Team Goals']){
           return item['Home Team Name'];
       }else if(item['Home Team Goals']< item['Away Team Goals']) {
           return item['Away Team Name'];
       }else {
           return item['Win conditions'].split(" ")[0];
       }
   });

};

const winners = getWinners(getFinals, fifaData);
console.log(winners);

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

 console.log("Task 5 - Create an array of strings with year and winner data");
function getWinnersByYear(getWinners, getYears) {
    const years = getYears(getFinals, fifaData);
    const winners = getWinners(getFinals, fifaData);
    const results = [];
    years.forEach((item, index) => {
        results.push(`In ${item}, ${winners[index]} won the world cup!` )
    });
    return results;
};

const winnersByYear = getWinnersByYear(getWinners, getYears);
console.log(winnersByYear);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */
console.log("Task 6 - Return the average number of goals scored by the home and away teams ")
function getAverageGoals(data) {
    // Use reduce to total all home team goals
    let homeTeamGoals = data.reduce((goals, item) => {
        return goals += item['Home Team Goals'];
    }, 0);
  
   // Use reduce to total all away team goals
   let awayTeamGoals = data.reduce((goals, item) => {
    return goals += item['Away Team Goals'];
}, 0);
return `Average number of goals scored by the home team: ${Math.floor((homeTeamGoals/data.length)* 100)/100} 
Average number of goals scored by the away team:  ${Math.floor((awayTeamGoals/data.length)* 100)/100}`;
   
};

console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */
console.log("Stretch 1 - accept team initials and return the number of wins for the country")
function getCountryWins(data, teamInitials) {

   const finals = data.filter(item => item['Stage'] === 'Final');
   const winnerInitials = finals.map(item => {
       if (item['Home Team Goals'] > item['Away Team Goals']){
           return item['Home Team Initials'];
       }else if (item['Home Team Goals'] < item['Away Team Goals']){
        return item['Away Team Initials'];
       }else {
           return (item['Win conditions'].split(" ")[0]).slice(0,3).toUpperCase();
       }
   });
   
   const numWins = winnerInitials.reduce((total, item) => {
       if (item === teamInitials){
            return total +1;
       }else{
           return total;
       }
    },0);
    return `${teamInitials} has ${numWins} World Cup win(s).`;
}

console.log(getCountryWins(fifaData, 'BRA'));
console.log(getCountryWins(fifaData, 'GER'));
console.log(getCountryWins(fifaData, 'FRG'));
console.log(getCountryWins(fifaData, 'ITA'));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals scored per appearance (average goals for) in the World Cup finals */
console.log("Stretch 3 - return the team with the most goals scored per appearance in world cup finals")
function getGoals(data) {

    // use getFinals function to create an array of objects with finals data
    const finals = getFinals(data);

    // create an array with objects with name and #goals keys for the home and away team occurrences for every finals game
    // [
    //     {
    //         name: country,
    //         numGoals: goals
    //     }
    // ]
    let countryData = finals.map(item => {
        return [{'name': item['Home Team Name'],
        'goals': item['Home Team Goals']},
        {'name': item['Away Team Name'],
        'goals': item['Away Team Goals']}];
    });
    countryData = [].concat(...countryData);
    console.log(countryData);

    /* use reduce to create an object containing country objects using the name as the key
     and the value being another object with the following data keys/values
    { 
        countryName: {
            numAppearances: numOfFinalsGames,
            numGoals: numOfGoalsScored,
            avgGoalsPerAppearance: numOfGoalsScored/numOfFinalsGames
        },
        countryName: {
            numAppearances: numOfFinalsGames,
            numGoals: numOfGoalsScored,
            avgGoalsPerAppearance: numOfGoalsScored/numOfFinalsGames
        },
     }
     */
        
    let countriesTotals = countryData.reduce((countryTotals, currentCountryObj) => {
        if (!countryTotals.hasOwnProperty(currentCountryObj.name)){
            countryTotals[currentCountryObj.name] = {
                    'numAppearances': 1,
                    'numGoals': currentCountryObj.goals,
                    'avgGoalsPerAppearance': currentCountryObj.goals,
            }
            return countryTotals;
        }else {
            countryTotals[currentCountryObj.name]['numAppearances'] += 1;
            countryTotals[currentCountryObj.name]['numGoals'] += currentCountryObj.goals;
            countryTotals[currentCountryObj.name]['avgGoalsPerAppearance'] = countryTotals[currentCountryObj.name]['numGoals']/countryTotals[currentCountryObj.name]['numAppearances'];
            return countryTotals;
        }
    
    }, {} );

    // Loop throught the objects in countriesTotals to find the country with the highest number of goals scored per appearances
    console.log(countriesTotals);
    let highestAvgCountry = "";
    let highestAvg = 0;
    for (const country in countriesTotals){
        if (countriesTotals[country]['avgGoalsPerAppearance'] > highestAvg){
            highestAvgCountry = country;
            highestAvg = countriesTotals[country]['avgGoalsPerAppearance'];
        }else if (countriesTotals[country]['avgGoalsPerAppearance'] === highestAvg){
            highestAvgCountry += ` ${country}`
        }

    }
    // return a template literal with the country with the highest avg goals scored per appearance
    if (highestAvgCountry.split(' ').length === 1){
        return(`${highestAvgCountry} has the highest average number of goals scored per appearance: ${highestAvg}. They appeared ${countriesTotals[highestAvgCountry]['numAppearances']} time(s) and scored a total of ${countriesTotals[highestAvgCountry]['numGoals']} goals.`);
    } else{
        let arrayResponse = [];
        highestAvgCountry.split(" ").forEach(item => {
            arrayResponse.push(`${item}`) 
        });
        let returnString = arrayResponse.join(' and ')
        return `${returnString} tied for the highest average goals per appearance: ${highestAvg}`
    }   
    
}
   
console.log(getGoals(fifaData));


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */
console.log('Stretch 4: Bad Defense, find the team with the most goals scored against them per appearance in World Cup Final Games.');
function badDefense(data, getFinals) {
   const finals = getFinals(data);
  
    let goalsAgainstTeams = finals.map( game => {
        let homeTeam = game['Home Team Name'];
        let goalsAgainstHome = game['Away Team Goals'];
        let awayTeam = game['Away Team Name'];
        let goalsAgainstAway = game['Home Team Goals'];
        return [{'name':homeTeam, 'goalsAgainst': goalsAgainstHome}, {'name': awayTeam, 'goalsAgainst':goalsAgainstAway}];
    });
    goalsAgainstTeams = [].concat(...goalsAgainstTeams);

    let goalsAgainstSummary = goalsAgainstTeams.reduce((summaryObj, scoreItem) => {
          if (!summaryObj.hasOwnProperty(scoreItem.name)){
            summaryObj[scoreItem.name] = {
                'numAppearances' : 1,
                'numGoalsAgainst' : scoreItem.goalsAgainst
            }
            return summaryObj;
        }else {
            summaryObj[scoreItem.name]['numAppearances'] += 1;
            summaryObj[scoreItem.name]['numGoalsAgainst'] += scoreItem.goalsAgainst;
            return summaryObj;
        }
    }, {});

    let badDefenseTeam = Object.keys(goalsAgainstSummary)[0];
    let highestAvgGoalsAgainst = goalsAgainstSummary[badDefenseTeam].numGoalsAgainst/goalsAgainstSummary[badDefenseTeam].numAppearances;
    
    for (let country in goalsAgainstSummary){
        if (goalsAgainstSummary[country].numGoalsAgainst / goalsAgainstSummary[country].numAppearances > highestAvgGoalsAgainst){
            badDefenseTeam = country;
            highestAvgGoalsAgainst = goalsAgainstSummary[country].numGoalsAgainst / goalsAgainstSummary[country].numAppearances;
        }
    }
    return(`${badDefenseTeam} has the worst defense in World Cup Finals: ${highestAvgGoalsAgainst}. They appeared ${goalsAgainstSummary[badDefenseTeam].numAppearances} time(s) and gave up a total of ${goalsAgainstSummary[badDefenseTeam].numGoalsAgainst} goals.`);

}
console.log(badDefense(fifaData, getFinals));

/* If you still have time, use the space below to work on any stretch goals of your choosing as listed in the README file. */

