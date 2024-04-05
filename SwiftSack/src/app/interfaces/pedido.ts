export interface Pedido {
    id:number,
    fecha:Date,
    iduser:number,
    idDireccion:number,
    folio:string,
    estatus:number
}

export interface DetallePedido{
    id:number,
    idPedido:number,
    idProducto:number,
    cantidad:number,
    costoTotal:number
}
