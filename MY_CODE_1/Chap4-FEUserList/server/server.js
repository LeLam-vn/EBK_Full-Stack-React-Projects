import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'

//Test server run
app.listen(config.port, (error) =>{
    if(error)
        console.log(error)
    console.info('Server is starting on port %s.', config.port)
})

//Connecting to MongoDB
mongoose.Promise = global.Promise
mongoose.connect (config.mongoUri,{ useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.on('error', () => {
    throw new Error(`unable to database:$ {mongoUri}`)
})