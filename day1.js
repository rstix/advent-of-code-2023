const fs = require('fs');
const readline = require('readline');

const filePath = 'input_d1.txt';
let linesArray = [];

const readStream = fs.createReadStream(filePath);
const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    linesArray.push(line);
});

rl.on('close', () => {
	console.log(sumNbrs(createNumbers(linesArray)))
	console.log(sumNbrs(createNumbersPr2(linesArray)))
});

// PROBLEM 1
const createNumbers = arr => arr.map(el => `${el[findNbrIndex(el)]}${el[el.length - findNbrIndex(reverseString(el)) - 1]}`)

const sumNbrs = arr => arr.reduce((sum,el) => {
	return sum + parseInt(el,10);
},0);

const findNbrIndex = str => str.split('').findIndex(c => (c >= '0' && c <= '9'))

const reverseString = str => str.split('').reverse().join('');

const isNum = c => {
	if (c >= '0' && c <= '9'){
		return parseInt(c);
	}
	return -1;
}

// PROBLEM 2

let strNbrs = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine"
]

// const arr = [
// 	"eightsevenfive3bcptwo",
// 	"five8six",
// 	"twonineseven24one3",
// 	"one8bdxplbtfninefourspqn",
// ]

const createNumbersPr2 = arr => arr.map(el => `${findNbr(el, false, strNbrs)}${findNbr(el, true, strNbrs)}`)

// const getSubstring = (start, offset, str) => {
// 	if(offset > 0) return str.substring(start, start + offset)
// 	return str.substring(start, start - offset)
// }

const findNbr = (str, reverse, strNums) => {
	const strLen = str.length

	if(reverse){
		strNums = strNbrs.map(el => reverseString(el))
		str = reverseString(str)
	}

	for(let i = 0; i < strLen; i++){
		if((nbr = isNum(str[i])) > 0){
			return nbr
		}
		if(i + 2 < strLen && strNums.includes(str.substring(i, i + 3))){
			return (strNums.indexOf(str.substring(i, i + 3)) + 1)
		}
		if(i + 3 < strLen && strNums.includes(str.substring(i, i + 4))){
			return (strNums.indexOf(str.substring(i, i + 4)) + 1)
		}
		if(i + 4 < strLen && strNums.includes(str.substring(i, i + 5))){
			return (strNums.indexOf(str.substring(i, i + 5)) + 1)
		}
	}
}

// console.log(createNumbersPr2(["five8six"]),sumNbrs(createNumbersPr2(arr)))