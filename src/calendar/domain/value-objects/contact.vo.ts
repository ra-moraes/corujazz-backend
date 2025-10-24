export class Contact {
  private constructor(
    private readonly name: string,
    private readonly phone: string,
  ) {}

  public static create(name: string, phone: string): Contact {
    return new Contact(name, phone);
  }

  public getName(): string {
    return this.name;
  }

  public getPhone(): string {
    return this.phone;
  }
}
