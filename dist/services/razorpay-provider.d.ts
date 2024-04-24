import RazorpayBase from "../core/razorpay-base";
import { PaymentIntentOptions } from "../types";
declare class RazorpayProviderService extends RazorpayBase {
    static identifier: string;
    constructor(_: any, options: any);
    get paymentIntentOptions(): PaymentIntentOptions;
}
export default RazorpayProviderService;
