export function shouldResize(event) {
	return event.target.dataset.resize // Удобный вывод data-аттрибутов в виде объекта
}

export function shouldSelected(event) {
	return event.target.dataset.id
}
