const util = require("util");

module.exports = util.promisify((time, cb) => setTimeout(cb, time));
