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

const resultDisplay = document.querySelector('.result');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const redbtns = document.querySelectorAll('.redbtns');

let current, result;
let input = [];

digits.forEach(digit => {
    digit.addEventListener('click', (e) => {
        // Removes starting zero
        if (current === undefined) {
            resultDisplay.textContent = '';
            current = '';
        }

        const digitClicked = e.target.textContent.trim();

        if (digitClicked >= '0' && digitClicked <= '9') {
            resultDisplay.textContent += digitClicked;
            current += e.target.textContent;
        } else {
            console.log('Non-digit button clicked:', e.target);
        }
    });
        
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        const operatorClicked = e.target.textContent.trim();

        if (operatorClicked === '-' && current === undefined) {
            resultDisplay.textContent = '';
            resultDisplay.textContent = operatorClicked;
        }

        // Prevents operator from being first input except '-'
        if (current === undefined) return;
        
        if (operatorClicked === '=') {
            input.push(current);
            // Clear the display 
            resultDisplay.textContent = '';
            input.push(operatorClicked);
            console.log(input);
            resultDisplay.textContent = `${calculate(input)}`;
            // Prevents = from being pressed again
            current = undefined;
            return;
        }

        const lastChar = resultDisplay.textContent.charAt(resultDisplay.textContent.length - 2);

        // Prevents consecutive operators from being displayed
        if (['+', '-', '×', '÷', '='].includes(lastChar)) {
            return;
        } else {
            resultDisplay.textContent += ` ${operatorClicked} `;
        }

        if (current !== '') input.push(current);
        
        const lastElem = input[input.length - 1];

        // Prevents consecutive operators from being pushed
        if (['+', '-', '×', '÷', '='].includes(lastElem)) {
            return;
        } else {
            input.push(operatorClicked);
            current = '';
            console.log(input);
        }
    });
});

let operatorDeleted = false;

redbtns.forEach(btn  => {
    btn.addEventListener('click', (e) => {
        if (e.target.textContent.trim() === 'Clear') {
            resultDisplay.textContent = '0';
            current = undefined;
            input.length = 0;
        } else {
            // Prevents deletion of nothing
             if (current !== undefined) {
                console.log(`This is current: ${current}`);
                //Deleting operator
                if (current === '') {
                    const lastItem = input.pop();
                    current = input.pop(); 
                    resultDisplay.textContent = input.join(' ');
                    if (current !== undefined) resultDisplay.textContent += ` ${current}`;
                    operatorDeleted = true;
                } else {
                    // Deleting digit from current number
                    current = current.slice(0, -1);

                    if (input.length > 0) {
                        resultDisplay.textContent = input.join(' ');
                        if (current.length > 0) {
                            resultDisplay.textContent += ` ${current}`;
                        }
                    } else {
                        resultDisplay.textContent = current || '';
                    }
                }                
            }
        }
    });
});

function calculate(arr) {
    let i = 0;

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
};