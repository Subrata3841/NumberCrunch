document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
          const value = button.getAttribute('data-value') || button.textContent.trim();
            if(!isNaN(value) || value ==='.') {
                currentInput += value;
                display.value = currentInput;
            }else if(value === 'C') {
                //clear all
                currentInput = '';
                firstOperand = null;
                operator = '';
                display.value = '0';
            }else if(value === 'CE'){
                //for clear the current input
                currentInput = '';
                display.value = '0';
            }else if(value === '±') {
                //toggle positive/negative
                if(currentInput){
                    currentInput = currentInput.startsWith('-')?currentInput.substring(1):`-${currentInput}`;
                    display.value = currentInput;
                }
            }else if(value === '%'){
                //percentage
                if(currentInput){
                    currentInput = (parseFloat(currentInput)/100).toString();
                    display.value = currentInput;
                }
            } else if (value === '1/x') {
                // Reciprocal
                if (currentInput) {
                  currentInput = (1 / parseFloat(currentInput)).toString();
                  display.value = currentInput;
                }
              } else if (value === 'square') {
                // Square
                if (currentInput) {
                  // Square the current input
                  currentInput = Math.pow(parseFloat(currentInput), 2).toString();
                  display.value = currentInput;
                  firstOperand = parseFloat(currentInput); // Save result for further operations
                } else if (firstOperand !== null) {
                  // If no current input, square the first operand
                  firstOperand = Math.pow(firstOperand, 2);
                  currentInput = firstOperand.toString();
                  display.value = currentInput;
                } else {
                  // Default behavior: Square 0
                  currentInput = "0";
                  display.value = "0";
                }
              } else if (value === '√') {
                // Square root
                if (currentInput) {
                  currentInput = (Math.sqrt(parseFloat(currentInput))).toString();
                  display.value = currentInput;
                }
              } else if (value === '=') {
                // Perform calculation
                if (operator && firstOperand !== null) {
                  const secondOperand = parseFloat(currentInput);
                  switch (operator) {
                    case '+':
                      currentInput = (firstOperand + secondOperand).toString();
                      break;
                    case '-':
                      currentInput = (firstOperand - secondOperand).toString();
                      break;
                    case 'x':
                      currentInput = (firstOperand * secondOperand).toString();
                      break;
                    case '÷':
                      if (secondOperand === 0) {
                        alert("Cannot divide by zero!");
                        currentInput = '';
                      } else {
                        currentInput = (firstOperand / secondOperand).toString();
                      }
                      break;
                  }
                  display.value = currentInput;
                  firstOperand = null;
                  operator = '';
                }
              }else if(value === '\u232b'){     //* \u232b--> for backspace
                currentInput = currentInput.slice(0, -1) || '0';
                display.value = currentInput;
              }else {
                // Operator buttons (+, -, x, ÷)
                if (currentInput) {
                  if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);  //save the first number
                    operator = value //to store the oparetor
                    display.value = `${currentInput} ${operator}`; //for display number operator
                  } else if (operator) {
                    const secondOperand = parseFloat(currentInput);  //for processing the second operand
                    switch (operator) {
                      case '+':
                        firstOperand += secondOperand;
                        break;
                      case '-':
                        firstOperand -= secondOperand;
                        break;
                      case 'x':
                        firstOperand *= secondOperand;
                        break;
                      case '÷':
                        if (secondOperand === 0) {
                          alert("Cannot divide by zero!");
                          firstOperand = null;
                        } else {
                          firstOperand /= secondOperand;
                        }
                        break;
                    }
                  }
                  operator = value;
                  display.value = `${firstOperand} ${operator}`; // Display the result + new operator
                }
                currentInput = '';  //for reset current input
              }
        });
    });
});