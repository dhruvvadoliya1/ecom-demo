const OrderService = require('../services/orderService');

class OrderController {

    static async addOrder(req, res) {
        try {
            const order = await OrderService.addOrder(req.data.id, req.body);
            res.status(201).send({ message: 'Order added successfully.', data: { order } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getReciept(req, res) {
        try {
            const order = await OrderService.generateOrderReceipt(req.params.id);
            res.status(200).send({ data: { order } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async updateOrderStatus(req, res) {
        try {
            const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
            res.status(200).send({ message: 'Order status updated successfully.', data: { order } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async getOrders(req, res) {
        try {
            const orders = await OrderService.getOrders(req.query);
            res.status(200).send({ data: { orders } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

}

module.exports = OrderController;
