import Link from "next/link";
import Navbar from "../components/Navbar";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const orderId = id ?? "—";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-cream flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center">

          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-brand-navy text-3xl font-black mb-2">Order Placed!</h1>
          <p className="text-brand-navy/50 text-sm mb-6">
            Order <span className="font-bold text-brand-navy">#{orderId}</span>
          </p>

          <div className="bg-white rounded-2xl border border-brand-cream-dark p-6 mb-8 text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-brand-navy font-semibold text-sm">We will call you to confirm</p>
                <p className="text-brand-navy/50 text-xs mt-0.5">Our team will call you shortly to confirm your order and estimated delivery time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛵</span>
              <div>
                <p className="text-brand-navy font-semibold text-sm">Free delivery within 5 km</p>
                <p className="text-brand-navy/50 text-xs mt-0.5">Hot, fresh food delivered right to your doorstep</p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-brand-navy-light transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
