const ProductService = require('../services/productService');

class ProductController {

    static async create(req, res) {
        try {
            const product = await ProductService.create(req.data.id, req.body);
            res.status(201).send({ message: 'Product created successfully.', data: { product } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getProducts(req, res){
        try {
            const product = await ProductService.getProducts(req.params.id, req.query);
            res.status(200).send({ message: 'Product Details', data: { product }})
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await ProductService.updateProduct(req.data.id, req.params.id, req.body);
            res.status(200).send({ message: 'Product updated successfully.', data: { product }})
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }
    
    static async deleteProduct(req, res) {
        try {
            const product = await ProductService.deleteProduct(req.params.id);
            res.status(200).send({ message: 'Product deleted successfully.', data: { product }})
        } catch (error) {
            res.status(400).send({ message: error.message})
        }
    }

}

module.exports = ProductController;
