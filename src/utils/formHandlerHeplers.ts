import { AxiosError } from 'axios';

type FormattedErrorData = {
  validateStatus: 'error';
  help: string;
};

export type ErrorDataTypes = Record<string, FormattedErrorData>;

function formatErrorData(obj: Record<string, string[]>): ErrorDataTypes {
  const result: Record<string, FormattedErrorData> = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[key] = { validateStatus: 'error', help: `${key} ${value.join('. ')}` };
  });
  return result;
}

type InvalidArguments = {
  errors: Record<string, string[]>;
};

export function HandleValidateError(e: unknown) {
  const isInstanceOfAxios = e instanceof AxiosError;
  if (!isInstanceOfAxios) throw e;
  if (e.code !== 'ERR_BAD_REQUEST' || !e.response) throw new Error('Произошла неизвестная ошибка');
  const { errors } = e.response.data as InvalidArguments;
  return formatErrorData(errors);
}

export async function trySubmitForm<T extends () => Promise<unknown>>(cb: T) {
  try {
    return await cb();
  } catch (e) {
    return HandleValidateError(e);
  }
}
