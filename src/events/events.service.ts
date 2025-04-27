import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Event } from './event.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class EventsService {
  constructor(private readonly databaseService: DatabaseService) {}

  private get eventsCollection() {
    return this.databaseService.getDb().collection('events');
  }

  async create(event: Event) {
    const newEvent = { ...event, createdAt: new Date() };
    await this.eventsCollection.insertOne(newEvent);
    return newEvent;
  }

  async findAll(date?: string, location?: string) {
    const query: any = {};
  
    if (date) {
      // Example: '2025-06-15'
      query.date = new Date(date);
    }
  
    if (location) {
      query.location = { $regex: location, $options: 'i' }; // case insensitive
    }
  
    return this.eventsCollection.find(query).toArray();
  }

  async findOne(id: string) {
    return this.eventsCollection.findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, event: Partial<Event>) {
    await this.eventsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: event },
    );
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.eventsCollection.deleteOne({ _id: new ObjectId(id) });
    return { deleted: true };
  }
}
