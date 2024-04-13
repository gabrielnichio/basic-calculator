const numberButtons = document.querySelectorAll(".button");
const visor = document.querySelector(".visor");
const cleanButton = document.querySelector(".clean-button");
const delButton = document.querySelector(".del-button");
const resultButton = document.querySelector(".result-button");

let operation = ""
const operators = ['+', '-', 'x', '÷'];

function updateVisorContent(operation) {
    visor.textContent = operation;
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        operation += numberButton.textContent;
        updateVisorContent(operation)
    });
})


cleanButton.addEventListener("click", () => {
    operation = "";
    updateVisorContent(operation)
})

delButton.addEventListener("click", () => {
    operation = operation.substring(0, operation.length - 1)
    updateVisorContent(operation)
})

resultButton.addEventListener("click", () => {
    console.log("oi")

    if (!verifyDuplicatedOperators(operation)) {
        alert("Insert a valid operation");
        operation = "";
        updateVisorContent(operation);
        return;
    }

    const operationContent = getNumbersAndOperator(operation);

    const result = makeOperation(operationContent);

    updateVisorContent(result);

    operation = "";

})

function verifyDuplicatedOperators(op) {

    let operatorCount = 0;

    for (let i = 0; i < op.length; i++) {
        if (operators.includes(op[i])) {
            operatorCount++;

            if (operatorCount > 1 || (operatorCount === 1 && operators.includes(op[i + 1]))) {
                return false;
            }
        }
    }

    return operatorCount === 1;
}

function getNumbersAndOperator(operation) {
    let operatorIndex = -1;
    for (let i = 0; i < operation.length; i++) {
        if (operators.includes(operation[i])) {
            operatorIndex = i;
            break;
        }
    }
    if (operatorIndex === -1) {
        return null;
    }
    const firstNumber = parseFloat(operation.slice(0, operatorIndex));
    const operator = operation.charAt(operatorIndex);
    const secondNumber = parseFloat(operation.slice(operatorIndex + 1));

    return {
        firstNumber,
        operator,
        secondNumber
    };
}

function verifyNumbers(firstNumber, secondNumber){
    return Number(firstNumber) && Number(secondNumber);        
}

function makeOperation({ firstNumber, operator, secondNumber }){
    if(!verifyNumbers(firstNumber, secondNumber)){
        alert("Insert valid numbers");
        operation = ""
        updateVisorContent(operation);
        return
    }

    if(operator === '+'){
        return firstNumber + secondNumber;
    }
    if(operator === '-'){
        return firstNumber - secondNumber;
    }
    if(operator === 'x'){
        return firstNumber * secondNumber;
    }
    if(operator === '÷'){
        return firstNumber / secondNumber;
    }

}



