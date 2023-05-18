import { Rule } from 'rc-field-form/lib/interface';

export const formRulesHandler = {
  required: (message: string): Rule => {
    return { required: true, message };
  },
  inRange: (name: string, min: number, max: number): Rule => {
    return {
      min,
      max,
      message: `Your ${name} must to be within ${min} to ${max} characters.`,
    };
  },
  matchFields: (fieldName: string, message: string): Rule => {
    return ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(fieldName) === value) return Promise.resolve();
        return Promise.reject(new Error(message));
      },
    });
  },
  emailField: (): Rule => ({
    message: 'Invalid email',
    type: 'email',
  }),
  lowerCase: (message: string): Rule => {
    return () => ({
      validator(_, value: string) {
        if (!value || value.toLowerCase() === value) return Promise.resolve();
        return Promise.reject(new Error(message));
      },
    });
  },
  urlField: (): Rule => ({ type: 'url', message: 'Invalid url' }),
};
