import { Body, Controller, Get, Post, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Request() req, @Body('eventId') eventId: string, @Body('seatsBooked', ParseIntPipe) seatsBooked: number) {
    const userId = req.user.email;
    return this.bookingsService.create(userId, eventId, seatsBooked);
  }

  @Get()
  async findAllForUser(@Request() req) {
    const userId = req.user.email;
    return this.bookingsService.findAllForUser(userId);
  }
}
