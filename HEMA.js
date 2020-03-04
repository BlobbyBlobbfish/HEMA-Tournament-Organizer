let contestants = ["Dylan", "Eli", "Isabelle", "Blake", "Peyton", "Nora", "Ali", "Jack", "Myles", "Ana", "Elliott", "Tristan", "Lil", "Liam", "Ruby", "Louis", "Victoria", "Cooper", "Theo", "Zayden", "Connor", "Jackson", "Ella", "Cole", "Alexander", "Ryan", "Oliver", "Joshua", "Mila", "Maya", "Ada", "Emilia"]


let poolRoundResults = [];

function makeObject(array) {
    let r1Cont = {}
    for (dummy = 0; dummy < array.length; dummy++){
        r1Cont[array[dummy]] = {"skill" : (6) * Math.random() + 4, "score" : 0 };
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

function tableRower(array, tableNum) {
    for (parsing of (array)) {
      let tableRow = document.createElement('TR');
      let tabling = document.getElementsByTagName('Table')[tableNum];
      tabling.appendChild(tableRow);
      let tableData = document.createElement('TD');
      tableData.innerHTML = parsing;
      tableRow.appendChild(tableData);
    }
}

function groupMaking(array) {
  let newArray = shuffle(array);
  let newerArray = newArray.slice(0, 4);
  let metaArray = [];
  metaArray.push(newerArray);
  let groupLength = groupSize(array);
  for (let dummy = 1; dummy <= (newArray.length / groupLength) - 1; dummy++) {
    newerArray = newArray.slice((dummy) * groupLength, (dummy * groupLength) + groupLength + 1 );
    for (let parsing of newerArray) {
      if (parsing == undefined) {
        newerArray.length = newerArray.indexOf(parsing) + 1;
      }
    }
    metaArray.push(newerArray);
  }
  return (metaArray);
}

function groupSize(array) {
  for (let dummy = 4; dummy < 10; dummy++ ) {
    if (array.length % dummy !== 2 || array.length % dummy !== 1 ) {
      return(dummy);
    }
  }
}

function poolPress(array) {
  let button = document.getElementsByTagName('button')[0];
  button.innerHTML = 'SIMULATE COMBAT';
  console.log(document.getElementsByTagName('table'));
  document.getElementsByTagName('table')[0].remove();
  let metaArray = groupMaking(array);
  let tabler = document.createElement('table');
  document.getElementsByTagName('div')[0].insertBefore(tabler, document.getElementsByTagName('button')[0]);
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
  for (dummy in document.getElementsByTagName('TD')) {
    if (document.getElementsByTagName('TD')[dummy].textContent == 'undefined') {
      let node = document.getElementsByTagName('TD')[dummy];
      node.remove();
    }
  }
  return metaArray;
}

function combatPress(array, objective) {
  let middlingArray = [];
  let namesArray = [];
  document.getElementsByTagName('button')[0].addEventListener('click', function handler () {
    for (parser of array) {
      for (parsing in parser) {
        for (parsimony of parser.slice(parsing + 1, parser.length)) {
          objective = poolCombat(parser[parsing], parsimony, objective, parser);
          objective =  objective[0];
        }
      }
    }
  for (player in objective) {
    middlingArray.push([player, objective[player].score]);
  }
  middlingArray = middlingArray.sort(function (a, b) {return b[1] - a[1]});
  for (arrayer of middlingArray) {
    arrayer[1] = " Average Score : " + arrayer[1];
  }
  document.getElementsByTagName('TABLE')[0].remove();
  let tabler = document.createElement('Table');
  document.getElementsByTagName('div')[0].insertBefore(tabler, document.getElementsByTagName('button')[0]);
  let header = document.createElement('TH');
  tabler.appendChild(header);
  header.innerHTML = "Scores of all Contestants";
  tableRower(middlingArray, 0);
  for (let dummy = 1; dummy < middlingArray.length; dummy ++) {
    if (Math.sqrt(dummy) % 1 === 0 && (dummy / middlingArray.length) > 0.3) {
      middlingArray.length = dummy;
      break;
    }
  }
  tabler = document.createElement('Table');
  document.getElementsByTagName('div')[0].insertBefore(tabler, document.getElementsByTagName('button')[0]);
  header = document.createElement('TH');
  tabler.appendChild(header);
  header.innerHTML = "Scores of Qualified Contestants";
  tableRower(middlingArray, 1);
  for (namer of middlingArray) {
    namesArray.push(namer[0]);
  }
  }, {once : true})
  return [objective, namesArray];
}

function poolCombat(fighter1, fighter2, object, array) {
    console.log("pool combat ran ");
    console.log(object, fighter1, fighter2);
    let skill1 = object[fighter1].skill;
    let skill2 = object[fighter2].skill;
    object[fighter1].score += Math.floor(((1000 * Math.random() + 1000) / (Math.pow(skill2 / skill1, ((Math.random() * 0.25) + 1)))) / array.length);
    object[fighter2].score += Math.floor(((1000 * Math.random() + 1000) / (Math.pow(skill1 / skill2, ((Math.random() * 0.25) + 1)))) / array.length);
    if (object[fighter1].score > object[fighter2].score) {
      return [object, fighter1];
    } else if (object[fighter2].score > object[fighter1].score) {
      return [object, fighter2];
    } else if (object[fighter1].skill > object[fighter2].skill) {
      object[fighter1].score += 1;
      return [object, fighter1];
    } else if (object[fighter2].skill > object[fighter1].skill) {
      object[fighter2].score += 1;
      return [object, fighter2];
    }
}

function orderArray(array, object) {
    //getting an an array of object values and sorting it by score
    let list = Object.values(object);
    list = list.sort( (a,b) => b.score - a.score);
    console.log(list);

    //creating a list with just the names but ordered by score
    let list2 = [];
    for(x = 0; x < list.length; x++){
        list2.push(list[x].name);
    }
    let finalList = [];
    let roundsNeeded = 0;
    let num = list2.length;

    // determining how many rounds to run the ordering sequence
    while(num != 1){
        num = num / 2;
        roundsNeeded++;
    }
    let roundsDone = 0

    //doing the first ordering to get the array of arrays
    let temp = [];
    for(x = 0; x < (list2.length / 2); x++){
            temp.push(list2[x]);
            temp.push(list2[(list2.length - (x + 1))]);
            finalList.push(temp);
            temp = [];
    }
    list2 = [];
    roundsDone++;
    console.log(finalList);

    //doing the other suffles
    while (roundsNeeded > roundsDone) {
        if((roundsDone % 2) == 0){ //if the round is even
                for(x = 0; x < (list2.length / 2); x++){
                    finalList.push(list2[x]);
                    finalList.push(list2[(list2.length - (x + 1))]);
                }
                list2 = [];
                console.log("did something!");
            }
        else if((roundsDone % 2) == 1){ //if the round is odd
                for(x = 0; x < (finalList.length / 2); x++){
                    list2.push(finalList[x]);
                    list2.push(finalList[(finalList.length - (x + 1))]);
                }
                finalList = [];
                console.log("did the other thing");
            }
            roundsDone++;
            console.log("while loop works");
        }
    if(list2[0]){
        return(list2);
    }
    else if(finalList[0]){
        return(finalList);
    }

}


// This function enables the elimination round of the Hema tourament.
// It takes in the array of array of pairs of players' names, the number of pairs always to a power of 2.
// It also takes the object on the players' personal details.
// Afterwards, it will display the results of the elimination round through a converging table.
function elimRound(compArray, object){
 let button = document.getElementsByTagName("button")[0];
 button.innerHTML = "Start Elimination Round"
 button.addEventListener('click', function handling () {
   let newCompArray = [];
   newCompArray.push(compArray);

   // Functions runs a single game in the elimination round using the fight function, and returns the winner.
   function game (i, x, roundWinners){
     let winner = poolCombat(newCompArray[i][x][0], newCompArray[i][x][1], object, [1] );
     roundWinners.push(winner);
     return(newCompArray[i][x][0] + "<br> vs " + newCompArray[i][x][1] + "<br>" + winner + "wins");
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
                         base = base * 2
                 }
         }

   //Functions formats the number of tabs in a row, and runs the game function.
         function elimTab (conCount, cs, i, roundWinners) {
                let temp = document.createElement('table')
                temp.id = 'tabElim'
                document.getElementById("introDiv").appendChild(temp);
                 console.log(cs);
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
                 let newCount = powerRow(conCount)


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
 }, {once : true});
}

function divHide () {
    let list = getElementByTagName('div');
    for(dummy = 0; dummy < list.length; dummy++){
        list[dummy].style.display = 'none';
    }
}

function handling () {
  poolRoundResults = combatPress(poolPress(contestants), makeObject(contestants));
  contestants = poolRoundResults[0];
  let completedArray = orderArray(poolRoundResults[1], contestants);
  elimRound(completedArray, contestants);
}

window.onload = () => {
  tableRower(contestants, 0);
  let button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', handling, {once : true});
}
