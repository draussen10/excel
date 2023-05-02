import {capitalize} from '@/core/utils'

export class DOMListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error(`No $root provided for DOMListener`)
		}
		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(`Method ${method} is not found in ${this.name || ''}-Component`)
			}
			this[method] = this[method].bind(this) // Переопределение метода внутри Component с контекстом this.
			this.$root.on(listener, this[method]) // Вызов callback у определенного ExcelComponent, bind - чтобы не терялся контекст. Из-за bind столько приколов с удалением слушателей(bind создает новую функцию)
		})
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(`Method ${method} is not found in ${this.name || ''}-Component`)
			}
			this.$root.off(listener, this[method]) // Вызов callback у определенного ExcelComponent, bind - чтобы не терялся контекст
		})
	}
}

function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}
