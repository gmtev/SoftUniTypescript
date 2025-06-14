export { }
// Array Swap

function swap<T>(a: T[], aIndex: number, b: T[], bIndex: number): void {
    const temp = a[aIndex];

    a[aIndex] = b[bIndex];
    b[bIndex] = temp;

}

// CountableSet<T>

interface CountableSet<T> {
    add(item: T): void;
    remove(item: T): void;
    contains(item: T): boolean;
    getNumberOfCopies(item: T): number;
}

class CountedSet<T> implements CountableSet<T> {
    private items: Map<T, number> = new Map();

    add(item: T): void {
        const currentCount = this.items.get(item);

        if (currentCount) {
            this.items.set(item, currentCount + 1);
        } else {
            this.items.set(item, 1);
        }
    }

    remove(item: T): void {
        const currentCount = this.items.get(item);

        if (currentCount) {
            this.items.set(item, currentCount - 1);
        }
    }

    contains(item: T): boolean {
        const currentCount = this.items.get(item);
        return currentCount !== undefined && currentCount > 0;
    }

    getNumberOfCopies(item: T): number {
        return this.items.get(item) ?? 0;
    }
}

// Mechanic

type Car = {
    engine: {
        horsepower: number;
    };
    tires: {
        model: string;
        airPressure: number;
    };
    body: {
        material: string;
    }
}

class Mechanic<T extends {}> {
    technicalInspection(car: T): boolean { return true; };
}

// Conditional Number

type InputParameterType<T> = T extends number ? number : string;

function conditionalNumber<T>(param: InputParameterType<T>): void {
    if (typeof param === 'number') {
        console.log(param.toFixed(2));
    } else {
        console.log(param);
    }
}

// Caching Logger

enum LoggingLevel {
    Info = "Info",
    Error = "Error",
    Warning = "Warning",
    Debug = "Debug",
}

enum LoggingFormat {
    Standard = "[%level][%date] %text",
    Minimal = "*%level* %text"
}

interface CachingLogger<T extends LoggingLevel, V extends LoggingFormat> {
    cachedLogs: Map<T, string[]>
    log(logLevel: T, message: string): void;
    getFormat(): V
}

class Logger<T extends LoggingLevel, V extends LoggingFormat> implements CachingLogger<T, V> {
    cachedLogs: Map<T, string[]> = new Map();
    private format: V;

    constructor(format: V) {
        this.format = format;
    }

    log(logLevel: T, message: string): void {
        const date = new Date().toISOString();

        const filledMessage = this.format.replace('%level', logLevel).replace('%date', date).replace('%text', message);
        console.log(filledMessage);

        const currentMessages = this.cachedLogs.get(logLevel);

        if (currentMessages) {
            currentMessages.push(filledMessage);
            this.cachedLogs.set(logLevel, currentMessages);
        } else {
            this.cachedLogs.set(logLevel, [filledMessage]);
        }
    }

    getFormat(): V {
        return this.format;
    }
}

// Choose Type

type Choose<T, K extends keyof T> = {
    [Key in K]: T[Key];
}

type test = {
    name: string,
    age: number,
    test:() => string;
}

type extracted = Choose<test, 'name' | 'age'>

type anotherType = {
    time: Date,
    duration: number,
    test: () => string,
    val: 200 | 300,
    user: { 
        name: string, 
        age: number 
    } 
} 

type nestedUserAndTime = 'user' | 'time'; 
type extracted2 = Choose<anotherType, nestedUserAndTime>;


// Holiday Manager

enum TravelVacation {
    Abroad = 'Abroad',
    InCountry =
    'InCountry'
}

enum MountainVacation { 
    Ski = 'Ski', 
    Hiking = 'Hiking' 
}

enum BeachVacation { 
    Pool = 'Pool',
    Sea = 'Sea',
    ScubaDiving = 'ScubaDiving' 
}

interface Holiday {
    set start(val: Date);
    set end(val: Date);
    getInfo(): string;
}

interface VacationManager<T, V> { 
    reserveVacation(holiday: T, vacationType: V): void; 
    listReservations(): string; 
}

class PlannedHoliday implements Holiday {
    private _start!: Date;
    private _end!: Date;

    constructor(startDate: Date, endDate: Date) {
        this.start = startDate;
        this.end = endDate;
    }

    set start(val: Date) {
        if (val > this._end) {
            throw new Error('Start date cannot be after the end date!')
        }

        this._start = val;
    }

    set end(val: Date) {
        if (val < this._start) {
            throw new Error('End date cannot be before the start date!')
        }

        this._end = val;
    }

    getInfo(): string {
        return `Holiday: ${this._start.getDate()}/${this._start.getMonth() + 1}/${this._start.getFullYear()} - ${this._end.getDate()}/${this._end.getMonth() + 1}/${this._end.getFullYear()}`
    }
}

class HolidayManager<T extends Holiday, V extends TravelVacation | MountainVacation | BeachVacation> implements VacationManager<T, V> {
    private holidays: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V): void {
        this.holidays.set(holiday, vacationType);
    }

    listReservations(): string {
        let result: string[] = [];

        Array.from(this.holidays.entries()).forEach(entry => {
            result.push(`${entry[0].getInfo()} => ${entry[1]}`)
        });

        return result.join('\n')
    }
}

// Function Extraction

type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type AllFunctions<T> = Pick<T, FunctionKeys<T>>;

type test1 = {
    name: string,
    age: number,
    test:() => string;
}

type extractedFirst = AllFunctions<test>;


type Employee = {
    name: string,
    salary: number,
    work: () => void,
    takeBreak: () => string
};

type extractedSecond = AllFunctions<Employee>;


type Nope = {
    name: string
};

type extractedThird = AllFunctions<Nope>;