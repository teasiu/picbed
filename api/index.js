const http = require('http')
const formidable = require('formidable')
const getImgUrl = require('./helper.js')
var log4js = require('log4js')

var port = process.env.PORT || 8080
const url = process.env.URL || '/api'

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

var tasks = []

function addTask(file, response) {
  tasks.push({
    "file":file,
    "response":response
  })
  function uploadFile() {
    if(tasks.length) {
      let file = tasks[0]["file"]
      let response = tasks[0]["response"]
      getImgUrl(file).then((result)=>{
        if (result) {
          response.writeHead(200, {"Content-Type": "text/json", 'Access-Control-Allow-Origin': '*'})
          response.write(JSON.stringify({
            status:'success',
            url:result
          }))
        } else {
          response.writeHead(200, {"Content-Type": "text/json", 'Access-Control-Allow-Origin': '*'})
          response.write(JSON.stringify({
            status:'false'
          }))
        }
        response.end()
        tasks.shift()
        uploadFile()
      })
    }
  }
  if(tasks.length==1) {
    uploadFile()
  }
}

http.createServer(function (req, res) {
  var content = ""
  if (req.url == url) {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.send(err)
        return
      }
      if (fields.secret != process.env.SECRET) {
        res.writeHead(200, {"Content-Type": "text/json", 'Access-Control-Allow-Origin': '*'})
        res.write(JSON.stringify({
          status: 'false',
          info: 'Secret key invalid.'
        }))
        res.end()
        return
      }
      if (!files.file) {
        res.writeHead(200, {"Content-Type": "text/json", 'Access-Control-Allow-Origin': '*'})
        log.error('File not found.')
        res.write(JSON.stringify({
          status: 'false',
          info: 'Please upload an image file.'
        }))
        res.end()
        return
      }
      addTask(files.file.path, res)
    })
  } else {
      res.writeHead(404, {"Content-Type": "text/plain", 'Access-Control-Allow-Origin': '*'})
      res.write('404 Not Found.')
      res.end()
  }
}).listen(port)

log.info(`App is running at ${port}`)