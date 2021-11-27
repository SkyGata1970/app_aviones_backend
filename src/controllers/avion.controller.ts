import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Avion} from '../models';
import {AvionRepository} from '../repositories';

export class AvionController {
  constructor(
    @repository(AvionRepository)
    public avionRepository : AvionRepository,
  ) {}

  @post('/avions')
  @response(200, {
    description: 'Avion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Avion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {
            title: 'NewAvion',
            exclude: ['id'],
          }),
        },
      },
    })
    avion: Omit<Avion, 'id'>,
  ): Promise<Avion> {
    return this.avionRepository.create(avion);
  }

  @get('/avions/count')
  @response(200, {
    description: 'Avion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Avion) where?: Where<Avion>,
  ): Promise<Count> {
    return this.avionRepository.count(where);
  }

  @get('/avions')
  @response(200, {
    description: 'Array of Avion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Avion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Avion) filter?: Filter<Avion>,
  ): Promise<Avion[]> {
    return this.avionRepository.find(filter);
  }

  @patch('/avions')
  @response(200, {
    description: 'Avion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {partial: true}),
        },
      },
    })
    avion: Avion,
    @param.where(Avion) where?: Where<Avion>,
  ): Promise<Count> {
    return this.avionRepository.updateAll(avion, where);
  }

  @get('/avions/{id}')
  @response(200, {
    description: 'Avion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Avion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Avion, {exclude: 'where'}) filter?: FilterExcludingWhere<Avion>
  ): Promise<Avion> {
    return this.avionRepository.findById(id, filter);
  }

  @patch('/avions/{id}')
  @response(204, {
    description: 'Avion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {partial: true}),
        },
      },
    })
    avion: Avion,
  ): Promise<void> {
    await this.avionRepository.updateById(id, avion);
  }

  @put('/avions/{id}')
  @response(204, {
    description: 'Avion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() avion: Avion,
  ): Promise<void> {
    await this.avionRepository.replaceById(id, avion);
  }

  @del('/avions/{id}')
  @response(204, {
    description: 'Avion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.avionRepository.deleteById(id);
  }
}
