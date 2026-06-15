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
        display.textContent = `${firstNumber} ${usedOperator} ${secondNumber}`;
        console.log(`Second Number Display Change ${usedOperator}`)
    } else if (doneAnswer){
        display.textContent = finalAnswer;
        console.log("Final Answer Display Change")
    } else {
        display.textContent = "|";
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
    if (doneFirstInput === false){ // First Value
        doneAnswer = false;
        if (num === '.' && (firstNumArray.length === 0 || firstNumArray.includes("."))){ //Checks if period is imputted mulitiple times
            console.log("Already Have Period/Period Cannot be First value")
        } else {
            firstNumArray.push(num);
            firstNumber = firstNumArray.join('')
            changeDisplay();
            console.log(firstNumber)
        }
    } else if (doneFirstInput){ //Second Value
        if (num === '.' && (secondNumArray.length === 0 || secondNumArray.includes("."))){ //Checks if period is imputted mulitiple times
            console.log("Already Have Period/Period Cannot be First value")
        } else {
            secondNumArray.push(num);
            secondNumber = secondNumArray.join('')
            changeDisplay();
            console.log(secondNumber)
        }
    }
    
}


// Converts word into symbols for operation ex. "add" -> "+"  (this is also needed for changing this display)
const operatorInput = function(operator){
    doneAnswer = false;
    //usedOperator and changeDisplay both need to have the same value since they are both processed at different times
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
        case "clear": //CLEAR ALL (RESET)
            reset();
            console.log("Clear")
            break;
        
        case "del": //Delete Single Digit
            if (secondNumber !== '' && !doneAnswer){
                console.log(`Remove ${secondNumber[secondNumber.length - 1]}`)
                secondNumber = String(secondNumber).slice(0, -1);
                secondNumArray = secondNumber.split('');
                changeDisplay(usedOperator);
            } else if (secondNumber === '' && operator !== '' && !doneAnswer){
                console.log(`Remove ${operator}`)
                doneOperation = false;
                doneFirstInput = false;
                
                changeDisplay();
            } else if ((secondNumber === '' && operator === '' && firstNumber !== '') || doneAnswer){
                doneOperation = false;
                doneFirstInput = false;
                

                console.log(firstNumber[firstNumber.length - 1])
                console.log(`Remove ${firstNumber[firstNumber.length - 1]}`)
                firstNumber = String(firstNumber).slice(0, -1);
                firstNumArray = firstNumber.split('');
                changeDisplay(usedOperator);

                if(firstNumber === ''){
                    display.textContent = '|';
                    console.log("Nothing to remove, reset...")
                    reset();
                }
            } else {
                console.log("specialInput() Error")
            }
            break;
        
        case 'changeSign':
            console.log("YES")
    }
    // FOR DEL: You check if secondNumber is empthy and then operator, then first num, untill all empthy;
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
        const operatorVal = operatorButton.dataset.action;
        operator = operatorInput(operatorVal);
    }else if (equal && doneFirstInput && secondNumber !== '' && doneOperation){
        finalAnswer = solve(Number(firstNumber), operator, Number(secondNumber));
        doneAnswer = true;
        changeDisplay();
        console.log(finalAnswer);
        firstNumber = finalAnswer;
        

        //This is for the next interation
        secondNumber = '';
        secondNumArray = [];
        doneOperation = false;
        operator = '';
        
    } else if (special && special !== "period"){
        const specialVal = special.dataset.action;
        specialInput(specialVal);
    }
})
