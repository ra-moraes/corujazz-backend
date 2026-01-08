export class DateTimeRange {
  private constructor(
    private readonly startDateTime: Date,
    private readonly endDateTime: Date,
  ) {
    if (startDateTime >= endDateTime) {
      throw new Error('Start date must be before end date');
    }
  }

  public static create(startDateTime: Date, endDateTime: Date): DateTimeRange {
    return new DateTimeRange(startDateTime, endDateTime);
  }

  public getStartDateTime(): Date {
    return this.startDateTime;
  }

  public getEndDateTime(): Date {
    return this.endDateTime;
  }

  public endsBefore(dateTime: DateTimeRange): boolean {
    return this.endsBeforeDate(dateTime.getStartDateTime());
  }

  public endsBeforeDate(dateTime: Date): boolean {
    return this.endDateTime <= dateTime;
  }

  public startsAfter(dateTime: DateTimeRange): boolean {
    return this.startsAfterDate(dateTime.getEndDateTime());
  }

  public startsAfterDate(dateTime: Date): boolean {
    return this.startDateTime >= dateTime;
  }

  public overlapsWith(other: DateTimeRange): boolean {
    return (
      this.startDateTime < other.endDateTime &&
      this.endDateTime > other.startDateTime
    );
  }
}
