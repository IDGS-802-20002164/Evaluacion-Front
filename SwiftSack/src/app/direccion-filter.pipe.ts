import { Pipe, PipeTransform } from '@angular/core';
import { Direccion } from './interfaces/direccion';
 
@Pipe({
  name: 'direccionFilter'
})
export class direccionFilterPipe implements PipeTransform {
 
  transform(value: Direccion[], args: string): Direccion[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((direccion:Direccion)=>
    direccion.calleNumero.toLocaleUpperCase().indexOf(filter)!=-1
    ):value;
  }
 
}