import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConvocatoriaRepository } from '../repositories/convocatoria.repository';

const CATALOGO_DISTRITAL = [
  {
    entidad: 'Impulso Local — Alcaldía Mayor de Bogotá',
    nombre: 'Convocatoria de fortalecimiento a unidades productivas locales',
    vigenciaHasta: '2026-12-15',
    vigente: true,
    enlacePostulacion: 'https://impulsolocal.bogota.gov.co/',
    requisitos: [
      'Unidad productiva en Bogotá',
      'Registro básico de actividad (RUT o declaración de informalidad acompañada)',
      'Formulario de postulación digital',
    ],
    beneficio: 'Capital semilla, formación y acompañamiento comercial.',
  },
  {
    entidad: 'IPES — Instituto para la Economía Social',
    nombre: 'Rutas de formalización y fortalecimiento del comercio popular',
    vigenciaHasta: '2026-11-30',
    vigente: true,
    enlacePostulacion: 'https://www.ipes.gov.co/',
    requisitos: [
      'Desarrollar actividad comercial o de servicios en espacio público o popular',
      'Documento de identidad',
      'Disponibilidad para talleres de costeo y asociatividad',
    ],
    beneficio: 'Asistencia técnica, ferias y articulación con plazas y parques.',
  },
  {
    entidad: 'Alcaldía Local Rafael Uribe Uribe',
    nombre: 'Convocatorias locales de desarrollo económico comunitario',
    vigenciaHasta: '2026-10-31',
    vigente: true,
    enlacePostulacion: 'https://www.gobiernobogota.gov.co/localidades/rafael-uribe-uribe',
    requisitos: [
      'Residir o trabajar en la Localidad Rafael Uribe Uribe',
      'Emprendimiento de base comunitaria (p. ej. Parque Marruecos)',
      'Propuesta de uso de recursos y contrapartida en especie',
    ],
    beneficio: 'Apoyos locales, visibilidad y redes de comercialización barrial.',
  },
];

@Injectable()
export class ConectividadService implements OnModuleInit {
  constructor(private readonly convocatorias: ConvocatoriaRepository) {}

  async onModuleInit(): Promise<void> {
    const n = await this.convocatorias.count();
    if (n > 0) {
      return;
    }
    for (const item of CATALOGO_DISTRITAL) {
      await this.convocatorias.save(this.convocatorias.create(item));
    }
  }

  catalogoVigente() {
    return this.convocatorias.findVigentes();
  }
}
