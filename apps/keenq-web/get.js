import scrapingbee from 'scrapingbee'

import { tracks } from './list.js'

import fs from 'fs'


var client = new scrapingbee.ScrapingBeeClient('T7Z3V9YBZPHRM31ZWKEZIBCDL6QYXXT3R4WCBGB0EIA1VWD2ALXDTP7N6ASRVH2AN5G0AV6F3Q8N4NDE')
var reg = /(?<=<script\s+class="light-data"[^>]*>)[\s\S]*?(?=<\/script>)/g

function fromTo(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

async function get(id, second) {
	var session_id = fromTo(1, 10_000_000)
	var url = `https://music.yandex.ru/track/${id}`
	try {
		var response = await client.get({
			url,
			params: {
				session_id,
			}
		})
		var decoder = new TextDecoder()
		var text = decoder.decode(response.data)
		var res = reg.exec(text)[0]
		var json = JSON.parse(res)
		const track = {
			id,
			session_id,
			name: json.name,
			artist: json.byArtist.name
		}
		return track
	}
	catch (e) {
		if (e.code === 'ERR_BAD_REQUEST') throw 'ERR_BAD_REQUEST'
		if (second) {
			const track = {
				id,
				session_id,
				name: undefined,
				artist: undefined
			}
			return track
		}
	}
}


async function getAll() {
	const results = []
	let i = 0
	for await (let id of tracks) {
		if (i >= 3) break
		console.log(`get.js ---> getAll ---> processing: ${id} - ${i} / ${tracks.length}`)
		i++
		try {
			let track = await get(id)
			if (!track) track = await get(id, true)
			results.push(track)
		}
		catch (e) {
			if (e === 'ERR_BAD_REQUEST') break
		}
	}
	fs.writeFileSync('./result.json', JSON.stringify(results, null, ' '), 'utf-8')
}

getAll()
