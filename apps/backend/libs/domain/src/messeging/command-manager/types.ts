type NotFound = { type: 'not-found' };
type StillPending = { type: 'still-pending' };
type Completed = { type: 'completed'; result: unknown };
type CompletedMultiple = {
  type: 'completed-multiple';
  results: unknown[];
};

export type CommandResult =
  | NotFound
  | StillPending
  | Completed
  | CompletedMultiple;

export const CommandResult = {
  NotFound: (): NotFound => ({ type: 'not-found' }),
  StillPending: (): StillPending => ({ type: 'still-pending' }),
  Completed: (result: unknown): Completed => ({
    type: 'completed',
    result,
  }),
  CompletedMultiple: (results: unknown[]): CompletedMultiple => ({
    type: 'completed-multiple',
    results,
  }),
};
