const { Joi } = require("celebrate");

module.exports = {
    OrderRules: {
        getAllOrders: {
            params: {
                accountNo: Joi.string().required()
            }
        },
        getOrderDetails: {
            params: {
                accountNo: Joi.string().required()
            },
            query: {
                orderRefNo: Joi.string().required()
            }
        },
        createOrder: {
            params: {
                accountNo: Joi.string().required()
            },
            body: {
                totalAmount: Joi.number().required(),
                orderList: Joi.array().required()
            }
        },
        cancelOrder: {
            params: {
                accountNo: Joi.string().required()
            },
            body: {
                orderRefNo: Joi.string().required(),
                reason: Joi.string().required(),
                remarks: Joi.string().required()
            }
        },
        confirmOrder: {
            params: {
                accountNo: Joi.string().required()
            },
            body: {
                orderRefNo: Joi.string().required(),
                paymentRefNo: Joi.string().required(),
                remarks: Joi.string().required()
            }
        },
        deliverOrder: {
            params: {
                accountNo: Joi.string().required()
            },
            body: {
                orderRefNo: Joi.string().required(),
                agentID: Joi.string().required(),
                remarks: Joi.string().required()
            }
        }
    }
};
