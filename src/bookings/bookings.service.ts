import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Booking } from './booking.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  private get bookingsCollection() {
    return this.databaseService.getDb().collection('bookings');
  }

  async create(userId: string, eventId: string, seatsBooked: number) {
    const event = await this.databaseService.getDb().collection('events').findOne({ _id: new ObjectId(eventId) });
  
    if (!event) {
      throw new Error('Event not found');
    }
  
    if (event.availableSeats < seatsBooked) {
      throw new Error('Not enough seats available');
    }
  
    const booking: Booking = {
      userId,
      eventId,
      seatsBooked,
      bookingTime: new Date(),
    };
  
    await this.bookingsCollection.insertOne(booking);
  
    // Reduce availableSeats in event
    await this.databaseService.getDb().collection('events').updateOne(
      { _id: new ObjectId(eventId) },
      { $inc: { availableSeats: -seatsBooked } }
    );
  
    return booking;
  }  

  async findAllForUser(userId: string) {
    return this.bookingsCollection.find({ userId }).toArray();
  }
}
