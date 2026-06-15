let firstNumber = "";
let operator = "";
let secondNumber = "";

// If finish inputing first number
let doneFirstInput = false;

//Collection of numbers inputted 
let firstNumArray = [];


const buttonContainer = document.getElementById("button-container");

// Gets the number input (from buttons)
buttonContainer.addEventListener('mousedown', (event) => {
    const numberButton = event.target.closest('.number');

    if (!numberButton) return;

    const numberVal = numberButton.dataset.val;

    numberInput(numberVal);
})

// Get the operation used



function numberInput(num){
    firstNumArray.push(num);
    firstNumber = firstNumArray.join('')
    console.log(firstNumber)
}

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
