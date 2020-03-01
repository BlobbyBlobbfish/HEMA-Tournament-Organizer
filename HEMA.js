function makeObject(contestants){ 
    //Makes the array into an object 
    let r1Cont = {}
    for(x = 0; x < contestants.length; x++){
        r1Cont[contestants[x]] = {"skill" : 10 * Math.random(), "score" : 0, "name": contestants[x]};
    }
}
function randomOrderArray(array){
    let num1; 
    let num2;
    let temp;
    for(x = 0; x < (69 * array.length); x++){
        num1 = Math.floor(array.length * Math.random());
        num2 = Math.floor(array.length * Math.random());
        temp = array[num1];
        array[num1] = array[num2];
        array[num2] = temp;
    }
    return(array);
}
function tableRower(array) {
    for (parsing of (array)) {
      let tableRow = document.createElement('TR');
      let tabling = document.getElementsByTagName('Table')[0];
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
  for (let dummy = 1; dummy <= (newArray.length / 4) - 1; dummy++) {
    newerArray = newArray.slice((dummy) * 4, (dummy * 4) + 5 );
    metaArray.push(newerArray);
  }
  return (metaArray);
}

function poolPress(array) {
  let button = document.getElementsByTagName('button')[0];
  button.innerHTML = 'SIMULATE COMBAT';
  document.getElementsByTagName('Table')[0].remove();
  let metaArray = groupMaking(contestants);
  let tabler = document.createElement('Table');
  document.getElementsByTagName('body')[0].insertBefore(tabler, document.getElementsByTagName('button')[0]);
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
}
function fight(fighter1,fighter2,object){
    let skill1 = object[fighter1].skill;
    let skill2 = object[fighter2].skill;
    //odds are in terms of fighter 1 winning 
    if (skill1 != skill2) {
        let odds = (skill1 /(skill1 + skill2));
    }
    else {
        let odds = 0.5;
    }
    x = Math.random();
    if(x < odds){
        object[fighter1].score += 1;
        return(fighter1);
    }
    else if(x >= odds){
        object[fighter2].score += 1;
        return(fighter2);

    }
}
function divHide(){
    let list = getElementByTagName('div');
    for(x = 0; x < list.length; x++){
        list[x].style.display = 'none';
    }
}

function orderArray(array,object){
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
    while(roundsNeeded > roundsDone){   
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

	let newCompArray = [];
	newCompArray.push(compArray);

	// Functions runs a single game in the elimination round using the fight function, and returns the winner. 
	function game (i, x, roundWinners){
		let winner = fight(newCompArray[i][x][0],newCompArray[i][x][1],object);
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
}
