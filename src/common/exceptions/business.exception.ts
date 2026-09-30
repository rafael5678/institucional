import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY) {
    super({ success: false, error: message }, status);
  }
}

export class RecursoNoEncontradoException extends BusinessException {
  constructor(recurso: string, id?: string) {
    super(
      id ? `${recurso} con id ${id} no existe.` : `${recurso} no encontrado.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
