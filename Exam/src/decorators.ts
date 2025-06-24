// Тъй като използвам само първия и последния декоратор за решението и тестовете минават с тях, другите съм ги оставил празни.


export function decorator1<T extends new (...args: any[]) => {}>(constructor: T) {
  return class extends constructor {

    get totalPrice(): number {
      const price = Object.getOwnPropertyDescriptor(this, '_price')?.get?.call(this) || (this as any)._price;
      return price * 1.2;
    }

    get cancellationPrice(): number {
      const price = Object.getOwnPropertyDescriptor(this, '_price')?.get?.call(this) || (this as any)._price;
      return price * 1.2;
    }
  };
}

export function decorator2(target: any, propertyKey: string, descriptor: PropertyDescriptor) {}
export function decorator3(target: any, propertyKey: string, descriptor: PropertyDescriptor) {}
export function decorator4(target: Object, propertyKey: string, parameterIndex: number) {}

export function decorator5<T extends abstract new (...args: any[]) => {}>(constructor: T){
    abstract class PartialMonthlyMotel extends constructor {
        public static readonly MotelName = 'Monthly Motel';
    }

    return PartialMonthlyMotel;
}

