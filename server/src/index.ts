import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()
app.use(bodyParser.json())

app.use(cors())

app.use('/api/v1', routes)

app.listen(3001, () => {
  console.log('app listening on port 3001!')
})
