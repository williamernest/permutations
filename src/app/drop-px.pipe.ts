import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dropPx' })
export class DropPxPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/px/g, '');
  }
}
