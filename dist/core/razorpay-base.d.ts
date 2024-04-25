import Razorpay from "razorpay";
import { AbstractPaymentProcessor, Cart, CartService, Customer, CustomerService, Logger, PaymentProcessorContext as MedusaPaymentProcessorContext, PaymentProcessorError, PaymentProcessorSessionResponse, PaymentSessionStatus } from "@medusajs/medusa";
import { PaymentIntentOptions, RazorpayOptions } from "../types";
import { Orders } from "razorpay/dist/types/orders";
import { Customers } from "razorpay/dist/types/customers";
/**
 * The paymentIntent object corresponds to a razorpay order.
 *
 */
type PaymentProcessorContext = {
    order_id?: string;
} & MedusaPaymentProcessorContext;
declare abstract class RazorpayBase extends AbstractPaymentProcessor {
    static identifier: string;
    protected readonly options_: RazorpayOptions;
    protected razorpay_: Razorpay;
    logger: Logger;
    customerService: CustomerService;
    cartService: CartService;
    protected constructor(container: any, options: any);
    protected init(): void;
    abstract get paymentIntentOptions(): PaymentIntentOptions;
    getPaymentIntentOptions(): PaymentIntentOptions;
    _validateSignature(razorpay_payment_id: string, razorpay_order_id: string, razorpay_signature: string): boolean;
    getRazorpayPaymentStatus(paymentIntent: Orders.RazorpayOrder): Promise<PaymentSessionStatus>;
    getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus>;
    updateRazorpayMetadatainCustomer(customer: Customer, parameterName: string, parameterValue: string): Promise<Customer>;
    editExistingRpCustomer(customer: Customer, cart: Cart, intentRequest: any): Promise<Customers.RazorpayCustomer | undefined>;
    createRazorpayCustomer(customer: Customer, cart: Cart, email: string, intentRequest: any): Promise<Customers.RazorpayCustomer | undefined>;
    pollAndRetrieveCustomer(customer: Customer): Promise<Customers.RazorpayCustomer>;
    fetchOrPollForCustomer(customer: Customer): Promise<Customers.RazorpayCustomer | undefined>;
    createOrUpdateCustomer(intentRequest: any, customer: Customer, email: string, cartId: string): Promise<Customers.RazorpayCustomer | undefined>;
    initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse>;
    authorizePayment(paymentSessionData: Record<string, unknown>, context?: Record<string, unknown>): Promise<PaymentProcessorError | {
        status: PaymentSessionStatus;
        data: PaymentProcessorSessionResponse["session_data"];
    }>;
    cancelPayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    capturePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    deletePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    retrievePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse["session_data"]>;
    updatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse | void>;
    updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<PaymentProcessorSessionResponse["session_data"] | PaymentProcessorError>;
    constructWebhookEvent(data: any, signature: any): boolean;
    protected buildError(message: string, e: PaymentProcessorError | Error): PaymentProcessorError;
}
export default RazorpayBase;
