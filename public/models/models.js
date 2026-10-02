/**
 * MiPyme Marruecos - Módulo de Modelos Empaquetados para Frontend
 * Soporte Dual: Conexión transparente al Backend NestJS o Ejecución 100% Standalone Offline-First
 * Red Popular de Gestión y Costeo - Parque Marruecos (Rafael Uribe Uribe, Bogotá)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MiPymeModels = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY = 'mipyme_marruecos_store_v2';

  const DEFAULT_MODELS = {
    territorio: {
      nombre: 'Parque Marruecos y alrededores',
      upz: 'UPZ 55 Marruecos',
      localidad: 'Localidad 18 de Rafael Uribe Uribe',
      ciudad: 'Bogotá D.C., Colombia',
      coordenadas: 'Carrera 5J con Calle 48U Sur / Calle 49B Sur',
      contexto: 'Corredor comercial de economía popular con alta concentración de unidades productivas familiares e informales en gastronomía, postres, confecciones y servicios barriales.'
    },
    organizacionSolidaria: {
      nombre: 'Asociación Mutual de Emprendedores y Productores Populares del Parque Marruecos (ASOMARRUECOS)',
      figuraJuridica: 'Asociación Mutual (Marco normativo: Ley 454 de 1998 y Ley 2143 de 2021)',
      principios: [
        'Asociatividad y ayuda mutua sin intermediación usurera',
        'Democracia participativa y autogestión (1 persona = 1 voto)',
        'Fondo social irrepartible de contingencia y auxilio mutuo',
        'Economía de escala comunitaria mediante compras conjuntas de insumos',
        'Protección colectiva y erradicación del crédito extorsivo gota a gota'
      ],
      asociadosActivos: 14,
      fondoSocialActual: 1850000
    },
    productos: [
      {
        id: 'prod-cheesecake-01',
        nombre: 'Cheesecake Artesanal de Frutos Rojos (Lote 12 porciones)',
        descripcion: 'Elaborado artesanalmente por las hermanas productoras del Parque Marruecos.',
        porciones: 12,
        margenGanancia: 0.40,
        costoTotalLote: 18000,
        costoUnitarioPorcion: 1500,
        precioSugeridoVenta: 2500,
        ahorroCompraColectivaLote: 5200,
        comercianteId: 'hermanas-cheesecake-marruecos',
        comercianteNombre: 'Dulces Hermanas Marruecos (Elena y Rocío)',
        createdAt: new Date().toISOString(),
        insumos: [
          { nombre: 'Queso crema especial', cantidadComprada: 1000, precioPaquete: 24000, cantidadUsada: 500, costoInsumo: 12000, precioMayoristaColectivo: 16000 },
          { nombre: 'Galletas dulces trituradas', cantidadComprada: 400, precioPaquete: 8000, cantidadUsada: 200, costoInsumo: 4000, precioMayoristaColectivo: 5500 },
          { nombre: 'Mantequilla sin sal', cantidadComprada: 250, precioPaquete: 8000, cantidadUsada: 62.5, costoInsumo: 2000, precioMayoristaColectivo: 6000 }
        ]
      },
      {
        id: 'prod-arepas-02',
        nombre: 'Arepas de Chócolo con Queso Campesino (Lote 25 und)',
        descripcion: 'Elaboradas por Don Horacio frente a las canchas del Parque Marruecos.',
        porciones: 25,
        margenGanancia: 0.45,
        costoTotalLote: 31250,
        costoUnitarioPorcion: 1250,
        precioSugeridoVenta: 2500,
        ahorroCompraColectivaLote: 8500,
        comercianteId: 'arepas-don-horacio',
        comercianteNombre: 'Arepas El Parque - Don Horacio',
        createdAt: new Date().toISOString(),
        insumos: [
          { nombre: 'Maíz tierno desgranado', cantidadComprada: 2500, precioPaquete: 15000, cantidadUsada: 2500, costoInsumo: 15000, precioMayoristaColectivo: 11000 },
          { nombre: 'Queso campesino fresco', cantidadComprada: 1500, precioPaquete: 21000, cantidadUsada: 750, costoInsumo: 10500, precioMayoristaColectivo: 15000 },
          { nombre: 'Margarina y panela', cantidadComprada: 1000, precioPaquete: 7000, cantidadUsada: 500, costoInsumo: 3500, precioMayoristaColectivo: 5200 },
          { nombre: 'Empaques térmicos biodegradables', cantidadComprada: 50, precioPaquete: 4500, cantidadUsada: 25, costoInsumo: 2250, precioMayoristaColectivo: 3000 }
        ]
      },
      {
        id: 'prod-empanadas-03',
        nombre: 'Empanadas Crocantes de Carne y Pollo (Lote 50 und)',
        descripcion: 'Bahía de comidas del parque, puesto de Doña Carmen.',
        porciones: 50,
        margenGanancia: 0.50,
        costoTotalLote: 45000,
        costoUnitarioPorcion: 900,
        precioSugeridoVenta: 2000,
        ahorroCompraColectivaLote: 13000,
        comercianteId: 'empanadas-dona-carmen',
        comercianteNombre: 'Empanadas La 48 - Doña Carmen',
        createdAt: new Date().toISOString(),
        insumos: [
          { nombre: 'Carne molida seleccionada', cantidadComprada: 2000, precioPaquete: 30000, cantidadUsada: 1000, costoInsumo: 15000, precioMayoristaColectivo: 22000 },
          { nombre: 'Masa de maíz precocida', cantidadComprada: 3000, precioPaquete: 12000, cantidadUsada: 2500, costoInsumo: 10000, precioMayoristaColectivo: 8500 },
          { nombre: 'Papa pastusa', cantidadComprada: 5000, precioPaquete: 10000, cantidadUsada: 2500, costoInsumo: 5000, precioMayoristaColectivo: 7000 },
          { nombre: 'Aceite vegetal para freír (5L)', cantidadComprada: 5000, precioPaquete: 38000, cantidadUsada: 1500, costoInsumo: 11400, precioMayoristaColectivo: 29000 },
          { nombre: 'Servilletas y bolsas kraft', cantidadComprada: 100, precioPaquete: 7200, cantidadUsada: 50, costoInsumo: 3600, precioMayoristaColectivo: 4800 }
        ]
      }
    ],
    cierres: [
      { id: 'cierre-01', fechaCierre: '2026-09-28', ventaTotalDia: 110000, bolsilloReinversion: 66000, bolsilloSustento: 33000, bolsilloReserva: 11000, aporteFondoComunitario: 3300, ahorroPersonal: 7700, comercianteId: 'hermanas-cheesecake-marruecos' },
      { id: 'cierre-02', fechaCierre: '2026-09-29', ventaTotalDia: 120000, bolsilloReinversion: 72000, bolsilloSustento: 36000, bolsilloReserva: 12000, aporteFondoComunitario: 3600, ahorroPersonal: 8400, comercianteId: 'hermanas-cheesecake-marruecos' },
      { id: 'cierre-03', fechaCierre: '2026-09-30', ventaTotalDia: 135000, bolsilloReinversion: 81000, bolsilloSustento: 40500, bolsilloReserva: 13500, aporteFondoComunitario: 4050, ahorroPersonal: 9450, comercianteId: 'hermanas-cheesecake-marruecos' },
      { id: 'cierre-04', fechaCierre: '2026-10-01', ventaTotalDia: 140000, bolsilloReinversion: 84000, bolsilloSustento: 42000, bolsilloReserva: 14000, aporteFondoComunitario: 4200, ahorroPersonal: 9800, comercianteId: 'hermanas-cheesecake-marruecos' }
    ],
    fiados: [
      {
        id: 'fiado-01',
        cliente: 'Doña Rosa (Vecina Bloque 2)',
        telefonoWhatsapp: '573001112233',
        montoFiado: 14000,
        fechaRegistro: '2026-09-25',
        fechaLimitePago: '2026-10-02',
        concepto: '2 porciones de cheesecake y 1 café',
        estado: 'PENDIENTE',
        enlaceWhatsapp: 'https://wa.me/573001112233?text=Hola%20Do%C3%B1a%20Rosa,%20un%20saludo%20desde%20el%20Parque%20Marruecos.%20Te%20recordamos%20amigablemente%20tu%20cuenta%20pendiente%20por%20$14.000%20COP%20con%20fecha%20l%C3%ADmite%20el%2002/10/2026.%20Puedes%20pagarnos%20por%20Nequi/Daviplata%20o%20en%20el%20puesto.%20%C2%A1Muchas%20gracias!'
      },
      {
        id: 'fiado-02',
        cliente: 'Carlos Gómez (Taller mecánico)',
        telefonoWhatsapp: '573123456789',
        montoFiado: 7000,
        fechaRegistro: '2026-09-27',
        fechaLimitePago: '2026-10-04',
        concepto: '1 porción cheesecake y 2 jugos',
        estado: 'PAGADO',
        enlaceWhatsapp: 'https://wa.me/573123456789?text=Hola%20Carlos,%20muchas%20gracias%20por%20tu%20pago.'
      },
      {
        id: 'fiado-03',
        cliente: 'Sandra Milena (Peluquería La 48)',
        telefonoWhatsapp: '573159988776',
        montoFiado: 18500,
        fechaRegistro: '2026-09-29',
        fechaLimitePago: '2026-10-06',
        concepto: '3 porciones de cheesecake para cumpleaños',
        estado: 'PENDIENTE',
        enlaceWhatsapp: 'https://wa.me/573159988776?text=Hola%20Sandra%20Milena,%20te%20saludamos%20con%20cari%C3%B1o.%20Te%20recordamos%20amigablemente%20tu%20cuenta%20de%20$18.500%20COP%20en%20el%20Parque%20Marruecos.%20Fecha%20l%C3%ADmite:%2006/10/2026.%20%C2%A1Que%20tengas%20un%20excelente%20d%C3%ADa!'
      }
    ],
    comprasColectivas: [
      {
        id: 'compra-col-01',
        titulo: 'Consolidación Mensual de Lácteos y Grasas — Parque Marruecos',
        estado: 'CONSOLIDADO',
        fechaCierrePedido: '2026-10-05',
        distribuidorMayorista: 'Distribuidora Láctea del Sur & Corabastos',
        ahorroTotalGrupo: 184000,
        porcentajeAhorroPromedio: 31.5,
        pedidos: [
          { comercianteId: 'hermanas-cheesecake-marruecos', comercianteNombre: 'Dulces Hermanas Marruecos', insumo: 'Queso crema bloque industrial 5kg', cantidad: 10000, unidad: 'g', precioRetail: 240000, precioMayorista: 160000, ahorroIndividual: 80000 },
          { comercianteId: 'arepas-don-horacio', comercianteNombre: 'Arepas El Parque', insumo: 'Queso campesino bloque 10kg', cantidad: 10000, unidad: 'g', precioRetail: 210000, precioMayorista: 150000, ahorroIndividual: 60000 },
          { comercianteId: 'postres-bloque-4', comercianteNombre: 'Postres Caseros Bloque 4', insumo: 'Mantequilla industrial 2.5kg', cantidad: 2500, unidad: 'g', precioRetail: 80000, precioMayorista: 58000, ahorroIndividual: 22000 },
          { comercianteId: 'empanadas-dona-carmen', comercianteNombre: 'Empanadas La 48', insumo: 'Aceite vegetal caneca 20L', cantidad: 20000, unidad: 'ml', precioRetail: 152000, precioMayorista: 130000, ahorroIndividual: 22000 }
        ]
      },
      {
        id: 'compra-col-02',
        titulo: 'Compra Masiva de Empaques Ecológicos y Domos Biodegradables',
        estado: 'EN_CURSO',
        fechaCierrePedido: '2026-10-12',
        distribuidorMayorista: 'Empaques Ecológicos del Tequendama SAS',
        ahorroTotalGrupo: 125000,
        porcentajeAhorroPromedio: 28.0,
        pedidos: [
          { comercianteId: 'hermanas-cheesecake-marruecos', comercianteNombre: 'Dulces Hermanas Marruecos', insumo: 'Domos triangulares para postre x 300 und', cantidad: 300, unidad: 'und', precioRetail: 96000, precioMayorista: 69000, ahorroIndividual: 27000 },
          { comercianteId: 'empanadas-dona-carmen', comercianteNombre: 'Empanadas La 48', insumo: 'Bolsas de papel antigrasa x 1000 und', cantidad: 1000, unidad: 'und', precioRetail: 75000, precioMayorista: 52000, ahorroIndividual: 23000 }
        ]
      }
    ],
    fondoComunitario: {
      nombre: 'Banco Comunitario y Caja de Auxilio Mutuo Parque Marruecos',
      saldoTotal: 1850000,
      totalAportesMes: 420000,
      prestamosActivos: 450000,
      interesSolidario: '0% interés usurero (reposición directa de capital para rotación solidaria)',
      movimientos: [
        { id: 'mov-01', fecha: '2026-09-28', tipoMovimiento: 'APORTE_DIARIO', comercianteNombre: 'Dulces Hermanas Marruecos', monto: 3300, saldoResultante: 1603300, concepto: 'Aporte diario (30% del bolsillo de reserva)' },
        { id: 'mov-02', fecha: '2026-09-29', tipoMovimiento: 'APORTE_DIARIO', comercianteNombre: 'Arepas El Parque', monto: 4500, saldoResultante: 1607800, concepto: 'Aporte diario de cierre de ventas' },
        { id: 'mov-03', fecha: '2026-09-30', tipoMovimiento: 'PRESTAMO_EMERGENCIA', comercianteNombre: 'Empanadas La 48 (Doña Carmen)', monto: 250000, saldoResultante: 1357800, concepto: 'Auxilio por daño urgente de freidora industrial (EVITÓ GOTA A GOTA DE $300.000 AL 20% SEMANAL)', plazoSemanas: 4, estado: 'EN_AMORTIZACION' },
        { id: 'mov-04', fecha: '2026-10-01', tipoMovimiento: 'APORTE_DIARIO', comercianteNombre: 'Dulces Hermanas Marruecos', monto: 4200, saldoResultante: 1362000, concepto: 'Aporte de cierre diario del 01/10/2026' },
        { id: 'mov-05', fecha: '2026-10-01', tipoMovimiento: 'REINTEGRO_PARCIAL', comercianteNombre: 'Empanadas La 48 (Doña Carmen)', monto: 70000, saldoResultante: 1432000, concepto: 'Abono cuota 1 de préstamo solidario sin interés' }
      ]
    },
    convocatorias: [
      {
        id: 'conv-01',
        nombre: 'Impulso Local — Localidad 18 Rafael Uribe Uribe',
        entidad: 'Alcaldía Local de Rafael Uribe Uribe & Secretaría Distrital de Desarrollo Económico',
        beneficio: 'Capitalización no reembolsable de hasta $3.000.000 COP para maquinaria, insumos y adecuación de puntos de venta.',
        requisitos: [
          'Unidad productiva en funcionamiento en Rafael Uribe Uribe (Parque Marruecos y alrededores)',
          'Pertenecer a la economía popular e informal de la localidad',
          'Registro de costos y separación de bolsillos de al menos 1 mes',
          'Carta asociativa expedida por ASOMARRUECOS'
        ],
        vigenciaHasta: '2026-11-15',
        enlacePostulacion: 'https://bogotalocal.gov.co/impulsolocal.html',
        qrCodigoUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://bogotalocal.gov.co/impulsolocal.html'
      },
      {
        id: 'conv-02',
        nombre: 'Ferias de la Economía Popular e Itinerantes IPES',
        entidad: 'Instituto para la Economía Social (IPES) Bogotá',
        beneficio: 'Asignación gratuita de carpas, mobiliario ferial y acceso a circuitos comerciales de alta afluencia.',
        requisitos: [
          'Comerciantes populares en red asociativa territorial',
          'Curso de manipulación de alimentos vigente (para gastronomía)',
          'Identificación ciudadana y registro en RIVI'
        ],
        vigenciaHasta: '2026-12-01',
        enlacePostulacion: 'https://www.ipes.gov.co/convocatorias',
        qrCodigoUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.ipes.gov.co/convocatorias'
      },
      {
        id: 'conv-03',
        nombre: 'Línea de Fortalecimiento Asociativo - Unidad Solidaria',
        entidad: 'Unidad Administrativa Especial de Organizaciones Solidarias (UAEOS)',
        beneficio: 'Acompañamiento técnico legal gratuito, registro de personería jurídica y cofinanciación asociativa.',
        requisitos: [
          'Mínimo 10 comerciantes constituidos como Asociación Mutual o Cooperativa',
          'Acta de asamblea de constitución en el Parque Marruecos',
          'Plan asociativo enfocado en compras conjuntas o fondo rotatorio'
        ],
        vigenciaHasta: '2026-11-30',
        enlacePostulacion: 'https://www.orgsolidarias.gov.co',
        qrCodigoUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.orgsolidarias.gov.co'
      }
    ],
    encuentros: [
      {
        id: 'enc-01',
        titulo: 'Asamblea ASOMARRUECOS & Consolidación de Pedidos Mayoristas',
        lugar: 'Quiosco Comunal del Parque Marruecos (frente a la bahía de artesanos)',
        fechaHora: '2026-10-04T15:00:00-05:00',
        cupo: 25,
        estado: 'PROGRAMADO',
        saberes: [
          'Consolidación del pedido mayorista de quesos, harinas y empaques',
          'Balance del Fondo Solidario y aprobación de créditos de contingencia',
          'Taller práctico: cómo usar el semáforo de fiados en el celular'
        ],
        asistencia: [
          { nombre: 'Elena Fuentes (Cheesecakes)', rol: 'Secretaria de compras colectivas' },
          { nombre: 'Rocío Fuentes (Cheesecakes)', rol: 'Vocal de calidad' },
          { nombre: 'Horacio Peña (Arepas)', rol: 'Tesorero del Fondo Comunitario' },
          { nombre: 'Carmen Valdés (Empanadas)', rol: 'Asociada fundadora' },
          { nombre: 'Gustavo Pardo (Líder comerciante)', rol: 'Presidente mutual' }
        ]
      }
    ]
  };

  /**
   * Repositorio Unificado Local
   */
  class LocalStoreAdapter {
    constructor() {
      this.init();
    }

    init() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          this.data = JSON.parse(JSON.stringify(DEFAULT_MODELS));
          this.save();
        } else {
          this.data = JSON.parse(stored);
          // asegurar que todas las llaves existan
          for (const key of Object.keys(DEFAULT_MODELS)) {
            if (!this.data[key]) {
              this.data[key] = JSON.parse(JSON.stringify(DEFAULT_MODELS[key]));
            }
          }
          this.save();
        }
      } catch (e) {
        console.warn('LocalStorage error, using memory fallback:', e);
        this.data = JSON.parse(JSON.stringify(DEFAULT_MODELS));
      }
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    }

    reset() {
      this.data = JSON.parse(JSON.stringify(DEFAULT_MODELS));
      this.save();
      return this.data;
    }

    get(collection) {
      return this.data[collection] || [];
    }

    insert(collection, item) {
      if (!this.data[collection]) {
        this.data[collection] = [];
      }
      const newItem = {
        id: item.id || `${collection.slice(0, 4)}-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...item
      };
      this.data[collection].unshift(newItem);
      this.save();
      return newItem;
    }

    update(collection, id, updates) {
      if (!Array.isArray(this.data[collection])) return null;
      const index = this.data[collection].findIndex(i => String(i.id) === String(id));
      if (index !== -1) {
        this.data[collection][index] = { ...this.data[collection][index], ...updates };
        this.save();
        return this.data[collection][index];
      }
      return null;
    }

    getFondo() {
      return this.data.fondoComunitario || DEFAULT_MODELS.fondoComunitario;
    }

    addFondoAporte(monto, comercianteNombre, concepto) {
      const fondo = this.data.fondoComunitario;
      const numMonto = Number(monto) || 0;
      fondo.saldoTotal = (Number(fondo.saldoTotal) || 0) + numMonto;
      fondo.totalAportesMes = (Number(fondo.totalAportesMes) || 0) + numMonto;
      const mov = {
        id: `mov-${Date.now()}`,
        fecha: new Date().toISOString().split('T')[0],
        tipoMovimiento: 'APORTE_DIARIO',
        comercianteNombre: comercianteNombre || 'Asociado Marruecos',
        monto: numMonto,
        saldoResultante: fondo.saldoTotal,
        concepto: concepto || 'Aporte solidario diario de reserva'
      };
      fondo.movimientos.unshift(mov);
      this.save();
      return { fondo, mov };
    }

    solicitarPrestamoSolidario(monto, comercianteNombre, motivo, plazoSemanas) {
      const fondo = this.data.fondoComunitario;
      const numMonto = Number(monto) || 0;
      if (numMonto > fondo.saldoTotal) {
        throw new Error(`Saldo insuficiente en el fondo común ($${fondo.saldoTotal.toLocaleString('es-CO')}). El monto solicitado supera los fondos disponibles.`);
      }
      fondo.saldoTotal -= numMonto;
      fondo.prestamosActivos = (Number(fondo.prestamosActivos) || 0) + numMonto;
      const mov = {
        id: `mov-prest-${Date.now()}`,
        fecha: new Date().toISOString().split('T')[0],
        tipoMovimiento: 'PRESTAMO_EMERGENCIA',
        comercianteNombre: comercianteNombre || 'Asociado Marruecos',
        monto: numMonto,
        saldoResultante: fondo.saldoTotal,
        concepto: `Préstamo de auxilio mutuo: ${motivo} (0% INTERÉS - BLINDAJE CONTRA GOTA A GOTA)`,
        plazoSemanas: Number(plazoSemanas) || 4,
        estado: 'EN_AMORTIZACION'
      };
      fondo.movimientos.unshift(mov);
      this.save();
      return { fondo, mov };
    }
  }

  return {
    DEFAULT_MODELS,
    store: new LocalStoreAdapter(),
    calc: {
      costeoLote: (insumos, porciones, margen = 0.4) => {
        const costoTotal = (insumos || []).reduce((sum, item) => {
          const comprada = Number(item.cantidadComprada) || 0;
          const precio = Number(item.precioPaquete) || 0;
          const usada = Number(item.cantidadUsada) || 0;
          return sum + (comprada > 0 ? (precio * usada) / comprada : 0);
        }, 0);
        const numPorciones = Math.max(1, Number(porciones) || 1);
        const costoUnitario = Math.round(costoTotal / numPorciones);
        const precioSugerido = Math.ceil(((costoUnitario * (1 + margen)) / 100)) * 100;
        return { costoTotal, costoUnitario, precioSugerido, margen };
      },
      bolsillos: (ventaTotal) => {
        const venta = Number(ventaTotal) || 0;
        const reinversion = Math.round(venta * 0.60);
        const sustento = Math.round(venta * 0.30);
        const reservaTotal = venta - reinversion - sustento;
        const aporteFondo = Math.round(reservaTotal * 0.30); // 30% del 10% va al fondo común
        const ahorroPersonal = reservaTotal - aporteFondo;
        return { venta, reinversion, sustento, reservaTotal, aporteFondo, ahorroPersonal };
      },
      simuladorGotaAGota: (monto, semanas = 4) => {
        const capital = Number(monto) || 200000;
        // Gota a gota cobra típicamente 20% quincenal o 20% mensual con cobro diario agresivo
        const tasaGotaAGota = 0.20; // 20% del valor total
        const interesGotaAGota = Math.round(capital * tasaGotaAGota);
        const totalPagarGotaAGota = capital + interesGotaAGota;
        const cuotaDiariaGotaAGota = Math.round(totalPagarGotaAGota / (semanas * 6)); // 6 días hábiles/semana

        // Fondo Solidario ASOMARRUECOS: 0% de interés usurero, solo aporte simbólico de solidaridad mutual ($1.000 COP)
        const interesMutual = 0;
        const aporteSolidaridad = 1000;
        const totalPagarMutual = capital + aporteSolidaridad;
        const cuotaSemanalMutual = Math.round(totalPagarMutual / semanas);
        const ahorroFrenteGotaAGota = totalPagarGotaAGota - totalPagarMutual;

        return {
          capital,
          semanas,
          gotaAGota: {
            tasa: '20% mensual coercitivo',
            interes: interesGotaAGota,
            total: totalPagarGotaAGota,
            cuotaDiaria: cuotaDiariaGotaAGota,
            riesgo: 'Extorsión, violencia física y pérdida del capital productivo.'
          },
          fondoMutual: {
            tasa: '0% de interés de usura',
            interes: 0,
            aporteSolidaridad,
            total: totalPagarMutual,
            cuotaSemanal: cuotaSemanalMutual,
            beneficio: 'Autogestión comunitaria, respaldo colectivo, reinversión en el parque.'
          },
          ahorroFrenteGotaAGota
        };
      }
    }
  };
});
