export class Emitter {
	constructor() {
		this.listeners = {}
	}

	// dispatch, fire, trigger
	// Уведомляем слушателей, если они есть
	emit(eventName, ...args) {
		if (!Array.isArray(this.listeners[eventName])) {
			return false
		}
		this.listeners[eventName].forEach(listener => {
			listener(...args)
		})
		return true
	}

	// on, listen
	// Подписываемся на уведомления
	subscribe(eventName, fn) {
		this.listeners[eventName] = this.listeners[eventName] || [] // [] - если нет this.listeners[eventName]
		this.listeners[eventName].push(fn)
		return () => { // Функция позволяет отписаться от события
			this.listeners[eventName] =
				this.listeners[eventName]
					.filter(listener => listener !== fn)
		}
	}
}

// Пример

// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('boev', data => console.log(data))
//
// emitter.emit('boev', 42)
// unsub()
// emitter.emit('boev', 42)

