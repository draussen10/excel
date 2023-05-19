export function createStore(rootReducer, initialState = {}) { // Реализовываем через функцию, чтобы использовать замыкания
	let state = rootReducer({...initialState}, {type: '__INIT'}) // Что-то про мутации (???)
	let listeners = []

	return { // Обектв Store
		subscribe(fn) {
			listeners.push(fn)
			// return () => { // Отписка - один из вариантов
			// listeners = listeners.filter(l => l !== fn)
			// }
			return {
				unsubscribe() { // Отписка
					listeners = listeners.filter(l => l !== fn)
				}
			}
		},
		dispatch(action) {
			state = rootReducer(state, action) // Изменение state через reducer
			listeners.forEach(l => l(state))
		},
		getState() {
			return JSON.parse(JSON.stringify(state)) // Защита от мутации
		},
	}
}
