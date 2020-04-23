const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send('Server working correctly');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) });