
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

let currentNumberSequence = "";
let expressionHasOperator = false;
let expressionArray = []
let windowShowingAnswer = false;
let termHasDecimal = false;

// clearWindowAndVars();
// resetGlobalVars();

// ------------------------------
// Functions
// ------------------------------

function resetGlobalVars(){
  currentNumberSequence = "";
  expressionHasOperator = false;
  expressionArray = [];
  windowShowingAnswer = false;
  termHasDecimal = false;
}

function clearWindowAndVars(){
  document.getElementById("displayWindow").textContent = ""
  resetGlobalVars();
}

function getNumContent(){
  if(windowShowingAnswer){
    // Only allow numbers if display window is *not* showing answer of an expression
    return;
  } else {
    let content = this.textContent;
    updateDisplayWindow(content, "number");
    updateNumberSequnce(content);
    updateExpressionArray(currentNumberSequence, "number");
  }
}

function getDecimalContent(){
  if(windowShowingAnswer){
    // Only allow numbers if display window is *not* showing answer of an expression
    return;
  } else if(termHasDecimal == true){
    return;
  } else {
    let content = this.textContent;
    updateDisplayWindow(content, "number");
    updateNumberSequnce(content);
    termHasDecimal = true;
  }
}

function getOperatorContent(){
  // If expression array has 3 elements, force evaluation of expression
  if(expressionArray.length == 3){
    evaluateExpression();
  } else if(expressionArray.length > 3){
    alert("Warning: Expression Array has too many elements.");
  }

  // Only allow use of operators if appropriate
  if(expressionArray.length == 0){
    // No term(s) present in expression
    return;
  }else if(expressionArray.length == 2){
    // Expression already has operator
    return;
  }

  let operatorClicked = this.textContent;
  updateDisplayWindow(operatorClicked, "operator");

  switch(this.id) {
    case "additionBtn":
      updateExpressionArray("addition", "operator");
      break;
    case "subtractionBtn":
      updateExpressionArray("subtraction", "operator");
      break;
    case "multiplicationBtn":
      updateExpressionArray("multiplication", "operator");
      break;
    case "divisionBtn":
      updateExpressionArray("division", "operator");
      break;
  }

  // Once operator entered, display window no longer showing just answer
  windowShowingAnswer = false;

  // Change operator boolean to true
  expressionHasOperator = true;

  // Set current number sequence as blank
  currentNumberSequence = "";

  // Change decimal boolean to false
  termHasDecimal = false;
}

function updateDisplayWindow(content, type){
  let displayWindow = document.getElementById("displayWindow");
  
  if(type == "number" || type == "operator"){
    displayWindow.textContent = displayWindow.textContent + content;
  } else if(type == "answer"){
    displayWindow.textContent = content;
    // Set display window answer boolean to true
    windowShowingAnswer = true;
  }
}

function updateNumberSequnce(num){
  currentNumberSequence = currentNumberSequence + num;
}

function updateExpressionArray(element, type){ 
  if(type == "number" && expressionHasOperator == false){
    // First term (first element) in expression array
    if(termHasDecimal == true){
      expressionArray[0] = parseFloat(currentNumberSequence);
    }else{
      expressionArray[0] = parseInt(currentNumberSequence);
    }
  } else if(type == "number" && expressionHasOperator == true) {
    // Second term (third element) in expression array
    if(termHasDecimal == true){
      expressionArray[2] = parseFloat(currentNumberSequence);
    }else{
      expressionArray[2] = parseInt(currentNumberSequence);
    }
  } else if(type == "operator"){
    // Operator is always second element in expression array
    expressionArray[1] = element;
  }
}

function evaluateExpression(){
  // Only evaluate expression if array has 3 elements
  if(expressionArray.length < 3){
    return;
  }

  // Check for division by zero
  if(expressionArray[1] == "division" && expressionArray[2]===0){
    snarkyComment();
    return;
  }

  // Pull numbers and operator from left-side of expression array
  let term1 = expressionArray.shift();
  let operator = expressionArray.shift();
  let term2 = expressionArray.shift();

  // Evaluate expression; append answer to left-side of expression array
  let answer = operate(operator, term1, term2);
  expressionArray.unshift(answer);

  // Show expression answer in dispay window
  updateDisplayWindow(expressionArray[0], "answer");

  // Set current number sequence as blank
  currentNumberSequence = "";

  // Set operator boolean to false
  expressionHasOperator = false;

  // Change decimal boolean to false
  termHasDecimal = false;
}

// ------------------------------
// Snarky Comments
// ------------------------------

function snarkyComment(){
  // Update as more snark is obtained
  let totalSnark = 2;
  let randomSnark = Math.ceil(Math.random() * totalSnark);
  
  let snark = "";
  switch(randomSnark){
    case 1:
      snark = "Why would you hurt me?";
      break;
    case 2:
      snark = "Fine. No more zero button!";
      break;
  }
  
  resetGlobalVars();

  // Release the snark
  updateDisplayWindow(snark,"answer"); 
}

// ------------------------------
// Listeners
// ------------------------------

// Clear
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearWindowAndVars);

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

// Decimal
let decimalBtn = document.getElementById("decimalBtn")
decimalBtn.addEventListener("click", getDecimalContent)

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


