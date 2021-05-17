const axios = require('axios')
const fs = require('fs')
const repo = process.env.REPO
const token = process.env.TOKEN
const moment = require('moment');

moment.locale('zh-cn');

var log4js = require('log4js')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    app: { type: 'file', filename: 'app.log' }
  },
  categories: {
    default: { appenders: ['app'], level: 'info' }
  }
})

var log = log4js.getLogger('GithubPicBed')

/**
 * @param  {[String]} file {picture path}
 * @return {[String]} {picture pid}
 */
async function getImgUrl(file){
	if (repo.length == 0 || repo.length == 0)
		throw 'ENV error.'
	try{
		let bitmap = fs.readFileSync(file)
		let base64Img = Buffer.from(bitmap).toString('base64')
		let timestamp = moment().format('YYYY/MM/DD/')+Math.round(Math.random()*100000000)+'.jpg'
		let imageUrl = 'https://api.github.com/repos/'+repo+'/contents/'+timestamp
		let body = {
			'branch': 'master',
			'message': 'Upload image',
			'content': base64Img,
			'path': timestamp,
		}
		let upImgResp = await axios.put(imageUrl, body, {
			headers: {
				'Authorization':'token '+token,
				'Content-Type': 'application/json; charset=utf-8',
			}
		})
		imgUrl = upImgResp.data['content']['download_url']
		if (imgUrl) {
			log.info('Successfully uploaded an image to: '+timestamp)
			return timestamp
		} else {
			throw 'Image url not found.'
		}
	}
	catch(e){
		log.error('Failed to upload image: '+e)
		throw 'Image url not found.'
	}
}

module.exports = getImgUrl