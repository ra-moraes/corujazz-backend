export interface DomainCheckableState {
  checkState(): DomainStateError[];
}

export type DomainStateError = {
  field: string;
  message: string;
};
