import { User } from 'src/user/domain/entities/user.domain-entity';
import { User as UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(ormEntity: UserEntity): User {
    return new User(
      ormEntity.email,
      ormEntity.password,
      ormEntity.role,
      ormEntity.name ?? '',
      ormEntity.id,
    );
  }

  static toOrmEntity(domain: User): UserEntity {
    const orm = new UserEntity();

    const id = domain.getId();
    if (id) {
      orm.id = id;
    }

    orm.email = domain.getEmail();
    orm.password = domain.getPasswordHash();
    orm.role = domain.getRole();
    orm.name = domain.getName();

    return orm;
  }
}
