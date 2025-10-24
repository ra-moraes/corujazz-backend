import { randomUUID } from 'crypto';
import { UserRole } from '../user-role.enum';

export class User {
  private readonly id: string;

  constructor(
    private email: string,
    private passwordHash: string,
    private role: UserRole,
    private name: string,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
  }

  getId(): string {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  getPasswordHash() {
    return this.passwordHash;
  }

  getRole() {
    return this.role;
  }

  changePassword(newHash: string) {
    this.passwordHash = newHash;
  }

  getName() {
    return this.name;
  }
}
