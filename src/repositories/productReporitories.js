import db from "../consfig/database.js"

function createProductRepositories(nome, descricao, preco, categoria) {
    return new Promise((resolve, reject) => {
        db.run(
            `
            INSERT INTO produtos (nome, descricao, preco, categoria),
            VALUES (?, ?, ?, ?)
            `,
        [nome, descricao, preco, categoria],
        
        function (err){
            if(err){
                reject(err)
            } else {
                resolve({id: this.lastID})
            }
        }
    )
    })
}


function getAllProductRepositories() {
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
        const fields = [nome, descricao, preco, categoria]
        let query = "UPDATE produtos SET"
        const updates = []

        fields.forEach((field => {
            if(updateProduct[field] !== undefined){
                query += ` ${field} = ?,`
                updates.push(updateProduct(field))
            }
        }))

        if(updates.length === 0){
            return resolve({id: productId, updated: false, message: "Nenhum campo para atualizar."})
        }

        query = query.slice(0, -1)
        query += "WHERE id = ?"
        updates.push(productId)

        db.run(query, updates, function (err){
            if(err){
                reject(err)
            } else {
                resolve({
                    id: productId, 
                    updated: this.changes > 0,
                    changes: this.cahnges
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
            function (err){
                if(err){
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            }
        )
    })
}

function searchProductRepositories(search){
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT * FROM produtos WHERE nome LIKE ? OR categoria LIKE ?
            
            `,
            [`%${search}%`, `%${search}%`],

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
    getAllProductRepositories,
    deleteProductRepositories,
    updateProductRepositories,
    searchProductRepositories
}