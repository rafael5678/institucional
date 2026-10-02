# MiPyme Marruecos: Red Popular de Gestión, Costeo y Economía Solidaria
## Universidad Cooperativa de Colombia (UCC) — Institucional III (Laboratorio en Gestión Solidaria)
### Caso No. 25: Parque Marruecos (UPZ 55 Marruecos, Localidad 18 Rafael Uribe Uribe, Bogotá D.C.)

Aplicación integral sociotécnica que une a las unidades productivas populares del Parque Marruecos en torno a la **Asociación Mutual ASOMARRUECOS** (amparada bajo la **Ley 454 de 1998** y la **Ley 2143 de 2021**).

---

## 🌟 Valor Agregado & Innovación Incremental

1. **Compras Colectivas e Insumos Compartidos (Ahorro en Escala):**
   - En lugar de compras individuales a intermediarios minoristas costosos, consolida los pedidos de insumos (queso crema, mantequilla, harinas, aceites, empaques ecológicos) entre 10 a 15 comerciantes populares.
   - Acceso a precios mayoristas directos en Corabastos y distribuidores industriales, logrando ahorros comprobados del **28% al 35%** por lote y aumentando el margen de rentabilidad sin elevar el precio al cliente barrial.

2. **Círculo de Ahorro Solidario y Banco Comunitario del Parque (Escudo Anti «Gota a Gota»):**
   - El **10% del Bolsillo de Reserva/Ahorro** alimenta de forma transparente un fondo común autogestionado.
   - Ante averías de maquinaria (freidoras, hornos) o emergencias familiares, otorga microcréditos de auxilio mutuo a **0% de interés de usura**, erradicando de raíz la dependencia de prestamistas informales y agiotistas coercitivos que cobran del 20% al 30% mensual.

3. **Arquitectura Dual Resiliente (Backend Completo + Frontend Standalone Offline-First):**
   - **Con Backend NestJS & PostgreSQL:** Almacenamiento persistente relacional y API REST documentada en Swagger (`/api/docs`).
   - **Solo Frontend (Standalone):** Despliegue estático independiente donde los modelos están empaquetados en `public/models/models.js` y `public/models/models.json`. Si no detecta conexión al backend, opera de forma 100% autónoma en `localStorage` sin interrupciones.

---

## 🚀 Modos de Ejecución

### 1. Despliegue con Docker (Backend NestJS + PostgreSQL + Frontend)

```bash
docker compose up --build -d
```

- **Panel de la Aplicación:** [http://localhost:3000](http://localhost:3000)
- **Documentación Swagger API:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Endpoint de Salud:** [http://localhost:3000/api/salud](http://localhost:3000/api/salud)
- **Logs:** `docker compose logs -f api`
- **Detener:** `docker compose down`

### 2. Ejecución Local (Node.js & NestJS)

```bash
# Iniciar base de datos PostgreSQL
docker compose up -d postgres

# Instalar dependencias y compilar
npm install
npm run build

# Iniciar servidor en modo desarrollo
npm run start:dev
```

### 3. Despliegue Solo Frontend (Vercel, Netlify o GitHub Pages)

Puedes desplegar únicamente la carpeta `public/` como sitio web estático. La aplicación cargará automáticamente los modelos empaquetados en `public/models/` y activará el **Modo Standalone**, permitiendo a los comerciantes registrar lotes, cierres, compras colectivas, fiados y solicitudes de crédito mutuo en sus dispositivos móviles sin necesidad de un servidor activo.

---

## 📋 Estructura del Proyecto

```
├── public/
│   ├── index.html            # Interfaz moderna, responsiva, con micro-animaciones y visor UCC
│   └── models/
│       ├── models.json       # Datos base y modelos predeterminados empaquetados
│       └── models.js         # Capa adaptadora LocalStoreAdapter y lógica de cálculo offline
├── src/
│   ├── app.module.ts         # Módulo principal con soporte dual DB / ServeStatic
│   ├── main.ts               # Punto de entrada NestJS
│   ├── modules/
│   │   ├── costeo/           # Costeo técnico por lote y porción
│   │   ├── bolsillos/        # Regla de bolsillos (60% reinversión, 30% sustento, 10% reserva)
│   │   ├── fiados/           # Cartera en calle, fechas límites y WhatsApp con Nequi/Daviplata
│   │   ├── red-solidaria/    # Compras colectivas, fondo mutuo y círculos de saberes
│   │   └── conectividad/     # Convocatorias Alcaldía Local Rafael Uribe Uribe e IPES
├── Dockerfile                # Multi-stage build optimizado Node 22 Alpine
├── docker-compose.yml        # Orquestación de API y PostgreSQL con persistencia de volúmenes
└── vercel.json               # Configuración Serverless para Vercel
```

---

## 🎓 Cumplimiento Rúbrica UCC (Momentos 2 y 3)

La pestaña **📜 Documento UCC Momento 2 y 3** dentro de la aplicación integra la versión formal del informe académico, dando respuesta rigurosa a:

1. **Integrantes:** Lisleidis Millenys Fuentes (Santa Marta), Luisa López y López (Pasto), Juan Camilo Rodríguez (Bogotá) — Curso 2226.
2. **Caso 25:** Localizado en Parque Marruecos, Carrera 5J con Calle 48U Sur, UPZ 55 Marruecos, Rafael Uribe Uribe, Bogotá D.C.
3. **Problema Priorizado:** Articulado con la ausencia de asociatividad solidaria y vulnerabilidad al sobrecosto y al gota a gota.
4. **Lluvia de Ideas:** Comparativa crítica de las 3 alternativas con criterios de selección.
5. **Organización Solidaria:** Constitución de **ASOMARRUECOS** como Asociación Mutual (Ley 454/1998 y Ley 2143/2021).
6. **Esquematización del Prototipo:** Solución híbrida (libreta física de alto contraste + aplicación web progresiva).
7. **Innovación Incremental:** Compras conjuntas con ahorro en escala y Fondo Rotatorio Anti-Gota a Gota.
8. **Evidencias de Co-Diseño Territorial:** Trabajo de campo con las productoras de cheesecakes (Elena y Rocío) y líderes comerciantes, documentando aportes críticos incorporados.
9. **Normas APA Versión 7:** Referencias bibliográficas completas.
