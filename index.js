var chalk = require('chalk');

var SEPARATOR = '│';

/**
 * Repeat provided string a given no. of times.
 * @param  {number} amount Number of times to repeat.
 * @param  {string} str    Character(s) to repeat
 * @return {string}        Repeated string.
 */
function repeatChar(amount, str) {
	str = str || ' ';
	return Array.apply(0, Array(amount)).join(str);
}

/**
 * Formats certain type of values for more readability.
 * @param  {...}  value         Value to format.
 * @param  {Boolean} isHeaderValue Is this a value in the table header.
 * @return {string}                Formatted value.
 */
function getFormattedString(value, isHeaderValue) {
	if (isHeaderValue) {
	}
	else if (typeof value === 'string') {
		// Wrap strings in inverted commans.
		return '"' + value + '"';
	}
	else if (typeof value === 'function') {
		// Just show `function` for a function.
		return 'function';
	}
	return value + '';
}

/**
 * Colorize and format given value.
 * @param  {...}  value         Value to colorize.
 * @param  {Boolean} isHeaderValue Is this a value in the table header.
 * @return {string}                Colorized + formatted value.
 */
function getColoredAndFormattedString(value, isHeaderValue) {
	var colorFn;
	//console.log(value, typeof value, isHeaderValue)
	if (isHeaderValue) {
	}
	else if (typeof value === 'number' || typeof value === 'boolean') {
		 colorFn = chalk.blue;
	}
	else if (typeof value === 'string') {
		 colorFn = chalk.red;
	}
	else if (typeof value === 'undefined') {
		 colorFn = chalk.white;
	}

	value = getFormattedString(value, isHeaderValue);
	if (colorFn) {
		return colorFn(value);
	} else {
		return value + '';
	}
}

function printRows (rows) {
	if (!rows.length) return;
	var row, rowString,
		i, j,
		padding,
		tableWidth = 0,
		numCols = rows[0].length;

	// For every column, calculate the maximum width in any row.
	for (j = 0; j < numCols; j++) {
		maxLengthForColumn = 0;
		for (i = 0; i < rows.length; i++) {
			if (getFormattedString(rows[i][j], !i || !j).length > maxLengthForColumn) {
				maxLengthForColumn = getFormattedString(rows[i][j], !i || !j).length;
			}
		}
		// Give some more padding to biggest string.
		maxLengthForColumn += 4;
		tableWidth += maxLengthForColumn;

		// Give padding to rows for current column.
		for (i = 0; i < rows.length; i++) {
			padding = maxLengthForColumn - getFormattedString(rows[i][j], !i || !j).length;
			rows[i][j] = ' ' + getColoredAndFormattedString(rows[i][j], !i || !j) + repeatChar(padding - 1);
		}
	}

	// HACK: Increase table width just by 1 to make it look good.
	tableWidth += 1;

	console.log(repeatChar(tableWidth, '='))
	for (i = 0; i < rows.length; i++) {
		row = rows[i];
		rowString = '';
		for (var j = 0; j < row.length; j++) {
			rowString += row[j] + SEPARATOR;
		}
		console.log(rowString);
		// Draw border after table header.
		if (!i) {
			console.log(repeatChar(tableWidth, '-'))
		}
	}
	console.log(repeatChar(tableWidth, '='))
}

function printTable(data) {
	var i, j, rows = [], row, entry;
	var keys = Object.keys(data[0]);
	keys.sort();

	// Create header row.
	rows.push([]);
	row = rows[rows.length - 1];
	row.push('(index)');
	for (i = 0; i < keys.length; i++) {
		row.push(keys[i] + '');
	}

	for (j = 0; j < data.length; j++) {
		entry = data[j]
		rows.push([]);
		row = rows[rows.length - 1];
		row.push(j);
		for (i = 0; i < keys.length; i++) {
			row.push(entry[keys[i]]);
		}
	}

	printRows(rows);
}

console.table = console.table || function(data) {
	printTable(data);
}

