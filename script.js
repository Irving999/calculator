function add(...args) {
    return args.reduce((total, current) => total + current, 0);
}

function subtract(...args) {
    if (args.length === 0) return 0;
    return args.reduce((total, current) => total - current);
}

function multiply(...args) {
    if (args.length === 0) return 0;
    return args.reduce((total, current) => total * current);
}

function divide(...args) {
    if (args.length === 0) return 0;
    return args.reduce((total, current) => total / current);
}

function operate(operator, ...args) {
    switch(operator) {
        case '+':
            return add(...args);
        case '-':
            return subtract(...args);
        case '×':
            return multiply(...args);
        case '÷':
            return divide(...args);
        default:
            return 'Operation is not supported';
    }
}

const result = document.querySelector('.result');
const digits = document.querySelectorAll('.digit');

let current, lastElem;
let input = [];

digits.forEach(digit => {
    digit.addEventListener('click', (e) => {
        if (current === undefined) {
            result.textContent = '';
        }

        const digitClicked = e.target.textContent.trim();
        if (digitClicked >= '0' && digitClicked <= '9') {
            result.textContent += digitClicked;
            current = result.textContent;
        } else {
            console.log('Non-digit button clicked:', e.target);
        }
    });
        
});

const operators = document.querySelectorAll('.operator');

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        const operatorClicked = e.target.textContent.trim();

        // Prevents operator from being first input
        if (current === undefined) return;
        
        if (operatorClicked === '=') {
            input.push(current);
            // Clear the display 
            result.innerHTML = '';
            input.push(operatorClicked);
            console.log(input);
            result.textContent = `${calculate(input)}`;
            // Prevents = from being pressed again
            current = undefined;
            return;
        } 
        // Clear the
        result.innerHTML = '';

        if (current !== '') input.push(current);
        
        lastElem = input[input.length - 1];

        // Prevents consecutive operators from being pressed
        if (['+', '-', '×', '÷', '='].includes(lastElem)) return;
        
        input.push(operatorClicked);
        current = '';
        console.log(input);
    });
});

function calculate(arr) {
    let i = 0;
    let result;

    while (true) {
        if (arr[i] === '=') break;
        if (['×', '÷'].includes(arr[i])) {
            result = operate(arr[i], +arr[i - 1], +arr[i + 1]);
            arr.splice(i - 1, 3, result);
            i = 0;
        } else {
            i++;
        }
    }

    i = 0;

    while (true) {
        if (arr[i] === '=') break;
        if (['+', '-'].includes(arr[i])) {
            result = operate(arr[i], +arr[i - 1], +arr[i + 1]);
            arr.splice(i - 1, 3, result);
            i = 0;
        } else {
            i++;
        }
    }

    result = arr[i - 1];
    arr.length = 0;
    return result;
}