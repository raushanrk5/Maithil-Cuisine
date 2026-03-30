import { getPlaceData } from "../lib/google-places";
import ReviewsMarquee from "./ReviewsMarquee";


export default async function ReviewsSection() {
  const data = await getPlaceData();

  // Don't render the section if no data or no reviews
  if (!data || data.reviews.length === 0) return null;

  const reviews = data.reviews.filter((r) => r.rating >= 4 && r.text);
  if (reviews.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-[0.35em] uppercase font-medium">
              Google Reviews
            </span>
            <div className="h-px w-12 bg-brand-gold" />
          </div>
          <h2 className="text-brand-crimson text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            What Our Guests Say
          </h2>

          {/* Overall rating */}
          <div className="inline-flex flex-col items-center gap-2 bg-white border border-brand-cream-dark rounded-2xl px-8 py-5 shadow-sm">
            <span className="text-brand-navy text-5xl font-black">{data.rating.toFixed(1)}</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-4 h-4 ${star <= Math.round(data.rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-brand-navy/50 text-sm">
              Google Reviews
            </span>
          </div>
        </div>

        {/* Review cards — auto-scrolling marquee */}
        <ReviewsMarquee reviews={reviews} />

        {/* Link to Google */}
        <div className="text-center mt-10">
          <a
            href={`https://search.google.com/local/reviews?placeid=${process.env.GOOGLE_PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-brand-navy/20 text-brand-navy/60 px-7 py-3 rounded-full text-sm font-semibold hover:border-brand-crimson hover:text-brand-crimson transition-colors"
          >
            View all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
