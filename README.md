# LARCS

Storefront ecommerce para LARCS, enfocado en calzado femenino premium. El proyecto está construido con Next.js, TypeScript y una arquitectura orientada a catálogo, experiencia visual de marca y gestión local de carrito/favoritos.

## Resumen

La aplicación activa del repositorio vive en `larcs-store/`.

Actualmente incluye:

- Home editorial con categorías destacadas.
- Catálogo filtrable por categoría, color, talla y precio.
- Vista de producto con galería, selección de talla y acciones de compra.
- Carrito y favoritos con estado local.
- API interna para servir imágenes desde la estructura organizada del proyecto.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand
- TanStack Query
- Radix UI
- Framer Motion

## Estructura Principal

```text
Larcs/
├─ README.md
└─ larcs-store/
   ├─ src/
   │  ├─ app/                 # Rutas, layout global y endpoints internos
   │  ├─ components/          # UI por dominio: home, catálogo, checkout, layout
   │  ├─ Img/                 # Assets organizados por categoría y logos
   │  ├─ lib/                 # Constantes, productos, utilidades y tema
   │  ├─ services/            # Integraciones y servicios
   │  ├─ store/               # Estado cliente (carrito, favoritos)
   │  └─ types/               # Tipos compartidos
   ├─ package.json
   └─ tsconfig.json
```

## Assets e Imágenes

Las imágenes del catálogo se sirven desde:

`larcs-store/src/Img`

Organización actual:

- `BOTAS`
- `BOTINES`
- `MOCASINES`
- `SANDALIAS`
- `TACONES`
- `Logos`

La app expone estos archivos a través del endpoint interno:

`/api/assets/[...path]`

Esto permite mantener los assets dentro del proyecto sin depender de carpetas externas al storefront.

## Scripts

Desde `larcs-store/`:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Desarrollo Local

### Requisitos

- Node.js `>= 20.11.1`
- npm

### Instalación

```bash
cd larcs-store
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

Aplicación disponible normalmente en:

`http://localhost:3000`

## Rutas Principales

- `/` Inicio
- `/catalogo` Catálogo general
- `/producto/[slug]` Detalle de producto
- `/carrito` Carrito
- `/pago` Flujo de pago
- `/contacto` Contacto
- `/nosotros` Información de marca

## Convenciones del Proyecto

- El storefront activo está en `larcs-store/`.
- Las imágenes del catálogo deben agregarse dentro de `src/Img/`.
- Los logos de marca deben mantenerse en `src/Img/Logos/`.
- La generación del catálogo se apoya en nombres de archivo e inferencias de categoría, color, tallas y precio.

## Validación Recomendada

Antes de publicar cambios:

```bash
cd larcs-store
npm run lint
npm run typecheck
npm run build
```

## Autoría

Proyecto de LARCS.