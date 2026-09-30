# MiPyme Marruecos: Red Popular de Gestión y Costeo

Backend NestJS para unidades productivas informales del Parque Marruecos (repostería y comercio popular). Aplica separación por módulos, repositorios, DTOs y lógica de negocio en servicios.

## Arranque con Docker

```bash
docker compose up --build -d
```

Esto inicia PostgreSQL y la aplicación en el contenedor `proyecto-institucional`.

- Panel: http://localhost:3000
- Swagger: http://localhost:3000/api/docs
- Salud: http://localhost:3000/api/salud
- Logs: `docker compose logs -f api`
- Detener: `docker compose down`

## Desarrollo local

Para ejecutar Nest fuera de Docker, inicia solo la base y luego el servidor:

```bash
docker compose up -d postgres
npm install
npm run start:dev
```

No ejecutes a la vez el servicio `api` de Docker y `npm run start:dev`, porque ambos usan el puerto 3000.

## Despliegue en Vercel

Vercel no puede conectarse al PostgreSQL local de Docker. Agrega una base PostgreSQL hospedada (por ejemplo, Neon) y configura en **Project Settings → Environment Variables**:

- `DATABASE_URL` o `POSTGRES_URL`: URL de conexión privada de la base.
- `DB_SSL=true`: si el proveedor requiere SSL.
- `NODE_ENV=production`.

Luego vuelve a desplegar. No subas `.env` ni pegues la URL de conexión en el repositorio.

## Estructura

```
src/
  common/           excepciones, interceptor de respuesta, dinero COP
  database/seeds/   datos de prueba (cheesecake + $120.000)
  modules/
    costeo/
    bolsillos/
    fiados/
    red-solidaria/
    conectividad/
database/ddl/001_init.sql   DDL PostgreSQL con JSONB
```

Cada módulo sigue: `controllers` → `services` → `repositories` → `entities` + `dto`.

## Reglas de negocio

| Módulo | Regla |
| --- | --- |
| Costeo | Costo usado = (precioPaquete / cantidadComprada) × cantidadUsada. Precio sugerido = costo unitario × (1 + 40%), redondeado a múltiplos de $500 COP. |
| Bolsillos | 60% reinversión, 30% sustento, 10% reserva. El 10% del bolsillo 3 alimenta el fondo comunitario (préstamos sin gota a gota). |
| Fiados | Estados PENDIENTE / PAGADO y enlace `https://wa.me/...` con Nequi/Daviplata. |
| Red solidaria | Compras colectivas, fondo mutuo, círculos de saberes. |
| Conectividad | Catálogo Impulso Local, IPES y Alcaldía Local Rafael Uribe Uribe. |

## Semilla

Al iniciar con base vacía se carga:

- Lote Cheesecake 12 porciones → **$18.000** lote, **$1.500** porción, **$2.500** sugerido.
- Cierre de caja **$120.000** → $72.000 / $36.000 / $12.000 (aporte al fondo $1.200).

El DDL de referencia está en `database/ddl/001_init.sql`. En desarrollo TypeORM sincroniza el esquema (`synchronize: true`).
