// displays
const smallDisplay = document.querySelector(".small-display");
const mainDisplay = document.querySelector(".main-display");
// numbers & opperator keys
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
// the power buttons
const sum = document.querySelector(".sum");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");
const switchOperator = document.querySelector(".switch");

// stores numbers clicked
let storeNumebrs = [];

// stores first numbers
let firstNumbers = "";
// stores the clicked operator
let chousenOperator;
// stores last numbers
let lastNumbers = "";

// performs calculations based on the opperator picked
const calc = function (opr) {
  if (opr === "%") return (firstNumbers / 100) * lastNumbers;
  if (opr === "÷") return firstNumbers / lastNumbers;
  if (opr === "x") return firstNumbers * lastNumbers;
  if (opr === "-") return firstNumbers - lastNumbers;
  if (opr === "+") return firstNumbers + lastNumbers;
};
// clears display
const display = (e) => (e.innerHTML = "");
// displays numbers
const storeNumDisplay = (e) =>
  // seperates the thousand with comma
  (e.innerHTML = storeNumebrs
    .join("")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","));
// assigns opperator
const operatorCalc = function (opp) {
  storeNumebrs = [];
  chousenOperator = opp;
  // displays number and operator on small display
  smallDisplay.innerHTML = `${firstNumbers.toLocaleString(
    "en-US"
  )} ${chousenOperator}`;
  display(mainDisplay);
};

// number click event
numbers.forEach((x) => {
  x.addEventListener("click", () => {
    if (x.innerHTML === ".") {
      // checks if the array includes decimal
      decimal = storeNumebrs.includes(".");
      if (!decimal) {
        // ensures theres space for the decimal
        if (storeNumebrs.length <= 8) storeNumebrs.push(".");
      }
    } else {
      // pushes the decimal is all condition are met
      if (storeNumebrs.length <= 8) storeNumebrs.push(x.innerHTML);
    }
    // trigers the display on each click event on the numbers
    storeNumDisplay(mainDisplay);
  });
});
// operator click event
operators.forEach((x) => {
  x.addEventListener("click", function () {
    if (firstNumbers === "") {
      // stores the first number
      firstNumbers = +storeNumebrs.join("");
      // assigns operator clicked
      operatorCalc(this.innerHTML);
    } else {
      // stores the last number
      lastNumbers = +storeNumebrs.join("");
      /* it stops from re-assigning the first number variable
      if we havent entered any number*/
      if (mainDisplay.innerHTML !== "" && mainDisplay.innerHTML !== "-")
        firstNumbers = calc(chousenOperator);
      operatorCalc(this.innerHTML);
    }
  });
});
// sum click event
sum.addEventListener("click", () => {
  // only works if theres number entered
  if (storeNumebrs.length > 0 && firstNumbers !== "") {
    lastNumbers = +storeNumebrs.join("");
    storeNumebrs = [];
    // displays the sum
    mainDisplay.innerHTML = calc(chousenOperator).toLocaleString("en-US");
    firstNumbers = calc(chousenOperator);
    display(smallDisplay);
  }
});
// clear click event
clearBtn.addEventListener("click", () => {
  // restores all to default
  storeNumebrs = [];
  firstNumbers = "";
  chousenOperator = "";
  lastNumbers = "";
  display(smallDisplay);
  display(mainDisplay);
});
// delete click event
delBtn.addEventListener("click", () => {
  storeNumebrs.pop();
  storeNumDisplay(mainDisplay);
});
// plus-minus click event
switchOperator.addEventListener("click", () => {
  // add/removes the minus sign on the array
  storeNumebrs[0] !== "-" ? storeNumebrs.unshift("-") : storeNumebrs.shift();
  // updates the display
  storeNumDisplay(mainDisplay);
});
