# Autopartes Gallegos — Frontend web inicial

## Tecnologías
- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3 (CDN)
- Bootstrap Icons (CDN)

## Cómo ejecutar
1. Extrae el ZIP.
2. Abre la carpeta `autopartes_gallegos_frontend_web` en Visual Studio Code.
3. Abre `index.html` en el navegador. Recomendado: instalar la extensión **Live Server** en VS Code.
4. En VS Code, haz clic derecho en `index.html` y selecciona **Open with Live Server**.

También puedes abrir `index.html` directamente con Chrome u Opera, aunque Live Server facilita el desarrollo.

## Estado actual
- Navegación lateral para los módulos identificados.
- Dashboard con indicadores ilustrativos.
- **Gestión de productos:** alta, edición, activación/desactivación, búsqueda, filtros por categoría y estado, alertas por existencias y exportación CSV.
- **Persistencia local de demostración:** los cambios del módulo de productos se conservan en el navegador mediante `localStorage`.
- **Catálogo público sincronizado:** consume una proyección pública de los productos administrados; refleja altas, ediciones, activaciones, desactivaciones y cambios de existencias/precios. Se actualiza entre pestañas del mismo navegador y al recuperar el foco. Solo recibe campos públicos; no expone costos internos.
- **Inventario:** consulta de existencias, alertas por stock mínimo, filtros, entradas, salidas, ajustes, validación de salidas, historial de movimientos y exportación CSV.
- **Proveedores:** alta y edición, RFC con validación de formato y duplicados, contacto, teléfono, correo, tipo, ciudad, dirección, condiciones de pago, notas, activación/desactivación, búsqueda, filtros y exportación CSV.
- **Compras:** creación de órdenes pendientes con proveedor activo, fecha, referencia, observaciones y múltiples productos; cálculo automático de importes; consulta y filtros; cancelación de órdenes pendientes; recepción completa con actualización de existencias, costo del producto e historial de movimientos; exportación CSV.
- **Punto de venta:** carrito, validación de existencias, métodos de pago, comprobante demostrativo e historial de ventas.
- **Movimientos:** historial centralizado de entradas, salidas y ajustes generados por Inventario, Compras y Punto de venta; búsqueda, filtros por tipo y fechas, consulta de existencias antes/después y exportación CSV.
- Apartados todavía pendientes de desarrollo funcional: reportes, scraping e inteligencia de mercado.

**Importante:** no está conectado al backend ni a SQL Server. La sincronización del catálogo es local al mismo navegador y origen mediante `localStorage`; no sincroniza otros dispositivos, navegadores ni usuarios. Para probar ambas vistas, ejecuta el proyecto con Live Server y abre `index.html` y `catalogo.html` desde el mismo host/puerto. Los datos continúan siendo de demostración.

## Próximas iteraciones recomendadas
1. Completar los módulos administrativos en el orden acordado: Compras, Punto de venta, Ventas, Movimientos, Usuarios y permisos, Reportes, Web scraping e Inteligencia de mercado.
2. Revisar el Dashboard y su información cuando los módulos operativos estén terminados.
3. Definir contratos de API con el backend Python.
4. Conectar consultas y operaciones a SQL Server a través del backend.
5. Implementar autenticación, autorización y validaciones.


## Catálogo público (nueva iteración)

- Abrir `catalogo.html` para consultar el catálogo público independiente.
- El catálogo permite búsqueda por nombre, código y marca; filtros por categoría y ordenamiento por precio o existencias.
- Cada tarjeta muestra precio, cantidad exacta y estado: `Disponible` (más de 5), `Pocas unidades` (1 a 5) o `Agotado` (0).
- `Gestión de productos` conserva el módulo interno de administración. El enlace `Catálogo público` abre una página separada sin navegación administrativa ni funciones de compra.
- Los registros siguen siendo ficticios y están definidos en `js/public-catalog.js`. El siguiente paso de integración será consumir un endpoint público de solo lectura del backend; no se debe conectar el navegador directamente a SQL Server.

