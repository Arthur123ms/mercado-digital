import sqlite3 from "sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, "..", "database", "mercado-digital.db")

const db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.log("Erro ao conectar com o banco de dados:", err.message)
    } else {
        console.log("Conectado ao banco de dados SQLite.")
    }
})


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            preco REAL NOT NULL,
            categoria TEXT,
            )
        `)
})



export default db