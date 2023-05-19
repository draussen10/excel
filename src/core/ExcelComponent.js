import {DOMListener} from '@/core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.subscribe = options.subscribe || []

		this.name = options.name || ''

		this.emitter = options.emitter
		this.unsubs = []

		this.store = options.store

		this.prepare()
	}

	// Настраиваем наш компонент до INIT
	prepare() {

	}

	// Возвращает шаблон компонента
	toHTML() {
		return ''
	}

	// Уведомляем слушаетелей про события eventName - запускаем действие
	$emit(eventName, ...args) {
		this.emitter.emit(eventName, ...args) // Абалдеть гениально
	}

	// Подписываемся на событие eventName - описываем, что будет делать
	$on(eventName, fn) {
		const unsub = this.emitter.subscribe(eventName, fn)
		this.unsubs.push(unsub)
	}

	$dispatch(action) {
		this.store.dispatch(action)
	}

	// Сюди приходят только изменения по тем полям, на которые мы подписались в сторе, только после изменения стора
	storeChanged(changes) {
		console.log(changes)
	}

	isWatching(key) {
		return this.subscribe.includes(key)
	}

	// $subscribe(fn) {
	// this.storeSub = this.store.subscribe(fn)
	// }

	init() {
		this.initDOMListeners()
	}

	destroy() {
		this.removeDOMListeners()
		this.unsubs.forEach(unsub => unsub()) // Удаляем слушателей Emitter
		// this.storeSub.unsubscribe()
	}
}
