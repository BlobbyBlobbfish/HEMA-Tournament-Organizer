let contestants = ["Dylan", "Eli", "Isabelle", "Blake", "Peyton", "Nora", "Ali", "Jack", "Myles", "Ana", "Elliott", "Tristan", "Lil", "Liam", "Ruby", "Louis", "Victoria", "Cooper", "Theo", "Zayden", "Connor", "Jackson", "Ella", "Cole", "Alexander", "Ryan", "Oliver", "Joshua", "Maya", "Ada", "Emilia", "Awad", "David", "Michael", "William", "Novak", "Kai", "Eric", "Dubrovnik", "Ripjaw", "Slasher", "Jas", "Marinus", "Notredamus"];

function makeObject(array) {
    let r1Cont = {}
    for (dummy = 0; dummy < array.length; dummy++){
        r1Cont[array[dummy]] = {"skill" : (6) * Math.random() + 4, "score" : [0, 0] };
    }
    return(r1Cont);
}

function shuffle(array){
    let num1;
    let num2;
    let temp;
    for (dummy = 0; dummy < 1000; dummy++){
        num1 = Math.floor(array.length * Math.random());
        num2 = Math.floor(array.length * Math.random());
        temp = array[num1];
        array[num1] = array[num2];
        array[num2] = temp;
    }
    return(array);
}

function tableRower(array, tableNum,myNode) {
    for (parsing of (array)) {
      let tableRow = document.createElement('TR');
      let tabling = myNode.getElementsByTagName('Table')[tableNum];
      tabling.appendChild(tableRow);
      let tableData = document.createElement('TD');
      tableData.innerHTML = parsing;
      tableRow.appendChild(tableData);
    }
}

function groupMaking(array) {
  let newArray = shuffle(array);
  let groupLength = groupSize(array);
  let newerArray = newArray.slice(0, groupLength);
  let metaArray = [];
  metaArray.push(newerArray);
  if (newArray.length % groupLength == 0) {
      for (let dummy = 1; dummy <= (newArray.length / groupLength) - 1; dummy++) {
        newerArray = newArray.slice((dummy) * groupLength, (dummy * groupLength) + groupLength);
        for (let parsing of newerArray) {
          if (parsing == undefined) {
            newerArray.length = newerArray.indexOf(parsing) - 1;
          }
        }
        metaArray.push(newerArray);
      }
      return (metaArray);
  } else {
      for (let dummy = 1; dummy <= (newArray.length / groupLength); dummy++) {
        newerArray = newArray.slice((dummy) * groupLength, (dummy * groupLength) + groupLength);
        for (let parsing of newerArray) {
          if (parsing == undefined) {
            newerArray.length = newerArray.indexOf(parsing) - 1;
          }
        }
        metaArray.push(newerArray);
      }
      return (metaArray);
  }
}

function groupSize(array) {
  for (dummy = 4; dummy < 10; dummy++ ) {
    if (array.length % dummy !== 2 && array.length % dummy !== 1 ) {
      return(dummy);
    }
  }
}

function poolPress(array) {
  divHide();
  document.getElementById("groupDiv").style.display = 'block';
  let currentDiv = document.getElementById("groupDiv");
  let button = document.createElement('button');
  button.innerHTML = 'SIMULATE COMBAT';
  document.getElementById('groupDiv').appendChild(button);
  // document.getElementsByTagName('table')[0].remove();
  let metaArray = groupMaking(array);
  let tabler = document.createElement('table');
  document.getElementById('groupDiv').insertBefore(tabler, button);
  let tableRow = document.createElement('TR');
  tabler.appendChild(tableRow);
  for (parser of metaArray) {
    let header = document.createElement('TH');
    header.innerHTML = "Group" + (metaArray.indexOf(parser) + 1);
    tableRow.appendChild(header);
  }
  for (let dummy = 0; dummy < metaArray[0].length; dummy++) {
    let tableRow = document.createElement('TR');
    tabler.appendChild(tableRow);
    for (parser of metaArray) {
      let dater = document.createElement('TD');
      dater.innerHTML = parser[dummy];
      tableRow.appendChild(dater);
    }
  }
  for (let dummy = 0; dummy < currentDiv.getElementsByTagName('TD').length; dummy++) {
    if (currentDiv.getElementsByTagName('TD')[dummy].textContent == 'undefined') {
      let node = currentDiv.getElementsByTagName('TD')[dummy];
      node.remove();
    }
  }
  return [metaArray, button];
}

function combatPress(array, objective, prevButton) {
  let middlingArray = [];
  let namesArray = [];
  prevButton.addEventListener('click', function handler () {
    let currentDiv =  document.getElementById("scoringDiv");
    let button = document.createElement('button');
    button.innerHTML = "START ELIMINATION ROUND";
    currentDiv.appendChild(button);
    divHide();
    currentDiv.style.display = 'block';
    for (parser of array) {
      for (parsing in parser) {
        for (parsimony of parser.slice(parsing + 1, parser.length)) {
          objective = poolCombat(parser[parsing], parsimony, objective, parser);
          objective =  objective[0];
        }
      }
    }
  for (player in objective) {
    middlingArray.push([player, objective[player].score[0]]);
  }
  middlingArray = middlingArray.sort(function (a, b) {return b[1] - a[1]});
  for (arrayer of middlingArray) {
    arrayer[1] = " Average Score : " + arrayer[1];
  }
  //document.getElementsByTagName('TABLE')[0].remove();
  let tabler = document.createElement('Table');
  currentDiv.insertBefore(tabler,button);
  let header = document.createElement('TH');
  tabler.appendChild(header);
  header.innerHTML = "Scores of all Contestants";
  tableRower(middlingArray, 0,currentDiv);
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
  elimRound(orderArray(namesArray, objective), objective, button);
  return ([]);
  }, {once : true})
}

