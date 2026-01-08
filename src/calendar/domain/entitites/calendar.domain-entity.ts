import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  DomainCheckableState,
  DomainStateError,
} from '../interfaces/domain-checkable-state.interface';

export abstract class Calendar implements DomainCheckableState {
  private readonly id: string;
  private externalCalendarId?: string;

  constructor(
    private startDate: Date,
    private endDate: Date,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
  }

  abstract checkState(): DomainStateError[];

  updateCalendarRange(startDate: Date, endDate: Date): void {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  protected validateState() {
    const errors = this.checkState();

    if (this.startDate >= this.endDate) {
      errors.push({
        field: 'dateRange',
        message: 'A data de início deve ser anterior à data de término.',
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
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

  setExternalCalendarId(externalCalendarId?: string): void {
    this.externalCalendarId = externalCalendarId;
  }

  getExternalCalendarId(): string | undefined {
    return this.externalCalendarId;
  }
}
