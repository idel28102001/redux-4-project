import { AxiosError } from 'axios';
import { MessageInfo } from '@/utils/axiosErrorHandler.ts';

type FormattedErrorData = {
  validateStatus: 'error';
  help: string;
};

export type ErrorDataTypes = Record<string, FormattedErrorData>;

function formatErrorData(obj: Record<string, string[]>): ErrorDataTypes {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      {
        validateStatus: 'error',
        help: `${key} ${value}`,
      },
    ])
  );
}

type InvalidArguments = {
  errors: Record<string, string[]>;
};

function handleValidate(e: AxiosError): ErrorDataTypes {
  const result: InvalidArguments | undefined = e?.response?.data as InvalidArguments | undefined;
  const errors = result ? result.errors || {} : {};
  return formatErrorData(errors);
}

function handleMessage(e: AxiosError): MessageInfo {
  return { message: e.message, status: 'error' };
}

function getAxiosError(e: unknown): AxiosError {
  const isInstanceOfAxiosError = e instanceof AxiosError;
  if (!isInstanceOfAxiosError) throw e;
  return e;
}

export const handleMessageError = (e: unknown) => handleMessage(getAxiosError(e));
export const handleValidateError = (e: unknown) => handleValidate(getAxiosError(e));
