import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArr'
})
export class NumToArrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let numRange : number[] = [];
    for(let i =1; i<=value; i++){
      numRange.push(i);
    }
    return numRange;
  }

}
