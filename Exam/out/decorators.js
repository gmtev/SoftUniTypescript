"use strict";
// Тъй като използвам само първия и последения декоратор за решението и тестовете минават с тях, другите съм ги оставил празни.
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorator1 = decorator1;
exports.decorator2 = decorator2;
exports.decorator3 = decorator3;
exports.decorator4 = decorator4;
exports.decorator5 = decorator5;
function decorator1(constructor) {
    return class extends constructor {
        get totalPrice() {
            const price = Object.getOwnPropertyDescriptor(this, '_price')?.get?.call(this) || this._price;
            return price * 1.2;
        }
        get cancellationPrice() {
            const price = Object.getOwnPropertyDescriptor(this, '_price')?.get?.call(this) || this._price;
            return price * 1.2;
        }
    };
}
function decorator2(target, propertyKey, descriptor) { }
function decorator3(target, propertyKey, descriptor) { }
function decorator4(target, propertyKey, parameterIndex) { }
function decorator5(constructor) {
    class PartialMonthlyMotel extends constructor {
        static MotelName = 'Monthly Motel';
    }
    return PartialMonthlyMotel;
}
//# sourceMappingURL=decorators.js.map