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

	text(text) {
		if (typeof text === 'string') {
			this.$el.textContent = text
			return this
		}
		return this.$el.textContent.trim()
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

	findAll(selector) {
		return this.$el.querySelectorAll(selector)
	}

	find(selector) {
		return $(this.$el.querySelector(selector))
	}

	id(parse) {
		if (parse) {
			const parsed = this.data.id.split(':')
			return {
				row: +parsed[0],
				col: +parsed[1]
			}
		}
		return this.data.id
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => {
			this.$el.style[key] = styles[key]
		})
		return this
	}

	addClassName(calssName) {
		return this.$el.classList.add(calssName)
	}
	removeClassName(calssName) {
		return this.$el.classList.remove(calssName)
	}

	focus() {
		this.$el.focus()
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