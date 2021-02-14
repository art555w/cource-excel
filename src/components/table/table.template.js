
const CODES = {
	A: 65,
	Z: 90
}

function createRow(content, rowInfo = '', index) {
	return `
		<div class="row" data-type="resizable">
			<div class="row-info" data-index="${index}" onselectstart="return false" onmousedown="return false">
				${rowInfo}
				${rowInfo ? '<div class="row-resize resize" data-resize="row"></div>' : ''}
			</div>
			<div class="row-data"  data-resize="cell">${content}</div>
		</div>
	`
}

function toColumn(content, index) {
	return `
		<div class="column" data-type="resizable" data-index="${index}" onselectstart="return false" onmousedown="return false">
			${content}
			<div class="col-resize resize" data-resize="col"></div>
		</div>
	`
}

// function toCell(_, index) {
// 	return `
// 		<div class="cell" data-index="${index}" contenteditable></div>
// 	`
// }

function toCell(index) {
	return function cell(_, row) {
		return `
			<div class="cell" 
				data-index="${row}"
				data-id="${index}:${row}" 
				data-type="cell"contenteditable
				></div> 
		`
	}
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

	rows.push(createRow(cols))


	for (let i = 0; i < rowsCount; i++) {
		const cell = new Array(colsCount)
			.fill('')
			.map(toCell(i + 1))
			.join('')

		rows.push(createRow(cell, i + 1, i))
	}
	return rows.join('')
}