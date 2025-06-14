export { }
// Even Sum

function isSumEven(a: number, b: number, c: number): boolean {
  const sum: number = a + b + c;
  return sum % 2 === 0;
}

// Day of the Week

enum WeekDay {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

function getDayOfWeek(dayNumber: number): string {
  const days: { [key: number]: string } = {
    [WeekDay.Monday]: 'Monday',
    [WeekDay.Tuesday]: 'Tuesday',
    [WeekDay.Wednesday]: 'Wednesday',
    [WeekDay.Thursday]: 'Thursday',
    [WeekDay.Friday]: 'Friday',
    [WeekDay.Saturday]: 'Saturday',
    [WeekDay.Sunday]: 'Sunday',
  };

  return days[dayNumber] ?? 'error';
}

// Format Person

type PersonTuple = [string, number];

function formatPerson(person: PersonTuple): string {
  const [name, age] = person;
  return `Hello, my name is ${name} and my age is ${age}`;
}

// Convert Arrays

function convertArrays(words: string[]): [string, number] {
  const concatenated: string = words.join('');
  return [concatenated, concatenated.length];
}

// Summarize Person

function summarizePersonInfo(
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  middleName?: string,
  hobbies?: string[],
  workInfo?: [string, number]
): [number, string, number, string, string] {

  const fullName: string = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
  const hobbiesSummary: string = hobbies ? hobbies.join(', ') : '-';
  const workSummary: string = workInfo ? `${workInfo[0]} -> ${workInfo[1]}` : '-';

  return [id, fullName, age, hobbiesSummary, workSummary];
}

// Day of the Week v2

enum Days {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

function getDayNumber(dayName: string): void {
  console.log(Days[dayName as keyof typeof Days] || 'error');

}

// Unknown Response

function unknownResponse(response: { code: number; text: string; value?: unknown }): string {
  if (typeof response.value === 'string') {
    return response.value;
  }
  return '-';
}

function unknownResponseOtherSolution(arg: unknown): string {
    if ('value' in (arg as any) && typeof (arg as any).value === 'string') {
        return (arg as any).value;
    }

    return '-';
}

// Custom Type Guard

function customTypeGuard(arg: unknown): arg is string[] {
    return Array.isArray(arg) && arg.length >= 1 && arg.every(el => typeof el === 'string');
}

// Friday the 13th

enum Months {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

function fridayThe13th(arr: unknown[]) : void {
    for (const element of arr) {
        if (element instanceof Date) {
            const monthDay = element.getDate();
            const weekDay = element.getDay();
            const monthNum = element.getMonth();

            if (monthDay === 13 && weekDay === 5) {
                console.log(`${monthDay}-${Months[monthNum]}-${element.getFullYear()}`);
            }
        }
    }
}