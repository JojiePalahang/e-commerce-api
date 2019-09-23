"use strict";
const logic = require("../services/payment.services")();
module.exports = () => {
    async function newPayment(req, res, next) {
        try {
            const { body } = req;
            const response = await logic.newPayment(body);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    async function checkPayment(req, res, next) {
        try {
            const { query } = req;
            const response = await logic.checkPayment(query);
            res.send(response);
        } catch (err) {
            return next(err);
        }
    }

    return {
        newPayment,
        checkPayment
    };
};
