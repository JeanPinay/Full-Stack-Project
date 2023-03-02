import mariadb from 'mariadb';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json()); 
server.use(cors());

//setup a pool for mariadb connection
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});
//execution
// (async () => {
//     let connection;
//     try {
//         connection = await pool.getConnection();
//         const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
//         console.log(data)
//     } catch(err) {
//         throw err;
//     } finally {
//         if (connection) connection.end();
//     }
// })()
// the wrapper around the connection & try-catch-finally is just nameless arrow function to create an asynchronous environment.
//read
server.get("/show-all", async (req, res) => {
    // database connection
    // execute query
    try{
        const data = await showAllIdeas()
        res.json({data : data})
        console.log(data)
        // res.send("OK")
    }catch(err){
        console.log(err)
    }

})

//create
server.post('/create', async (req, res) => {
    let title = req.body;
    let descript = req.body;
    try{
        const data = await createIdeas(title,descript)
        res.json(data)
        // console.log(data)
        // res.send("OK")
    }catch(err){
        console.log(err)
    }
})

server.listen(process.env.PORT, () => {
    console.log('Server is running'); //process.env to access the env file
})

  //functions to use
async function showAllIdeas(){
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM ideas`);
        console.log(data)
        return data
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
}
async function createIdeas( title, description){
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `INSERT INTO Ideas (Title, Description, Created_at) VALUES (?, ?, NOW())`; 
        const dataIdeas = [title, description]; 
        const result = await connection.query(query, dataIdeas); 
        console.log(result)
        return result; 
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
}