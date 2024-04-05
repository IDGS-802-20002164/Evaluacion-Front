import { Pipe, PipeTransform } from '@angular/core';
import { Tarjeta } from './interfaces/tarjeta';
 
@Pipe({
  name: 'tarjetaFilter'
})
export class tarjetaFilterPipe implements PipeTransform {
 
  transform(value: Tarjeta[], args: string): Tarjeta[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((tarjeta:Tarjeta)=>
    tarjeta.nombreTarjeta.toLocaleUpperCase().indexOf(filter)!=-1
    ):value;
  }
 
}