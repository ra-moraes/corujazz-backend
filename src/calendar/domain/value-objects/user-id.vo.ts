export class UserId {
  constructor(private readonly id: string) {}

  public static create(id: string): UserId {
    return new UserId(id);
  }

  getId(): string {
    return this.id;
  }
}
