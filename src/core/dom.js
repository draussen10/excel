class Dom {
	constructor(selector) {
		// #app
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this // Нужен для того, чтобы выполнялся chain - .html().clear().adfasdf()
		}
		return this.$el.innerHTML.trim()
	}

	clear() {
		this.html('')
		return this
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback, false)
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el
		}

		if (Element.prototype.append) {
			this.$el.append(node)
		} else {
			this.$el.appendChild(node)
		}
		return this
	}

	get data() {
		return this.$el.dataset
	}

	closest(selector) {
		return $(this.$el.closest(selector)) // оборачиваем в $(), чтобы была возможность работать как с объектом класса Dom
	}

	getCoords() {
		return this.$el.getBoundingClientRect()
	}

	findOne(selector) {
		return $(this.$el.querySelector(selector))
	}
	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach(key => {
				this.$el.style[key] = styles[key]
			})
		return this
	}

	addClass(className) {
		return this.$el.classList.add(className)
	}
	removeClass(className) {
		return this.$el.classList.remove(className)
	}
}

// event.target
export function $(selector) {
	return new Dom(selector)
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}
