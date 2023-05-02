const CODES = {
	A: 65,
	Z: 90
}

function createCell() {
	return `
	<div class="cell" contenteditable spellcheck="false"></div>
	`
}

function createCol(col) {
	return `
		<div class="column">${col}</div>
	`
}

function createRow(content, idx = -1) {
	return `
	<div class="row">
		<div class="row-info">${idx < 0 ? '' : idx+1}</div>
		<div class="row-data">${content}</div>
	</div>
	`
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	const cols = new Array(colsCount)
		.fill('')
		.map((el, idx) => String.fromCharCode(CODES.A + idx))
		.map(el => createCol(el))
		.join('')

	rows.push(createRow(cols))

	const cells = new Array(colsCount)
		.fill('')
		.map((el, idx) => String.fromCharCode(CODES.A + idx))
		.map((el, idx) => createCell())
		.join('')

	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cells, i))
	}

	return rows.join('')
}
