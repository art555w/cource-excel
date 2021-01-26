import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
// import { $ } from '../../core/Dom'
import { tableResize } from './table.resize'

export class Table extends ExcelComponent {
	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		})
	}
	static className = 'excel__table'
	toHTML() {
		return createTable()
	}

	onMousedown(event) {
		return tableResize(event)
	}
}

