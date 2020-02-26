function makeObject(contestants){ 
    let r1Cont = {}
    for(x = 0; x < contestants.length; x++){
        r1Cont[contestants[x]] = {"skill" : 10 * Math.random(), "score" : 0 };
    }
    return(r1Cont);
}
function randomOrderArray(array){
    let num1; 
    let num2;
    let temp;
    for(x = 0; x < 1000; x++){
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
