const display = document.getElementById("display");
const numbersBtn = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear-btn");

let inputOne = "";
let inputTwo = "";
let operator = "";
let result = 0;
let isFirstInput = true;

display.innerText = result;

numbersBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();
    if (!isNaN(value) || value === ".") {
      if (
        value === "." &&
        (isFirstInput ? inputOne.includes(".") : inputTwo.includes("."))
      ) {
        return;
      }
      getInputNumber(value);
    }
  });
});
operatorBtns.forEach((selectedOperator) => {
  selectedOperator.addEventListener("click", () => {
    if (inputOne && !inputTwo) {
      operator = selectedOperator.textContent.trim();
      isFirstInput = false;
    }
    selectedOperator.classList.add("clicked");
  });
});
equalsBtn.addEventListener("click", () => {
  if (inputOne && inputTwo && operator) {
    result = operate(parseFloat(inputOne), parseFloat(inputTwo), operator);
    console.log(result);
    display.innerText = formatNumber(result);
    reset();
  }
});
clearBtn.addEventListener("click", () => {
  reset();
  display.innerText = result;
});
const getInputNumber = (val) => {
  if (isFirstInput) {
    inputOne += val;
    display.innerText = inputOne;
  } else {
    inputTwo += val;
    display.innerText = inputTwo;
  }
  console.log(inputOne, inputTwo);
};
const formatNumber = (num) => {
  if (typeof num === "number" && !Number.isInteger(num)) {
    return num.toFixed(6);
  }
  return num;
};
const add = (num1, num2) => {
  return num1 + num2;
};
const subtract = (num1, num2) => {
  return num1 - num2;
};
const multiply = (num1, num2) => {
  return num1 * num2;
};
const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return 0;
  }
};

const reset = () => {
  result = 0;
  inputOne = "";
  inputTwo = "";
  operator = "";
  isFirstInput = true;
  operatorBtns.forEach((elem) => {
    elem.classList.remove("clicked");
  });
};
