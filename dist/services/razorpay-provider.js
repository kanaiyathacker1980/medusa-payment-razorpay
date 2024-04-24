"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var razorpay_base_1 = __importDefault(require("../core/razorpay-base"));
var types_1 = require("../types");
var RazorpayProviderService = /** @class */ (function (_super) {
    __extends(RazorpayProviderService, _super);
    function RazorpayProviderService(_, options) {
        return _super.call(this, _, options) || this;
    }
    Object.defineProperty(RazorpayProviderService.prototype, "paymentIntentOptions", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    RazorpayProviderService.identifier = types_1.PaymentProviderKeys.RAZORPAY;
    return RazorpayProviderService;
}(razorpay_base_1.default));
exports.default = RazorpayProviderService;
//# sourceMappingURL=razorpay-provider.js.map