function poolCombat(fighter1, fighter2, object, array) {
    let skill1 = object[fighter1].skill;
    let skill2 = object[fighter2].skill;
    let firstScore = ((1000 * Math.random() + 1000) / (Math.pow(skill2 / skill1, ((Math.random() * 0.25) + 1))));
    let secondScore = ((1000 * Math.random() + 1000) / (Math.pow(skill1 / skill2, ((Math.random() * 0.25) + 1))));
    object[fighter1].score[0] += Math.floor(firstScore / (array.length - 1));
    object[fighter2].score[0] += Math.floor(secondScore / (array.length - 1));
    object[fighter1].score[1] += Math.floor(firstScore);
    object[fighter2].score[1] += Math.floor(secondScore);
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
    for (x = 0; x < (array.length / 2); x++){
            temp.push(array[x]);
            temp.push(array[(array.length - (x + 1))]);
            finalList.push(temp);
            temp = [];
    }
    array = [];
    roundsDone++;
    //doing the other shuffles
    while (roundsNeeded > roundsDone) {
        if ((roundsDone % 2) == 0){ //if the round is even
                for(let x = 0; x < (array.length / 2); x++){
                    finalList.push(array[x]);
                    finalList.push(array[(array.length - (x + 1))]);
                }
                array = [];
            }
        else if ((roundsDone % 2) == 1){ //if the round is odd
                for (let x = 0; x < (finalList.length / 2); x++) {
                    array.push(finalList[x]);
                    array.push(finalList[(finalList.length - (x + 1))]);
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
   function game (i, x, roundWinners){
     let winner = poolCombat(newCompArray[i][x][0], newCompArray[i][x][1], object, [1, 2])[1];
     roundWinners.push(winner);
     return(newCompArray[i][x][0] + " vs " + newCompArray[i][x][1] + "<br> <span id = FVTB>" + winner + " wins </span>");
   }

   // Function takes in an array of names and sort them into an array of fighting pairs
   //for the next stage in the elimination round, thus an array of arrays.
   function sortRound(array) {
     let x = array.length;
     let miniArray = [];
     let returnArray = [];

     for (i = 0; i < x; i++){
       miniArray.push(array[i]);
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
                 for (let i = 1; i < num; i++) {
                         if (num == 1){
                                 return (1);
                         }
                         else if (base == num) {
                                 return (i + 1);
                         }
                         base = base * 2;
                 }
         }

   //Functions formats the number of tabs in a row, and runs the game function.
         function elimTab (conCount, cs, i, roundWinners) {
                let temp = document.createElement('table');
                temp.id = 'tabElim';
                document.getElementById("elimRoundDiv").appendChild(temp);
                 let table = document.getElementById("tabElim");
                 let row = table.insertRow(document.getElementById("tabElim").rows.length);
                 for (let x = 0; x < conCount; x++) {
                        let cell = row.insertCell(x);
                        cell.colSpan = cs;
                        cell.innerHTML = (game(i, x, roundWinners));
                 }

         }

   // Function creates table rows, and elimTab function.
         function createTab(conCount) {
                 let newCount = powerRow(conCount);


                 let cs = 1;

     let roundWinners = [];

                 for (let i = 0; i < newCount; i++) {
                   elimTab(conCount, cs, i, roundWinners);
                   conCount = conCount / 2;
                   cs = cs * 2;
                   newCompArray.push(sortRound(roundWinners));
                   roundWinners = [];
                 }
         }
         createTab(compArray.length);

         finalButton = document.createElement('button');
         finalButton.innerHTML = 'FINAL TALLY';
         document.getElementById("elimRoundDiv").appendChild(finalButton);

         finalButton.addEventListener('click', function handling () {
           let currentDiv = document.getElementById('finalPlacementDiv');
           divHide();
           currentDiv.style.display = 'block';
           for (player in object) {
             middleArray.push([player, object[player].score[1]]);
           }
           middleArray = middleArray.sort(function (a, b) {return b[1] - a[1]});
           for (arrayer of middleArray) {
             arrayer[1] = " TotalScore : " + arrayer[1];
           }
           let tabler = document.createElement('Table');
           currentDiv.appendChild(tabler);
           let header = document.createElement('TH');
           header.innerHTML = "Final Rankings of all Contestants";
           tableRower(middleArray, 0,  document.getElementById('finalPlacementDiv'));
           tabler.insertBefore(header, currentDiv.getElementsByTagName('TR')[0]);
         }, {once : true});
 }, {once : true});
}

function divHide () {
    let list = document.getElementsByTagName('div');
    for(dummy = 0; dummy < list.length; dummy++){
        list[dummy].style.display = 'none';
    }
}

function handling () {
  let poolPresser = poolPress(contestants);
  combatPress(poolPresser[0], makeObject(contestants), poolPresser[1]);
  return ([]);
}

function moveAround(event){
  if (event.target.id == "startingPageButton") {
    console.log('hi');
    divHide();
    document.getElementById("introDiv").style.display = 'block';
  }
  else if(event.target.id == "groupRoundButton"){
    divHide();
    document.getElementById("groupDiv").style.display = 'block';
  }
  else if(event.target.id == "poolRoundButton"){
    divHide();
    document.getElementById("scoringDiv").style.display = 'block';
  }
  else if(event.target.id == "elimRoundButton"){
    divHide();
    document.getElementById("elimRoundDiv").style.display = 'block';
  }
  else if(event.target.id == "finalTallyButton"){
    divHide();
    document.getElementById("finalPlacementDiv").style.display = 'block';
  }
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
  tableRower(contestants, 0,  document.getElementById('introDiv'));
  let button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', handling, {once : true});
}
