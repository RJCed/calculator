const firstNumber = Number(prompt("Your First Number: "));
const operation = prompt("Operation: ");
const secondNumber = Number(prompt("Your Second Number: "));

console.log(typeof firstNumber + typeof operation + typeof secondNumber)
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
        default:
            return "ERROR";
    }
}

console.log(solve(firstNumber, operation, secondNumber))