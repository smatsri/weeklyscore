type Success<T> = { success: true; value: T };
type Fail = { success: false; error: any };
export type Result<T> = Success<T> | Fail;

export const Success = <T>(value: T): Success<T> => ({
  success: true,
  value,
});

export const Fail = (error: any): Fail => ({
  success: false,
  error,
});

export const isSuccess = <T>(result: Result<T>): result is Success<T> =>
  result.success === true;
