import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RolesPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.role_value = value.role_value.toUpperCase() ?? '';
    return value;
  }
}
