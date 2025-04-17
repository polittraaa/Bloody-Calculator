const display = document.getElementById('display');
const path = document.getElementById('path');
let current = '';
let memory = 0;
let calculated = false;
const memoryIndicator = document.getElementById('memory-indicator');

const calc = document.getElementById('basic-calculator');
const conv = document.getElementById('convertor');

function changeView(){
  calc.classList.toggle('visible');
  conv.classList.toggle('visible');
}

function endsWithOperator(str, op) {
  const escaped = op.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  const regex = new RegExp(escaped + '$');
  return regex.test(str);
}

function appendToDisplay(input) {
  const operators = ['+', '-', '*', '/', '%'];

  if (input === '0' || calculated || display.value == 0) {
    calculated = false;
    display.value = input;
    path.value = input;
  } else if (operators.includes(input)) {
    display.value = input;
    path.value += input;
  } else if (operators.includes(display.value)) {
    display.value = input;
    path.value += input;
  } else {
    display.value += input;
    path.value += input;
  }
}

function clearDisplay(){
  display.value = "0";
  path.value = "";
}
function calculate() {
  try {
    const expression = preprocessExpression(path.value);
    const result = eval(expression);
    display.value = result;
    path.value += "=" + result;
    calculated = true;
    current = result;
  } catch (error) {
    display.value = "Error";
    console.error("Calculation error:", error);
  }
}
function preprocessExpression(expr) {
  expr = expr.replace(/(\d+)!/g, (match, number) => {
    let n = parseInt(number);
    if (n < 0) return 'NaN';
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  });

  expr = expr.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

  expr = expr.replace(/(\d+(?:\.\d+)?|\([^()]+\))\^(\d+(?:\.\d+)?|\([^()]+\))/g, 'Math.pow($1,$2)');

  return expr;
}

function pers() {
  if (!endsWithOperator(path.value, '%')) {
    path.value += '%';
  }
  current = Number(display.value) * 0.01;
  display.value = current;
}

function sign() {
  current = parseFloat(display.value) * -1;
  display.value = current;
  if (!path.value.includes('*-1')) {
    path.value = `(${path.value})*-1`;
  }
}

function pi() {
  const piVal = Math.PI;
  const piStr = piVal.toString();
  if (!endsWithOperator(path.value, piStr)) {
    if (display.value === '0' || calculated) {
      display.value = piStr;
      path.value = piStr;
      calculated = false;
    } else {
      display.value += piStr;
      path.value += piStr;
    }
  }
}

function sqrt() {
  const val = parseFloat(display.value);
  if (isNaN(val)) return;

  const sqrtStr = `sqrt(${val})`;

  display.value = `√(${val})`;

  if (calculated || path.value === '' || path.value === display.value) {
    path.value = sqrtStr;
  } else {
    const regex = new RegExp(`${val}$`);
    path.value = path.value.replace(regex, '') + sqrtStr;
  }

  calculated = false;
}


function factorial() {
  const n = parseInt(display.value);
  if (n < 0) {
    display.value = 'Error';
    return;
  }
  if (!endsWithOperator(path.value, '!')) {
    path.value += "!";
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  display.value = result;
}

function power() {
  if (!endsWithOperator(path.value, '^')) {
    path.value += '^';
    display.value = '^';
  }
}

// Memory Functions

function updateMemoryIndicator() {
  memoryIndicator.style.visibility = memory !== 0 ? 'visible' : 'hidden';
}

function memoryRecall() {
  display.value = memory;
  path.value += memory;
}

function memoryClear() {
  memory = 0;
  updateMemoryIndicator();
}

function memoryAdd() {
  const currentValue = parseFloat(display.value);
  if (!isNaN(currentValue)) {
    memory += currentValue;
  }
  if (memoryIndicator.style.visibility === 'hidden') {
    updateMemoryIndicator();
  }
}

function memorySubtract() {
  const currentValue = parseFloat(display.value);
  if (!isNaN(currentValue)) {
    memory -= currentValue;
  }
  if (memoryIndicator.style.visibility === 'hidden') {
    updateMemoryIndicator();
  }
}

function showMem() {
  alert("Memory: " + memory);
}
