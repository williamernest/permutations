import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pixelsToDp' })
export class PixelsToDpPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/px/g, 'dp');
  }
}
