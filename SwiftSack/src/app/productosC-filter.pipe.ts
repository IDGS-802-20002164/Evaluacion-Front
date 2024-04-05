import { Pipe, PipeTransform } from '@angular/core';
import { ProductoSS } from './interfaces/swiftsack';

@Pipe({
  name: 'productoFilter'
})
export class ProductosCFilterPipe implements PipeTransform {

  transform(value: ProductoSS[], selectedPriceRange: string): ProductoSS[] {
    if (selectedPriceRange === 'all') {
      return value;
    }

    const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);

    return value.filter((producto: ProductoSS) =>
      (isNaN(minPrice) || producto.costo >= minPrice) &&
      (isNaN(maxPrice) || producto.costo <= maxPrice)
    );
  }

}
