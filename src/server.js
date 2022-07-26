const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 5000;

require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', require('./api/users.api'));

mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("db connect!")
  }).catch(() => {
    console.log("db connection failed!")
  })


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});