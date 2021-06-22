"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var InputValidator_1 = require("./InputValidator");
var InputPhoneNumber = function (_a) {
    var setIsValid = _a.setIsValid, value = _a.value, onChange = _a.onChange, type = _a.type, name = _a.name, placeholder = _a.placeholder;
    return (React.createElement(InputValidator_1.default, { validator: 2 /* PhoneNumber */, setIsValid: setIsValid, type: type, name: name, value: value, onChange: onChange, placeholder: placeholder }));
};
exports.default = InputPhoneNumber;
//# sourceMappingURL=InputPhoneNumber.js.map