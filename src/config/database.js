import sqlite3 from "sqlite3"

const db = new sqlite3.Database("./mercado-digital.db", (err) => {
    if(err){
        console.log("Erro ao conectar com o banco de dados: ", err.message)
    } else {
        console.log("Conectado com o banco de dados com sucesso!")
    }
})


export default db