const controller = require("../controllers/payment.controller")();
const { celebrate } = require("celebrate");
const { PaymentRules } = require("./validation");
module.exports = router => {
    /**
    * @typedef  newPayment
    * @property {string} accountNo
    * @property {string} paymentTransRefNo
    * @property {object} transactionDetails  - amount, bank deetail
    * 
    */

    /**
     * Payment assuming this payment gateway.
     * Note: Validation may differ from other vendor.
     * @route POST /payment
     * @param { newPayment.model } newPayment.body.required
     * @produces application/json
     * @consumes application/json
     */

    router.post("", celebrate(PaymentRules.NewPayment), controller.newPayment);

    /**
     * Check Payment Status
     * Note: Validation may differ from other vendor.
     * @route GET /payment
     * @param { string } accountNo.query.required
     * @param { string } paymentTransRefNo.query.required
     * @produces application/json
     * @consumes application/json
     */
    router.get("", celebrate(PaymentRules.CheckPayment), controller.checkPayment);

    return router;
};
