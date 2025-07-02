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