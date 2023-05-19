const CODES = {
	A: 65,
	Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createCell(state, row) { // Пример замыкания - в данном случае для красоты
	return function(_, col) {
		const width = getWidth(state.colState, col)
		// height передавать не надо, т.к. строка формирует высоту
		const value = getValue(state.dataState, row, col)
		return `
 			<div class="cell" 
				contenteditable 
				spellcheck="false" 
				data-col="${col}"
				data-id="${row}-${col}"
				style="width: ${width}"
 			>
 			${value}
</div>
 		`
	}
}

function createCol({col, index, width}) {
	return `
		<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(content, idx, state) {
	const resizer = idx ? '<div class="row-resize" data-resize="row"></div>' : ''
	const height = getHeight(state, idx)
	return `
	<div 
		class="row" 
		data-type="resizable" 
		data-row="${idx}" 
		style="height: ${height}"
	>
		<div class="row-info">
			${idx ? idx : ''}
			${resizer}
		</div>
		<div class="row-data">${content}</div>
	</div>
	`
}

function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
	return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getValue(state, row, col) {
	return state[`${row}-${col}`] || ''
}

function withWidthFromState(state) {
	return function(col, index) {
		return {
			col, index, width: getWidth(state.colState, index)
		}
	}
}

export function createTable(rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	const cols = new Array(colsCount)
		.fill('')
		.map((el, idx) => String.fromCharCode(CODES.A + idx))
		.map(withWidthFromState(state))
		.map(createCol)
		.join('')


	rows.push(createRow(cols, null, {})) // Тут state не нужен. Просто передаем пустой объект

	const cells = new Array(colsCount)
		.fill('')
		.map((el, idx) => String.fromCharCode(CODES.A + idx))
		.map(createCell)
		.join('')

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			// .map((_, col) => createCell(row, col)) - не самый красивый способ
			.map(createCell(state, row)) // Красиво!
			.join('')

		rows.push(createRow(cells, row + 1, state.rowState))
	}

	return rows.join('')
}
