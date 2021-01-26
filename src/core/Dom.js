class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html
			return this
		}
		return this.$el.outerHTML.trim()
	}

	clear() {
		this.html('')
		return this
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el
		}
		this.$el.append(node)
		return this
	}

	on(typeMethod, callback) {
		return this.$el.addEventListener(typeMethod, callback)
	}

	off(typeMethod, callback) {
		return this.$el.removeEventListener(typeMethod, callback)
	}

	closest(selector) {
		return $(this.$el.closest(selector))
	}

	getCoords() {
		return this.$el.getBoundingClientRect()
	}

	get data() {
		return this.$el.dataset
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => {
			this.$el.style[key] = styles[key]
		})
		return this
	}
}

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