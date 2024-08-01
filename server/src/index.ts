import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()
app.use(bodyParser.json())

// allow cross origin requests
app.use(
  cors({
    origin: '*',
  }),
)

app.use('/api/v1', routes)

app.listen(3001, () => {
  console.log('app listening on port 3001!')
})
