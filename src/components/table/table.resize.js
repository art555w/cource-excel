import { $ } from '../../core/Dom'

export function tableResize(event) {
	if (event.target.dataset.resize) {
		const $resizer = $(event.target)
		const $parent = $resizer.closest('[data-type="resizable"]')
		const coords = $parent.getCoords()
		const index = $parent.data.index
		const cells = document.querySelectorAll(`[data-index="${index}"]`)
		const $lineCol = createLineCol()
		const $lineRow = createLineRow()
		const $table = document.querySelector('.excel__table')


		$table.prepend(event.target.dataset.resize === 'col'
			? $lineCol.$el
			: $lineRow.$el)
		$lineCol.css({ left: '50px' })
		document.onmousemove = e => {
			$lineCol.css({ left: e.pageX + 'px', opacity: 1 })
			$lineRow.css({ top: e.pageY - 98 + 'px', opacity: 1 })
		}


		document.onmouseup = (e) => {
			if (event.target.dataset.resize === 'col') {
				$table.removeChild($lineCol.$el)
				const delta = e.pageX - coords.right
				const value = delta + coords.width
				cells.forEach(el => {
					el.style.width = value + 'px'
				})
			} else if (event.target.dataset.resize === 'row') {
				$table.removeChild($lineRow.$el)
				const delta = e.pageY - coords.bottom
				const value = delta + coords.height
				$parent.css({ height: value + 'px' })
			}
			return document.onmouseup = null, document.onmousemove = null
		}
	}
}

function createLineCol() {
	const lineCol = $.create('div', 'line-col').$el
	const lineDrop = $.create('div', 'line-drop').$el
	lineCol.append(lineDrop)
	return $(lineCol)
}

function createLineRow() {
	const lineRow = $.create('div', 'line-row').$el
	const lineRight = $.create('div', 'line-right').$el
	lineRow.append(lineRight)
	return $(lineRow)
}