let expression = '';

function clear(){
	expression = '';
}

function del(){
	expression = expression.slice(0, -1);
}

function appendButtonValue(button){
	expression = expression + button.value;
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

function splitExpression(expression, index){
	return [expression.slice(0, index), expression.slice(index + 1)];
}

function parseParen(expression){
	let l = expression.lastIndexOf('('),
		r = expression.indexOf(')', l);
	let innerExpression = parseExpression(expression.slice(l + 1, r)).toString();
	let partialParse = 
			expression.slice(0, l) +
			innerExpression +
			expression.slice(r + 1);
	return parseExpression(partialParse);
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
	return +exp;
}