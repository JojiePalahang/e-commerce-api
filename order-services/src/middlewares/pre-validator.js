const { isCelebrate } = require("celebrate");

module.exports = (err, req, res, next) => {
    if (isCelebrate(err)) {
        res.status(400).send({ error: err.data || err.message || err });
    } else {
        res.status(err.status || 500).send({ error: err.data || err.message || err });
    }
};
