const generateNumbers = (number) => {
    let numberArray = [];
    for (let index = 0; index < number; index++) {
        numberArray.push(index + 1);
    }
    return numberArray;
}

export default generateNumbers;