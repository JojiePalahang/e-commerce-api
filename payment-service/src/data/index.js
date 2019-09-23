"use strict";
const MongoClient = require("mongodb").MongoClient;
const config = require("../../config/index");
let db = null;

/**
 * NOTE:  Since POC not that strict with the data structure.
 */
module.exports.connect = function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            `mongodb://${config.DB_HOST}:${config.DB_PORT}`,
            function(err, client) {
                if (err) {
                    return reject(err);
                }
                db = client.db(config.DB_NAME);
                return resolve("Connected successfully to server");
            }
        );
    });
};

module.exports.insertOne = function insertOne(collection, params) {
    return new Promise((resolve, reject) => {
        const dbCollection = db.collection(collection);
        dbCollection.insertOne(params, (err, res) => {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
};

module.exports.updateOne = function update(collection, filter, params) {
    return new Promise((resolve, reject) => {
        const dbCollection = db.collection(collection);
        dbCollection.updateOne(
            filter,
            { $set: params },
            { upsert: false },
            (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

module.exports.findOne = function findOne(collection, filter) {
    return new Promise((resolve, reject) => {
        const dbCollection = db.collection(collection);
        dbCollection.findOne(filter, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports.deleteOne = function deleteOne(collection, filter) {
    return new Promise((resolve, reject) => {
        const dbCollection = db.collection(collection);
        dbCollection.deleteOne(filter, (err, res) => {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
};

module.exports.findAll = function findAll(collection, filter) {
    return new Promise((resolve, reject) => {
        const dbCollection = db.collection(collection);

        dbCollection
            .find(filter)
            .toArray((err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
    });
};
