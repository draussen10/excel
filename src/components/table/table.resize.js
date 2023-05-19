import {$} from '@/core/dom'

export function resizeHandler($root, e) {
	return new Promise(resolve => {
		const $resizer = $(e.target)
		// const $parent = $resizer.$el.parentNode - плохо, т.к. любое изменение структуры и parentNode может вывести не тот элемент
		// const $parent = $resizer.$el.closest('.column') // closest - получить ближайший элемент по классу - лучше, но все равно не хорошо. может поменяться класс
		const $parent = $resizer.closest('[data-type="resizable"]') // closest - получить ближайший элемент по селектору data-attr
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
				value = Math.floor(coords.width + delta)

				$resizer.css({right: -delta + 'px'})
			} else {
				const delta = Math.floor(event.pageY - coords.bottom)
				value = Math.floor(coords.height + delta)
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
				value = (value || value > 0) ? value : coords.width
				$parent.css({width: value + 'px'})
				$root.findAll(`[data-col="${$parent.data.col}"]`)
					.forEach(el => el.style.width = value + 'px')
			} else {
				value = (value || value > 0) ? value : coords.height
				$parent.css({height: value + 'px'})
			}

			resolve({
				id: $parent.data[type],
				type,
				value
			})
		}
	})
}
