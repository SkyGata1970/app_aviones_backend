import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Avion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;
  @property({
    type: 'string',
  })
  solicitudId?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Avion>) {
    super(data);
  }
}

export interface AvionRelations {
  // describe navigational properties here
}

export type AvionWithRelations = Avion & AvionRelations;
