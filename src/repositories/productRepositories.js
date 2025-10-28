import db from "../config/database.js"

db.run(
    `
    CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    categoria TEXT NOT NULL
    )`
)

function createProductRepositories(nome, descricao, preco, categoria) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO produtos (nome, descricao, preco, categoria)
            VALUES (?, ?, ?, ?)
            `,
        [nome, descricao, preco, categoria],
        
        (err) =>{
            if(err){
                reject(err)
            } else {
                resolve({id: this.lastID})
            }
        }
    )
    })
}


function findAllProductRepositories() {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT * FROM produtos
            `,
        [],

        (err, rows) => {
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        }
    )
    })
}

function updateProductRepositories(updateProduct, productId){
    return new Promise((resolve, reject) => {
        const fields = ["nome", "descricao", "preco", "categoria"]
        let query = "UPDATE produtos SET"
        const updates = []

        fields.forEach((field => {
            if(updateProduct[field] !== undefined){
                query += ` ${field} = ?`
                updates.push(updateProduct[field])
            }
        }))

        if(updates.length === 0){
            return resolve({
                id: productId,
                updated: false, 
                message: "Nenhum campo para atualizar."
            })
        }

        query = query.slice(0, -1)
        query += " WHERE id = ?"
        updates.push(productId)

        db.run(query, updates, function (err){
            if(err){
                reject(err)
            } else {
                resolve({
                    id: productId, 
                    updated: this.changes > 0,
                    changes: this.changes
                })
            }
        })
    })
}

function deleteProductRepositories(id){
    return new Promise ((resolve, reject) => {
        db.run(
            `
            DELETE FROM produtos WHERE id = ?
            `,
            [id],
            (err) => {
                if(err){
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            }
        )
    })
}

function searchProductRepositoriesByName(nome){
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT * FROM produtos WHERE nome LIKE ?
            
            `,
            [`%${nome}%`],
            (err, rows) => {
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            }
        )
    })
}

function searchProductRepositoriesByCategory(categoria){
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT * FROM produtos WHERE categoria LIKE ?
            
            `,
            [`%${categoria}%`],
            (err, rows) => {
                if(err){
                    reject(err)
                } else {
                    resolve(rows)
                }
            }
        )
    })
}
 



export default {
    createProductRepositories,
    findAllProductRepositories,
    deleteProductRepositories,
    updateProductRepositories,
    searchProductRepositoriesByName,
    searchProductRepositoriesByCategory
}