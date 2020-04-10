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
	//let i = expression.lastIndexOf(')');
	if(expression.includes('(')){
		return parseParen(expression);
		//return parseParen(expression.slice(0, i), expression.slice(i+1));
	}
	i = expression.lastIndexOf('+');
	if(i > -1){
		return parseAddition(expression.slice(0, i), expression.slice(i+1));
	}
	i = expression.lastIndexOf('-');
	if(i > -1){
		return parseSubtraction(expression.slice(0, i), expression.slice(i+1));
	}
	i = expression.lastIndexOf('*');
	if(i > -1){
		return parseMultiplication(expression.slice(0, i), expression.slice(i+1));
	}
	i = expression.lastIndexOf('/');
	if(i > -1){
		return parseDivision(expression.slice(0, i), expression.slice(i+1));
	}
	i = expression.lastIndexOf('^');
	if(i > -1){
		return parseExponent(expression.slice(0, i), expression.slice(i+1));
	}
	return parseNumber(expression);

}

function parseParen(expression){
	let i = expression.lastIndexOf('('),
		j = expression.indexOf(')', i);
	let partialParse = 
			expression.slice(0, i) +
			parseExpression(expression.slice(i + 1, j)).toString() +
			expression.slice(j + 1);
	return parseExpression(partialParse);
	/*let i = str1.lastIndexOf(')');
	let j = str1.lastIndexOf('(');
	if(i > j){
		let partialParse = parseParen(str1.slice(0, i), str1.slice(i+1) + ')').toString() + str2;
		return parseExpression(partialParse);
	}
	let partialParse = str1.slice(0, j) + parseExpression(str1.slice(j + 1)).toString() + str2;
	return parseExpression(partialParse);*/
}

function parseAddition(str1, str2){
	return parseExpression(str1) + parseExpression(str2);
}

function parseSubtraction(str1, str2){
	return parseExpression(str1) - parseExpression(str2);
}

function parseMultiplication(str1, str2){
	return parseExpression(str1) * parseExpression(str2);
}

function parseDivision(str1, str2){
	return parseExpression(str1) / parseExpression(str2);
}

function parseExponent(str1, str2){
	return parseExpression(str1) ** parseExpression(str2);
}

function parseNumber(str){
	return +str;
}