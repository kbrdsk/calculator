let expression = '';

let display = document.querySelector("#expression-display"),
	expressionButtons = Array.from(document.querySelectorAll("button.expression")),
	delButton = document.querySelector("button.delete"),
	evalButton = document.querySelector("button.evaluate");

expressionButtons.forEach(button => 
					button.addEventListener('click', e => appendButtonValue(e.target)));
delButton.addEventListener('click', () => del());
evalButton.addEventListener('click', () => evaluate());


function clear(){
	expression = '';
}

function evaluate(){
	display.textContent = `${expression} = ${parseExpression(expression)}`;
	clear();	
}

function del(){
	expression = expression.slice(0, -1);
	display.textContent = expression;
}

function appendButtonValue(button){
	expression = expression + button.value;
	display.textContent = expression;
}

function parseExpression(expression){
	if(expression.includes('(')){
		return parseParen(expression);
	}
	i = expression.lastIndexOf('+');
	if(i > -1){
		return parseAddition(...splitExpression(expression, i));
	}
	i = expression.lastIndexOf('-');
	if(i > -1){
		return parseSubtraction(...splitExpression(expression, i));
	}
	i = expression.lastIndexOf('*');
	if(i > -1){
		return parseMultiplication(...splitExpression(expression, i));
	}
	i = expression.lastIndexOf('/');
	if(i > -1){
		return parseDivision(...splitExpression(expression, i));
	}
	i = expression.lastIndexOf('^');
	if(i > -1){
		return parseExponent(...splitExpression(expression, i));
	}
	return parseNumber(expression);
}

function parseParen(expression){
	try{
		let l = expression.lastIndexOf('('),
			r = expression.indexOf(')', l);
		let innerExpression = parseExpression(expression.slice(l + 1, r)).toString();
		let partialParse = 
				expression.slice(0, l) +
				innerExpression +
				expression.slice(r + 1);
		return parseExpression(partialParse);
	}catch(error){return NaN;}
}

function parseAddition(exp1, exp2){
	return parseExpression(exp1) + parseExpression(exp2);
}

function parseSubtraction(exp1, exp2){
	return parseExpression(exp1) - parseExpression(exp2);
}

function parseMultiplication(exp1, exp2){
	return parseExpression(exp1) * parseExpression(exp2);
}

function parseDivision(exp1, exp2){
	return parseExpression(exp1) / parseExpression(exp2);
}

function parseExponent(exp1, exp2){
	return parseExpression(exp1) ** parseExpression(exp2);
}

function parseNumber(exp){
	exp = exp || NaN;
	return +exp;
}

function splitExpression(expression, index){
	return [expression.slice(0, index), expression.slice(index + 1)];
}