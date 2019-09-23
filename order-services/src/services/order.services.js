"use strict";
const db = require("../data");
const genericResponses = require("../controllers/generic-response");
const uuid = require("uuid/v4");

/**
 * NOTE : Just for the Demo.
 *  Security and extra business logic can be added.
 *  I don't track history it could be another microservice.
 */
module.exports = () => {
    async function getListOfOrders({ accountNo }) {
        try {
            const data = await db.findAll("orders", { accountNo });
            return genericResponses.sendResult(data);
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }

    async function createOrder({ accountNo }, { totalAmount, orderList }) {
        try {
            const orderRefNo = uuid();
            const paymentTransRefNo = uuid();
            const orderDetails = {
                orderRefNo,
                paymentTransRefNo,
                accountNo,
                totalAmount,
                orderList,
                status: "Pending Payment",
                CreateDate: new Date().getTime()
            };
            await db.insertOne("orders", orderDetails);
            return genericResponses.saveSuccess;
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }

    /**
     * Reason : could be ID or Description - its like common cancellation Reason
     */
    async function cancelOrder({ accountNo }, { orderRefNo, reason, remarks }) {
        try {
            const orderDetails = await db.findOne("orders", { accountNo, orderRefNo });
            if (!orderDetails) {
                return genericResponses.notFound("Order");
            }

            const orderUpdate = { reason, remarks, status: "Cancelled", CancelDate: new Date().getTime() };

            await db.updateOne("orders", { accountNo, orderRefNo }, orderUpdate);
            return genericResponses.updateSuccess;
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }

    async function confirmOrder({ accountNo }, { orderRefNo, paymentRefNo, remarks }) {
        try {
            const orderDetails = await db.findOne("orders", { accountNo, orderRefNo });
            if (!orderDetails) {
                return genericResponses.notFound("Order");
            }

            if (orderDetails.status !== "Pending Payment") {
                return genericResponses.validation("Order is not valid for payment confirmation.");
            }

            const orderUpdate = { paymentRefNo, remarks, status: "Confirmed", ConfirmedDate: new Date().getTime() };

            await db.updateOne("orders", { accountNo, orderRefNo }, orderUpdate);
            return genericResponses.updateSuccess;
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }

    async function deliveryConfirmationOrder({ accountNo }, { orderRefNo, agentID, remarks }) {
        try {
            const orderDetails = await db.findOne("orders", { accountNo, orderRefNo });
            if (!orderDetails) {
                return genericResponses.notFound("Order");
            }

            if (orderDetails.status !== "Confirmed") {
                return genericResponses.validation("Order is not valid for delivery confirmation.");
            }

            const orderUpdate = { agentID, remarks, status: "Delivered", DeliveryDate: new Date().getTime() };

            await db.updateOne("orders", { accountNo, orderRefNo }, orderUpdate);
            return genericResponses.updateSuccess;
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }

    async function checkOrderStatus({ accountNo }, { orderRefNo }) {
        try {
            const orderDetails = await db.findOne("orders", { accountNo, orderRefNo });
            if (!orderDetails) {
                return genericResponses.notFound("Order");
            }
            return genericResponses.sendResult(orderDetails);
        } catch (err) {
            return genericResponses.serverError(err);
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
