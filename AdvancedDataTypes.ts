// Optional Multiplier

function multiplyOptional(
  a?: string | number,
  b?: string | number,
  c?: string | number
): number {
  const values: (string | number | undefined)[] = [a, b, c];

  let result: number = 1;

  for (const val of values) {
    if (val !== undefined) {
      result *= typeof val === 'string' ? parseInt(val, 10) : val;
    }
  }

  return result;
}

// Operator

function performOperation(
  param: string | number | string[],
  operation: 'Index' | 'Length' | 'Add',
  operand: number
): string | number | undefined {
  switch (operation) {
    case 'Index':
      if (typeof param === 'string' || Array.isArray(param)) {
        return param[operand];
      }
      break;

    case 'Length':
      if (typeof param === 'string' || Array.isArray(param)) {
        return param.length % operand;
      }
      break;

    case 'Add':
      return Number(param) + operand;
  }

  return undefined;
}

// Car Diagnostics

type DiagnosticsPart = {
  partName: string;
  runDiagnostics: () => string;
};

type CarBody = { material: string; state: string } & DiagnosticsPart;
type Tires = { airPressure: number; condition: string } & DiagnosticsPart;
type Engine = { horsepower: number; oilDensity: number } & DiagnosticsPart;

function runCarDiagnostics(
  carBody: CarBody,
  tires: Tires,
  engine: Engine
): void {
  console.log(carBody.runDiagnostics());
  console.log(tires.runDiagnostics());
  console.log(engine.runDiagnostics());
}

// Http Codes

type BaseHttpResponse = {
  code: number;
  text: string;
  printChars?: number;
};

type HttpResponse =
  | { code: 200; text: 'OK' }
  | { code: 201; text: 'Created' }
  | { code: 301; text: 'Moved Permanently' }
  | { code: 400; text: 'Bad Request'; printChars?: number }
  | { code: 404; text: 'Not Found'; printChars?: number }
  | { code: 500; text: 'Internal Server Error'; printChars?: number };

function printHttpResponse(response: BaseHttpResponse): void {
  if (typeof response.printChars === 'number') {
    console.log(response.text.slice(0, response.printChars));
  } else {
    console.log(response.text);
  }
}

// Hotel Visit

type Floor =
  | { number: 1; hallway: 'A'; train: () => void; pass: 'Guest' }
  | { number: 1; hallway: 'A'; train: () => void }
  | { number: 1; hallway: 'C'; train: () => void }
  | { number: 2; hallway: 'A'; dine: () => void }
  | { number: 2; hallway: 'A'; dine: () => void; pass: 'Guest' }
  | { number: 2; hallway: 'C'; dine: () => void }
  | { number: 3; hallway: 'A'; sleep: () => void }
  | { number: 3; hallway: 'C'; sleep: () => void };

function visitFloor(floor: Floor) {
  switch (floor.number) {
    case 1:
      floor.train();
      return;
    case 2:
      floor.dine();
      return;
    case 3:
      floor.sleep();
      return;
  }
}

// Type Extraction

type NameInfo = {
  fName: string;
  lName: string;
  age: number;
  getPersonInfo: () => string;
};

type AddressInfo = {
  city: string;
  street: string;
  number: number;
  postalCode: number;
  getAddressInfo: () => string;
};

function createCombinedFunction(name: NameInfo, location: AddressInfo) {
  return function (person: NameInfo & AddressInfo): void {
    console.log(`Hello, ${person.getPersonInfo()} from ${person.getAddressInfo()}`);
  };
}

// Example 
let names = {
  fName: 'John',
  lName: 'Doe',
  age: 22,
  getPersonInfo() {
    return `${this.fName} ${this.lName}, age ${this.age}`;
  }
};

