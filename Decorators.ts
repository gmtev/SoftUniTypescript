export { }
// Logging Decorator

function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Function '${methodName}' called with arguments: ${args.join(', ')}`);
        return original(args);
    }

    return descriptor;
}

class Person {
    fName: string;
    lName: string;

    constructor(firstName: string, lastname: string) {
        this.fName = firstName;
        this.lName = lastname;
    }

    @log
    static getFullName(firstName: string, lastname: string): string {
        return `${firstName} ${lastname}`;
    }
}


let person = new Person('John', 'Does');

Person.getFullName(person.fName, person.lName)
Person.getFullName('Benny', 'Tres');
// Validate Age



// Created On



// Authorization



// Weather Data



// Flexible Validation



// Censored Data

