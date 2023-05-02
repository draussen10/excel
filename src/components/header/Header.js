import {ExcelComponent} from '@/core/ExcelComponent'

export class Header extends ExcelComponent {
	static className = 'excel__header'

	toHTML() {
		return `
		<input type="text" class="input" value="Новая таблица">

		<div>
			<span class="material-icons button">delete</span>
			<span class="material-icons button">logout</span>
		</div>
		`
	}
}
