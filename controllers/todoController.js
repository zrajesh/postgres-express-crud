const pool = require("../db");

exports.createTodo = async (req, res) => {
    try {
        const {text} = req.body;
        const todo = await pool.query(
            "INSERT INTO todo (text) VALUES ($1) RETURNING *", 
            [text]
        );
        const {rows} = todo;
        res.status(200).json(rows[0]);
    } catch (error) {
        console.log("ERR: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getTodos = async (req, res) => {
    try {
        const todos = await pool.query(
            "SELECT * FROM todo"
        );
        const {rows} = todos;
        res.status(200).json(rows);
    } catch (error) {
        console.log("ERR: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getTodo = async (req, res) => {
    const {id} = req.params;
    try {
        const todos = await pool.query(
            "SELECT * FROM todo WHERE id = $1", 
            [id]
        );
        const {rows} = todos;
        res.status(200).json(rows);
    } catch (error) {
        console.log("ERR: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const {text} = req.body;
        const todo = await pool.query(
            "UPDATE todo SET text = $1 WHERE id = $2 RETURNING *",
            [text, id]
        );
        const {rows} = todo;
        res.status(200).json(rows[0]);
    } catch (error) {
        console.log("ERR: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "DELETE FROM todo WHERE id = $1 RETURNING *",
            [id]
        );
        const {rows} = todo;
        res.status(200).json({
            msg: `${rows[0].text} Todo Deleted Successfully`,
            id: rows[0].id,
        });
    } catch (error) {
        console.log("ERR: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
