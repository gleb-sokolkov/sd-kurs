import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsStrongPassword',
      target: object.constructor,
      propertyName,
      options: {
        message:
          'Password is weak. It must contains: at least 1 uppercase letter, 1 lowercase letter, 1 number or special character and characters in range [7-20] in general',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex =
            /(?=^.{7,20}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}
