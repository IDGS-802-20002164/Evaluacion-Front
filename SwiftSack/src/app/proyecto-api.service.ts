import { ProductoMasVendido, ProductoMenosVendido, ValorCalculado, VentasMensuales } from './interfaces/finanzas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MateriaPSS, ProveedorSS, ProductoSS, DetalleProductoSS } from './interfaces/swiftsack';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'; // Agrega esta importaciÃ³n
import { Usuario, UsuarioMod, UsuarioRegistro } from './interfaces/usuario';

import { Direccion } from './interfaces/direccion';
import { Tarjeta } from './interfaces/tarjeta';
import { Compra, DetalleCompra } from './interfaces/compra';
import { Carrito } from './interfaces/carrito';
import { DetallePedido, Pedido } from './interfaces/pedido';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' // Cambia este valor según el formato que estés utilizando (p. ej., application/json)
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService {
  
  private _proveedoresss:ProveedorSS[]=[
    {
      id:0,
    nombre:'',
    empresa:'',
    telefono:'',
    rfc:'',
    email:'',
    estatus:true

    },
  ]

  private _materiaP:MateriaPSS[]=[
    {
      id:0,
      nombre:'',
      cantidad:0,
      unidad_medida:'',
      costo:0,
      idProveedor:0,
      estatus:true

    },
  ]

  _direccion:Direccion[]=[
    {
      idDireccion: 0, 
      idUser: 0, 
      nombreCompleto: '',
      calleNumero: '',
      codigoPostal: '',
      telefono: '',
    },
  ]

  constructor(private http:HttpClient) { }
  
  /*Links de usuarios*/
  public register(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post<any>('https://localhost:7267/api/Auth/register', usuario);
  }
 
  public login(datos:Usuario): Observable<any> {
    return this.http.post<any>('https://localhost:7267/api/Auth/Login', datos);
  }

  public getProfile(id: number): Observable<UsuarioMod> {
    return this.http.get<UsuarioMod>(`https://localhost:7267/api/Auth/profile/${id}`);
  }

  public updateProfile(id: number, updatedUser: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7267/api/Auth/profile/${id}`, updatedUser);
  }

  private getRoleName(roleId: number): string {
    const roles = [
      { id: 1, name: 'admin', description: 'Administrador del sistema' },
      { id: 2, name: 'empleado', description: 'Empleado de la empresa' },
      { id: 3, name: 'cliente', description: 'Cliente' }
    ];

    const role = roles.find(r => r.id === roleId);
    return role ? role.description : '';
  }

  getUserProfile(id: number): Observable<UsuarioMod> {
    return this.getProfile(id).pipe(
      map((userProfile: UsuarioMod) => {
        return userProfile;
      })
    );
  }

  get provedor():ProveedorSS[]{
    return[...this._proveedoresss]
  }

  get materiap():MateriaPSS[]{
    return[...this._materiaP]
  }

  get direccion():Direccion[]{
    return[...this._direccion]
  }

  public getProveedor():Observable<ProveedorSS[]>{
    return this.http.get<ProveedorSS[]>('https://localhost:7267/api/ProveMater')
  }

  agregarNuevoProveedor(datos:ProveedorSS){
    return this.http.post('https://localhost:7267/api/ProveMater',datos)
  }
  editarProveedor(datos: ProveedorSS) {
    const url = `https://localhost:7267/api/ProveMater/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarProveedor(id:number) {
    const url = `https://localhost:7267/api/ProveMater?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerProveedor(id:number):Observable<ProveedorSS[]>{
    return this.http.get<ProveedorSS[]>(`https://localhost:7267/api/ProveMater/${id}`);
  }

  public getMateria():Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>('https://localhost:7267/api/MateriaP')
  }

  agregarNuevaMateria(datos:MateriaPSS){
    return this.http.post('https://localhost:7267/api/MateriaP',datos)
  }

  editarMateria(datos: MateriaPSS) {
    const url = `https://localhost:7267/api/MateriaP/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarMateria(id:number) {
    const url = `https://localhost:7267/api/MateriaP?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerMP(id:number):Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>(`https://localhost:7267/api/MateriaP/${id}`);
  }

  /*Links de finanzas*/
  public getProductosMasVendidos(): Observable<ProductoMasVendido[]> {
    return this.http.get<ProductoMasVendido[]>('https://localhost:7160/api/Finanzas/MasVta');
  }

  public getProductosMenosVendidos(): Observable<ProductoMenosVendido[]> {
    return this.http.get<ProductoMenosVendido[]>('https://localhost:7160/api/Finanzas/MenosVta');
  }

  public getValoresCalculados(): Observable<ValorCalculado[]> {
    return this.http.get<ValorCalculado[]>('https://localhost:7160/api/Finanzas/Valores');
  }

  public getVentasMensuales(): Observable<VentasMensuales[]> {
    return this.http.get<VentasMensuales[]>('https://localhost:7160/api/Finanzas/VtaMes');
  }

  public getProductosExistentes(): Observable<ProductoMenosVendido[]> {
    return this.http.get<ProductoMenosVendido[]>('https://localhost:7160/api/Finanzas/ProductosEx');
  }

  public getMateriaExistentes(): Observable<ValorCalculado[]> {
    return this.http.get<ValorCalculado[]>('https://localhost:7160/api/Finanzas/Materia');
  }

  public getTopClientes(): Observable<VentasMensuales[]> {
    return this.http.get<VentasMensuales[]>('https://localhost:7160/api/Finanzas/Top5Clientes');
  }
  
  /* Links de Producto*/
  public getProducto():Observable<ProductoSS[]>{
    return this.http.get<ProductoSS[]>('https://localhost:7267/api/Productos')
  }
  
  agregarProducto(datos:ProductoSS){
    return this.http.post('https://localhost:7267/api/Productos',datos)
  }

  editarProducto(datos: ProductoSS) {
    const url = `https://localhost:7267/api/Productos/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarProducto(id:number) {
    const url = `https://localhost:7267/api/Productos/${id}`;
    return this.http.delete(url);
  }

  obtenerProducto(id:number):Observable<ProductoSS[]>{
    return this.http.get<ProductoSS[]>(`https://localhost:7267/api/Productos/${id}`);
  }

  verDetalle(id:number):Observable<DetalleProductoSS[]>{
    return this.http.get<DetalleProductoSS[]>(`https://localhost:7267/api/DetalleProducto/${id}`);
  }

  agregarStock(stock: number, id:number) {
    const url = `https://localhost:7267/api/Productos/agregar-stock/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, stock, { headers });
  }

  agregarDetalle(datos:DetalleProductoSS){
    return this.http.post('https://localhost:7267/api/DetalleProducto',datos)
  }

  editarDetalle(datos: DetalleProductoSS) {
    const url = `https://localhost:7267/api/DetalleProducto/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarDetalle(id:number) {
    const url = `https://localhost:7267/api/DetalleProducto/${id}`;
    return this.http.delete(url);
  }

  obtenerDetalle(id:number):Observable<DetalleProductoSS[]>{
    return this.http.get<DetalleProductoSS[]>(`https://localhost:7267/api/DetalleProducto/obtener-id/${id}`);
  }
    
  /* Links de Direccion */
  public getDireccion(idUser:number):Observable<Direccion[]>{
    return this.http.get<Direccion[]>(`https://localhost:7267/api/Direccion/obtener-direcciones/${idUser}`)
  }
  
  addDireccion(datos:Direccion){
    return this.http.post('https://localhost:7267/api/Direccion',datos)
  }
  
  editarDireccion(datos: Direccion) {
    const url = `https://localhost:7267/api/Direccion/${datos.idDireccion}`;
    return this.http.put(url, datos);
  }

  eliminarDireccion(id:number) {
    const url = `https://localhost:7267/api/Direccion?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerDireccion(id:number):Observable<Direccion[]>{
    return this.http.get<Direccion[]>(`https://localhost:7267/api/Direccion/${id}`);
  }

  /* Links de Tarjetas */
  public getTarjeta(idUser:number):Observable<Tarjeta[]>{
    return this.http.get<Tarjeta[]>(`https://localhost:7267/api/Tarjeta/obtener-tarjetas/${idUser}`)
  }

  addTarjeta(datos:Tarjeta){
    return this.http.post('https://localhost:7267/api/Tarjeta',datos)
  }
  
  editarTarjeta(datos: Tarjeta) {
    const url = `https://localhost:7267/api/Tarjeta/${datos.idTarjeta}`;
    return this.http.put(url, datos);
  }

  eliminarTarjeta(id:number) {
    const url = `https://localhost:7267/api/Tarjeta?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerTarjeta(id:number):Observable<Tarjeta[]>{
    return this.http.get<Tarjeta[]>(`https://localhost:7267/api/Tarjeta/${id}`);
  }

  /*Links de Compra*/
  getMateriaProveedor(id:number):Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>(`https://localhost:7267/api/Compra/${id}`);
  }

  addCompra(datos: Compra):Observable<Compra> {  
    return this.http.post<Compra>('https://localhost:7267/api/Compra',datos);
  }

  addDetalleCompra(detalles: DetalleCompra) {
    return this.http.post('https://localhost:7267/api/DetalleCompra',detalles);
  }

  /*Links de Carrito*/
  getCarritoUser(id:number):Observable<Carrito[]>{
    return this.http.get<Carrito[]>(`https://localhost:7267/api/Carrito/obtener-carrito/${id}`)
  }

  getCarritoItems(id:number):Observable<ProductoSS[]>{
    return this.http.get<ProductoSS[]>(`https://localhost:7267/api/Carrito/obtener-items/${id}`)
  }

  addCarrito(datos:Carrito){
    return this.http.post('https://localhost:7267/api/Carrito',datos)
  }

  eliminarItem(id:number) {
    const url = `https://localhost:7267/api/Carrito?Id=${id}`;
    return this.http.delete(url);
  }

  eliminarItemsByUser(id:number) {
    const url = `https://localhost:7267/api/Carrito/limpiar-carrito/${id}`;
    return this.http.delete(url);
  }

  /*Links de pedidos*/
  getMisPedidos(id:number):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`https://localhost:7267/api/Pedido/obtener-mis-pedidos/${id}`)
  }

  getPedidos():Observable<Pedido[]>{
    return this.http.get<Pedido[]>('https://localhost:7267/api/Pedido')
  }

  addPedido(datos: Pedido):Observable<Pedido> {  
    return this.http.post<Pedido>('https://localhost:7267/api/Pedido',datos);
  }

  addDetallePedido(detalles: DetallePedido) {
    return this.http.post('https://localhost:7267/api/DetallePedido',detalles);
  }

  obtenerPedido(id:number):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`https://localhost:7267/api/Pedido/${id}`);
  }

  getPedidoItems(id:number):Observable<ProductoSS[]>{
    return this.http.get<ProductoSS[]>(`https://localhost:7267/api/DetallePedido/obtener-id/${id}`)
  }

  getDetallePedido(id:number):Observable<DetallePedido[]>{
    return this.http.get<DetallePedido[]>(`https://localhost:7267/api/DetallePedido/${id}`)
  }

  actualizarPedido(datos: Pedido) {
    const url = `https://localhost:7267/api/Pedido/${datos.id}`;
    return this.http.put(url, datos);
  }
}
