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

        // Checks greater then 11 (screen size) and if it has a decimal, if so it will round it
        if (String(finalAnswer).split('').includes('.') && String(finalAnswer).length > 10){
            let rounded = Math.round(finalAnswer * 100) / 100
            finalAnswer = rounded;

            console.log('Rounded Final Answer')
        }

        display.textContent = finalAnswer;
        
        // Checks if finalAnswer is still greater than 11 digits -> Console.log("Too Big!")
        if (String(finalAnswer).length > 10){
            display.textContent = "Too Big!"
        }

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
    } else if (doneFirstInput && doneOperation){ //Second Value
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
        case "/":
        case "divide":
            usedOperator = "÷";
            changeDisplay("÷");
            return "/";
        case "*":
        case "multiply":
            usedOperator = "×";
            changeDisplay("×");
            return "*";
        case "-":
        case "subtract":
            usedOperator = "-";
            changeDisplay("-");
            return "-";
        case "+":
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
            if (secondNumber !== '' && !doneAnswer) {
                console.log("Make Negative Second Number")
                secondNumber = String(secondNumber * (-1));
                secondNumArray = secondNumber.split('');
                changeDisplay(usedOperator);
            } else if (secondNumber === '' && operator === '' && firstNumber !== ''){
                doneOperation = false;
                doneFirstInput = false;
                
                console.log("Make Negative First Number")
                firstNumber = String(firstNumber * (-1));
                firstNumArray = firstNumber.split('');
                changeDisplay(usedOperator);
            }
    }
    // FOR DEL: You check if secondNumber is empthy and then operator, then first num, untill all empthy;
}




const toEqual = function(){
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
}


const toOperate = function(operatorButton){
    doneOperation = true;
    const operatorVal = operatorButton.dataset.action;
    operator = operatorInput(operatorVal);
    console.log(operator)
}







// Get keyboard input
window.addEventListener('keydown', (event) => {
    const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const validOpCode = ["+", "-", "/", "*"];
    const specialCase = ["Backspace", "Enter"];

    
    
    if ((validNumbers.includes(event.key) || validOpCode.includes(event.key)) || specialCase.includes(event.key)){
        event.preventDefault();
        console.log('KeyPress')
    }
    

    // For Valid Numbers (event.key)
    if (validNumbers.includes(event.key)) {
        const numberKey = event.key;
        numberInput(numberKey);
    }
    

    // For ValidOpCode (event.key)
    if (validOpCode.includes(event.key) && !doneFirstInput && !doneOperation && firstNumber !== '') {
        doneFirstInput = true;
        doneOperation = true;
        
        const operatorkey = event.key;
        operator = operatorInput(operatorkey);
        console.log(operator)
    } else if (validOpCode.includes(event.key) && !doneOperation && doneFirstInput){ // This is for the second iteration
        doneOperation = true;
        const operatorkey = event.key;
        operator = operatorInput(operatorkey);
        console.log(operator)
    }


    if (specialCase.includes(event.key) && doneFirstInput && secondNumber !== '' && doneOperation){
        toEqual();           
    }


})



// Gets the input (from buttons)
const buttonContainer = document.getElementById("button-container");
buttonContainer.addEventListener('mousedown', (event) => {
    const numberButton = event.target.closest('.number');
    const operatorButton = event.target.closest('.operator');
    const equal = event.target.closest('#equal');
    const special = event.target.closest('.special');

    if (numberButton) {
        const numberVal = numberButton.dataset.val;
        numberInput(numberVal);
    } else if (operatorButton && !doneFirstInput && !doneOperation && firstNumber !== '') {
        doneFirstInput = true;
        toOperate(operatorButton);
    } else if (operatorButton && !doneOperation && doneFirstInput){ // This is for the second iteration
        toOperate(operatorButton);
    }else if (equal && doneFirstInput && secondNumber !== '' && doneOperation){
        toEqual();

    } else if (special && special !== "period"){
        const specialVal = special.dataset.action;
        specialInput(specialVal);
    }
})


