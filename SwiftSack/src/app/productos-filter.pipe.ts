import { Pipe, PipeTransform } from '@angular/core';
import { ProductoSS } from './interfaces/swiftsack';

@Pipe({
  name: 'productoFilter'
})
export class ProductosFilterPipe implements PipeTransform {

  transform(value: ProductoSS[], args: string): ProductoSS[] {
    let filter:string=args ?args.toLocaleLowerCase():'';

    return filter? value.filter((producto:ProductoSS)=>
    producto.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }

}
