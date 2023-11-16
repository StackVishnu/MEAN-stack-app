const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//local imports
const connectDb = require('./db.js')
const app = express();
const employeeRoutes = require('./controllers/employee.controller')
const {errorHandler} = require('./middlewares')
//middleware
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4200'}))
app.use('/api/employees', employeeRoutes)
app.use(errorHandler)//this will only catch errors caught by the routes added prior.

connectDb()
  .then(()=>{
    console.log('db connection succeeded')
    app.listen(3000, ()=> console.log('server started at 3000'))
  })
  .catch(error => console.log(error))