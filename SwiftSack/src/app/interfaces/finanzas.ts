// Interfaz para los valores calculados
export interface ValorCalculado {
  gross_profit: number;
  average_purchase_value: number;
  total_users: number;
  new_users_weekly: number;
  fecha:number;
}

// Interfaz para los productos más vendidos
export interface ProductoMasVendido {
  idProducto: number;
  nombre: string;
  cantidad: number;
  costo: number;
  total_obtenido: number;
  fecha:number;
}

// Interfaz para los productos menos vendidos
export interface ProductoMenosVendido {
  idProducto: number;
  nombre: string;
  cantidad: number;
  costo: number;
  total_obtenido: number;
  fecha:number;
}

// Interfaz para las ventas mensuales
export interface VentasMensuales {
  year:number;
  month: number;
  total_Sales: number;
}

export interface productExis{
  id:number;
  nombre:string;
  costo:number;
  tipo_producto:string;
  stock:number;
  fecha:number;
}

export interface materiaExist{
  id:number;
  nombre:string;
  costo:number;
  tipo_producto:string;
  stock:number;
  fecha:number;
}

export interface topClientes{
  id:number;
  numPedidos:number;
  name:string;
  telefono:string;
  email:string;
  fecha:number;
}
