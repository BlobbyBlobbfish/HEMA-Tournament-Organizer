/*AWAD KHALID KAI ELRICK ERIC SUN MR. CAMPBELL HEMA TOURNAMENT */
//Function that takes in an array (of contestants), and returns it as an object with properties "skill" and "score"
function makeObject(array) {
    let r1Cont = {};
    //Goes through array and creates a key of the contestant name, with a skill value and score (set to 0)
    for (dummy = 0; dummy < array.length; dummy++){
        r1Cont[array[dummy]] = {"skill" : (6) * Math.random() + 4, "score" : [0, 0] };
    }
    return(r1Cont);
}

//Function that takes in an array (of contestants), and reorders it in a random fashion (essentially the Kindergarten Shuffle)
function shuffle(array){
    let num1;
    let num2;
    let temp;
    //Switches the placement of 2 randomly selected names many times
    for (dummy = 0; dummy < 1000; dummy++) {
        num1 = Math.floor(array.length * Math.random());
        num2 = Math.floor(array.length * Math.random());
        temp = array[num1];
        array[num1] = array[num2];
        array[num2] = temp;
    }
    return(array);
}

//Function that takes in an array, table to be attached to, and the div in which the table is in (and resultant rows) to create table rows
function tableRower(array, tableNum, myDiv) {
    //Goes through the array, and creates a TR element to be appended to the given table with the values of the array
    for (parsing of (array)) {
      let tableRow = document.createElement('TR');
      let tabling = myDiv.getElementsByTagName('Table')[tableNum];
      tabling.appendChild(tableRow);
      let tableData = document.createElement('TD');
      tableData.innerHTML = parsing;
      tableRow.appendChild(tableData);
    }
}

//Function that takes in an array (of contestants), and reorders them into separate groups for the pool round
function groupMaking(array) {
  let newArray = shuffle(array);
  let groupLength = groupSize(array);
  //Completes first group outside of loop (problems with the first index being 0)
  let newerArray = newArray.slice(0, groupLength);
  let metaArray = [];
  metaArray.push(newerArray);
  //If there will be the same people in each group
  if (newArray.length % groupLength == 0) {
    //Loops through slicing different sections of the arrays (thus forming the groups) and adding them to an encompassing array
      for (let dummy = 1; dummy <= (newArray.length / groupLength) - 1; dummy++) {
        newerArray = newArray.slice((dummy) * groupLength, (dummy * groupLength) + groupLength);
        for (let parsing of newerArray) {
          //Takes out any elements that are "undefined"
          if (parsing == undefined) {
            newerArray.length = newerArray.indexOf(parsing) - 1;
          }
        }
        metaArray.push(newerArray);
      }
      return (metaArray);
  //If there will be an uneven number of people in one group
  } else {
    //Loops through slicing different sections of the arrays (thus forming the groups) and adding them to an encompassing array
      for (let dummy = 1; dummy <= (newArray.length / groupLength); dummy++) {
        newerArray = newArray.slice((dummy) * groupLength, (dummy * groupLength) + groupLength);
        for (let parsing of newerArray) {
          //Takes out any elements that are "undefined"
          if (parsing == undefined) {
            newerArray.length = newerArray.indexOf(parsing) - 1;
          }
        }
        metaArray.push(newerArray);
      }
      return (metaArray);
  }
}

//Determines the size of groups for the pool round (and returns that value)
function groupSize(array) {
  //Goes through potential lengths and checks to see whether there are an adequate number of people in every group
  for (dummy = 4; dummy < 10; dummy++ ) {
    if (array.length % dummy !== 2 && array.length % dummy !== 1 ) {
      return(dummy);
    }
  }
}

