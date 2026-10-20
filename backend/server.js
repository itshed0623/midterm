const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend'
})

if (db.getConnection()) {
    console.log('Database connected successfully!')
}


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

app.get('/api/user', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM products')
    res.json(rows);
})

app.post('/api/user', async (req, res) => {
    console.log(req.body.name);
    await db.query(`INSERT INTO user (name, role) VALUE ('${req.body.name}', '${req.body.color}')`);
})

app.delete('/api/user/:id', async (req, res) => {
    console.log('DELETE FROM user WHERE user_id = ', req.params.id);
    await db.query('DELETE FROM user WHERE user_id = ?', req.params.id);
})

app.listen(8080, () => {
    console.log('Server running 8080');
})   