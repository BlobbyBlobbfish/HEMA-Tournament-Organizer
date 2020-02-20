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
