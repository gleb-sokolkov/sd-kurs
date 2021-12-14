import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RolesPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.value = value.value?.toUpperCase() ?? '';
    return value;
  }
}
