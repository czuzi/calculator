class Calculator {
  constructor(currentText, previousText) {
    this.currentText = currentText
    this.previousText = previousText
    this.clear()
  }

  clear() {
    this.currentOperand = ""
    this.previousOperand = ""
    this.operator = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperator(operator) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") this.calculate()
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }

  calculate() {
    let calculation
    const a = parseFloat(this.previousOperand)
    const b = parseFloat(this.currentOperand)
    if (isNaN(a) || isNaN(b)) return
    switch (this.operator) {
      case "+":
        calculation = a + b
        break
      case "-":
        calculation = a - b
        break
      case "*":
        calculation = a * b
        break
      case "/":
        calculation = a / b
        break
      default:
        return
    }
    this.currentOperand = calculation
    this.operator = undefined
    this.previousOperand = ""
  }

  displayResult() {
    this.currentText.innerText = this.currentOperand
    if (this.operator != null) {
      this.previousText.innerText = `${this.previousOperand} ${this.operator}`
    } else {
      this.previousText.innerText = ""
    }
  }
}

const currentText = document.getElementById("current")
const previousText = document.getElementById("result")
const operatorButtons = document.querySelectorAll("[data-operator]")
const equalsButton = document.querySelector("[data-equals]")
const numberButtons = document.querySelectorAll("[data-number]")
const clearButton = document.querySelector("[data-all-clear")
const deleteButton = document.querySelector("[data-delete]")

const calculator = new Calculator(currentText, previousText)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.displayResult()
  })
})

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText)
    calculator.displayResult()
  })
})

clearButton.addEventListener("click", () => {
  calculator.clear()
  calculator.displayResult()
})

deleteButton.addEventListener("click", () => {
  calculator.delete()
  calculator.displayResult()
})

equalsButton.addEventListener("click", () => {
  calculator.calculate()
  calculator.displayResult()
  calculator.clear()
})
