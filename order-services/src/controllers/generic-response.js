"use strict";
module.exports = {
    saveSuccess: {
        code: 1001,
        message: "Record added successfully."
    },
    updateSuccess: {
        code: 1002,
        message: "Record amended successfully."
    },
    sendResult: (data) => {
        return {
            code: 1000,
            message: "Success",
            data
        };
    },
    notFound: (item) => {
        return {
            code: 3001,
            message: `${item} not found.`,  // eslint-disable-line
        };
    },
    validation: (message) => {
        return {
            code: 3001,
            message: `${message}`,  // eslint-disable-line
        };
    },
    serverError: (error) => {
        return {
            code: 5001,
            message: "Something went wrong, Please try again.",
            error
        };
    }
};
