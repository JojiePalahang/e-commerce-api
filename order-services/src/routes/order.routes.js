const controller = require("../controllers/order.controller")();
const { celebrate } = require("celebrate");
const { OrderRules } = require("./validation");
module.exports = router => {
    /**
     * @typedef  newOrder
     * @property {number} totalAmount
     * @property {Array<object>} orderList
     */

    /**
    * @typedef  cancelOrder
    * @property {string} orderRefNo
    * @property {string} reason
    * @property {string} remarks
    */

    /**
    * @typedef  confirmOrder
    * @property {string} orderRefNo
    * @property {string} paymentRefNo
    * @property {string} remarks
    */

    /**
     * @typedef  deliverOrder
     * @property {string} orderRefNo
     * @property {string} agentID
     * @property {string} remarks
     */

    /**
     * Get all order
     * @route GET /order/{accountNo}/all
     * @param { string } accountNo.path.required
     * @produces application/json
     * @consumes application/json
     */
    router.get("/:accountNo/all", celebrate(OrderRules.getAllOrders), controller.getListOfOrders);

    /**
     * Get Order Details for Checking Status
     * @route GET /order/{accountNo}
     * @param { string } accountNo.path.required
     * @param { string } orderRefNo.query.required
     * @produces application/json
     * @consumes application/json
     */
    router.get("/:accountNo", celebrate(OrderRules.getOrderDetails), controller.checkOrderStatus);

    /**
     * Add new Order to Account
     * @route POST /order/{accountNo}
     * @param { string } accountNo.path.required
     * @param { newOrder.model } newOrder.body.required
     * @produces application/json
     * @consumes application/json
     */
    router.post("/:accountNo", celebrate(OrderRules.createOrder), controller.createOrder);

    /**
    * Cancel Order
    * @route PUT /order/{accountNo}/cancel
    * @param { string } accountNo.path.required
    * @param { cancelOrder.model } cancelOrder.body.required
    * @produces application/json
    * @consumes application/json
    */

    router.put("/:accountNo/cancel", celebrate(OrderRules.cancelOrder), controller.cancelOrder);

    /**
     * Confirm Order
     * NOTE: Depends on the payment strategy this could be Service to Sevice call.
     * @route PUT /order/{accountNo}/confirmed
     * @param { string } accountNo.path.required
     * @param { confirmOrder.model } confirmOrder.body.required
     * @produces application/json
     * @consumes application/json
     */
    router.put("/:accountNo/confirmed", celebrate(OrderRules.confirmOrder), controller.confirmOrder);

    /**
     * Delivery Confirmation.
     * @route PUT /order/{accountNo}/delivered
     * @param { string } accountNo.path.required
     * @param { deliverOrder.model } deliverOrder.body.required
     * @produces application/json
     * @consumes application/json
     */
    router.put("/:accountNo/delivered", celebrate(OrderRules.deliverOrder), controller.deliveryConfirmationOrder);

    return router;
};
