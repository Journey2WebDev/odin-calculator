
// ------------------------------
// Basic Operator Functions
// ------------------------------

function addition(a,b){
  return a + b;
}

function subtraction(a,b){
  return a - b;
}

function multiplication(a,b){
  return a * b;
}

function division(a,b){
  return a / b;
}

function operate(operator, a, b){
  switch(operator) {
    case "addition":
      return addition(a,b);
      break;
    case "subtraction":
      return subtraction(a,b);
      break;
    case "multiplication":
      return multiplication(a,b);
      break;
    case "division":
      return division(a,b);
      break;
  }
}

// ------------------------------
// Global variables & Initial Conditions
// ------------------------------

clearDisplay();

currentNumberSequence = "";
numberArray = [];
operatorArray = [];


// ------------------------------
// Functions
// ------------------------------

function clearDisplay(){
  document.getElementById("displayField").textContent = ""
  currentNumberSequence = "";
  numberArray = [];
  operatorArray = [];
}

function getNumContent(){
  let numberClicked = this.textContent;
  updateDisplayField(numberClicked);
  updateNumberSequnce(numberClicked);
}

function getOperatorContent(){
  let operatorClicked = this.textContent;
  updateDisplayField(operatorClicked);

  updateNumberArray();

  switch(this.id) {
    case "additionBtn":
      updateOperatorArray("addition");
      break;
    case "subtractionBtn":
      updateOperatorArray("subtraction");
      break;
    case "multiplicationBtn":
      updateOperatorArray("multiplication");
      break;
    case "divisionBtn":
      updateOperatorArray("division");
      break;
  }

}

function updateDisplayField(content){
  let displayField = document.getElementById("displayField");
  displayField.textContent = displayField.textContent + content;  
}

function updateNumberSequnce(num){
  currentNumberSequence = currentNumberSequence + num;
}

function updateNumberArray(){
  numberArray.push(parseInt(currentNumberSequence));
  currentNumberSequence = "";
}

function updateOperatorArray(op){
  operatorArray.push(op);
}


function evaluateExpression(){
  updateNumberArray();

  let total = 0;

  while(operatorArray.length != 0){
    // console.log(operatorArray);
    // console.log(numberArray);
    // console.log("");
    total += operate(operatorArray.shift(), numberArray.shift(), numberArray.shift())
  }

//   console.log(operatorArray);
//   console.log(numberArray);
  console.log(total);
}


// ------------------------------
// Listeners
// ------------------------------

// Clear
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearDisplay);

// Numbers
let num0 = document.getElementById("number0Btn");
num0.addEventListener("click", getNumContent);

let num1 = document.getElementById("number1Btn");
num1.addEventListener("click", getNumContent);

let num2 = document.getElementById("number2Btn");
num2.addEventListener("click", getNumContent);

let num3 = document.getElementById("number3Btn");
num3.addEventListener("click", getNumContent);

let num4 = document.getElementById("number4Btn");
num4.addEventListener("click", getNumContent);

let num5 = document.getElementById("number5Btn");
num5.addEventListener("click", getNumContent);

let num6 = document.getElementById("number6Btn");
num6.addEventListener("click", getNumContent);

let num7 = document.getElementById("number7Btn");
num7.addEventListener("click", getNumContent);

let num8 = document.getElementById("number8Btn");
num8.addEventListener("click", getNumContent);

let num9 = document.getElementById("number9Btn");
num9.addEventListener("click", getNumContent);

// Operators
let additionBtn = document.getElementById("additionBtn");
additionBtn.addEventListener("click", getOperatorContent);

let subtractionBtn = document.getElementById("subtractionBtn");
subtractionBtn.addEventListener("click", getOperatorContent);

let multiplicationBtn = document.getElementById("multiplicationBtn");
multiplicationBtn.addEventListener("click", getOperatorContent);

let divisionBtn = document.getElementById("divisionBtn");
divisionBtn.addEventListener("click", getOperatorContent);

// Evaluation (equal sign)
let equalBtn = document.getElementById("equalBtn");
equalBtn.addEventListener("click", evaluateExpression);




