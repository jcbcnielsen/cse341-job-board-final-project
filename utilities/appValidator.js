const { body, param } = require("express-validator");
const appValidator = {};

appValidator.applicationIdRules = function() {}

appValidator.applicationCreationRules = function() {}

appValidator.applicationUpdateRules = function() {}

module.exports = appValidator;