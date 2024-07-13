// src/app/pages/booking/booking.component.ts
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  newBooking(): void {
    this.bookingService.createBooking('bookingData').subscribe(
      data => this.bookings = data,
      error => console.error('Error fetching bookings', error)
    );
  }

  loadBookings(): void {
    this.bookingService.getUserBookings('userId').subscribe(
      data => this.bookings = data,
      error => console.error('Error fetching bookings', error)
    );
  }

  deleteBooking(bookingId: string): void {
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => this.loadBookings(),
      error => console.error('Error deleting booking', error)
    );
  }
}
