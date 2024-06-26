"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentHook = exports.buildError = exports.isPaymentCollection = exports.constructWebhook = void 0;
var medusa_1 = require("@medusajs/medusa");
var medusa_core_utils_1 = require("medusa-core-utils");
var os_1 = require("os");
var PAYMENT_PROVIDER_KEY = "pp_razorpay";
function constructWebhook(_a) {
    var signature = _a.signature, body = _a.body, container = _a.container;
    var razorpayProviderService = container.resolve(PAYMENT_PROVIDER_KEY);
    return razorpayProviderService.constructWebhookEvent(body, signature);
}
exports.constructWebhook = constructWebhook;
function isPaymentCollection(id) {
    return id && id.startsWith("paycol");
}
exports.isPaymentCollection = isPaymentCollection;
function buildError(event, err) {
    var _a, _b, _c;
    var message = "Razorpay webhook ".concat(event, " handling failed.").concat(os_1.EOL).concat((_a = err === null || err === void 0 ? void 0 : err.stack) !== null && _a !== void 0 ? _a : err === null || err === void 0 ? void 0 : err.message, ".");
    if ((err === null || err === void 0 ? void 0 : err.name) === medusa_1.PostgresError.SERIALIZATION_FAILURE) {
        message = "Razorpay webhook ".concat(event, " handle failed. This can happen when this webhook is triggered during a cart completion and can be ignored. This event should be retried automatically.").concat(os_1.EOL).concat((_b = err === null || err === void 0 ? void 0 : err.stack) !== null && _b !== void 0 ? _b : err === null || err === void 0 ? void 0 : err.message, ".");
    }
    if ((err === null || err === void 0 ? void 0 : err.message) === "409") {
        message = "Razorpay webhook ".concat(event, " handle failed.").concat(os_1.EOL).concat((_c = err === null || err === void 0 ? void 0 : err.stack) !== null && _c !== void 0 ? _c : err === null || err === void 0 ? void 0 : err.message, ".");
    }
    return message;
}
exports.buildError = buildError;
function handlePaymentHook(_a) {
    var _b;
    var event = _a.event, container = _a.container, paymentIntent = _a.paymentIntent;
    return __awaiter(this, void 0, void 0, function () {
        var logger, cartId, resourceId, _c, err_1, message, err_2, message, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    logger = container.resolve("logger");
                    cartId = (_b = paymentIntent.metadata.cart_id) !== null && _b !== void 0 ? _b : paymentIntent.metadata.resource_id;
                    resourceId = paymentIntent.metadata.resource_id;
                    _c = event.type;
                    switch (_c) {
                        case "payment_intent.succeeded": return [3 /*break*/, 1];
                        case "payment_intent.amount_capturable_updated": return [3 /*break*/, 5];
                        case "payment_intent.payment_failed": return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 10];
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, onPaymentIntentSucceeded({
                            eventId: event.id,
                            paymentIntent: paymentIntent,
                            cartId: cartId,
                            resourceId: resourceId,
                            isPaymentCollection: isPaymentCollection(resourceId),
                            container: container,
                        })];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _d.sent();
                    message = buildError(event.type, err_1);
                    logger.warn(message);
                    return [2 /*return*/, { statusCode: 409 }];
                case 4: return [3 /*break*/, 11];
                case 5:
                    _d.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, onPaymentAmountCapturableUpdate({
                            eventId: event.id,
                            cartId: cartId,
                            container: container,
                        })];
                case 6:
                    _d.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _d.sent();
                    message = buildError(event.type, err_2);
                    logger.warn(message);
                    return [2 /*return*/, { statusCode: 409 }];
                case 8: return [3 /*break*/, 11];
                case 9:
                    {
                        message = paymentIntent.last_payment_error &&
                            paymentIntent.last_payment_error.message;
                        logger.error("The payment of the payment intent ".concat(paymentIntent.id, " has failed").concat(os_1.EOL).concat(message));
                        return [3 /*break*/, 11];
                    }
                    _d.label = 10;
                case 10: return [2 /*return*/, { statusCode: 204 }];
                case 11: return [2 /*return*/, { statusCode: 200 }];
            }
        });
    });
}
exports.handlePaymentHook = handlePaymentHook;
function onPaymentIntentSucceeded(_a) {
    var eventId = _a.eventId, paymentIntent = _a.paymentIntent, cartId = _a.cartId, resourceId = _a.resourceId, isPaymentCollection = _a.isPaymentCollection, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var manager;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    manager = container.resolve("manager");
                    return [4 /*yield*/, manager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!isPaymentCollection) return [3 /*break*/, 2];
                                        return [4 /*yield*/, capturePaymenCollectiontIfNecessary({
                                                paymentIntent: paymentIntent,
                                                resourceId: resourceId,
                                                container: container,
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 2: return [4 /*yield*/, completeCartIfNecessary({
                                            eventId: eventId,
                                            cartId: cartId,
                                            container: container,
                                            transactionManager: transactionManager,
                                        })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, capturePaymentIfNecessary({
                                                cartId: cartId,
                                                transactionManager: transactionManager,
                                                container: container,
                                            })];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function onPaymentAmountCapturableUpdate(_a) {
    var eventId = _a.eventId, cartId = _a.cartId, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var manager;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    manager = container.resolve("manager");
                    return [4 /*yield*/, manager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, completeCartIfNecessary({
                                            eventId: eventId,
                                            cartId: cartId,
                                            container: container,
                                            transactionManager: transactionManager,
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function capturePaymenCollectiontIfNecessary(_a) {
    var _b;
    var paymentIntent = _a.paymentIntent, resourceId = _a.resourceId, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var manager, paymentCollectionService, paycol, payment_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    manager = container.resolve("manager");
                    paymentCollectionService = container.resolve("paymentCollectionService");
                    return [4 /*yield*/, paymentCollectionService
                            .retrieve(resourceId, { relations: ["payments"] })
                            .catch(function () { return undefined; })];
                case 1:
                    paycol = _c.sent();
                    if (!((_b = paycol === null || paycol === void 0 ? void 0 : paycol.payments) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 3];
                    payment_1 = paycol.payments.find(function (pay) { return pay.data.id === paymentIntent.id; });
                    if (!(payment_1 && !payment_1.captured_at)) return [3 /*break*/, 3];
                    return [4 /*yield*/, manager.transaction(function (manager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, paymentCollectionService
                                            .withTransaction(manager)
                                            .capture(payment_1.id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function capturePaymentIfNecessary(_a) {
    var cartId = _a.cartId, transactionManager = _a.transactionManager, container = _a.container;
    return __awaiter(this, void 0, void 0, function () {
        var orderService, order;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    orderService = container.resolve("orderService");
                    return [4 /*yield*/, orderService
                            .withTransaction(transactionManager)
                            .retrieveByCartId(cartId)
                            .catch(function () { return undefined; })];
                case 1:
                    order = _b.sent();
                    if (!((order === null || order === void 0 ? void 0 : order.payment_status) !== "captured")) return [3 /*break*/, 3];
                    return [4 /*yield*/, orderService
                            .withTransaction(transactionManager)
                            .capturePayment(order.id)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function completeCartIfNecessary(_a) {
    var _b;
    var eventId = _a.eventId, cartId = _a.cartId, container = _a.container, transactionManager = _a.transactionManager;
    return __awaiter(this, void 0, void 0, function () {
        var orderService, order, completionStrat, cartService, idempotencyKeyService, idempotencyKeyServiceTx, idempotencyKey, cart, _c, response_code, response_body;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    orderService = container.resolve("orderService");
                    return [4 /*yield*/, orderService
                            .retrieveByCartId(cartId)
                            .catch(function () { return undefined; })];
                case 1:
                    order = _d.sent();
                    if (!!order) return [3 /*break*/, 7];
                    completionStrat = container.resolve("cartCompletionStrategy");
                    cartService = container.resolve("cartService");
                    idempotencyKeyService = container.resolve("idempotencyKeyService");
                    idempotencyKeyServiceTx = idempotencyKeyService.withTransaction(transactionManager);
                    return [4 /*yield*/, idempotencyKeyServiceTx
                            .retrieve({
                            request_path: "/razorpay/hooks",
                            idempotency_key: eventId,
                        })
                            .catch(function () { return undefined; })];
                case 2:
                    idempotencyKey = _d.sent();
                    if (!!idempotencyKey) return [3 /*break*/, 4];
                    return [4 /*yield*/, idempotencyKeyService
                            .withTransaction(transactionManager)
                            .create({
                            request_path: "/razorpay/hooks",
                            idempotency_key: eventId,
                        })];
                case 3:
                    idempotencyKey = _d.sent();
                    _d.label = 4;
                case 4: return [4 /*yield*/, cartService
                        .withTransaction(transactionManager)
                        .retrieve(cartId, { select: ["context"] })];
                case 5:
                    cart = _d.sent();
                    return [4 /*yield*/, completionStrat
                            .withTransaction(transactionManager)
                            .complete(cartId, idempotencyKey, { ip: (_b = cart.context) === null || _b === void 0 ? void 0 : _b.ip })];
                case 6:
                    _c = _d.sent(), response_code = _c.response_code, response_body = _c.response_body;
                    if (response_code !== 200) {
                        throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.UNEXPECTED_STATE, response_body["message"], response_body["code"]);
                    }
                    _d.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=utils.js.map