const smallDisplay = document.querySelector(".small-display");
const mainDisplay = document.querySelector(".main-display");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const sum = document.querySelector(".sum");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");
const switchOperator = document.querySelector(".switch");

// ARRAYS
const operatorArray = ["/", "x", "-", "+", "%"];
let storeNumebrs = [];
// VARIABLES
let firstNumbers = "";
let chousenOperator;
let lastNumbers = "";

// FUNCTIONS
const calc = function (opr) {
  if (opr === "%") return (firstNumbers / 100) * lastNumbers;
  if (opr === "/") return firstNumbers / lastNumbers;
  if (opr === "x") return firstNumbers * lastNumbers;
  if (opr === "-") return firstNumbers - lastNumbers;
  if (opr === "+") return firstNumbers + lastNumbers;
};
const display = (e) => (e.innerHTML = "");

const storeNumDisplay = (e) =>
  (e.innerHTML = storeNumebrs
    .join("")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","));

const operatorCalc = function (index) {
  storeNumebrs = [];
  chousenOperator = operatorArray[index];
  smallDisplay.innerHTML = `${firstNumbers.toLocaleString(
    "en-US"
  )} ${chousenOperator}`;
  display(mainDisplay);
};

// EVENTS
numbers.forEach((x, i) => {
  x.addEventListener("click", () => {
    if (x.innerHTML === ".") {
      test = storeNumebrs.includes(".");
      if (!test) {
        if (storeNumebrs.length <= 8) storeNumebrs.push(".");
      }
    } else {
      if (storeNumebrs.length <= 8) storeNumebrs.push(numbers[i].innerHTML);
    }
    storeNumDisplay(mainDisplay);
  });
});

operators.forEach((x, i) => {
  x.addEventListener("click", () => {
    if (firstNumbers === "") {
      firstNumbers = +storeNumebrs.join("");
      operatorCalc(i);
    } else {
      lastNumbers = +storeNumebrs.join("");
      if (mainDisplay.innerHTML !== "" && mainDisplay.innerHTML !== "-")
        firstNumbers = calc(chousenOperator);
      operatorCalc(i);
    }
  });
});

sum.addEventListener("click", () => {
  if (storeNumebrs.length > 0) {
    lastNumbers = +storeNumebrs.join("");
    storeNumebrs = [];
    mainDisplay.innerHTML = calc(chousenOperator).toLocaleString("en-US");
    firstNumbers = calc(chousenOperator);
    display(smallDisplay);
  }
});

clearBtn.addEventListener("click", () => {
  storeNumebrs = [];
  firstNumbers = "";
  chousenOperator = "";
  lastNumbers = "";
  display(smallDisplay);
  display(mainDisplay);
});

delBtn.addEventListener("click", () => {
  storeNumebrs.pop();
  storeNumDisplay(mainDisplay);
});

switchOperator.addEventListener("click", () => {
  storeNumebrs[0] !== "-" ? storeNumebrs.unshift("-") : storeNumebrs.shift();
  storeNumDisplay(mainDisplay);
});
