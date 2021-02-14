import { range } from '../../core/utils'

export function matrix($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)

	const cols = range(current.col, target.col)
	const rows = range(current.row, target.row)

	return cols.reduce((acc, col) => {
		rows.forEach((row) => {
			acc.push(`${row}:${col}`)
		})
		return acc
	}, [])
}

export function nextSelection(key, { row, col }) {
	const MIN_VALUE = 0
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++
			break

		case 'Tab':
		case 'ArrowRight':
			col++
			break

		case 'ArrowUp':
			row - 1 === MIN_VALUE ? row : row--
			break

		case 'ArrowLeft':
			col - 1 < MIN_VALUE ? col : col--
			break
	}
	return `[data-id="${row}:${col}"]`
}