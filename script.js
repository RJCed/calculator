const buttonContainer = document.getElementById("button-container");

// Gets the number input (from buttons)
buttonContainer.addEventListener('mousedown', (event) => {
    const numberButton = event.target.closest('.number');

    if (!numberButton) return;

    const numberVal = numberButton.dataset.val;

    numberInput(numberVal);
})

function numberInput(num){
    console.log(typeof num);
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
