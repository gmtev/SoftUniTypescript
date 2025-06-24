"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyMotel = void 0;
const partialMonthlyMotel_js_1 = require("./contracts/partialMonthlyMotel.js");
class MonthlyMotel extends partialMonthlyMotel_js_1.PartialMonthlyMotel {
    rooms = new Map();
    bookings = new Map();
    totalBudget = 0;
    addRoom(room) {
        // подсигурявам се
        if (!room ||
            typeof room !== "object" ||
            !("roomNumber" in room) ||
            !("totalPrice" in room) ||
            !("cancellationPrice" in room)) {
            return "Value was not a Room.";
        }
        const roomToBe = room;
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
    bookRoom(roomNumber, bookedMonth) {
        if (!this.rooms.has(roomNumber)) {
            return `Room '${roomNumber}' does not exist.`;
        }
        const monthsBooked = this.bookings.get(roomNumber) || new Set();
        // в условието текстът има точка накрая, но в тестовете няма - в sli.do казаха да го напишем спрямо тестовете, затова няма точка накрая.
        if (monthsBooked.has(bookedMonth)) {
            return `Room '${roomNumber}' is already booked for '${bookedMonth}'`;
        }
        monthsBooked.add(bookedMonth);
        this.bookings.set(roomNumber, monthsBooked);
        const room = this.rooms.get(roomNumber);
        this.totalBudget += room.totalPrice;
        return `Room '${roomNumber}' booked for '${bookedMonth}'.`;
    }
    cancelBooking(roomNumber, bookedMonth) {
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
        }
        else {
            this.bookings.set(roomNumber, monthsBooked);
        }
        const room = this.rooms.get(roomNumber);
        this.totalBudget -= room.cancellationPrice;
        return `Booking cancelled for Room '${roomNumber}' for '${bookedMonth}'.`;
    }
    // Попитах в sli.do за това по време на теста :)
    getTotalBudget() {
        return `Motel: ${partialMonthlyMotel_js_1.PartialMonthlyMotel.MotelName}\nTotal budget: $${this.totalBudget.toFixed(2)}`;
    }
}
exports.MonthlyMotel = MonthlyMotel;
//# sourceMappingURL=monthlyMotel.js.map