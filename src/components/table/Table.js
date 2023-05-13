import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {matrix, nextSelector, shouldResize, shouldSelected} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@/core/dom'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

	toHTML() {
		return createTable()
	}

	prepare() { // Вызывается раньше init
		this.selection = new TableSelection()
	}

	init() { // Вызывается позже prepare
		super.init()

		const $originCell = this.$root.findOne(`[data-id="0-0"]`)
		this.selectCell($originCell)

		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})
		this.$on('formula:enter', () => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	onMousedown(e) {
		if (shouldResize(e)) {
			resizeHandler(this.$root, e)
		} else if (shouldSelected(e)) {
			const $target = $(e.target)
			if (e.shiftKey) {
				const $cells = matrix(this.selection.current, $target).map(id => this.$root.findOne(`[data-id="${id}"]`))
				this.selection.selectGroup($cells)
			} else {
				this.selection.select($target)
			}
		}
	}

	onKeydown(e) {
		const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']

		const {key} = e

		if (keys.includes(key) && !e.shiftKey) {
			e.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.findOne(nextSelector(key, id))
			this.selectCell($next)
		}
	}
	onInput(e) {
		this.$emit('table:input', $(e.target))
	}
}