//Function that is triggered when the "Start The Pool Round" button is pressed, taking in an array (of contestants) and returning the array of groups and the button
function poolPress(array) {
  //Allowing the groupDiv (containing the relevant info) to be shown, while adding the requisite buttons and table tags
  divHide();
  document.getElementById("groupDiv").style.display = 'block';
  let currentDiv = document.getElementById("groupDiv");
  let button = document.createElement('button');
  button.innerHTML = 'SIMULATE COMBAT';
  document.getElementById('groupDiv').appendChild(button);
  let metaArray = groupMaking(array);
  let tabler = document.createElement('table');
  document.getElementById('groupDiv').insertBefore(tabler, button);
  let tableRow = document.createElement('TR');
  tabler.appendChild(tableRow);
  //Creates header of table of groups
  for (parser of metaArray) {
    let header = document.createElement('TH');
    header.innerHTML = "Group" + (metaArray.indexOf(parser) + 1);
    tableRow.appendChild(header);
  }
  //Prints out groups in a table
  for (let dummy = 0; dummy < metaArray[0].length; dummy++) {
    let tableRow = document.createElement('TR');
    tabler.appendChild(tableRow);
    for (parser of metaArray) {
      let dater = document.createElement('TD');
      dater.innerHTML = parser[dummy];
      tableRow.appendChild(dater);
    }
  //Removes nodes with a value of undefined
  for (let dummy = 0; dummy < currentDiv.getElementsByTagName('TD').length; dummy++) {
    if (currentDiv.getElementsByTagName('TD')[dummy].textContent == 'undefined') {
      let node = currentDiv.getElementsByTagName('TD')[dummy];
      node.remove();
    }
  }
}
  return [metaArray, button];
}

//Function that is ran directly after poolPress, taking in an array (of groups), an object (of contestants and their properties), and a button (SIMULATE COMBAT)
function combatPress(array, objective, prevButton) {
  let middlingArray = [];
  let namesArray = [];
  //EventListener created so that when the button is pressed (SIMULATE COMBAT BUTTON), code runs
  prevButton.addEventListener('click', function handler () {
    //Allows the scoringDiv to be shown while hiding the others and adding the next button
    let currentDiv =  document.getElementById("scoringDiv");
    let button = document.createElement('button');
    button.innerHTML = "START ELIMINATION ROUND";
    currentDiv.appendChild(button);
    divHide();
    currentDiv.style.display = 'block';
    //Fighting each contestant of a group against each other once
    for (parser of array) {
      for (parsing in parser) {
        for (parsimony of parser.slice(parsing + 1, parser.length)) {
          objective = poolCombat(parser[parsing], parsimony, objective, parser);
          objective =  objective[0];
        }
      }
    }
  //Creates an array of players and their average scores
  for (player in objective) {
    middlingArray.push([player, objective[player].score[0]]);
  }
  //Evens out total scores for individuals in a smaller group to make the final tally more fair (extrapolates their average)
  for (arrayer of array[array.length - 1]) {
    if (array[array.length - 1].length != array[0].length) {
      console.log(arrayer);
      objective[arrayer].score[1] += (objective[arrayer].score[0]) * (array[0].length - array[array.length - 1].length);
    }
  }
  //Sorts that array
  middlingArray = middlingArray.sort(function (a, b) {return b[1] - a[1]});
  for (arrayer of middlingArray) {
    arrayer[1] = " Average Score : " + arrayer[1];
  }
  //Creates table, and creates rows for all contestants and scores, and then rows for only the contestants qualifying for the elimination round
  let tabler = document.createElement('Table');
  currentDiv.insertBefore(tabler,button);
  let header = document.createElement('TH');
  tabler.appendChild(header);
  header.innerHTML = "Scores of all Contestants";
  tableRower(middlingArray, 0, currentDiv);
  middlingArray.length = Math.pow(2,Math.floor((Math.log(middlingArray.length)/Math.log(2)) - 1));
  tabler = document.createElement('Table');
  currentDiv.insertBefore(tabler,button);
  header = document.createElement('TH');
  tabler.appendChild(header);
  header.innerHTML = "Scores of Qualified Contestants";
  tableRower(middlingArray, 1, currentDiv);
  for (namer of middlingArray) {
    namesArray.push(namer[0]);
  }
  //Calls elimination round function
  this.remove();
  elimRound(orderArray(namesArray, objective), objective, button);
  }, {once : true})
}

