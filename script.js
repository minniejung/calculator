const calculator = document.querySelector(".calculator"); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector(".calculator__buttons"); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector(".calculator__operend--left"); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector(".calculator__operator"); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector(".calculator__operend--right"); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector(".calculator__result"); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.

  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

  switch (operator) {
    case "+":
      result = n1 + n2;
      break;
    case "-":
      result = n1 - n2;
      break;
    case "*":
      result = n1 * n2;
      break;
    case "/":
      result = n2 !== 0 ? n1 / n2 : 0;
      break;
  }

  return String(result);
}

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches("button")) {
    if (action === "number") {
      console.log("숫자 " + buttonContent + " 버튼");

      if (firstOperend.textContent === "0") {
        firstOperend.textContent = buttonContent;
      } else if (operator.textContent !== "") {
        secondOperend.textContent = buttonContent;
      }
    }

    if (action === "operator") {
      console.log("연산자 " + buttonContent + " 버튼");
      operator.textContent = buttonContent;
    }
    if (action === "decimal") {
    }
    if (action === "clear") {
      firstOperend.textContent = "0";
      operator.textContent = "+";
      secondOperend.textContent = "0";
      calculatedResult.textContent = "0";
    }
    if (action === "calculate") {
      if (
        firstOperend.textContent &&
        operator.textContent &&
        secondOperend.textContent
      ) {
        const result = calculate(
          firstOperend.textContent,
          operator.textContent,
          secondOperend.textContent
        );

        calculatedResult.textContent = result;
      }
    }
  }
});

// ------------------------------------------------------ //

// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector(".calculator__display--for-advanced");
const buttonsForAdvanced = document.querySelector(".calculator__buttons");

let firstNum, operatorForAdvanced, previousKey, previousNum;
let firstNumHasDecimal = false;
let secondNumHasDecimal = false;

function calculate(n1, operator, n2) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

  switch (operator) {
    case "+":
      return String(n1 + n2);
    case "-":
      return String(n1 - n2);
    case "*":
      return String(n1 * n2);
    case "/":
      return n2 !== 0 ? String(n1 / n2) : "0";
    default:
      return "0";
  }
}

// ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.

function handleNumber(buttonContent) {
  if (!operatorForAdvanced) {
    display.textContent =
      display.textContent === "0" || previousKey === "operator"
        ? buttonContent
        : display.textContent + buttonContent;
    firstNum = display.textContent;
  } else {
    display.textContent =
      !previousNum || previousKey === "operator"
        ? buttonContent
        : display.textContent + buttonContent;
    previousNum = display.textContent;
  }
  previousKey = "number";
}

function handleOperator(buttonContent) {
  if (
    firstNum &&
    operatorForAdvanced &&
    previousKey !== "operator" &&
    previousKey !== "calculate"
  ) {
    previousNum = previousNum || firstNum;
    firstNum = calculate(firstNum, operatorForAdvanced, previousNum);

    display.textContent = firstNum;
  }
  if (previousKey === "calculate") {
    previousNum = null;
  }
  operatorForAdvanced = buttonContent;
  previousKey = "operator";
  firstNumHasDecimal = false;
  secondNumHasDecimal = false;
}

function handleDecimal() {
  if (!operatorForAdvanced) {
    if (!firstNumHasDecimal) {
      display.textContent =
        previousKey === "operator" || display.textContent === "0"
          ? "0."
          : display.textContent + ".";
      firstNum = display.textContent;
      firstNumHasDecimal = true;
    }
  } else if (!secondNumHasDecimal) {
    display.textContent =
      !previousNum || previousKey === "operator" ? "0." : previousNum + ".";
    previousNum = display.textContent;
    secondNumHasDecimal = true;
  }
  previousKey = "number";
}

function handleClear() {
  display.textContent = "0";
  firstNum = null;
  operatorForAdvanced = "";
  previousNum = null;
  previousKey = "clear";
  firstNumHasDecimal = false;
  secondNumHasDecimal = false;
}

function handleCalculate() {
  if (firstNum && operatorForAdvanced) {
    previousNum = previousNum || firstNum;
    const result = calculate(firstNum, operatorForAdvanced, previousNum);
    display.textContent = result;
    firstNum = result;

    console.log(
      `Current value: ${result}, Prev operator: ${operatorForAdvanced}, Prev num: ${previousNum}`
    );

    previousKey = "calculate";
  }
}

buttonsForAdvanced.addEventListener("click", function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  switch (action) {
    case "number":
      handleNumber(buttonContent);
      break;
    case "operator":
      handleOperator(buttonContent);
      break;
    case "decimal":
      handleDecimal(buttonContent);
      break;
    case "clear":
      handleClear(buttonContent);
      break;
    case "calculate":
      handleCalculate(buttonContent);
      break;
  }
});

const operators = document.querySelectorAll(".operator");

operators.forEach((button) => {
  button.addEventListener("click", () => {
    operators.forEach((btn) => btn.classList.remove("isPressed"));

    button.classList.add("isPressed");
    setTimeout(() => {
      button.classList.remove("isPressed");
    }, 200);

    button.classList.add("button_clicked");
    setTimeout(() => {
      button.classList.remove("button_clicked");
    }, 200);
  });
});
