"use strict";
const logic = require("../services/order.services")();
module.exports = () => {
    async function getListOfOrders(req, res, next) {
        try {
            const { params } = req;
            const response = await logic.getListOfOrders(params);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    async function checkOrderStatus(req, res, next) {
        try {
            const { params, query } = req;
            const response = await logic.checkOrderStatus(params, query);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    async function createOrder(req, res, next) {
        try {
            const { body, params } = req;
            const response = await logic.createOrder(params, body);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    async function cancelOrder(req, res, next) {
        try {
            const { body, params } = req;
            const response = await logic.cancelOrder(params, body);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    async function confirmOrder(req, res, next) {
        try {
            const { body, params } = req;
            const response = await logic.confirmOrder(params, body);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    async function deliveryConfirmationOrder(req, res, next) {
        try {
            const { params, body } = req;
            const response = await logic.deliveryConfirmationOrder(params, body);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    return {
        getListOfOrders,
        checkOrderStatus,
        createOrder,
        cancelOrder,
        confirmOrder,
        deliveryConfirmationOrder
    };
};
