import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import CORS from 'cors'
import routes from './routes'

const PORT = process.env.PORT || 59954

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}
const app = express()

app.use(logger('dev'))  

app.set('port', PORT)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(CORS(corsOptions))
app.use('/', routes)
app.use("/uploads", express.static('./uploads/'))
app.listen(PORT, () => console.log(`Running on PORT ${PORT}`))