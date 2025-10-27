import productRepositories from "../repositories/productRepositories.js";

async function createProductService(nome, descricao, preco, categoria){
    const createProduct = await productRepositories.createProductRepositories(nome, descricao, preco, categoria)
    if(!createProduct) throw new Error("Erro ao criar produto.")
    return createProduct
    
}

async function updateProductService(updateProduct, productId){
    const updateProductResult = await productRepositories.updateProductRepositories(updateProduct, productId)
    if(!updateProductResult) throw new Error("Erro ao atulizar o produto.")
    return updateProductResult
}


async function deleteProductService(productId){
    const deleteProduct = await productRepositories.deleteProductRepositories(productId)
    if(!deleteProduct) throw new Error("Erro ao deletat o produto.")
    return deleteProduct
}

async function searchProductService(search){
    const searchProduct = await productRepositories.searchProductRepositories(search)
    if(!searchProduct) throw Error("Erro ao buscar o produto.")
    return searchProduct
}

export default {
    createProductService,
    updateProductService,
    deleteProductService,
    searchProductService
}