let previousValue = '';
let currentValue = '';
let operator = '';

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector('.clear');
    let equal = document.querySelector('.equals');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousScreen = document.querySelector('.previous-screen');
    let currentScreen = document.querySelector('.current-screen');

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener('click', function(e){
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }));

    clear.addEventListener('click', function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = previousValue;
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener('click', function(){
        if(currentValue !== '' && previousValue !== ''){
            calculate();
            previousScreen.textContent = '';
            currentScreen.textContent = previousValue;
        }
    })

    decimal.addEventListener('click', function(){
        addDecimal();
        currentScreen.textContent = currentValue;
    })
})

function handleNumber(num){
    currentValue += num;
}

function handleOperator(op){
    operator += op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
        previousValue = Number(previousValue);
        currentValue = Number(currentValue);

        if(operator === "+"){
            previousValue += currentValue;
        }else if(operator === "-"){
            previousValue -= currentValue;
        }else if(operator === "X"){
            previousValue *= currentValue;
        }else if(operator === "/"){
            previousValue /= currentValue;
        }

        previousValue = roundNumber(previousValue);
        previousValue = previousValue.toString();
        currentValue = previousValue.toString();
        operator = '';
}

function roundNumber(num){
    return Math.round(num * 1000)/1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += ".";
    }
}