import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Solicitud, Avion} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {AvionRepository} from './avion.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Usuario.prototype.id>;

  public readonly avions: HasManyRepositoryFactory<Avion, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('AvionRepository') protected avionRepositoryGetter: Getter<AvionRepository>,
  ) {
    super(Usuario, dataSource);
    this.avions = this.createHasManyRepositoryFactoryFor('avions', avionRepositoryGetter,);
    this.registerInclusionResolver('avions', this.avions.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
