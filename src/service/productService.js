import productRepositories from "../repositories/productRepositories.js";

async function createProductService(nome, descricao, preco, categoria){
    const createProduct = await productRepositories.createProductRepositories(nome, descricao, preco, categoria)
    if(!createProduct) throw new Error("Erro ao criar produto.")
    return createProduct
    
}

async function updateProductService(updateProduct, productId){
    const updateProductResult = await productRepositories.updateProductRepositories(updateProduct, productId)
    if(!updateProductResult) throw new Error("Erro ao atualizar o produto.")
    return updateProductResult
}


async function deleteProductService(productId){
    const deleteProduct = await productRepositories.deleteProductRepositories(productId)
    if(!deleteProduct) throw new Error("Erro ao deletar o produto.")
    return deleteProduct
}

async function searchProductServiceByName(name){
    const searchProduct = await productRepositories.searchProductRepositoriesByName(name)
    if(!searchProduct) throw new Error("Erro ao buscar o nome do produto.")
    return searchProduct
}

async function searchProductServiceByCategory(categoria){
    const searchProduct = await productRepositories.searchProductRepositoriesByCategory(categoria)
    if(!searchProduct) throw new Error("Erro ao buscar a categoria do produto.")
    return searchProduct
}


async function findAllProductService(){
    const allProduct = await productRepositories.findAllProductRepositories()
    return allProduct
}



export default {
    createProductService,
    updateProductService,
    deleteProductService,
    searchProductServiceByName,
    findAllProductService,
    searchProductServiceByCategory

}