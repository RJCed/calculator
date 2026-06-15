let firstNumber = '';
let operator = '';
let usedOperator = '';
let secondNumber = '';

// If finish inputing values
let doneFirstInput = false;
let doneOperation = false;
let doneAnswer = false; //set to true after click equals

//Collection of numbers inputted 
let firstNumArray = [];
let secondNumArray = [];

let finalAnswer = '';



// reset everything (except final answer)
const reset = function(){
    firstNumber = '';
    operator = '';
    usedOperator = '';
    secondNumber = '';

    doneFirstInput = false;
    doneOperation = false;
    doneAnswer = false;

    firstNumArray = [];
    secondNumArray = [];

    finalAnswer = '';

    display.textContent = "|";
}


// Get Display output
const display = document.getElementById("display");
display.textContent = "|";

//Change display function
const changeDisplay = function(input){

    if (doneFirstInput === false){
        display.textContent = `${firstNumber}`;
        console.log("First Number Display Change")
    } else if (secondNumber === ''){
        display.textContent = `${firstNumber} ${input}`;
        console.log(`Operator Display Change ${input}`)
    } else if (doneAnswer === false && secondNumber !== ''){
        display.textContent = `${firstNumber} ${input} ${secondNumber}`;
        console.log(`Second Number Display Change ${input}`)
    } else if (doneAnswer){
        display.textContent = finalAnswer;
        console.log("Final Answer Display Change")
    }  
}


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
    if (doneFirstInput === false){
        firstNumArray.push(num);
        firstNumber = firstNumArray.join('')
        changeDisplay();
        console.log(firstNumber)
    } else if (doneFirstInput){
        secondNumArray.push(num);
        secondNumber = secondNumArray.join('')
        changeDisplay(usedOperator);
        console.log(secondNumber);
    }
    
}


// Converts word into symbols for operation ex. "add" -> "+"  (this is also needed for changing this display)
const operatorInput = function(operator){
    switch (operator){
        case "divide":
            usedOperator = "÷";
            changeDisplay("÷");
            return "/";
        case "multiply":
            usedOperator = "×";
            changeDisplay("×");
            return "*";
        case "subtract":
            usedOperator = "-";
            changeDisplay("-");
            return "-";
        case "add":
            usedOperator = "+";
            changeDisplay("+");
            return "+";
        case "percent":
            usedOperator = "%";
            changeDisplay("%");
            return "%";
        default:
            console.log("ERROR with operatorInput()")
            return "ERROR";
    }
}

const specialInput = function(input){
    switch (input){
        case "clear":
            reset();
            console.log("Clear")
            break;
    }
}

// Gets the input (from buttons) ... also changes doneFirstInput if operator button is click
const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener('mousedown', (event) => {
    const numberButton = event.target.closest('.number');
    const operatorButton = event.target.closest('.operator');
    const equal = event.target.closest('#equal');
    const special = event.target.closest('.special');

    if (numberButton) {
        const numberVal = numberButton.dataset.val;
        numberInput(numberVal);
    } else if (operatorButton && !doneFirstInput && !doneOperation) {
        doneOperation = true;
        doneFirstInput = true;
        const operatorVal = operatorButton.dataset.action;
        operator = operatorInput(operatorVal);
        console.log(operator)
    } else if (operatorButton && !doneOperation){
        doneOperation = true;
        firstNumber = finalAnswer;
        const operatorVal = operatorButton.dataset.action;
        operator = operatorInput(operatorVal);
    }else if (equal && doneFirstInput && secondNumber !== '' && doneOperation){
        finalAnswer = solve(Number(firstNumber), operator, Number(secondNumber));
        doneAnswer = true;
        changeDisplay();
        console.log(finalAnswer);
        
        //This is for the next interation
        secondNumber = '';
        secondNumArray = [];
        doneOperation = false;
        doneAnswer = false;
    } else if (special){
        const specialVal = special.dataset.action;
        specialInput(specialVal);
    }
})
