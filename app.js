const express = require('express');
const dataRouter = require('./routes/dataRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', dataRouter);

app.get('/test', (req, res) => {
    res.send('Server working correctly');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) });