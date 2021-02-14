export class TableSelection {
	static className = 'selected'
	constructor() {
		this.group = []
		this.current = null
	}

	select($el) {
		this.clear()
		this.group.push($el)
		$el.focus().addClassName(TableSelection.className)
		this.current = $el
	}

	clear() {
		this.group.forEach($el => $el.removeClassName(TableSelection.className))
		this.group = []
	}

	selectGroup($group = []) {
		this.clear()
		this.group = $group
		this.group.forEach($el => $el.addClassName(TableSelection.className))
	}
}