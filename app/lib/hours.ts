// Restaurant operating hours: 11:30 AM – 11:00 PM IST
const OPEN_MINUTES = 11 * 60 + 30; // 690
const CLOSE_MINUTES = 23 * 60; // 1380

export function isRestaurantOpen(): boolean {
  const now = new Date();
  // IST = UTC + 5:30
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const total = ist.getUTCHours() * 60 + ist.getUTCMinutes();
  return total >= OPEN_MINUTES && total < CLOSE_MINUTES;
}

export const HOURS_DISPLAY = "11:30 AM – 11:00 PM";
