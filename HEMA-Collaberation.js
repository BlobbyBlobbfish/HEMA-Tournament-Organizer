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