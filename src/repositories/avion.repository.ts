import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Avion, AvionRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AvionRepository extends DefaultCrudRepository<
  Avion,
  typeof Avion.prototype.id,
  AvionRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Avion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Avion, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
