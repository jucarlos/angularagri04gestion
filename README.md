## Aplicación de Gestión para el curso de Angular 2022

En esta aplicación se tocan:

- Autenticación jwt
- Guards
- Formularios Template y Reactivos.
- Validacions personalizadas
- Pipes poersonalizados
- Peticiones HTTP
- Uso de una clase abstracta para extender luego en los servicios mediante Genéricos.


Para crear un usuario no hemos hecho pantalla , pero se puede utilizar una petición POST al servidor con esta configuración:

https://backend-marco.herokuapp.com/usuarios

En el body tipo Row y JSON se puede crear por ejemplo así:
{
    "nombre": "edicion2022",
    "email": "edicion1@gmail.com",
    "password": "123456"
}

