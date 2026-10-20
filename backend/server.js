const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();



app.use(express.json());
app.use(cors());

let fruit = [
    {
        id: 1,
        name: 'Apple',
        color: 'Red'
    },
    {
        id: 2,
        name: 'Banana',
        color: 'Yellow'
    }
]

app.get('/api/user', (req, res) => {
    res.json(fruit);
})


app.listen(PORT, () => {
    console.log('Server running 8080');
})   