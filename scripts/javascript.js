
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

let expressionArray = []
let currentNumberSequence = "";
let expressionHasOperator = false;
let termHasDecimal = false;
let windowShowingAnswer = false;

// ------------------------------
// Functions
// ------------------------------

function resetGlobalVars(){
  expressionArray = [];
  currentNumberSequence = "";
  expressionHasOperator = false;
  termHasDecimal = false;
  windowShowingAnswer = false;
}

function clearWindowAndVars(){
  document.getElementById("historyWindow").textContent = ""
  document.getElementById("displayWindow").textContent = ""
  resetGlobalVars();
}

function getNumContent(numElement){
  if(windowShowingAnswer){
    // If window is showing answer upon btn push, clear all and continue with user input
    clearWindowAndVars();
  } 

  // Check if keyboard or click input
  if(this.textContent != undefined){
    numElement = this;
  }

  let content = numElement.textContent;

  updateDisplayWindow(content, "number");
  updateNumberSequnce(content);
  updateExpressionArray(currentNumberSequence, "number");
}

function getDecimalContent(dotElement){
  if(windowShowingAnswer){
    // If window is showing answer upon btn push, clear all and continue with user input
    clearWindowAndVars();
  }

  if(termHasDecimal == true){
    return;
  }

  // Check if keyboard or click input
  if(this.textContent != undefined){
    dotElement = this;
  }

  let content = dotElement.textContent;
  updateDisplayWindow(content, "number");
  updateNumberSequnce(content);
  termHasDecimal = true;
}

function getOperatorContent(opElement){
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

  // Check if keyboard or click input
  if(this.textContent != undefined){
    opElement = this;
  }

  let operatorClicked = opElement.textContent;
  updateDisplayWindow(operatorClicked, "operator");

  switch(opElement.id) {
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
    // No operator ==> Update first element (first term) in expression array
    expressionArray[0] = currentNumberSequence;
  } else if(type == "number" && expressionHasOperator == true) {
    // Operator ==> Update third element (second term) in expression array
    expressionArray[2] = currentNumberSequence;
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
  if(expressionArray[1] == "division" && expressionArray[2]==="0"){
    snarkyComment();
    return;
  }

  // Pull numbers and operator from left-side of expression array
  let term1 = expressionArray[0];
  let operator = expressionArray[1];
  let term2 = expressionArray[2];

  // Determine whether terms have decimal ==> parse as Int or Float
  let term1n = (term1.indexOf(".") >= 0) ? parseFloat(term1) : parseInt(term1);
  let term2n = (term2.indexOf(".") >= 0) ? parseFloat(term2) : parseInt(term2);

  // Evaluate expression; append answer to left-side of expression array
  let answer = operate(operator, term1n, term2n);

  // Maximum number of decimal places is 8
  answer = parseFloat(answer.toFixed(8));

  // Show expression evaluated in history window
  document.getElementById("historyWindow").textContent = document.getElementById("displayWindow").textContent + "=";

  // Append answer back on array; convert back to string
  expressionArray = ["" + answer];

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
// Delete Button Functions
// ------------------------------

function deleteCheck(){

  // If window is showing answer to an expression, delete btn should remove entire value
  if(windowShowingAnswer){
    clearWindowAndVars()
    return;
  }

  if(expressionArray.length == 0){
    return;
  }
  
  lastArrayItem = expressionArray.pop();
  (expressionArray.length == 1) ? deleteOperator() : deleteNumber(lastArrayItem);
}

function deleteOperator(){
  let temp = document.getElementById("displayWindow").textContent;
  // Last character in string will be operation symbol (eg, +, -); remove it
  let newString = temp.slice(0,(temp.length-1));
  
  // Update window with modified string
  document.getElementById("displayWindow").textContent = newString;

  // Update operator boolean
  expressionHasOperator = false;

  // Operator removed, which means window is showing term1
  // If user wants to append more numbers to term1,
  // currentNumberSequence needs to be populated (it was set to blank upon operator btn press)
  updateNumberSequnce(newString);

  return;
}

function deleteNumber(lastArrayItem){
  // Check if char to be removed is decimal; update boolean if so
  let lastChar = lastArrayItem.slice(-1);
  
  if(lastChar == "."){
    termHasDecimal = false;
  }

  // If string for term1 is length 1 (ie, a single number), just clear window
  if(expressionArray.length == 0 && lastArrayItem.length == 1){
    clearWindowAndVars()
    return;
  }

  let newString = lastArrayItem.slice(0,(lastArrayItem.length-1));

  // Update window with modified string
  let windowText = document.getElementById("displayWindow").textContent
  windowText = windowText.slice(0,(windowText.length-1))
  document.getElementById("displayWindow").textContent = windowText;

  // Update number sequence
  currentNumberSequence = newString;

  // Update expression array (item was popped off)
  updateExpressionArray(newString, "number");
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
// Keyboard Inputs
// ------------------------------

window.addEventListener('keydown', keyboardInput);

function keyboardInput(e){
  // console.log("keyCode: " + e.keyCode);

  const btnKey = document.querySelector(`button[data-key="${e.keyCode}"]`);
  const inputKey = document.querySelector(`input[data-key="${e.keyCode}"]`);

  // Numbers on keypad
  if(e.keyCode >= 96 && e.keyCode <= 105){
    getNumContent(btnKey);
  };

  // Operators (107 = addition, 109 = subtraction, 106 = mult, 111 = division)
  let opVals = [106,107,109,111];
  if(opVals.includes(e.keyCode)){
    getOperatorContent(btnKey);
  }

  // Decimal
  if(e.keyCode == 110){
    getDecimalContent(btnKey);
  }

  // Keypad enter (-> Equal sign)
  if(e.keyCode == 13){
    evaluateExpression();
  }

  // Clear (delete (Del) key -> 46)
  if(e.keyCode == 46){
    clearWindowAndVars();
  }

  // Backspace (key -> 8)
  if(e.keyCode == 8){
    deleteCheck();
  }

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

// Delete button
let deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", deleteCheck);
