import { Pipe, PipeTransform } from '@angular/core';
import { ProveedorSS } from './interfaces/swiftsack';
 
@Pipe({
  name: 'proveedorFilter'
})
export class ProveedoresFilterPipe implements PipeTransform {
 
  transform(value: ProveedorSS[], args: string): ProveedorSS[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((proveedor:ProveedorSS)=>
    proveedor.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }
 
}