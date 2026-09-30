import { useGetMyPaymentsQuery } from "../../redux/payments/payments.api";
import { Download, ExternalLink } from "lucide-react";
import { EmptyState, SectionHeading, StatusBadge } from "./DashboardShared";

export default function PaymentsHistory() {
  const { data, isLoading, isError } = useGetMyPaymentsQuery();
  const payments = data?.payments ?? [];

  return (
    <section>
      <SectionHeading eyebrow="Payment records" title="My payments" />
      {isLoading ? (
        <p className="py-8 text-sm text-[#61716d]" role="status">Loading payments...</p>
      ) : isError ? (
        <p className="border-y border-[#f0d2c1] bg-[#fff6ef] px-4 py-3 text-sm text-[#94552c]" role="alert">
          Could not load your payment history. Please try again.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#e3eae6] bg-white">
          {payments.length === 0 ? (
            <EmptyState>No payments are associated with your account yet.</EmptyState>
          ) : (
            payments.map((payment) => (
              <article
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf1ef] px-5 py-4 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#253b36]">
                    Trip #{payment.trip_id} · Payment #{payment.id}
                  </p>
                  <p className="mt-1 break-all text-xs text-[#84918d]">
                    {payment.transaction_id || "No transaction ID"} · {payment.payment_method}
                  </p>
                  <p className="mt-1 text-xs text-[#84918d]">
                    {payment.paid_at
                      ? `Paid ${new Date(payment.paid_at).toLocaleString()}`
                      : `Created ${new Date(payment.created_at).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-[#253b36]">
                    {payment.amount.toFixed(2)} BDT
                  </span>
                  <StatusBadge status={payment.status} />
                  {payment.receipt_url && (
                    <div className="flex items-center gap-3">
                      <a
                        href={payment.receipt_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#1c6256] hover:underline"
                      >
                        <ExternalLink className="size-4" aria-hidden="true" />
                        View PDF
                      </a>
                      <a
                        href={payment.receipt_url.replace("/upload/", "/upload/fl_attachment/")}
                        download={`payment-receipt-${payment.id}.pdf`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#1c6256] hover:underline"
                      >
                        <Download className="size-4" aria-hidden="true" />
                        Download PDF
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}