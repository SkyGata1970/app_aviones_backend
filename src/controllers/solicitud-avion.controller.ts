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
  Solicitud,
  Avion,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudAvionController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/avions', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Avion',
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
    return this.solicitudRepository.avions(id).find(filter);
  }

  @post('/solicituds/{id}/avions', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {
            title: 'NewAvionInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) avion: Omit<Avion, 'id'>,
  ): Promise<Avion> {
    return this.solicitudRepository.avions(id).create(avion);
  }

  @patch('/solicituds/{id}/avions', {
    responses: {
      '200': {
        description: 'Solicitud.Avion PATCH success count',
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
    return this.solicitudRepository.avions(id).patch(avion, where);
  }

  @del('/solicituds/{id}/avions', {
    responses: {
      '200': {
        description: 'Solicitud.Avion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.solicitudRepository.avions(id).delete(where);
  }
}
