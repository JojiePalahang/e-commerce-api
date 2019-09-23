"use strict";
const db = require("../data");
const genericResponses = require("../controllers/generic-response");
const uuid = require("uuid/v4");

/**
 * NOTE : Just for the Demo.
 *  Security and extra business logic can be added.
 *  I don't track history it could be another microservice.
 *  No Fail - depends on business logic behind.
 */
module.exports = () => {
    async function newPayment({ accountNo, paymentTransRefNo, transactionDetails }) {
        try {
            const paymentRefNo = uuid();
            const paymentDetails = {
                accountNo,
                paymentTransRefNo,
                paymentRefNo,
                transactionDetails,
                status: "Payment Confirmed",
                PaidDate: new Date().getTime()
            };
            await db.insertOne("payment", paymentDetails);
            return { ...genericResponses.saveSuccess, paymentRefNo };
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }

    async function checkPayment({ accountNo, paymentTransRefNo }) {
        try {
            const paymentDetails = await db.findOne("payment", { accountNo, paymentTransRefNo });
            if (!paymentDetails) {
                return genericResponses.validation("Payment is not yet made.");
            }
            return genericResponses.sendResult(paymentDetails.status);
        } catch (err) {
            return genericResponses.serverError(err);
        }
    }
    return {
        newPayment,
        checkPayment
    };
};
