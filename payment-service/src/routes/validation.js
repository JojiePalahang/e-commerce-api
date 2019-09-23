const { Joi } = require("celebrate");

module.exports = {
    PaymentRules: {
        NewPayment: {
            body: {
                accountNo: Joi.string().required(),
                paymentTransRefNo: Joi.string().required(),
                transactionDetails: Joi.object().required()
            }
        },
        CheckPayment: {
            query: {
                accountNo: Joi.string().required(),
                paymentTransRefNo: Joi.string().required(),
            }
        }
    }
};