Para probar, abre `index.html` y selecciona `Catálogo público`, o abre directamente `catalogo.html` con Live Server. Se requiere conexión a internet para cargar Bootstrap desde CDN.


## Inventario (nueva iteración)

- Consulta existencias de productos activos, unidades totales, stock bajo y agotados.
- Permite registrar movimientos de tipo Entrada, Salida y Ajuste. Entrada suma unidades; Salida resta unidades; Ajuste establece la existencia física final indicada.
- Valida cantidades enteras positivas y evita salidas mayores al stock disponible.
- Cada movimiento guarda folio, fecha, producto, tipo, cantidad, motivo, existencia anterior y existencia resultante.
- El historial se puede filtrar por tipo y texto; el inventario se exporta a CSV.
- Los cambios actualizan los productos compartidos con Gestión de productos y se guardan en `localStorage`. No hay conexión con backend ni SQL Server.


## Proveedores (nueva iteración)

- Incluye registros de demostración para revisar la tabla y los filtros.
- Permite registrar y editar razón social, RFC, contacto, teléfono, correo, tipo de proveedor, ciudad, dirección, condiciones de pago y notas.
- El RFC es opcional; cuando se captura se valida su estructura y se impiden duplicados. Se requiere al menos teléfono o correo como medio de contacto.
- Permite activar o desactivar proveedores sin borrar el registro. Los inactivos se conservan para trazabilidad y no estarán disponibles para futuras compras.
- La búsqueda contempla nombre, RFC, contacto, teléfono, correo e ID; se puede filtrar por categoría y estado.
- Los registros se guardan localmente en `localStorage` y se pueden exportar a CSV. No están sincronizados con otros navegadores ni conectados al backend/SQL Server.


## Compras (nueva iteración)

- Permite crear órdenes de compra asociadas a proveedores activos y agregar varios productos activos por orden.
- Cada línea captura cantidad entera y costo unitario; el subtotal y total se calculan automáticamente. No se agrega IVA automáticamente.
- Las órdenes nuevas quedan en estado `Pendiente` y no cambian las existencias al guardarse.
- La recepción es completa (no parcial): al confirmarla, suma las cantidades al stock, actualiza el costo del producto al último costo de compra y crea un movimiento `Entrada` por cada producto con referencia al folio de compra.
- Las órdenes pendientes se pueden cancelar; una orden recibida o cancelada no se puede volver a recibir.
- Incluye consulta de detalle, búsqueda por folio/proveedor, filtros por estado y fecha y exportación CSV.
- Los registros se guardan en `localStorage` mediante `ag_demo_purchases_v1`. La operación es demostrativa y no está conectada al backend ni a SQL Server.


## Versión 7 – Punto de venta (POS)

- Búsqueda de productos por código, OEM, nombre y marca; filtro por categoría.
- Carrito con edición de cantidades y eliminación de artículos.
- Validación de existencias antes de agregar y al confirmar la venta.
- Métodos de pago: efectivo, tarjeta y transferencia. Para efectivo calcula el cambio.
- Confirmación de venta con folio, cliente opcional y comprobante imprimible de demostración.
- Al confirmar, descuenta existencias, registra movimientos de salida y agrega la venta al historial.
- Historial de ventas con búsqueda, detalle y exportación CSV.
- Ventas, productos y movimientos se guardan en localStorage.

Los datos continúan siendo locales y de demostración; el comprobante no es una factura fiscal y no existe integración con terminal bancaria ni backend.


## Versión 8 – Movimientos de inventario

