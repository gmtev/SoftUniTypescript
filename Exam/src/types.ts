import { WinterMonth, SummerMonth } from "./contracts/util.js";

// в третия тест пак се флагва А04 в console.log(motel.bookRoom('A04', SummerMonth.August)),
// но тъй като използвам type RoomNumber грешката е Argument of type '"A04"' is not assignable to parameter of type 'RoomNumber', а
// не директно изброени '"A01" | "A02" | "A03" | "B01" | "B02" | "B03"', макар че това да е едно и също :)

export type RoomNumber = 'A01' | 'A02' | 'A03' | 'B01' | 'B02' | 'B03';
export type MonthType = WinterMonth | SummerMonth;
