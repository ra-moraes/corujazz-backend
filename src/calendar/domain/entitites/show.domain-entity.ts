import { randomUUID } from 'crypto';

export class Show {
  private readonly id: string;

  constructor(
    private readonly name: string,
    private readonly baseValue: number,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBaseValue(): number {
    return this.baseValue;
  }
}
