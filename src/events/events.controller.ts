import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query('date') date?: string, @Query('location') location?: string) {
    return this.eventsService.findAll(date, location);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post()
  async create(@Body() event: Event) {
    return this.eventsService.create(event);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() event: Partial<Event>) {
    return this.eventsService.update(id, event);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
