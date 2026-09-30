import {
  CircleCheckBig,
  CircleHelp,
  CircleMinus,
  CircleX,
  Download,
  ExternalLink,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useGetPaymentByTransactionIdQuery } from "../redux/payments/payments.api";

const statusContent = {
  success: {
    label: "Payment confirmed",
    title: "Your payment was successful.",
    description: "Your payment has been verified and recorded.",
    icon: CircleCheckBig,
    color: "text-[#21836f]",
  },
  failed: {
    label: "Payment failed",
    title: "We could not complete your payment.",
    description: "No successful payment was recorded. You can try again from your trips.",
    icon: CircleX,
    color: "text-[#b54735]",
  },
  cancelled: {
    label: "Payment cancelled",
    title: "You cancelled this payment.",
    description: "No payment was completed. You can return to your trips if you want to try again.",
    icon: CircleMinus,
    color: "text-[#9a6a28]",
  },
  pending: {
    label: "Payment pending",
    title: "Your payment is still being processed.",
    description: "Check your trips again in a moment for the latest payment status.",
    icon: CircleHelp,
    color: "text-[#61716d]",
  },
};

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transaction_id");
  const {
    data: payment,
    isLoading,
    isError,
  } = useGetPaymentByTransactionIdQuery(transactionId ?? "", {
    skip: !transactionId,
  });
  const result = payment
    ? statusContent[payment.status as keyof typeof statusContent] ?? {
        label: "Payment status",
        title: "Payment details retrieved.",
        description: "Review the payment information below.",
        icon: CircleHelp,
        color: "text-[#61716d]",
      }
    : null;
  const ResultIcon = result?.icon;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f8f6] px-5 py-12">
      <section className="w-full max-w-lg border-y-2 border-[#2a9d8f] bg-white px-6 py-10 text-center sm:px-10">
        {payment && result && ResultIcon ? (
          <>
            <ResultIcon className={`mx-auto size-14 ${result.color}`} aria-hidden="true" />
            <p className={`mt-5 text-xs font-semibold tracking-[0.14em] uppercase ${result.color}`}>
              {result.label}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#17332f]">
              {result.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#61716d]">
              {result.description}
            </p>
            <dl className="mt-6 space-y-3 border-y border-[#e5ece8] py-4 text-left text-sm">
              <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Payment ID</dt><dd className="font-medium text-[#31443f]">{payment.id}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Transaction ID</dt><dd className="break-all text-right font-medium text-[#31443f]">{payment.transaction_id}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Trip</dt><dd className="font-medium text-[#31443f]">#{payment.trip_id}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Amount</dt><dd className="font-medium text-[#31443f]">{payment.amount.toFixed(2)} BDT</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Status</dt><dd className={`font-medium capitalize ${result.color}`}>{payment.status}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Payment method</dt><dd className="font-medium text-[#31443f]">{payment.payment_method}</dd></div>
              {payment.paid_at && (
                <div className="flex justify-between gap-4"><dt className="text-[#61716d]">Paid at</dt><dd className="text-right font-medium text-[#31443f]">{new Date(payment.paid_at).toLocaleString()}</dd></div>
              )}
            </dl>
            {payment.receipt_url && (
              <div className="mt-5 flex flex-wrap justify-center gap-5">
                <a
                  href={payment.receipt_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1c6256] hover:underline"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  View PDF
                </a>
                <a
                  href={payment.receipt_url.replace("/upload/", "/upload/fl_attachment/")}
                  download={`payment-receipt-${payment.id}.pdf`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1c6256] hover:underline"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-[#17332f]">
              {isLoading ? "Loading payment details" : "Payment details unavailable"}
            </h1>
            <p
              className="mt-3 text-sm leading-6 text-[#61716d]"
              role={isError || !transactionId ? "alert" : "status"}
            >
              {isLoading
                ? "Please wait while we retrieve your payment."
                : "We could not retrieve this payment. Sign in and check your trip payments, or contact support."}
            </p>
          </>
        )}
        <Link
          to="/dashboard"
          className="mt-7 inline-flex h-10 items-center justify-center rounded-md bg-[#1c6256] px-5 text-sm font-medium text-white transition hover:bg-[#174f46]"
        >
          Return to dashboard
        </Link>
      </section>
    </main>
  );
};

export default PaymentResult;