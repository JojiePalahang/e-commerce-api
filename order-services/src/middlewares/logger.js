const winston = require("winston");
const uuid = require("uuid/v4");
const DailyRotateFile = require("winston-daily-rotate-file");

const folderpath = "./logs/";
module.exports = () => {
    const logger = winston.createLogger({
        transports: [
            new DailyRotateFile({
                name: "errorlog",
                datePattern: "YYYY-MM-DD",
                prepend: true,
                filename: `${folderpath}error-log`,
                level: "error"
            }),
            new DailyRotateFile({
                name: "infolog",
                datePattern: "YYYY-MM-DD",
                prepend: true,
                filename: `${folderpath}info-log`,
                level: "info"
            })
        ]
    });

    const profileLogger = winston.createLogger({
        transports: [
            new DailyRotateFile({
                name: "requestLogger",
                datePattern: "YYYY-MM-DD",
                prepend: true,
                filename: `${folderpath}profile-log`,
                level: "info"
            })
        ]
    });

    function profileLog(req, res, next) {
        const sessionid = uuid();
        profileLogger.profile(`${sessionid}`);
        next();
        profileLogger.profile(`${sessionid}`);
    };

    function errorLog(err, req, res, next) {
        logger.error(err.stack);
        next(err);
    };

    return { profileLog, logger, errorLog };
};
