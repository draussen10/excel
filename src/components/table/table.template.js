const CODES = {
	A: 65,
	Z: 90
}

function createCell(_, col) { // _ - сам элемент, называем так, тк он нам не интересен
	return `
	<div class="cell" contenteditable spellcheck="false" data-col="${col}"></div>
	`
}

function createCol(col, idx) {
	return `
		<div class="column" data-type="resizable" data-col="${idx}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(content, idx) {
	const resizer = idx ? '<div class="row-resize" data-resize="row"></div>' : ''
	return `
	<div class="row" data-type="resizable">
		<div class="row-info">
			${idx ? idx : ''}
			${resizer}
		</div>
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
		.map(createCol)
		.join('')

	rows.push(createRow(cols, null))

	const cells = new Array(colsCount)
		.fill('')
		.map((el, idx) => String.fromCharCode(CODES.A + idx))
		.map(createCell)
		.join('')

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell)
			.join('')

		rows.push(createRow(cells, i + 1))
	}

	return rows.join('')
}
