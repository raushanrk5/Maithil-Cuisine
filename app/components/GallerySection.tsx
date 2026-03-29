import { getPlaceData } from "../lib/google-places";

export default async function GallerySection() {
  const data = await getPlaceData();

  if (!data || data.photoUrls.length === 0) return null;

  const photos = data.photoUrls.slice(0, 9);

  return (
    <section className="py-16 sm:py-24 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand-gold/50" />
            <span className="text-brand-gold text-xs tracking-[0.35em] uppercase font-medium">
              Gallery
            </span>
            <div className="h-px w-12 bg-brand-gold/50" />
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
            From Our <span className="text-brand-gold">Kitchen</span>
          </h2>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((url, i) => (
            <div
              key={url}
              className={`relative overflow-hidden rounded-2xl bg-brand-navy-light ${
                i === 0 ? "col-span-2 sm:col-span-1 row-span-2 aspect-square sm:aspect-auto sm:h-full" : "aspect-square"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Maithil Cuisine photo ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-brand-navy/0 hover:bg-brand-navy/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
