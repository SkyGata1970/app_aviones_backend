import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Avion} from './avion.model';
import {Usuario} from './usuario.model';

@model()
export class Solicitud extends Entity {
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
  id_avion: string;



  @property({
    type: 'string',
    required: true,
  })
  id_persona: string;


  @property({
    type: 'string',
    required: true,
  })
  estado: string;
  @belongsTo(() => Usuario)
  usuarioId: string;
  @hasMany(() => Avion)
  avions: Avion[];
  @property({
    type: 'string',
    required: true,
  })
  tipo: string;


  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
