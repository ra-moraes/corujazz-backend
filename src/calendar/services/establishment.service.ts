import { Inject, Injectable } from '@nestjs/common';
import {
  ESTABLISHMENT_REPOSITORY,
  type EstablishmentRepository,
} from '../domain/interfaces/establishment.repository';
import { Establishment } from '../domain/entitites/establishment.domain-entity';
import { Address } from '../domain/value-objects/address.vo';
import { Contact } from '../domain/value-objects/contact.vo';

@Injectable()
export class EstablishmentService {
  constructor(
    @Inject(ESTABLISHMENT_REPOSITORY)
    private readonly establishmentRepo: EstablishmentRepository,
  ) {}

  async create(
    name: string,
    street: string,
    city: string,
    distance: number,
    contactName: string,
    contactProne: string,
  ): Promise<Establishment> {
    const establishment = new Establishment(
      name,
      Address.create(street, city, distance),
      Contact.create(contactName, contactProne),
    );
    await this.establishmentRepo.save(establishment);

    return establishment;
  }
}
