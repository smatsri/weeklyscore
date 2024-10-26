type NotFound = { type: 'not-found' };
type StillPending = { type: 'still-pending' };
type Completed<T> = { type: 'completed'; result: T };
type CompletedMultiple<T> = {
  type: 'completed-multiple';
  results: T[];
};

export type CommandResult<T> =
  | NotFound
  | StillPending
  | Completed<T>
  | CompletedMultiple<T>;

export const CommandResult = {
  NotFound: (): NotFound => ({ type: 'not-found' }),
  StillPending: (): StillPending => ({ type: 'still-pending' }),
  Completed: <T>(result: T): Completed<T> => ({
    type: 'completed',
    result,
  }),
  CompletedMultiple: <T>(results: T[]): CompletedMultiple<T> => ({
    type: 'completed-multiple',
    results,
  }),
};
