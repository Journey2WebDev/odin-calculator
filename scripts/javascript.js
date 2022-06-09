
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
    case "subtraction":
      return subtraction(a,b);
    case "multiplication":
      return multiplication(a,b);
    case "division":
      return division(a,b);
  }
}

// ------------------------------
// Buttons: Numpad
// ------------------------------



