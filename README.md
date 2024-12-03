# ZTechnologyCRM (StartUp - OARA) - Backend

Este es el repositorio del backend para la aplicación **ZTechnologyCRM**, para pequeñas y medianas empresas que buscan una solución integral para gestionar sus operaciones diarias.
La aplicación no solo mejora la eficiencia interna, sino que también eleva la experiencia del usuario y maximiza las oportunidades de venta.

## Características

- API RESTful para la autenticación de usuarios.
- Soporte para autenticación mediante tokens JWT.
- Endpoints para la gestion de usuarios, clientes, productos y cotizaciones.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para la creación de APIs RESTful.
- **PostgreSQL**: Base de datos SQL para almacenar las tareas y sus detalles.
- **Sequelize**: ORM para la interacción con PostgreSQL.
- **JSON Web Tokens (JWT)**: Para la autenticación de usuarios.
- **bcryptjs**: Para el cifrado de contraseñas.

## Endpoints Principales

- POST /login: Inicia sesión y devuelve un token JWT.
- POST /register: Registra un nuevo usuario.
- GET /products: Obtiene todas los productos.
- POST /products: Crea nuevos productos.
- PUT /products/:id: Actualiza un producto por su Id.
- DELETE /products/:id: Eliminar un producto por su Id.
- GET /clients: Obtiene todas los clientes.
- POST /clients: Crea nuevos clientes.
- PUT /clients/:id: Actualiza un cliente por su Id.
- DELETE /clients/:id: Eliminar un cliente por su Id.
- GET /users: Obtiene todas los usuarios (Admin y Gestores).
- POST /users: Crea nuevos usuarios proporsionando roles.
- PUT /users/:id: Actualiza un usuario por su Id.
- DELETE /users/:id: Eliminar un usuario por su Id.
- GET /quotes: Obtiene todas las cotizaciones.
- POST /quotes: Crea nuevas cotizacioness.
- PUT /quotes/:id: Actualiza una cotización por su Id.
- DELETE /quotes/:id: Eliminar una cotización por su Id.

## Estructura del Proyecto

- auth/: Contiene el auth.js, ruta para el registro de usuarios, valida los datos de entrada, verifica si el correo ya existe, y crea un nuevo usuario con una contraseña encriptada.
- middleware/: Contiene authMiddleware.js, para validar el token JWT en las solicitudes.
- products/: Contiene el modelo de product. Ademas de los endpoints para gestionar el CRUD de los productos
- user/: Contiene el modelo de User, y los endpoint para el CRUD de usuarios 

## Contribuciones

Las contribuciones son bienvenidas.
