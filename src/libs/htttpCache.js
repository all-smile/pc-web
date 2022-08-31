const etag = require('etag')

const data = fs.readFilSeync('./img/04.jpg')
const etagContent = etag(data)

const ifNoneMatch = req.headers['if-none-match']

if (ifNoneMatch === etagContent) {
  res.statusCode = 304
  res.end()
  return
}

res.setHeader('etag', etagContent)
res.setHeader('Cache-Control','no-cache')
res.end(data)