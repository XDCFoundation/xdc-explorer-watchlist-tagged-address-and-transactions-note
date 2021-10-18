import mongoose from 'mongoose'
const fs = require('fs')




const fs = require('fs');



export default class DBConnection {
  static connect(dbUrl) {
    console.log('DB trying to connect on ' + new Date() + ' to url' + dbUrl)
    const caContent = [

      fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem"),

    ];

    const options = {

      keepAlive: 1,

      autoReconnect: true,

      poolSize: 10,

      ssl: true,

      sslValidate: false,

      sslCA: caContent,

      useNewUrlParser: true,

      useUnifiedTopology: true,

      useCreateIndex: true,

      retryWrites: false,
    }
    return mongoose.connect(dbUrl, options)
  }
}