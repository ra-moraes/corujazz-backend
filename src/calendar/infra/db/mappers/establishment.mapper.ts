import { Establishment } from 'src/calendar/domain/entitites/establishment.domain-entity';
import { Establishment as EstablishmentOrm } from '../entitites/establishment.entity';
import { Address } from 'src/calendar/domain/value-objects/address.vo';
import { Contact } from 'src/calendar/domain/value-objects/contact.vo';

export class EstablishmentMapper {
  static toDomain(ormEntity: EstablishmentOrm): Establishment {
    return new Establishment(
      ormEntity.name,
      Address.create(ormEntity.street, ormEntity.city, ormEntity.distance),
      Contact.create(ormEntity.contactName, ormEntity.contactPhone),
      ormEntity.id,
    );
  }

  static toOrmEntity(domain: Establishment): EstablishmentOrm {
    const orm = new EstablishmentOrm();

    const id = domain.getId();
    if (id) {
      orm.id = id;
    }

    const address = domain.getAddress();
    const contact = domain.getContact();

    orm.name = domain.getName();
    orm.street = address.getStreet();
    orm.city = address.getCity();
    orm.distance = address.getDistance();
    orm.contactName = contact.getName();
    orm.contactPhone = contact.getPhone();

    return orm;
  }
}
