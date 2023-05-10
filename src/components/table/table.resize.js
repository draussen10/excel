import {$} from '@/core/dom'

export function resizeHandler($root, e) {
	const $resizer = $(e.target)
	// const $parent = $resizer.$el.parentNode - плохо, т.к. любое изменение структуры и parentNode может вывести не тот элемент
	// const $parent = $resizer.$el.closest('.column') // closest - получить ближайший элемент по селектору - лучше, но все равно не хорошо
	const $parent = $resizer.closest('[data-type="resizable"]') // closest - получить ближайший элемент по селектору
	const coords = $parent.getCoords()
	const type = $resizer.data.resize
	const sideProp = type === 'col' ? 'bottom' : 'right'
	let value

	$resizer.css({
		opacity: 1,
		[sideProp]: '-5000px' // Нужно передавать в кв.скобках, чтобы подставилось значение переменной, а не просто строка
	})

	document.onmousemove = event => {
		if (type === 'col') {
			const delta = Math.floor(event.pageX - coords.right)
			value = coords.width + delta

			$resizer.css({right: -delta + 'px'})
		} else {
			const delta = Math.floor(event.pageY - coords.bottom)
			value = coords.height + delta
			$resizer.css({bottom: -delta + 'px'})
		}
	}

	document.onmouseup = () => {
		document.onmousemove = null// Чистка события
		document.onmouseup = null

		$resizer.css({
			opacity: 0,
			bottom: 0,
			right: 0
		})

		if (type === 'col') {
			$parent.css({width: value + 'px'})
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = value + 'px')
		} else {
			$parent.css({height: value + 'px'})
		}
	}
}
