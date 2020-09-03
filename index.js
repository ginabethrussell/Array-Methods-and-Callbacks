import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data */

const data2014 = fifaData.filter(item => item.Year === 2014);
const finals2014 = data2014.filter(item => item.Stage === "Final");
console.log(finals2014);

// (a) Home Team name for 2014 world cup final

const homeTeam2014 = finals2014[0]["Home Team Name"];
console.log(homeTeam2014);

// (b) Away Team name for 2014 world cup final
const awayTeam2014 = finals2014[0]["Away Team Name"];
console.log(awayTeam2014);

// (c) Home Team goals for 2014 world cup final
const homeTeamGoals = finals2014[0]["Home Team Goals"];
console.log(homeTeamGoals);

// (d) Away Team goals for 2014 world cup final
const awayTeamGoals = finals2014[0]["Away Team Goals"];
console.log(awayTeamGoals);

// (e) Winner of 2014 world cup final
 const winner2014 = finals2014[0]["Win conditions"].split(" ")[0];
 console.log(winner2014);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */
//fifaData is missing finals data from 1950, Stage is "Group 6" instead of "Final"
// Uruguay beat Brazil 2 - 1

// console.log(fifaData.filter(item => item.Year === 1950));

function getFinals(data) {
    return data.filter(item => item.Stage === "Final");
};
const finals = getFinals(fifaData);
console.log(finals);

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback, data) {
    return callback(data).map(item => item.Year);
};
const years = getYears(getFinals, fifaData);
console.log(years);

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

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

function getAverageGoals(data) {
    // Use reduce to total all home team goals
    let homeTeamGoals = data.reduce((goals, item) => {
        return goals += item['Home Team Goals'];
    }, 0);
   console.log(homeTeamGoals);
   // Use reduce to toal all away team goals
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
   console.log(winnerInitials);
   const numWins = winnerInitials.reduce((total, item) => {
       if (item === teamInitials){
            return total +1;
       }else{
           return total;
       }
    },0);
    return numWins;
}

console.log(getCountryWins(fifaData, 'BRA'));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
