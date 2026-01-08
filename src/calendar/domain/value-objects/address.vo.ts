export class Address {
  private constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly distance: number,
  ) {
    if (!street || !city) {
      throw new Error('Invalid address');
    }
  }

  public static create(
    street: string,
    city: string,
    distance: number,
  ): Address {
    return new Address(street, city, distance);
  }

  public getStreet(): string {
    return this.street;
  }

  public getCity(): string {
    return this.city;
  }

  public getDistance(): number {
    return this.distance;
  }

  public toString(): string {
    return `${this.street}, ${this.city} - ${this.distance} km`;
  }
}
