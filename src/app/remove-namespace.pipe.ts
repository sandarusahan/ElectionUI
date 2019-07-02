import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rmvNs'
})
export class RemoveNamespacePipe implements PipeTransform {

  transform(value: string, args?: any, args2?: any): any {
    if(value != undefined)
    return value.replace(args,"").replace(args2,"");
  }

}
