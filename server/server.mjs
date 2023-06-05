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
    const { title, description } = req.body;
    try {
      await createIdeas(title, description);
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
//edit
server.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const idea = await getIdeaById(id);
        res.json(idea);
    } catch (err) {
        console.log(err);
    }
});
//delete
server.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
    const result = await deleteIdea(id);
    res.json(result);
} catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Unable to delete the idea.' });
}
});


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
async function createIdeas(title, description, created_at) {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `INSERT INTO ideas (title, description, created_at) VALUES (?, ?, NOW())`;
        const dataIdeas = [title, description];
        const result = await connection.query(query, dataIdeas);
        return { success: true };
    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
}
async function getIdeaById(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `SELECT * FROM ideas WHERE id = ?`;
        const result = await connection.query(query, [id]);
        return result[0];
    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
}
async function deleteIdea(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `DELETE FROM ideas WHERE id = ?`;
        const result = await connection.query(query, [id]);
        return result;
    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
}
