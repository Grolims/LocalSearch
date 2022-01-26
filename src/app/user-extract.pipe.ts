import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userExtract'
})
export class UserExtractPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
