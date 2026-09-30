-- ============================================================================
-- MiPyme Marruecos — DDL PostgreSQL
-- Red Popular de Gestión y Costeo (Parque Marruecos)
-- Incluye JSONB para esquemas flexibles de datos locales
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Costeo frecuente
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre                VARCHAR(180) NOT NULL,
  porciones             INTEGER NOT NULL CHECK (porciones > 0),
  margen_ganancia       NUMERIC(6,4) NOT NULL DEFAULT 0.4000,
  costo_total_lote      INTEGER NOT NULL,
  costo_unitario_porcion INTEGER NOT NULL,
  precio_sugerido_venta INTEGER NOT NULL,
  insumos_json          JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadatos             JSONB NOT NULL DEFAULT '{}'::jsonb,
  comerciante_id        VARCHAR(80) NOT NULL DEFAULT 'unidad-parque-marruecos',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_productos_insumos_gin ON productos USING GIN (insumos_json);

CREATE TABLE IF NOT EXISTS insumos (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id           UUID NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  nombre                VARCHAR(180) NOT NULL,
  cantidad_comprada     NUMERIC(12,4) NOT NULL,
  precio_paquete        INTEGER NOT NULL,
  cantidad_usada        NUMERIC(12,4) NOT NULL,
  costo_prorrateado     INTEGER NOT NULL,
  metadatos             JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Repartidor de bolsillos / historial financiero
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS registros_diarios (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comerciante_id              VARCHAR(80) NOT NULL,
  fecha_cierre                DATE NOT NULL,
  venta_total_dia             INTEGER NOT NULL CHECK (venta_total_dia >= 0),
  bolsillo_reinversion        INTEGER NOT NULL,
  bolsillo_sustento           INTEGER NOT NULL,
  bolsillo_reserva            INTEGER NOT NULL,
  aporte_fondo_comunitario    INTEGER NOT NULL DEFAULT 0,
  detalle                     JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (comerciante_id, fecha_cierre)
);

-- ---------------------------------------------------------------------------
-- Fiados
-- ---------------------------------------------------------------------------
CREATE TYPE estado_fiado AS ENUM ('PENDIENTE', 'PAGADO');

CREATE TABLE IF NOT EXISTS fiados (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comerciante_id       VARCHAR(80) NOT NULL,
  cliente              VARCHAR(180) NOT NULL,
  telefono_whatsapp    VARCHAR(20) NOT NULL,
  monto_fiado          INTEGER NOT NULL CHECK (monto_fiado > 0),
  fecha_registro       DATE NOT NULL DEFAULT CURRENT_DATE,
  fecha_limite_pago    DATE NOT NULL,
  estado               estado_fiado NOT NULL DEFAULT 'PENDIENTE',
  datos_pago           JSONB NOT NULL DEFAULT '{}'::jsonb,
  notas                JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fiados_estado ON fiados (estado);

-- ---------------------------------------------------------------------------
-- Red solidaria
-- ---------------------------------------------------------------------------
CREATE TYPE estado_compra_colectiva AS ENUM ('ABIERTA', 'CONSOLIDADA', 'CERRADA');

CREATE TABLE IF NOT EXISTS compras_colectivas (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo            VARCHAR(200) NOT NULL,
  estado            estado_compra_colectiva NOT NULL DEFAULT 'ABIERTA',
  pedidos           JSONB NOT NULL DEFAULT '[]'::jsonb,
  consolidado       JSONB NOT NULL DEFAULT '{}'::jsonb,
  ahorro_estimado   INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fondo_comunitario (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_movimiento   VARCHAR(40) NOT NULL,
  monto             INTEGER NOT NULL,
  comerciante_id    VARCHAR(80),
  registro_diario_id UUID,
  descripcion       TEXT,
  saldo_resultante  INTEGER NOT NULL,
  metadatos         JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE estado_encuentro AS ENUM ('PROGRAMADO', 'REALIZADO', 'CANCELADO');

CREATE TABLE IF NOT EXISTS encuentros_comunitarios (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo            VARCHAR(200) NOT NULL,
  lugar             VARCHAR(200) NOT NULL DEFAULT 'Parque Marruecos',
  fecha_hora        TIMESTAMPTZ NOT NULL,
  cupo              INTEGER NOT NULL DEFAULT 30,
  estado            estado_encuentro NOT NULL DEFAULT 'PROGRAMADO',
  asistencia        JSONB NOT NULL DEFAULT '[]'::jsonb,
  saberes           JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Conectividad distrital
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS convocatorias (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entidad           VARCHAR(180) NOT NULL,
  nombre            VARCHAR(240) NOT NULL,
  vigencia_hasta    DATE,
  vigente           BOOLEAN NOT NULL DEFAULT TRUE,
  enlace_postulacion TEXT NOT NULL,
  requisitos        JSONB NOT NULL DEFAULT '[]'::jsonb,
  beneficio         TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
