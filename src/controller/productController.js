import productService from "../service/productService.js";

async function createProductController(req, res){
    const newProduct = req.body

    try{
        const createProduct = await productService.createProductService(
            newProduct.nome,
            newProduct.descricao,
            newProduct.preco,
            newProduct.categoria
        )
        res.status(201).send(createProduct)

    } catch (error) {
        res.status(400).send({message: error.message})

    }
}

async function updateProductController(req, res){
    const updateProduct = req.body
    const productId = req.params.id
    
    try{
        const updateProductResult = await productService.updateProductService(updateProduct, productId)
        res.status(201).send(updateProductResult)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function findAllProductController(req, res){
    try{
        const allProduct = await productService.findAllProductService()
        res.status(200).send(allProduct)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function deleteProductController(req, res){
    const productId = req.params.id

    try{
        const deleteProduct = await productService.deleteProductService(productId)
        res.status(200).send(deleteProduct)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function searchProductControllerByName(req, res){
    const searchNome = req.query.nome

    try{
        const searchProduct = await productService.searchProductServiceByName(searchNome)
        res.status(200).send(searchProduct)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

async function searchProductControllerByCategory(req, res){
    const searchCategoria = req.query.categoria

    try{
        const searchProduct = await productService.searchProductServiceByCategory(searchCategoria)
        res.status(200).send(searchProduct)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

export default {
    createProductController,
    updateProductController,
    findAllProductController,
    deleteProductController,
    searchProductControllerByName,
    searchProductControllerByCategory
}