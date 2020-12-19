
const CODES = {
	A: 65,
	Z: 90
}

function createRow(content, rowInfo = '') {
	return `
		<div class="row">
			<div class="row-info">${rowInfo}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toColumn(content) {
	return `
		<div class="column">${content}</div>
	`
}

function toCell() {
	return `
		<div class="cell" contenteditable></div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')

	const cell = new Array(colsCount)
		.fill('')
		.map(toCell)
		.join('')

	rows.push(createRow(cols))


	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cell, i + 1))
	}
	return rows.join('')
}