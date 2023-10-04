const mapping: Record<string, string> = {
  drivers: 'driver',
  'future-bookings': 'future_booking',
  'past-rides': 'past_ride',
  routes: 'route',
  teams: 'team',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