//Function simulates combat between fighters, taking in the first fighter, second fighter, the object they belong to (the contestans one), and the array they belong to
function poolCombat(fighter1, fighter2, object, array) {
    let skill1 = object[fighter1].skill;
    let skill2 = object[fighter2].skill;
    //Creates random scores: score[0] refers to average score (takes into account amount of games played), and score[1] refers to total score
    let firstScore = ((1000 * Math.random() + 1000) / (Math.pow(skill2 / skill1, ((Math.random() * 0.25) + 1))));
    let secondScore = ((1000 * Math.random() + 1000) / (Math.pow(skill1 / skill2, ((Math.random() * 0.25) + 1))));
    object[fighter1].score[0] += Math.floor(firstScore / (array.length - 1));
    object[fighter2].score[0] += Math.floor(secondScore / (array.length - 1));
    object[fighter1].score[1] += Math.floor(firstScore);
    object[fighter2].score[1] += Math.floor(secondScore);
    //Returns an array of the modified object and the winning fighter (ties broken via skill)
    if (firstScore > secondScore) {
      return [object, fighter1];
    } else if (secondScore > firstScore) {
      return [object, fighter2];
    } else if (object[fighter1].skill > object[fighter2].skill) {
      object[fighter1].score[0] += 1;
      object[fighter1].score[1] += (array.length);
      return [object, fighter1];
    } else if (object[fighter2].skill > object[fighter1].skill) {
      object[fighter2].score[0] += 1;
      object[fighter2].score[1] += (array.length);
      return [object, fighter2];
    }
}

function orderArray(array, object) {
    //getting an an array of object values and sorting it by score
    let list = Object.values(object);
    list = list.sort((a,b) => b.score[0] - a.score[0]);

    //creating a list with just the names but ordered by score
    let finalList = [];
    let roundsNeeded = 0;
    let num = array.length;

    // determining how many rounds to run the ordering sequence
    while (num != 1) {
        num = num / 2;
        roundsNeeded = roundsNeeded + 1;
    }
    let roundsDone = 0;
    //doing the first ordering to get the array of arrays
    let temp = [];
    for (parsing = 0; parsing < (array.length / 2); parsing++){
            temp.push(array[parsing]);
            temp.push(array[(array.length - (parsing + 1))]);
            finalList.push(temp);
            temp = [];
    }
    array = [];
    roundsDone++;
    //doing the other shuffles
    while (roundsNeeded > roundsDone) {
        if ((roundsDone % 2) == 0){ //if the round is even
                for(let indexer = 0; indexer < (array.length / 2); indexer++){
                    finalList.push(array[indexer]);
                    finalList.push(array[(array.length - (indexer + 1))]);
                }
                array = [];
            }
        else if ((roundsDone % 2) == 1){ //if the round is odd
                for (let indexer = 0; indexer < (finalList.length / 2); indexer++) {
                    array.push(finalList[indexer]);
                    array.push(finalList[(finalList.length - (indexer + 1))]);
                }
                finalList = [];
            }
            roundsDone++;
        }
  return array;
}


