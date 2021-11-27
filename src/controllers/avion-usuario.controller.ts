import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Avion,
  Usuario,
} from '../models';
import {AvionRepository} from '../repositories';

export class AvionUsuarioController {
  constructor(
    @repository(AvionRepository)
    public avionRepository: AvionRepository,
  ) { }

  @get('/avions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Avion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Avion.prototype.id,
  ): Promise<Usuario> {
    return this.avionRepository.usuario(id);
  }
}
