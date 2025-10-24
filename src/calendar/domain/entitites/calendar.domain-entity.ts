import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export abstract class Calendar {
  private readonly id: string;

  constructor(
    private readonly startDate: Date,
    private readonly endDate: Date,
    id?: string,
  ) {
    this.id = id ?? randomUUID();

    if (this.startDate >= this.endDate) {
      throw new BadRequestException(
        'A data de início deve ser anterior à data de término.',
      );
    }
  }

  getId(): string {
    return this.id;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }
}
