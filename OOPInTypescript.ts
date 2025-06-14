export { }
// Person Class

class Person {
    public firstName: string;
    public lastName: string;
    public age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    public introduce(): string {
        return `My name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`
    }
}

// Bank Account

class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    public deposit(amount: number) : void {
        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
        }
    }

    public getBalance() : number {
        return this.balance;
    }
}

// Simple Inheritance 

class Vehicle {
    public brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    public drive(): string {
        return `Driving a ${this.brand}`;
    }
}


class Car extends Vehicle {
    public model: string;

    constructor(brand: string, model: string) {
        super(brand);
        this.model = model;
    }

    public override drive(): string {
        return `Driving a ${this.brand} ${this.model}`;
    }
}

// Abstraction

interface Animal {
    makeSound(): string;
}

class Dog implements Animal {
    public makeSound(): string {
        return "Woof";
    }
}

class Cat implements Animal {
    public makeSound(): string {
        return "Meow";
    }
}

// Message Override

class Message {
    public send(): string {
        return "Sending message...";
    }
}

class EmailMessage extends Message {
    public override send(): string {
        return "Sending email...";
    }
}

class SMSMessage extends Message {
    public override send(): string {
        return "Sending SMS...";
    }
}

// Access Modifiers

class Employee {
    public name: string;
    protected position: string;
    private salary: number;

    constructor(name: string, position: string, salary: number) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    public getDetails(): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }

    public showSalary(): string {
        return `Salary: ${this.salary}`;
    }
}

// Class Counter

class Counter {
    private static count = 0;

    public static increment(): void {
        Counter.count++;
    }

    public static getCount(): number {
        return Counter.count;
    }
}

// Readonly Modifier

class Book {
    public readonly title: string;
    public readonly author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
}

// Abstract Class

abstract class Shape {
    public colour: string;

    constructor(colour: string) {
        this.colour = colour;
    }

    public abstract getArea(): number;
}

class Circle extends Shape {
    public radius: number;

    constructor(colour: string, radius: number) {
        super(colour);
        this.radius = radius;
    }

    public override getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    public sideA: number;
    public sideB: number;

    constructor(colour: string, sideA: number, sideB: number) {
        super(colour);
        this.sideA = sideA;
        this.sideB = sideB;
    }

    public override getArea(): number {
        return this.sideA * this.sideB;
    }
}

// Getters and Setters (Accessors)

class User {
    private _username!: string;

    constructor(username: string) {
        this.username = username;
    }

    get username() {
        return this._username;
    }
    
    set username(newUsername: string) {
        if (newUsername.length < 3) {
            throw new Error('Username must be at least 3 characters!')
        }

        this._username = newUsername;
    }
}

// Online Course Management System

abstract class Course {
  constructor(public title: string, public duration: number) {}

  abstract getDescription(): string;
}

class ProgrammingCourse extends Course {
  constructor(title: string, duration: number, public language: string) {
    super(title, duration);
  }

  getDescription(): string {
    return `Programming Course: ${this.title} in ${this.language} - ${this.duration} hours`;
  }
}

class DesignCourse extends Course {
  constructor(title: string, duration: number, public tools: string[]) {
    super(title, duration);
  }

  getDescription(): string {
    return `Design Course: ${this.title} using ${this.tools.join(', ')} - ${this.duration} hours`;
  }
}


// Simple Task Tracker with Access Control

class Task {
    public title: string;
    public description: string;
    public completed: boolean = false;
    private _createdBy: string;

    constructor(title: string, description: string, createdBy: string) {
        this.title = title;
        this.description = description;
        this._createdBy = createdBy;
    }

    get createdBy() {
        return this._createdBy;
    }

    public toggleStatus(): void {
        this.completed = !this.completed;
    }

    public getDetails(): string {
        return `Task: ${this.title} - ${this.description} - ${this.completed ? 'Completed' : 'Pending'}`
    }

    public static createSampleTasks(): Task[] {
        return [
            new Task('Do HW', 'Solve all problems', 'Me'),
            new Task('Clean room', 'Just do it', 'Me again')
        ]
    } 
}

// Inventory System

class Product {
  private static _productCount = 0;

  public static get productCount(): number {
    return Product._productCount;
  }

  public readonly id: number;
  private _name!: string;
  private _price!: number;

  constructor(name: string, price: number) {
    Product._productCount++;
    this.id = Product._productCount;
    this.name = name;
    this.price = price;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    if (value.trim().length < 1) {
      throw new Error("Product name must be at least 1 character long.");
    }
    this._name = value;
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    if (value <= 0) {
      throw new Error("Price must be greater than 0.");
    }
    this._price = value;
  }

  public getDetails(): string {
    return `ID: ${this.id}, Name: ${this._name}, Price: $${this._price}`;
  }
}

class Inventory {
  private products: Product[] = [];

  public addProduct(product: Product): void {
    this.products.push(product);
  }

  public listProducts(): string {
    const productLines = this.products.map(p => p.getDetails());
    productLines.push(`Total products created: ${Product.productCount}`);
    return productLines.join('\n');
  }
}


// Overloaded Calculator

class Calculator {
    public calculate(operation: 'power' | 'log', a: number, b: number): number;
    public calculate(operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number, c?: number, d?: number): number;

    public calculate(operation: 'power' | 'log' | 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number, c?: number, d?: number){
        let validNums = [a, b, c, d].filter(el => el !== undefined);
        
        switch (operation) {
            case 'power':
                return a ** b;
            case 'log':
                return Math.log(a) / Math.log(b);
            case 'add':
                return validNums.reduce((acc, val) => acc + val);
            case 'subtract':
                return validNums.reduce((acc, val) => acc - val);
            case 'multiply':
                return validNums.reduce((acc, val) => acc * val);
            case 'divide':
                return validNums.reduce((acc, val) => acc / val);
        }
    }
}