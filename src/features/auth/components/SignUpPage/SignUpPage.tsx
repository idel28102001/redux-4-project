import FormWrapper from '@/components/Elements/FormWrapper';
import { Checkbox, Form, Input } from 'antd';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import type { ActionFunctionArgs } from 'react-router-dom';
import { useFetcher } from 'react-router-dom';
import { postSignUp } from '@/features/auth/api/postSignUp.ts';
import { AxiosError } from 'axios';
import { ValidateStatus } from 'antd/es/form/FormItem';

export async function action({ request }: ActionFunctionArgs) {
  const res = await request.formData();
  const { username, password, email } = Object.fromEntries(res) as never as FormProps;
  try {
    const result = await postSignUp({ user: { username, password, email } });
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.code !== 'ERR_BAD_REQUEST' || !e.response) throw new Error('Произошла неизвестная ошибка');
      const { errors } = e.response.data as {
        errors: { email?: string[]; username?: string[]; password?: string[] };
      };
      const email: {
        status: ValidateStatus;
        error: string | undefined;
      } = { status: !errors.email ? 'success' : 'error', error: errors.email?.join('. ') };
      const username: {
        status: ValidateStatus;
        error: string | undefined;
      } = { status: !errors.username ? 'success' : 'error', error: errors.username?.join('. ') };
      const password: {
        status: ValidateStatus;
        error: string | undefined;
      } = { status: !errors.password ? 'success' : 'error', error: errors.password?.join('. ') };
      return { email, username, password };
    }
  }
  return { data: 123 };
}

interface FormProps {
  username: string;
  email: string;
  password: string;
  confirm: string;
  personal: boolean;
}

type ErrorDataTypes<Args extends string[]> = {
  [Key in Args[number]]?: {
    status: ValidateStatus;
    error?: string;
  };
};

const SignUpPage = () => {
  const fetcher = useFetcher();
  const errors = (fetcher.data as ErrorDataTypes<['username', 'password', 'email']>) || {};
  console.log(errors);
  const onFinish = (data: FormProps) => {
    fetcher.submit(data as never, { method: 'post', action: '/sign-up' });
  };

  return (
    <FormWrapper
      isLoading={fetcher.state === 'submitting'}
      onFinish={(e) => onFinish(e as never as FormProps)}
      title="Create new account"
      submitText="Create"
      extraLink={{ linkTo: '/sign-in', linkText: 'Sign In', text: 'Already have an account?' }}
    >
      <Form.Item
        label="Username"
        name="username"
        validateStatus={errors?.username?.status}
        help={errors?.username?.error}
        rules={[formRulesHandler.required('Please input your username'), formRulesHandler.inRange('username', 3, 20)]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Email address"
        validateStatus={errors.email?.status}
        help={errors.email?.error}
        name="email"
        rules={[formRulesHandler.required('Please input your email'), formRulesHandler.emailField()]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        validateStatus={errors.password?.status}
        help={errors.password?.error}
        hasFeedback
        rules={[formRulesHandler.required('Please input your password'), formRulesHandler.inRange('password', 6, 40)]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Repeat password"
        name="confirm"
        hasFeedback
        dependencies={['password']}
        rules={[
          formRulesHandler.required('Please repeat your password'),
          formRulesHandler.matchFields('password', 'Passwords must match'),
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item name="personal" valuePropName="checked" initialValue={true}>
        <Checkbox>I agree to the processing of my personal information</Checkbox>
      </Form.Item>
    </FormWrapper>
  );
};

export default SignUpPage;
