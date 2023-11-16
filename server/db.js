const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://<username>:<password>@cluster0.zk3dzvo.mongodb.net/employee_db?retryWrites=true&w=majority'

module.exports = () => {
   return mongoose.connect(dbUri);
}