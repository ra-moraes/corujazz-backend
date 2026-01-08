export type CreatedEvent = {
  id: string;
};

export interface Calendar {
  createEvent(
    summary: string,
    description: string,
    startDateTime: string,
    endDateTime: string,
  ): Promise<CreatedEvent>;

  removeEvent(eventId: string): Promise<void>;
}

export const CALENDAR = Symbol('CALENDAR');
