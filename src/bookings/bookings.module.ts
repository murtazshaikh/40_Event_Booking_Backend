import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from '../database/database.module'; // <-- Add this

@Module({
  imports: [DatabaseModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