// This function enables the elimination round of the Hema tourament.
// It takes in the array of array of pairs of players' names, the number of pairs always to a power of 2.
// It also takes the object on the players' personal details.
// Afterwards, it will display the results of the elimination round through a converging table.
function elimRound(compArray, object, previousButton) {
 let middleArray = [];
 previousButton.addEventListener('click', function handling () {
   let currentDiv = document.getElementById('elimRoundDiv');
   divHide();
   currentDiv.style.display = 'block';
   let newCompArray = [];
   newCompArray.push(compArray);
   // Functions runs a single game in the elimination round using the fight function, and returns the winner.
   function game (indexer, indices, roundWinners) {
     let winner = poolCombat(newCompArray[indexer][indices][0], newCompArray[indexer][indices][1], object, [1, 2])[1];
     roundWinners.push(winner);
     return(newCompArray[indexer][indices][0] + " vs " + newCompArray[indexer][indices][1] + "<br> <span id = 'FVTB'>" + winner + " wins </span>");
   }

   // Function takes in an array of names and sort them into an array of fighting pairs
   //for the next stage in the elimination round, thus an array of arrays.
   function sortRound(array) {

     let arrayLength = array.length;
     let miniArray = [];
     let returnArray = [];

     for (indexer = 0; indexer < arrayLength; indexer++){
       miniArray.push(array[indexer]);
       if (miniArray.length == 2) {
         returnArray.push(miniArray);
         miniArray = [];
       }
     }
     return (returnArray);
   }

   //Function determines how many rows on the table would be necessary, given the number of pairs of competitors.
   function powerRow(num) {
                 base = 2;
                 for (let rows = 1; rows < num; rows++) {
                         if (num == 1){
                                 return (1);
                         }
                         else if (base == num) {
                                 return (rows + 1);
                         }
                         base = base * 2;
                 }
         }

   //Functions formats the number of tabs in a row, and runs the game function.
         function elimTab (conCount, cs, rows, roundWinners) {
                let temp = document.createElement('table');
                temp.id = 'tabElim';
                document.getElementById("elimRoundDiv").appendChild(temp);
                 let table = document.getElementById("tabElim");
                 let row = table.insertRow(document.getElementById("tabElim").rows.length);
                 for (let parser = 0; parser < conCount; parser++) {
                        let cell = row.insertCell(parser);
                        cell.colSpan = cs;
                        cell.innerHTML = (game(rows, parser, roundWinners));
                 }

         }

   // Function creates table rows, and elimTab function.
         function createTab(conCount) {
                 let newCount = powerRow(conCount);
                 let cs = 1;
                 let roundWinners = [];
                 for (let rows = 0; rows < newCount; rows++) {
                   elimTab(conCount, cs, rows, roundWinners);
                   conCount = conCount / 2;
                   cs = cs * 2;
                   newCompArray.push(sortRound(roundWinners));
                   roundWinners = [];
                 }
         }
         createTab(compArray.length);
//Creates final button in elimRoundDiv
         let finalButton = document.createElement('button');
         finalButton.innerHTML = 'FINAL TALLY';
         document.getElementById("elimRoundDiv").appendChild(finalButton);

//Adds event listener to final button
         finalButton.addEventListener('click', function handling () {
           //Hides and shows appropriate div
           let currentDiv = document.getElementById('finalPlacementDiv');
           divHide();
           currentDiv.style.display = 'block';
           //Creates array of total scores and players
           for (player in object) {
             middleArray.push([player, object[player].score[1]]);
           }
           //Sorts that array
           middleArray = middleArray.sort(function (a, b) {return b[1] - a[1]});
           for (arrayer of middleArray) {
             arrayer[0] = (middleArray.indexOf(arrayer) + 1) + ". " + arrayer[0];
             arrayer[1] = " TotalScore : " + arrayer[1];
           }
           //Creates a table, and inserts rows of the contestants with their total scores
           let tabler = document.createElement('Table');
           currentDiv.appendChild(tabler);
           let header = document.createElement('TH');
           header.innerHTML = "Final Rankings of all Contestants";
           tableRower(middleArray, 0,  document.getElementById('finalPlacementDiv'));
           tabler.insertBefore(header, currentDiv.getElementsByTagName('TR')[0]);
           this.remove();
         }, {once : true});
    this.remove();
 }, {once : true});
}

function divHide () {
    let list = document.getElementsByTagName('div');
    for(dummy = 0; dummy < list.length; dummy++){
        list[dummy].style.display = 'none';
    }
}

function handling () {
  this.remove();
  let poolPresser = poolPress(contestants);
  combatPress(poolPresser[0], makeObject(contestants), poolPresser[1]);
  return ([]);
}

window.onload = () => {
  document.getElementById('startingPageButton').addEventListener("click", function handling () {
    divHide();
    document.getElementById("introDiv").style.display = 'block';
  });
  document.getElementById('groupPageButton').addEventListener("click", function handling () {
    divHide();
    document.getElementById("groupDiv").style.display = 'block';
  });
  document.getElementById('poolRoundButton').addEventListener("click", function handling () {
    divHide();
    document.getElementById("scoringDiv").style.display = 'block';
  });
  document.getElementById('elimRoundButton').addEventListener("click", function handling () {
    divHide();
    document.getElementById("elimRoundDiv").style.display = 'block';
  });
  document.getElementById('finalTallyButton').addEventListener("click", function handling () {
    divHide();
    document.getElementById("finalPlacementDiv").style.display = 'block';
  });
  tableRower(contestants, 0, document.getElementById('introDiv'));
  let button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', handling, {once : true});
}
