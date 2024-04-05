export interface ProveedorSS {
  id:number;
  nombre:string;
  empresa:string;
  rfc:string;
  telefono:string;
  email:string;
  estatus:boolean;
}

export interface ProductoSS {
  id:number;
  nombre:string;
  descripcion:string;
  costo:number;
  foto:string;
  tipo_producto:string;
  receta:string;
  stock:number;
}

export interface DetalleProductoSS {
  id: number;
  id_materia: number;
  cantidad: number;
  id_producto: number;
}

export interface DetalleCompleto {
  id: number;
  materia: MateriaPSS;
  cantidad: number;
  producto: number;
}

export interface MateriaPSS {
  id:number;
  nombre:string;
  cantidad:number;
  unidad_medida:string;
  costo:number;
  idProveedor:number;
  estatus:boolean;
}
