function sleep(time = 1000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

async function start() {
	console.log('first')
	await sleep()
	console.log('second')
}

start()