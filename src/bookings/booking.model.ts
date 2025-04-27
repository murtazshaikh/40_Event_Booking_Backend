export interface Booking {
  id?: string;
  userId: string;
  eventId: string;
  seatsBooked: number;
  bookingTime?: Date;
}
