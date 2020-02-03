const express = require('express')
const app = express()

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.send('Huh?')
})

app.listen(3000, () => console.log('Listening on Port 3000'))