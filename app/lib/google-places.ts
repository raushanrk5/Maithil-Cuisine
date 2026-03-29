const SERP_API_BASE = "https://serpapi.com/search.json";

export type Review = {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
  relative_time_description: string;
};

export type PlaceData = {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
  photoUrls: string[];
};

export async function getPlaceData(): Promise<PlaceData | null> {
  const apiKey = process.env.SERP_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const dataId = process.env.GOOGLE_DATA_ID;

  if (!apiKey || !placeId || !dataId) return null;

  try {
    // Fetch reviews + place info, and photos in parallel
    const [reviewsRes, photosRes] = await Promise.all([
      fetch(
        `${SERP_API_BASE}?engine=google_maps_reviews&place_id=${placeId}&api_key=${apiKey}`,
        { next: { revalidate: 86400 } }
      ),
      fetch(
        `${SERP_API_BASE}?engine=google_maps_photos&data_id=${encodeURIComponent(dataId)}&api_key=${apiKey}`,
        { next: { revalidate: 86400 } }
      ),
    ]);

    const reviewsData = await reviewsRes.json();
    const photosData = await photosRes.json();

    if (!reviewsData.place_info) return null;

    const reviews: Review[] = (reviewsData.reviews ?? []).map(
      (r: {
        user?: { name?: string; thumbnail?: string };
        rating?: number;
        snippet?: string;
        date?: string;
      }) => ({
        author_name: r.user?.name ?? "Google User",
        rating: r.rating ?? 5,
        text: r.snippet ?? "",
        time: 0,
        profile_photo_url: r.user?.thumbnail ?? "",
        relative_time_description: r.date ?? "",
      })
    );

    const photoUrls: string[] = (photosData.photos ?? [])
      .map((p: { image?: string }) => p.image ?? "")
      .filter(Boolean)
      .slice(0, 9);

    return {
      name: reviewsData.place_info.title ?? "Maithil Cuisine",
      rating: reviewsData.place_info.rating ?? 0,
      user_ratings_total: reviewsData.place_info.reviews ?? 0,
      reviews,
      photoUrls,
    };
  } catch {
    return null;
  }
}
