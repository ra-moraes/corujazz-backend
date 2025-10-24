export class ReservationForPresentationResponseDto {
  id: string;
  startDate: Date;
  endDate: Date;
  observation?: string;
  showId?: string;
  establishmentId?: string;
  value?: number;
}
