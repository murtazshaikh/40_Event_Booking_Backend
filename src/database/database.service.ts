import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    const uri = process.env.MONGODB_URI as string; // your MongoDB URL
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    this.client = new MongoClient(uri);

    await this.client.connect();
    this.db = this.client.db('event-booking'); // your DB name
    console.log('✅ Connected to MongoDB Atlas successfully!');
  }

  getDb(): Db {
    return this.db;
  }
}
