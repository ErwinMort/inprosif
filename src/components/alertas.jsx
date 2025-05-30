//FUSIÓN DE LOS DOS CODIGOS (vane/erwin))
import Swal from "sweetalert2";

// Alerta Global
export const alertaglobal = () => {
    Swal.fire({
        title: 'Error',
        text: 'Surgió un error del servidor',
        icon: 'error',
        timer: 4000  // Usamos el valor del segundo código (4000ms)
    });
}

/* --------------------------------- Alertas para Productos ------------------------------- */
// Alertas para archivo BajaPublicProd
export const publicalta = () => {
    Swal.fire({
        title: 'Producto Público',
        text: 'Producto cambió a estado público',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const publicaltaerror = () => {
    Swal.fire({
        title: 'Producto Público Fallido',
        text: 'El producto no cambió a estado público',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const publicbaja = () => {
    Swal.fire({
        title: 'Producto No Público',
        text: 'El producto cambió a estado no público',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const publicbajaerror = () => {
    Swal.fire({
        title: 'Producto No Público Fallido',
        text: 'El producto no cambió a estado no público',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

// Alertas para archivo AddProducto
export const addproductosuccess = () => {
    Swal.fire({
        title: 'Registro Exitoso',
        text: 'Producto añadido correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const addproductoerror = () => {
    Swal.fire({
        title: 'Registro Fallido',
        text: 'Error al añadir producto',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

// Alertas para el archivo DeleteProducto
export const deleteproductoalta = () => {
    Swal.fire({
        title: 'Alta Exitosa',
        text: 'Producto dado de alta exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteproductobaja = () => {
    Swal.fire({
        title: 'Baja Exitosa',
        text: 'Producto dado de baja exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Alertas para el archivo EditProducto
export const editproductosuccess = () => {
    Swal.fire({
        title: 'Actualización Exitosa',
        text: 'El producto se actualizó correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const editproductoerror = () => {
    Swal.fire({
        title: 'Actualización Fallida',
        text: 'Se produjo un error al actualizar producto',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Proveedores ------------------------------- */
export const editproveedorsuccess = () => {
    Swal.fire({
        title: 'Actualización Exitosa',
        text: 'Proveedor actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const editproveedorerror = () => {
    Swal.fire({
        title: 'Actualización Fallida',
        text: 'Error al actualizar proveedor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteproveedoralta = () => {
    Swal.fire({
        title: 'Alta Exitosa',
        text: 'El proveedor fue dado de alta correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteproveedoraltaerror = () => {
    Swal.fire({
        title: 'Alta Fallida',
        text: 'El proveedor no fue dado de alta',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteproveedorbaja = () => {
    Swal.fire({
        title: 'Baja Exitosa',
        text: 'El proveedor fue dado de baja correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteproveedorbajaerror = () => {
    Swal.fire({
        title: 'Baja Fallida',
        text: 'El proveedor no fue dado de baja',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}
 
export const addproveedorsuccess = () => {
    Swal.fire({
        title: 'Registro Exitoso',
        text: 'El proveedor fue registrado de manera exitosa',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const addproveedorerror = () => {
    Swal.fire({
        title: 'Registro Fallido',
        text: 'El proveedor no fue registrado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Materiales ------------------------------- */
export const editmaterialsuccess = () => {
    Swal.fire({
        title: 'Actualización Exitosa',
        text: 'Material actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
} 

export const editmaterialerror = () => {
    Swal.fire({
        title: 'Actualización Fallida',
        text: 'El material no se ha actualizado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
} 

export const deletematerialalta = () => {
    Swal.fire({
        title: 'Alta Exitosa',
        text: 'Material dado de alta correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deletematerialaltaerror = () => {
    Swal.fire({
        title: 'Alta Fallida',
        text: 'El material no fue dado de alta',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const deletematerialbaja = () => {
    Swal.fire({
        title: 'Baja Exitosa',
        text: 'Material dado de baja correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deletematerialbajaerror = () => {
    Swal.fire({
        title: 'Baja Fallida',
        text: 'El material no fue dado de baja',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const addmaterialsuccess = () => {
    Swal.fire({
        title: 'Registro Exitoso',
        text: 'Material añadido correctamente',  // Texto corregido para ser específico
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const addmaterialerror = () => {
    Swal.fire({
        title: 'Registro Fallido',
        text: 'Error al añadir material',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Ventas ------------------------------- */
export const addventasuccess = () => {
    Swal.fire({
        title: 'Venta Registrada',
        text: 'La venta quedó registrada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteventaalta = () => {
    Swal.fire({
        title: 'Alta Exitosa',
        text: 'Venta activada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteventaaltaerror = () => {
    Swal.fire({
        title: 'Alta Fallida',
        text: 'La venta no fue activada',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteventabaja = () => {
    Swal.fire({
        title: 'Baja Exitosa',
        text: 'Venta eliminada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteventabajaerror = () => {
    Swal.fire({
        title: 'Baja Fallida',
        text: 'La venta no fue eliminada',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const editventasuccess = () => {
    Swal.fire({
        title: 'Actualización Exitosa',
        text: 'Venta actualizada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const editventaerror = () => {
    Swal.fire({
        title: 'Actualización Fallida',
        text: 'La venta no se ha actualizado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Cotizaciones ------------------------------- */
export const cotizacionsuccess = () => {
    Swal.fire({
        title: 'Cotización Exitosa',
        text: 'La cotización fue generada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const gencotizacionerror = () => {
    Swal.fire({
        title: 'Cotización Fallida',
        text: 'La cotización no fue generada, ocurrió un error',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Estados de Venta ------------------------------- */
export const estatusiniciar = () => {
    Swal.fire({
        title: 'Estado actualizado',
        text: 'La venta ha sido marcada como "Sin iniciar"',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const estatusproceso = () => {
    Swal.fire({
        title: 'Estado actualizado',
        text: 'La venta ha sido marcada como "En proceso"',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const estatusfinalizada = () => {
    Swal.fire({
        title: 'Estado actualizado',
        text: 'La venta ha sido marcada como "Finalizada"',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const estatuscancelada = () => {
    Swal.fire({
        title: 'Estado actualizado',
        text: 'La venta ha sido marcada como "Cancelada"',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Clientes ------------------------------- */
export const deleteusuarioalta = () => {
    Swal.fire({
        title: 'Alta Exitosa',
        text: 'Usuario dado de alta exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteusuariobaja = () => {
    Swal.fire({
        title: 'Baja Exitosa',
        text: 'Usuario dado de baja exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const addclientesuccess = () => {
    Swal.fire({
        title: 'Registro Exitoso',
        text: 'Cliente añadido correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const addclienteerror = () => {
    Swal.fire({
        title: 'Registro Fallido',
        text: 'Error al añadir cliente',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas para Procesos ------------------------------- */
export const addprocesosuccess = () => {
    Swal.fire({
        title: 'Proceso Registrado',
        text: 'El proceso quedó registrado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteprocesoalta = () => {
    Swal.fire({
        title: 'Alta Exitosa',
        text: 'Proceso activado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteprocesoaltaerror = () => {
    Swal.fire({
        title: 'Alta Fallida',
        text: 'El proceso no fue activado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteprocesobaja = () => {
    Swal.fire({
        title: 'Baja Exitosa',
        text: 'Proceso eliminado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const deleteprocesobajaerror = () => {
    Swal.fire({
        title: 'Baja Fallida',
        text: 'El proceso no fue eliminado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const editprocesosuccess = () => {
    Swal.fire({
        title: 'Actualización Exitosa',
        text: 'Proceso actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const editprocesoerror = () => {
    Swal.fire({
        title: 'Actualización Fallida',
        text: 'El proceso no se ha actualizado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

/* --------------------------------- Alertas Varias ------------------------------- */
export const reportealerta = () => {
    Swal.fire({
        title: 'No seleccionaste un tipo de reporte',
        text: 'Falta seleccionar un tipo de reporte, favor de seleccionarlo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const fechasalerta = () => {
    Swal.fire({
        title: 'No seleccionaste las fechas',
        text: 'Favor de seleccionar ambas fechas',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const reportess = () => {
    Swal.fire({
        title: 'Reporte realizado con éxito',
        text: 'El reporte se ha generado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

export const altadoble = () => {
    Swal.fire({
        title: 'El producto ya está dado de alta',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const bajadoble = () => {
    Swal.fire({
        title: 'El producto ya está dado de baja',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const publicoaltadoble = () => {
    Swal.fire({
        title: 'El producto ya está en estado público',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const publicobajadoble = () => {
    Swal.fire({
        title: 'El producto ya no está en estado público',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const altadoblemat = () => {
    Swal.fire({
        title: 'El material ya está dado de alta',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const bajadoblemat = () => {
    Swal.fire({
        title: 'El material ya está dado de baja',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const altadobleprov = () => {
    Swal.fire({
        title: 'El proveedor ya está dado de alta',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const bajadobleprov = () => {
    Swal.fire({
        title: 'El proveedor ya está dado de baja',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
}

export const genevidencia = () => {
    Swal.fire({
        title: 'Evidencia enviada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}