- Centraliza los movimientos que generan Inventario, recepción de Compras y confirmación del Punto de venta.
- Presenta indicadores de entradas, salidas, ajustes y variación neta de existencias.
- Permite buscar por folio, código, producto y motivo; filtrar por tipo y rango de fechas.
- Muestra la cantidad, existencia anterior y existencia posterior de cada operación.
- Exporta el resultado filtrado a CSV.
- Es un módulo de consulta: no permite modificar ni eliminar movimientos para conservar la trazabilidad.
- Comparte el historial `ag_demo_inventory_movements_v1` en `localStorage`; no está conectado al backend ni a SQL Server.


## Versión 9 – Usuarios, permisos e inicio de sesión

- Pantalla de inicio de sesión para acceder al sistema administrativo.
- Usuario inicial de demostración: `admin` / `Admin123!`. Se recomienda cambiar la contraseña al comenzar las pruebas.
- Roles: Super Admin (todos los módulos y administración de usuarios), Administrador (operación y reportes, sin gestión de usuarios) y Empleado (acceso operativo limitado).
- El Super Admin puede crear y editar cuentas, asignar roles, cambiar contraseñas, activar/desactivar usuarios y personalizar permisos por módulo.
- Se impide desactivar la propia cuenta, cambiar el propio rol y dejar el sistema sin un Super Admin activo.
- Los módulos no autorizados se ocultan del menú y se bloquea la navegación desde la interfaz.
- La sesión se mantiene en la pestaña/navegador mediante `sessionStorage`; las cuentas se guardan en `localStorage`.

**Limitación crítica:** esta autenticación es únicamente demostrativa y del lado del cliente. Las contraseñas se almacenan localmente sin cifrado y los permisos pueden manipularse desde el navegador. No usar con información real ni considerarlo un control de seguridad de producción. En la siguiente etapa, FastAPI deberá autenticar con contraseñas hasheadas, emitir sesiones/tokens seguros y validar cada permiso en el servidor; SQL Server almacenará usuarios, roles y permisos.


Corrección v10: se corrigió la referencia al elemento de ayuda de contraseña en el formulario de Usuarios y permisos. El identificador JavaScript ahora coincide con el HTML (`password-help`), permitiendo abrir el modal de alta/edición.


## Versión 11 – Reportes

- Incorpora reportes de ventas, compras, inventario y movimientos desde el menú administrativo.
- Ventas: total confirmado, número de operaciones, ticket promedio, importes por método de pago y productos más vendidos cuando existe detalle de artículos. Las ventas canceladas no se incluyen.
- Compras: importe de órdenes recibidas, número de recepciones, promedio y desglose por proveedor. Las órdenes pendientes y canceladas no se incluyen.
- Inventario: productos, unidades, alertas de stock, existencias por categoría y valoración estimada al costo registrado.
- Movimientos: entradas, salidas y ajustes por periodo con su detalle.
- Filtros por fecha inicial/final y categoría para el reporte de inventario. Permite exportar el reporte seleccionado a CSV e imprimirlo.
- Los reportes se calculan con los datos locales compartidos por los módulos existentes. Los datos históricos de demostración sin detalle no se consideran para el ranking de productos. No hay conexión con backend ni SQL Server.


## Versión 12 – Sincronización del catálogo público

- El panel administrativo mantiene la fuente principal `ag_demo_products_v1`.
- Cada guardado de productos genera una proyección pública en `ag_public_catalog_products_v1`, con código, OEM, nombre, marca, categoría, precio de venta, existencias, mínimo y estado activo. No se publican costo de compra ni otros campos internos.
- El catálogo público lee esa proyección y muestra solo productos activos. Las existencias y el estado se calculan con la cantidad y el stock mínimo configurado para cada producto.
- Los cambios hechos en otra pestaña del mismo navegador se reflejan mediante el evento `storage`; también se vuelve a consultar al regresar a la pestaña.
- Las operaciones de inventario, recepción de compras y ventas que guardan productos actualizan la proyección pública.
- Sigue siendo una integración local de frontend: no hay sincronización entre dispositivos ni conexión a FastAPI/SQL Server.
