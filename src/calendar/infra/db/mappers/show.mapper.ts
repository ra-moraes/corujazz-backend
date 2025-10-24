import { Show } from 'src/calendar/domain/entitites/show.domain-entity';
import { Show as ShowEntity } from '../entitites/show.entity';

export class ShowMapper {
  static toDomain(ormEntity: ShowEntity): Show {
    return new Show(ormEntity.name, ormEntity.baseValue, ormEntity.id);
  }

  static toOrmEntity(domain: Show): ShowEntity {
    const orm = new ShowEntity();

    const id = domain.getId();
    if (id) {
      orm.id = id;
    }

    orm.name = domain.getName();
    orm.baseValue = domain.getBaseValue();

    return orm;
  }
}
