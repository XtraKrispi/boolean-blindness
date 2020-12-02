export const NOTASKED = "NOTASKED";
export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export type RemoteData<TSuccess, TFailure> =
  | { type: typeof NOTASKED }
  | { type: typeof LOADING }
  | { type: typeof SUCCESS; data: TSuccess }
  | { type: typeof FAILURE; error: TFailure };

export function notAsked<TSuccess, TFailure>(): RemoteData<TSuccess, TFailure> {
  return { type: NOTASKED };
}

export function loading<TSuccess, TFailure>(): RemoteData<TSuccess, TFailure> {
  return { type: LOADING };
}
export function success<TSuccess, TFailure>(
  data: TSuccess
): RemoteData<TSuccess, TFailure> {
  return { type: SUCCESS, data: data };
}
export function failure<TSuccess, TFailure>(
  err: TFailure
): RemoteData<TSuccess, TFailure> {
  return { type: FAILURE, error: err };
}

export function isNotAsked<TSuccess, TFailure>(
  data: RemoteData<TSuccess, TFailure>
): data is { type: typeof NOTASKED } {
  return data.type === NOTASKED;
}

export function isSuccess<TSuccess, TFailure>(
  data: RemoteData<TSuccess, TFailure>
): data is { type: typeof SUCCESS; data: TSuccess } {
  return data.type === SUCCESS;
}

export function isFailure<TSuccess, TFailure>(
  data: RemoteData<TSuccess, TFailure>
): data is { type: typeof FAILURE; error: TFailure } {
  return data.type === FAILURE;
}

export function map<TSuccess, TError, TNew>(
  fn: (input: TSuccess) => TNew,
  data: RemoteData<TSuccess, TError>
): RemoteData<TNew, TError> {
  if (isSuccess(data)) {
    return success(fn(data.data));
  } else {
    return data;
  }
}
