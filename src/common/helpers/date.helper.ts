export class DateHelper {
  static formatDateToBr(date: Date): string {
    return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`;
  }
}