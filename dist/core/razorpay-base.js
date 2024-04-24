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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var razorpay_1 = __importDefault(require("razorpay"));
var os_1 = require("os");
var medusa_1 = require("@medusajs/medusa");
var types_1 = require("../types");
var utils_1 = require("@medusajs/utils");
var crypto_1 = __importDefault(require("crypto"));
/**
 * The paymentIntent object corresponds to a razorpay order.
 *
 */
var RazorpayBase = /** @class */ (function (_super) {
    __extends(RazorpayBase, _super);
    function RazorpayBase(container, options) {
        var _this = _super.call(this, container, options) || this;
        _this.options_ = options;
        _this.logger = container.logger;
        _this.cartService = container.cartService;
        _this.customerService = container.customerService;
        _this.init();
        return _this;
    }
    RazorpayBase.prototype.init = function () {
        var _a;
        this.razorpay_ =
            this.razorpay_ ||
                new razorpay_1.default({
                    key_id: this.options_.key_id,
                    key_secret: this.options_.key_secret,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Razorpay-Account": (_a = this.options_.razorpay_account) !== null && _a !== void 0 ? _a : undefined,
                    },
                });
    };
    RazorpayBase.prototype.getPaymentIntentOptions = function () {
        var _a, _b, _c;
        var options = {};
        if ((_a = this === null || this === void 0 ? void 0 : this.paymentIntentOptions) === null || _a === void 0 ? void 0 : _a.capture_method) {
            options.capture_method = this.paymentIntentOptions.capture_method;
        }
        if ((_b = this === null || this === void 0 ? void 0 : this.paymentIntentOptions) === null || _b === void 0 ? void 0 : _b.setup_future_usage) {
            options.setup_future_usage = this.paymentIntentOptions.setup_future_usage;
        }
        if ((_c = this === null || this === void 0 ? void 0 : this.paymentIntentOptions) === null || _c === void 0 ? void 0 : _c.payment_method_types) {
            options.payment_method_types =
                this.paymentIntentOptions.payment_method_types;
        }
        return options;
    };
    RazorpayBase.prototype._validateSignature = function (razorpay_payment_id, razorpay_order_id, razorpay_signature) {
        var body = razorpay_order_id + "|" + razorpay_payment_id;
        var expectedSignature = crypto_1.default
            .createHmac("sha256", this.options_.key_secret)
            .update(body.toString())
            .digest("hex");
        return expectedSignature === razorpay_signature;
    };
    RazorpayBase.prototype.getRazorpayPaymentStatus = function (paymentIntent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!paymentIntent) {
                    return [2 /*return*/, medusa_1.PaymentSessionStatus.ERROR];
                }
                return [2 /*return*/, medusa_1.PaymentSessionStatus.AUTHORIZED];
            });
        });
    };
    RazorpayBase.prototype.getPaymentStatus = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, paymentIntent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = paymentSessionData.id;
                        return [4 /*yield*/, this.razorpay_.orders.fetch(id)];
                    case 1:
                        paymentIntent = _b.sent();
                        _a = paymentIntent.status;
                        switch (_a) {
                            case "created": return [3 /*break*/, 2];
                            case "paid": return [3 /*break*/, 3];
                            case "attempted": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [2 /*return*/, medusa_1.PaymentSessionStatus.REQUIRES_MORE];
                    case 3: return [2 /*return*/, medusa_1.PaymentSessionStatus.AUTHORIZED];
                    case 4: return [4 /*yield*/, this.getRazorpayPaymentStatus(paymentIntent)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/, medusa_1.PaymentSessionStatus.PENDING];
                }
            });
        });
    };
    RazorpayBase.prototype.updateRazorpayMetadatainCustomer = function (customer, parameterName, parameterValue) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, razorpay, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = customer.metadata;
                        razorpay = metadata === null || metadata === void 0 ? void 0 : metadata.razorpay;
                        if (razorpay) {
                            razorpay[parameterName] = parameterValue;
                        }
                        else {
                            razorpay = {};
                            razorpay[parameterName] = parameterValue;
                        }
                        if (!metadata) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.customerService.update(customer.id, {
                                metadata: __assign(__assign({}, metadata), { razorpay: razorpay }),
                            })];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.customerService.update(customer.id, {
                            metadata: {
                                razorpay: razorpay,
                            },
                        })];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    // @Todo refactor this function to 3 simple functions to make it more readable
    // 1. check existing customer
    // 2. create customer
    // 3. update customer
    RazorpayBase.prototype.editExistingRpCustomer = function (customer, cart, intentRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var razorpayCustomer, razorpay_id, e_1, editEmail, editName, editPhone, updateRazorpayCustomer, e_2, e_3;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        razorpay_id = ((_a = intentRequest.notes) === null || _a === void 0 ? void 0 : _a.razorpay_id) ||
                            customer.metadata.razorpay_id ||
                            ((_b = customer.metadata.razorpay) === null || _b === void 0 ? void 0 : _b.rp_customer_id);
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.razorpay_.customers.fetch(razorpay_id)];
                    case 2:
                        razorpayCustomer = _k.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _k.sent();
                        this.logger.warn("unable to fetch customer in the razorpay payment processor");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!razorpayCustomer) return [3 /*break*/, 8];
                        editEmail = (_c = cart.email) !== null && _c !== void 0 ? _c : razorpayCustomer.email;
                        editName = "".concat((_e = (_d = cart.billing_address.first_name) !== null && _d !== void 0 ? _d : customer.first_name) !== null && _e !== void 0 ? _e : "", " ").concat((_g = (_f = cart.billing_address.last_name) !== null && _f !== void 0 ? _f : customer.last_name) !== null && _g !== void 0 ? _g : "").trim();
                        editPhone = (_h = cart.billing_address.phone) !== null && _h !== void 0 ? _h : ((customer === null || customer === void 0 ? void 0 : customer.phone) || ((_j = customer === null || customer === void 0 ? void 0 : customer.billing_address) === null || _j === void 0 ? void 0 : _j.phone));
                        _k.label = 5;
                    case 5:
                        _k.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.razorpay_.customers.edit(razorpayCustomer.id, {
                                email: editEmail !== null && editEmail !== void 0 ? editEmail : razorpayCustomer.email,
                                contact: editPhone !== null && editPhone !== void 0 ? editPhone : razorpayCustomer.contact,
                                name: editName != "" ? editName : razorpayCustomer.name,
                            })];
                    case 6:
                        updateRazorpayCustomer = _k.sent();
                        razorpayCustomer = updateRazorpayCustomer;
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _k.sent();
                        this.logger.error("unable to edit customer in the razorpay payment processor");
                        return [3 /*break*/, 8];
                    case 8:
                        if (!!razorpayCustomer) return [3 /*break*/, 12];
                        _k.label = 9;
                    case 9:
                        _k.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.createRazorpayCustomer(customer, cart, cart.email, intentRequest)];
                    case 10:
                        razorpayCustomer = _k.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_3 = _k.sent();
                        this.logger.error("something is very wrong please check customer in the dashboard.");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, razorpayCustomer]; // returning un modifed razorpay customer
                }
            });
        });
    };
    RazorpayBase.prototype.createRazorpayCustomer = function (customer, cart, email, intentRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var razorpayCustomer, customerParams, e_4;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        _o.trys.push([0, 4, , 5]);
                        customerParams = {
                            email: email,
                            contact: (_c = (_b = (_a = cart === null || cart === void 0 ? void 0 : cart.billing_address) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : customer.phone) !== null && _c !== void 0 ? _c : (_d = customer === null || customer === void 0 ? void 0 : customer.billing_address) === null || _d === void 0 ? void 0 : _d.phone,
                            gstin: (_h = (_f = (_e = cart === null || cart === void 0 ? void 0 : cart.billing_address) === null || _e === void 0 ? void 0 : _e.gstin) !== null && _f !== void 0 ? _f : (_g = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _g === void 0 ? void 0 : _g.gstin) !== null && _h !== void 0 ? _h : undefined,
                            fail_existing: 0,
                            name: "".concat((_k = (_j = cart === null || cart === void 0 ? void 0 : cart.billing_address.first_name) !== null && _j !== void 0 ? _j : customer.first_name) !== null && _k !== void 0 ? _k : "", " ").concat((_m = (_l = cart.billing_address.last_name) !== null && _l !== void 0 ? _l : customer.last_name) !== null && _m !== void 0 ? _m : ""),
                            notes: {
                                updated_at: new Date().toISOString(),
                            },
                        };
                        return [4 /*yield*/, this.razorpay_.customers.create(customerParams)];
                    case 1:
                        razorpayCustomer = _o.sent();
                        intentRequest.notes.razorpay_id = razorpayCustomer === null || razorpayCustomer === void 0 ? void 0 : razorpayCustomer.id;
                        if (!(customer && cart.customer_id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateRazorpayMetadatainCustomer(customer, "rp_customer_id", razorpayCustomer.id)];
                    case 2:
                        _o.sent();
                        _o.label = 3;
                    case 3: return [2 /*return*/, razorpayCustomer];
                    case 4:
                        e_4 = _o.sent();
                        this.logger.error("unable to create customer in the razorpay payment processor");
                        return [2 /*return*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RazorpayBase.prototype.pollAndRetrieveCustomer = function (customer) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var customerList, razorpayCustomer, count, skip;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        customerList = [];
                        count = 10;
                        skip = 0;
                        _c.label = 1;
                    case 1: return [4 /*yield*/, this.razorpay_.customers.all({
                            count: count,
                            skip: skip,
                        })];
                    case 2:
                        customerList = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.items;
                        razorpayCustomer =
                            (_b = customerList === null || customerList === void 0 ? void 0 : customerList.find(function (c) { return c.contact == (customer === null || customer === void 0 ? void 0 : customer.phone) || c.email == customer.email; })) !== null && _b !== void 0 ? _b : customerList === null || customerList === void 0 ? void 0 : customerList[0];
                        if (!razorpayCustomer) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.updateRazorpayMetadatainCustomer(customer, "rp_customer_id", razorpayCustomer.id)];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!customerList || !razorpayCustomer) {
                            throw new Error("no customers and cant create customers in razorpay");
                        }
                        skip += count;
                        _c.label = 5;
                    case 5:
                        if ((customerList === null || customerList === void 0 ? void 0 : customerList.length) == 0) return [3 /*break*/, 1];
                        _c.label = 6;
                    case 6: return [2 /*return*/, razorpayCustomer];
                }
            });
        });
    };
    RazorpayBase.prototype.fetchOrPollForCustomer = function (customer) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var razorpayCustomer, rp_customer_id, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        rp_customer_id = (_a = customer.metadata.razorpay) === null || _a === void 0 ? void 0 : _a.rp_customer_id;
                        if (!rp_customer_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.razorpay_.customers.fetch(rp_customer_id)];
                    case 1:
                        razorpayCustomer = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.pollAndRetrieveCustomer(customer)];
                    case 3:
                        razorpayCustomer = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, razorpayCustomer];
                    case 5:
                        e_5 = _b.sent();
                        this.logger.error("unable to poll customer in the razorpay payment processor");
                        return [2 /*return*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RazorpayBase.prototype.createOrUpdateCustomer = function (intentRequest, customer, email, cartId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var razorpayCustomer, cart, razorpay_id, e_6, e_7, e_8, e_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 15, , 16]);
                        return [4 /*yield*/, this.cartService.retrieve(cartId, {
                                relations: ["billing_address", "customer"],
                            })];
                    case 1:
                        cart = _b.sent();
                        razorpay_id = customer.metadata.razorpay_id ||
                            ((_a = customer.metadata.razorpay) === null || _a === void 0 ? void 0 : _a.rp_customer_id) ||
                            intentRequest.notes.razorpay_id;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!razorpay_id) return [3 /*break*/, 4];
                        this.logger.info("the updating  existing customer  in razopay");
                        return [4 /*yield*/, this.editExistingRpCustomer(customer, cart, intentRequest)];
                    case 3:
                        razorpayCustomer = _b.sent();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_6 = _b.sent();
                        this.logger.info("the customer doesn't exist in razopay");
                        return [3 /*break*/, 6];
                    case 6:
                        _b.trys.push([6, 9, , 14]);
                        if (!!razorpayCustomer) return [3 /*break*/, 8];
                        this.logger.info("the creating  customer  in razopay");
                        return [4 /*yield*/, this.createRazorpayCustomer(customer, cart, email, intentRequest)];
                    case 7:
                        razorpayCustomer = _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 14];
                    case 9:
                        e_7 = _b.sent();
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        this.logger.info("the relinking  customer  in razopay by polling");
                        return [4 /*yield*/, this.fetchOrPollForCustomer(customer)];
                    case 11:
                        razorpayCustomer = _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        e_8 = _b.sent();
                        this.logger.error("unable to poll customer customer in the razorpay payment processor");
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 14];
                    case 14: return [2 /*return*/, razorpayCustomer];
                    case 15:
                        e_9 = _b.sent();
                        this.logger.error("unable to retrieve customer from cart");
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, razorpayCustomer];
                }
            });
        });
    };
    RazorpayBase.prototype.initiatePayment = function (context) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var intentRequestData, email, currency_code, amount, resource_id, customer, paymentSessionData, order_id, sessionNotes, intentRequest, session_data, razorpayCustomer, e_10, e_11;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        intentRequestData = this.getPaymentIntentOptions();
                        email = context.email, currency_code = context.currency_code, amount = context.amount, resource_id = context.resource_id, customer = context.customer, paymentSessionData = context.paymentSessionData, order_id = context.order_id;
                        sessionNotes = paymentSessionData.notes;
                        intentRequest = __assign({ amount: Math.round(amount), currency: currency_code.toUpperCase(), notes: __assign(__assign({}, sessionNotes), { resource_id: resource_id }), payment: {
                                capture: this.options_.capture ? "automatic" : "manual",
                                capture_options: {
                                    refund_speed: (_a = this.options_.refund_speed) !== null && _a !== void 0 ? _a : "normal",
                                    automatic_expiry_period: (_b = this.options_.automatic_expiry_period) !== null && _b !== void 0 ? _b : 5,
                                    manual_expiry_period: (_c = this.options_.manual_expiry_period) !== null && _c !== void 0 ? _c : 10,
                                },
                            } }, intentRequestData);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, this.createOrUpdateCustomer(intentRequest, customer, email, resource_id)];
                    case 2:
                        razorpayCustomer = _e.sent();
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 7, , 8]);
                        if (!razorpayCustomer) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.razorpay_.orders.create(intentRequest)];
                    case 4:
                        session_data = _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.logger.error("unable to find razorpay customer");
                        _e.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_10 = _e.sent();
                        return [2 /*return*/, this.buildError("An error occurred in InitiatePayment during the creation of the razorpay payment intent", e_10)];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_11 = _e.sent();
                        this.logger.error("unanble to create customer ".concat(e_11.message));
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, {
                            session_data: session_data !== null && session_data !== void 0 ? session_data : __assign({}, context.paymentSessionData),
                            update_requests: ((_d = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _d === void 0 ? void 0 : _d.razorpay_id)
                                ? undefined
                                : {
                                    customer_metadata: {
                                        razorpay_id: intentRequest.notes.razorpay_id,
                                    },
                                },
                        }];
                }
            });
        });
    };
    RazorpayBase.prototype.authorizePayment = function (paymentSessionData, context) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPaymentStatus(paymentSessionData)];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, { data: paymentSessionData, status: status }];
                }
            });
        });
    };
    RazorpayBase.prototype.cancelPayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                error = {
                    error: "Unable to cancel as razorpay doesn't support cancellation",
                    code: types_1.ErrorCodes.UNSUPPORTED_OPERATION,
                };
                return [2 /*return*/, error];
            });
        });
    };
    RazorpayBase.prototype.capturePayment = function (paymentSessionData) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var order_id, paymentsResponse, possibleCatpures, result, payments, res;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        order_id = paymentSessionData.id;
                        return [4 /*yield*/, this.razorpay_.orders.fetchPayments(order_id)];
                    case 1:
                        paymentsResponse = _b.sent();
                        possibleCatpures = (_a = paymentsResponse.items) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.status == "authorized"; });
                        result = possibleCatpures === null || possibleCatpures === void 0 ? void 0 : possibleCatpures.map(function (payment) { return __awaiter(_this, void 0, void 0, function () {
                            var id, amount, currency, paymentIntent;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        id = payment.id, amount = payment.amount, currency = payment.currency;
                                        return [4 /*yield*/, this.razorpay_.payments.capture(id, amount, currency)];
                                    case 1:
                                        paymentIntent = _a.sent();
                                        return [2 /*return*/, paymentIntent];
                                }
                            });
                        }); });
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(result)];
                    case 2:
                        payments = _b.sent();
                        res = payments.reduce(function (acc, curr) { return ((acc[curr.id] = curr), acc); }, {});
                        paymentSessionData.payments = res;
                        _b.label = 3;
                    case 3: return [2 /*return*/, paymentSessionData];
                }
            });
        });
    };
    RazorpayBase.prototype.deletePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cancelPayment(paymentSessionData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RazorpayBase.prototype.refundPayment = function (paymentSessionData, refundAmount) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var id, paymentIntent, paymentList, paymentIds, payments, payment_id, refundRequest, refundSession, refundsIssued, e_12;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = paymentSessionData
                            .id;
                        return [4 /*yield*/, this.razorpay_.orders.fetch(id)];
                    case 1:
                        paymentIntent = _c.sent();
                        paymentList = (_a = paymentIntent.payments) !== null && _a !== void 0 ? _a : {};
                        paymentIds = Object.keys(paymentList);
                        return [4 /*yield*/, Promise.all(paymentIds.map(function (paymentId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.razorpay_.payments.fetch(paymentId)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 2:
                        payments = _c.sent();
                        payment_id = (_b = payments.find(function (p) {
                            parseInt(p.amount.toString()) >= refundAmount;
                        })) === null || _b === void 0 ? void 0 : _b.id;
                        if (!payment_id) return [3 /*break*/, 6];
                        refundRequest = {
                            amount: refundAmount,
                        };
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.razorpay_.payments.refund(payment_id, refundRequest)];
                    case 4:
                        refundSession = _c.sent();
                        refundsIssued = paymentSessionData.refundSessions;
                        if ((refundsIssued === null || refundsIssued === void 0 ? void 0 : refundsIssued.length) > 0) {
                            refundsIssued.push(refundSession);
                        }
                        else {
                            paymentSessionData.refundSessions = [refundSession];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_12 = _c.sent();
                        return [2 /*return*/, this.buildError("An error occurred in refundPayment", e_12)];
                    case 6: return [2 /*return*/, paymentSessionData];
                }
            });
        });
    };
    RazorpayBase.prototype.retrievePayment = function (paymentSessionData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, intent, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = paymentSessionData
                            .id;
                        return [4 /*yield*/, this.razorpay_.orders.fetch(id)];
                    case 1:
                        intent = _a.sent();
                        return [2 /*return*/, intent];
                    case 2:
                        e_13 = _a.sent();
                        return [2 /*return*/, this.buildError("An error occurred in retrievePayment", e_13)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RazorpayBase.prototype.updatePayment = function (context) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var amount, customer, paymentSessionData, currency_code, resource_id, order_id, cart, razorpayId, phone, result, id, sessionOrderData, newPaymentSessionOrder, e_14;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        amount = context.amount, customer = context.customer, paymentSessionData = context.paymentSessionData, currency_code = context.currency_code, resource_id = context.resource_id, order_id = context.order_id;
                        return [4 /*yield*/, this.cartService.retrieve(resource_id, {
                                relations: ["billing_address"],
                            })];
                    case 1:
                        cart = _k.sent();
                        razorpayId = ((_a = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _a === void 0 ? void 0 : _a.razorpay_id) ||
                            ((_c = (_b = customer === null || customer === void 0 ? void 0 : customer.metadata) === null || _b === void 0 ? void 0 : _b.razopay) === null || _c === void 0 ? void 0 : _c.rp_customer_id);
                        if (!customer) {
                            return [2 /*return*/];
                        }
                        if (!(razorpayId !== ((_d = paymentSessionData === null || paymentSessionData === void 0 ? void 0 : paymentSessionData.customer) === null || _d === void 0 ? void 0 : _d.id))) return [3 /*break*/, 3];
                        phone = ((_e = cart === null || cart === void 0 ? void 0 : cart.billing_address) === null || _e === void 0 ? void 0 : _e.phone) != ""
                            ? (_f = cart === null || cart === void 0 ? void 0 : cart.billing_address) === null || _f === void 0 ? void 0 : _f.phone
                            : (_g = customer === null || customer === void 0 ? void 0 : customer.phone) !== null && _g !== void 0 ? _g : (_h = customer === null || customer === void 0 ? void 0 : customer.billing_address) === null || _h === void 0 ? void 0 : _h.phone;
                        if (!phone) {
                            throw new utils_1.MedusaError(utils_1.MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR, "Phone number not found in context", utils_1.MedusaError.Codes.CART_INCOMPATIBLE_STATE);
                        }
                        return [4 /*yield*/, this.initiatePayment(context)];
                    case 2:
                        result = _k.sent();
                        if ((0, medusa_1.isPaymentProcessorError)(result)) {
                            return [2 /*return*/, this.buildError("An error occurred in updatePayment during the initiate of the new payment for the new customer", result)];
                        }
                        return [2 /*return*/, result];
                    case 3:
                        if (!amount && !currency_code) {
                            return [2 /*return*/];
                        }
                        _k.label = 4;
                    case 4:
                        _k.trys.push([4, 7, , 8]);
                        id = paymentSessionData.id;
                        return [4 /*yield*/, this.razorpay_.orders.fetch(id)];
                    case 5:
                        sessionOrderData = (_k.sent());
                        delete sessionOrderData.id;
                        delete sessionOrderData.created_at;
                        context.currency_code =
                            (_j = currency_code === null || currency_code === void 0 ? void 0 : currency_code.toUpperCase()) !== null && _j !== void 0 ? _j : sessionOrderData.currency;
                        return [4 /*yield*/, this.initiatePayment(context)];
                    case 6:
                        newPaymentSessionOrder = (_k.sent());
                        return [2 /*return*/, { session_data: __assign({}, newPaymentSessionOrder.session_data) }];
                    case 7:
                        e_14 = _k.sent();
                        return [2 /*return*/, this.buildError("An error occurred in updatePayment", e_14)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RazorpayBase.prototype.updatePaymentData = function (sessionId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentSession, result, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // Prevent from updating the amount from here as it should go through
                        // the updatePayment method to perform the correct logic
                        if (data.amount || data.currency) {
                            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Cannot update amount, use updatePayment instead");
                        }
                        return [4 /*yield*/, this.razorpay_.payments.fetch(sessionId)];
                    case 1:
                        paymentSession = _a.sent();
                        if (!data.notes) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.razorpay_.orders.edit(sessionId, {
                                notes: __assign(__assign({}, paymentSession.notes), data.notes),
                            })];
                    case 2:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 3: return [2 /*return*/, paymentSession];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_15 = _a.sent();
                        return [2 /*return*/, this.buildError("An error occurred in updatePaymentData", e_15)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /*
    /**
     * Constructs Razorpay Webhook event
     * @param {object} data - the data of the webhook request: req.body
     * @param {object} signature - the Razorpay signature on the event, that
     *    ensures integrity of the webhook event
     * @return {object} Razorpay Webhook event
     */
    RazorpayBase.prototype.constructWebhookEvent = function (data, signature) {
        return razorpay_1.default.validateWebhookSignature(data, signature, this.options_.webhook_secret);
    };
    RazorpayBase.prototype.buildError = function (message, e) {
        var _a, _b;
        return {
            error: message,
            code: "code" in e ? e.code : "",
            detail: (0, medusa_1.isPaymentProcessorError)(e)
                ? "".concat(e.error).concat(os_1.EOL).concat((_a = e.detail) !== null && _a !== void 0 ? _a : "")
                : "detail" in e
                    ? e.detail
                    : (_b = e.message) !== null && _b !== void 0 ? _b : "",
        };
    };
    RazorpayBase.identifier = "";
    return RazorpayBase;
}(medusa_1.AbstractPaymentProcessor));
exports.default = RazorpayBase;
//# sourceMappingURL=razorpay-base.js.map