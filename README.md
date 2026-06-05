#Nombre del proyecto
Musicly

## Funcionalidades
El proyecto de Musicly, permite a los usarios registrar cuentas para poder escuchar y cargar sus propias canciones en discos, además de escuchar las propuestas de otros usuarios, suscribirse, crear listas, ver estadísticas
y dejar comentarios en las canciones de otros usuarios. Además, la aplicación recoge estadísticas de lo que escucha el usuario para ofrecer recomendaciones personalizadas 

## Requisitos previos

- PHP >= 8.0
- Composer (si el proyecto lo usa)
- MySQL
- Servidor Nginx
- Git instalado

## Instalación

Clonar el repositorio y levantar los contenedores de docker compose, así como el servidor de node para el front.

## Uso

Acceder a www.musicly.com

## Estructura del Proyecto


/backend
 ├── src/
 │ ├── Controllers/
 │ ├── Models/
 │ └── Services/
 ├── public/
 │ └── index.php
 ├── docs/
 ├── tests/
 ├── vendor/
 ├── README.md
 ├── composer.json
 └── .env.example


front-end/
└── musicly/
    ├── node_modules/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── assets/
    │   ├── Componentes/
    │   │   ├── Elementos/
    │   │   ├── Elementos_clave/
    │   │   ├── Estructura/
    │   │   ├── Formularios/
    │   │   └── Paginas/
    │   ├── Contexto/
    │   ├── Hooks/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
└── node_modules/


## Acceso y Credenciales
Para acceder al proyecto, configurar las variables de entorno en el archivo `.env`:
```env
DB_HOST=localhost
DB_USER=usuario
DB_PASS=contraseña
DB_NAME=nombre_basedatos
APP_ENV=local
APP_DEBUG=true
```


## Contribución
1. Hacer un fork del repositorio.
2. Crear una nueva rama para la funcionalidad o corrección que se añade:
 ```bash
 git checkout -b nueva-funcionalidad
```
3. Cuando realice el pull request, el propietario del proyecto lo revisara y decidira si aprobarlo o no
