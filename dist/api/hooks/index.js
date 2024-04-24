"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var razorpay_1 = __importDefault(require("./razorpay"));
var express_1 = require("express");
var body_parser_1 = __importDefault(require("body-parser"));
var medusa_1 = require("@medusajs/medusa");
var route = (0, express_1.Router)();
exports.default = (function (app) {
    app.use("/razorpay", route);
    route.post("/hooks", 
    // razorpay constructEvent fails without body-parser
    body_parser_1.default.raw({ type: "application/json" }), (0, medusa_1.wrapHandler)(razorpay_1.default));
    return app;
});
//# sourceMappingURL=index.js.map