let location = {
  city: 'Boston',
  street: 'Nowhere street',
  number: 13,
  postalCode: 51225,
  getAddressInfo() {
    return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`;
  }
};

let combinedFunction = createCombinedFunction(names, location);

let combinedPerson = Object.assign({}, names, location);

combinedFunction(combinedPerson);

// Validate User

type User = {
  id: number | string;
  username: string;
  passwordHash: string | string[];
  status: 'Locked' | 'Unlocked' | 'Deleted';
  email?: string;
};

function isValidUser(obj: any): obj is User {
  if (
    typeof obj !== 'object' ||
    obj === null ||
    !('id' in obj) ||
    !('username' in obj) ||
    !('passwordHash' in obj) ||
    !('status' in obj)
  ) {
    return false;
  }

  const { id, username, passwordHash, status } = obj;

  const validId =
    (typeof id === 'number' && id > 100) ||
    (typeof id === 'string' && id.length === 14);

  const validUsername =
    typeof username === 'string' && username.length >= 5 && username.length <= 10;

  const validPasswordHash =
    (typeof passwordHash === 'string' && passwordHash.length === 20) ||
    (Array.isArray(passwordHash) &&
      passwordHash.length === 4 &&
      passwordHash.every(
        (el) => typeof el === 'string' && el.length === 8
      ));

  const validStatus = status === 'Locked' || status === 'Unlocked';

  return validId && validUsername && validPasswordHash && validStatus;
}

// Extract Interfaces

interface User {
  username: string;
  signupDate: Date;
}

type TaskStatus = 'Logged' | 'Started' | 'InProgress' | 'Done';

interface Task {
  status: TaskStatus;
  title: string;
  daysRequired: number;
  assignedTo: User | undefined;
  changeStatus(newStatus: TaskStatus): void;
}

function assignTask(user: User, task: Task): void {
  if (task.assignedTo === undefined) {
    task.assignedTo = user;
    console.log(`User ${user.username} assigned to task '${task.title}'`);
  }
}

const user: User = {
  username: 'Margaret',
  signupDate: new Date(2022, 1, 13),
  passwordHash: 'random'
};

const task1: Task = {
  status: 'Logged',
  title: 'Need assistance',
  daysRequired: 1,
  assignedTo: undefined,
  changeStatus(newStatus: TaskStatus) {
    this.status = newStatus;
  }
};

const task2: Task = {
  status: 'Done',
  title: 'Test',
  daysRequired: 12,
  assignedTo: undefined,
  changeStatus(newStatus: TaskStatus) {
    this.status = newStatus;
  },
  moreProps: 300,
  evenMore: 'wow'
} as Task;

assignTask(user, task1);
assignTask(user, task2);

// Restaurant

type OrderStatus = "Pending" | "Shipped" | "Delivered";

interface Dish {
  dishName: string;
  price: number;
  isVegan: boolean;
  getDishInfo(): string;
}

interface OrderDetails {
  orderId: number;
  quantity: number;
  orderStatus: OrderStatus;
  getOrderSummary(): string;
  updateOrderStatus(): void;
  getOrderStatus(): string;
}

interface FullOrder extends Dish, OrderDetails {
  discount: number;
  deliveryAddress: string;
  getFinalPrice(): string;
}

let order: FullOrder = {
  dishName: 'Cheese Burger',
  price: 12,
  isVegan: false,
  orderId: 101,
  quantity: 2,
  discount: 10,
  deliveryAddress: '456 Burger Lane, Food City',
  orderStatus: 'Pending',

  getDishInfo() {
    return `${this.dishName} - Price: $${this.price}, Vegan: ${this.isVegan ? 'Yes' : 'No'}`;
  },

  getOrderSummary() {
    return `Order ID: ${this.orderId} - Dish: ${this.dishName}, Quantity: ${this.quantity}, Total Price: $${this.price * this.quantity}`;
  },

  updateOrderStatus() {
    if (this.orderStatus === "Pending") {
      this.orderStatus = "Shipped";
    } else if (this.orderStatus === "Shipped") {
      this.orderStatus = "Delivered";
    }
  },

  getOrderStatus() {
    return `Order Status: ${this.orderStatus}`;
  },

  getFinalPrice() {
    const totalPrice = this.price * this.quantity;
    const finalPrice = totalPrice - (totalPrice * (this.discount / 100));
    return `Final Price after ${this.discount}% discount: $${finalPrice}`;
  }
};
