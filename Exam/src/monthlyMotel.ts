import { PartialMonthlyMotel } from "./contracts/partialMonthlyMotel.js";
import { Motel } from "./contracts/motel.js";
import { Room } from "./contracts/room.js";
import { RoomNumber } from "./types.js";
import { MonthType } from "./types.js";


export class MonthlyMotel<
  T extends MonthType
> extends PartialMonthlyMotel implements Motel {

  private rooms: Map<RoomNumber, Room> = new Map();
  private bookings: Map<RoomNumber, Set<T>> = new Map();
  private totalBudget: number = 0;


  addRoom(room: unknown): string {
    // подсигурявам се
    if (
      !room ||
      typeof room !== "object" ||
      !("roomNumber" in room) ||
      !("totalPrice" in room) ||
      !("cancellationPrice" in room)
    ) {
      return "Value was not a Room.";
    }

    const roomToBe = room as Room;
    const roomNumber = roomToBe.roomNumber;

    if (this.rooms.has(roomNumber)) {
      return `Room '${roomNumber}' already exists.`;
    }

    this.rooms.set(roomNumber, roomToBe);
    return `Room '${roomNumber}' added.`;
  }

// в третия тест пак се флагва А04 в console.log(motel.bookRoom('A04', SummerMonth.August)),
// но тъй като използвам type RoomNumber грешката е Argument of type '"A04"' is not assignable to parameter of type 'RoomNumber', а
// не директно изброени '"A01" | "A02" | "A03" | "B01" | "B02" | "B03"', макар че това да е едно и също :)
  bookRoom(roomNumber: RoomNumber, bookedMonth: T): string {
    if (!this.rooms.has(roomNumber)) {
      return `Room '${roomNumber}' does not exist.`;
    }

    const monthsBooked = this.bookings.get(roomNumber) || new Set<T>();

    // в условието текстът има точка накрая, но в тестовете няма - в sli.do казаха да го напишем спрямо тестовете, затова няма точка накрая.
    if (monthsBooked.has(bookedMonth)) {
      return `Room '${roomNumber}' is already booked for '${bookedMonth}'`;
    }

    monthsBooked.add(bookedMonth);
    this.bookings.set(roomNumber, monthsBooked);

    const room = this.rooms.get(roomNumber)!;
    this.totalBudget += room.totalPrice;

    return `Room '${roomNumber}' booked for '${bookedMonth}'.`;
  }


  cancelBooking(roomNumber: RoomNumber, bookedMonth: T): string {
    if (!this.rooms.has(roomNumber)) {
      return `Room '${roomNumber}' does not exist.`;
    }

    const monthsBooked = this.bookings.get(roomNumber);
    if (!monthsBooked || !monthsBooked.has(bookedMonth)) {
      return `Room '${roomNumber}' is not booked for '${bookedMonth}'.`;
    }

    monthsBooked.delete(bookedMonth);
    if (monthsBooked.size === 0) {
      this.bookings.delete(roomNumber);
    } else {
      this.bookings.set(roomNumber, monthsBooked);
    }

    const room = this.rooms.get(roomNumber)!;
    this.totalBudget -= room.cancellationPrice;

    return `Booking cancelled for Room '${roomNumber}' for '${bookedMonth}'.`;
  }


  // Попитах в sli.do за това по време на теста :)
  getTotalBudget(): string {
    return `Motel: ${PartialMonthlyMotel.MotelName}\nTotal budget: $${this.totalBudget.toFixed(2)}`;
  }
}

