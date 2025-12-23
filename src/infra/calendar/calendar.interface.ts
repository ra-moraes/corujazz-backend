export type CreatedEvent = {
  id: string;
};

export interface Calendar {
  createEvent(
    summary: string,
    startDateTime: string,
    endDateTime: string,
  ): Promise<CreatedEvent>;
}

export const CALENDAR = Symbol('CALENDAR');
