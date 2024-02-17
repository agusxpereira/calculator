
let firstArgument; 
let operator; 
let secondArgument;

let buttonEquals = document.querySelector('#equals'); 
let displayCalc = document.querySelector('.display-led');
let buttons = document.querySelectorAll('.button-calc'); 
let displayValue;
let buttonAc = document.querySelector("#ac");



function operate(currentOperator, firstArgument, secondArgument){ 
    if(currentOperator == 'sum'){
        operator = sum; 
    }else if(currentOperator == 'sub'){
        operator = substract;
    }else if(currentOperator == 'mul'){
        operator = multiply;
    }else if(currentOperator== 'div'){
        operator = divide;
    }
    return operator(firstArgument, secondArgument);
}


let sum = function(a, b){
    return( a + b); 
};

let substract = function(a,b){
    return( a - b); 
};

let multiply = function(a,b){
    return( a * b); 
};
let divide = function(a,b){
    return( a / b);
};

let calc = function (){
    let operands = tryArray(displayValue);         
    calculateArray(operands);                
} 

function bcSpace(){
    let screenCalc = displayCalc.textContent;
    console.log(screenCalc);
    displayCalc.textContent = screenCalc.substring(0, (screenCalc.length - 1));
}
function errorFunc(message='error!'){
    return displayCalc.textContent = message;
}


function tryArray(array) {
    let operands = "";
        if( array.includes('+')||
            array.includes('-')||
            array.includes('*')||
            array.includes('/')
        ){
            
             operands = array.
             replaceAll('/', ' div ').
             replaceAll('-', ' sub '). 
             replaceAll('*', ' mul ').
             replaceAll('+', ' sum ');
              
            operands = operands.split(' ');
        } 

        if(operands[operands.length-1] == 'sum' ||
        operands[operands.length-1] == 'div', 
        operands[operands.length-1] == 'mul', 
        operands[operands.length-1] == 'sub'){
            operands[operands-length - 1] = null;
        } 
        console.log(operands)
    return operands;
}

function calculateArray(array){
    if(array){

        array.reduce((result, currentElement, currentIndex)=>{
            let firstArgument;
            if(result != ""){
                firstArgument = Number(result);
                console.log(firstArgument);
            }else{
                return "Invalid Arguments";
            }
            if(
                currentElement == 'sum' ||
                currentElement == 'sub' ||
                currentElement == 'mul' || 
                currentElement == 'div')
            {
            const operator = currentElement;            
            const secondArgument = (array[currentIndex + 1] != "") ?
                                    Number(array[currentIndex + 1]): "error!"; 
            console.log(secondArgument);
            if(secondArgument == "error!"){
                errorFunc('Invalid Arguments.');
                return "Invalid Arguments";
            }else if(operator == 'div' && secondArgument == 0){
                errorFunc("You just can't.");
                return "You just can't";
            }

            result =  operate(operator, firstArgument, secondArgument);
    }
    displayCalc.textContent = result;
    return result;
    }); 
    }else{
        displayCalc.textContent = "error!";
    }
}
buttonEquals.addEventListener('click', calc);

buttonAc.addEventListener('click', ()=>{
    displayCalc.textContent = "";
    displayValue = 0; 
}); 

document.addEventListener('keydown', (e)=>{
    console.log(e);
    e.preventDefault;
    if(e.keyCode > 95 && e.keyCode < 112){
        displayCalc.textContent += `${e.key}`; 
        displayValue = displayCalc.textContent;

    }

    else if(e.key == "Enter"){
        calc();
    }else if(e.key == "Backspace"){
        if(displayCalc.textContent == "error!" || displayCalc.textContent == "Invalid Arguments"){
            displayCalc.textContent = "";
        }else{
            bcSpace();
        }
    }
});

buttons.forEach(  
    (button) => {
        button.addEventListener('click', () =>{
            displayCalc.textContent += `${button.textContent}`; 
            displayValue = displayCalc.textContent;
           // console.log(displayValue);
        })
    }
);