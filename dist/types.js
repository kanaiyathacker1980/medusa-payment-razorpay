"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProviderKeys = exports.ErrorIntentStatus = exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    PAYMENT_INTENT_UNEXPECTED_STATE: "payment_intent_unexpected_state",
    UNSUPPORTED_OPERATION: "payment_intent_operation_unsupported",
};
exports.ErrorIntentStatus = {
    SUCCEEDED: "succeeded",
    CANCELED: "canceled",
};
exports.PaymentProviderKeys = {
    RAZORPAY: "razorpay",
    BAN_CONTACT: "razorpay-bancontact",
    BLIK: "razorpay-blik",
    GIROPAY: "razorpay-giropay",
    IDEAL: "razorpay-ideal",
    PRZELEWY_24: "razorpay-przelewy24",
};
//# sourceMappingURL=types.js.map