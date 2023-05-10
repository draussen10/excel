export class TableSelection {
	constructor() {
		this.group = []
	}

	clear() {
		this.group.forEach(el => el.removeClass('selected'))
		this.group = []
	}

	select($el) {
		this.clear()
		this.group.push($el)
		$el.addClass('selected')
	}

	selectGroup() {

	}
}
