import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, shouldSelected} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@/core/dom'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			listeners: ['mousedown', 'click']
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
		this.selection.select($originCell)
	}

	onMousedown(e) {
		if (shouldResize(e)) {
			resizeHandler(this.$root, e)
		}
	}

	onClick(e) {
		if (shouldSelected(e)) {
			const $cell = $(e.target)
			this.selection.select($cell)
		}
	}
}
