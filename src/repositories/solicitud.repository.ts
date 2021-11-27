import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Usuario, Avion} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {AvionRepository} from './avion.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Solicitud.prototype.id>;

  public readonly avions: HasManyRepositoryFactory<Avion, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('AvionRepository') protected avionRepositoryGetter: Getter<AvionRepository>,
  ) {
    super(Solicitud, dataSource);
    this.avions = this.createHasManyRepositoryFactoryFor('avions', avionRepositoryGetter,);
    this.registerInclusionResolver('avions', this.avions.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
