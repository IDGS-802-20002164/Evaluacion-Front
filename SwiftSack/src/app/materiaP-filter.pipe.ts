import { Pipe, PipeTransform } from '@angular/core';
import { MateriaPSS } from './interfaces/swiftsack';
 
@Pipe({
  name: 'materiaPFilter'
})
export class MateriaPFilterPipe implements PipeTransform {
 
  transform(value: MateriaPSS[], args: string): MateriaPSS[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((materiap:MateriaPSS)=>
    materiap.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }
 
}