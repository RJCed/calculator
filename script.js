let firstNumber = "";
let operator = "";
let secondNumber = "";

// If finish inputing first number
let doneFirstInput = false;

//Collection of numbers inputted 
let firstNumArray = [];



// Solve the given input
const solve = function(firstNum, opt, secondNum){
    switch (opt){
        case "/":
            return firstNum / secondNum;
        case "*":
            return firstNum * secondNum;
        case "-":
            return firstNum - secondNum;
        case "+":
            return firstNum + secondNum;
        case "%":
            return (firstNum / secondNum) * 100;
        default:
            console.log("ERROR with solve()")
            return "ERROR";
    }
}

//Get the number inputed
const numberInput = function(num){
    firstNumArray.push(num);
    firstNumber = firstNumArray.join('')
    console.log(firstNumber)
}


// Gets the input (from buttons)
const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener('mousedown', (event) => {
    const numberButton = event.target.closest('.number');
    const operatorButton = event.target.closest('.operator');
    

    if (numberButton) {
        const numberVal = numberButton.dataset.val;
        numberInput(numberVal);
    } else if (operatorButton && firstNumber !== '') {
        doneFirstInput = true;
        const operatorVal = operatorButton.dataset.action;
        operator = operatorVal;
    }
})
