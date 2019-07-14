import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveNamespaceService {

  constructor() { }

  transform(value: string, args: any, args2?: any): any {
    if(value != undefined)
    return value.replace(args,"").replace(args2,"");
  }
}
