import { Address } from '../value-objects/address.vo';
import { randomUUID } from 'crypto';
import { Contact } from '../value-objects/contact.vo';

export class Establishment {
  private readonly id: string;

  constructor(
    private readonly name: string,
    private readonly address: Address,
    private readonly contact: Contact,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
  }

  getName(): string {
    return this.name;
  }

  getAddress(): Address {
    return this.address;
  }

  getContact(): Contact {
    return this.contact;
  }

  getId(): string {
    return this.id;
  }
}
