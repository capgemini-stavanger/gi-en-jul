"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var isMobilePhone_1 = require("validator/lib/isMobilePhone");
var InputValidator = function (_a) {
    var validator = _a.validator, setIsValid = _a.setIsValid, value = _a.value, onChange = _a.onChange, type = _a.type, name = _a.name, placeholder = _a.placeholder;
    function isNotNull(inputValue) {
        return !!value;
    }
    function isPhoneNumber(inputValue) {
        // Returns true if norwegian number or foreign number starting with +{countryCode}
        return !!(isMobilePhone_1.default(value, ["nb-NO", "nn-NO"]) ||
            (inputValue && inputValue.startsWith("+") && isMobilePhone_1.default(value)));
    }
    function validate(inputValue) {
        setIsValid((!(validator & 1 /* NotNull */) || isNotNull(inputValue)) &&
            (!(validator & 2 /* PhoneNumber */) || isPhoneNumber(inputValue)));
    }
    react_1.useEffect(function () {
        validate(value);
    });
    return (React.createElement("div", null,
        React.createElement("input", { type: type, name: name, value: value, onChange: onChange, placeholder: placeholder })));
};
exports.default = InputValidator;
//# sourceMappingURL=InputValidator.js.map