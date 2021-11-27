import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Avion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAvionController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/avions', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Avion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Avion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Avion>,
  ): Promise<Avion[]> {
    return this.usuarioRepository.avions(id).find(filter);
  }

  @post('/usuarios/{id}/avions', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {
            title: 'NewAvionInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) avion: Omit<Avion, 'id'>,
  ): Promise<Avion> {
    return this.usuarioRepository.avions(id).create(avion);
  }

  @patch('/usuarios/{id}/avions', {
    responses: {
      '200': {
        description: 'Usuario.Avion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {partial: true}),
        },
      },
    })
    avion: Partial<Avion>,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.usuarioRepository.avions(id).patch(avion, where);
  }

  @del('/usuarios/{id}/avions', {
    responses: {
      '200': {
        description: 'Usuario.Avion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.usuarioRepository.avions(id).delete(where);
  }
}
