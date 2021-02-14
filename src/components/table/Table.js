import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '../../core/Dom'
import { tableResize } from './table.resize'
import { TableSelection } from './TableSelection'
import { matrix, nextSelection } from './table.function'

export class Table extends ExcelComponent {
	static className = 'excel__table'
	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()
		const $cell = this.$root.find('[data-id="1:0"]')
		this.selection.select($cell)

		this.$emit('Table:select', $cell.text())

		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})

		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
	}

	toHTML() {
		return createTable()
	}

	onInput(event) {
		this.$emit('Table:input', $(event.target).text())
	}


	onMousedown(event) {
		if (event.target.dataset.resize) {
			return tableResize(event, this.$root)
		} else if (event.target.dataset.type === 'cell') {
			const $target = $(event.target)
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`))
				this.selection.selectGroup($cells)
			} else {
				this.selection.select($target)
			}
		}
	}
	onKeydown(event) {
		const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
		const { key } = event
		const $next = this.$root.find(nextSelection(key, this.selection.current.id(true)))
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			this.selection.select($next)
			const text = $next.text()
			this.$emit('Table:select', text)
		}
	}
}
