export interface Compra{
    idCompra:number,
    fecha: Date,
    iduser: number,
    idProveedor: number,
    folio: string,
    estatus: number,
}

export interface DetalleCompra{
    id:number,
    idCompra:number,
    idProducto:number,
    cantidad:number,
    precio:number
}
