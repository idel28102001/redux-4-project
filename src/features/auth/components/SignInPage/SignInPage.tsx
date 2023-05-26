import FormWrapper from '../../../../components/Elements/Form/FormWrapper';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { Form, Input } from 'antd';
import { FormSignInProps } from '@/store/reducers/auth';
import { useSignIn } from '@/hooks/useFormAuth.ts';

const SignInPage = () => {
  const { errors, onFinish, isLoading, errorInfo } = useSignIn();
  return (
    <FormWrapper
      dataInfo={errorInfo}
      onFinish={(e) => onFinish(e as never as FormSignInProps)}
      isLoading={isLoading}
      title="Sign In"
      submitText="Login"
      extraLink={{ linkTo: '/sign-up', linkText: 'Sign Up', text: "Don' have an account?" }}
    >
      <Form.Item
        {...errors['email or password']}
        label="Email address"
        name="email"
        rules={[
          formRulesHandler.required('Please input your email'),
          formRulesHandler.emailField(),
          formRulesHandler.lowerCase('Your email must be in lower case'),
        ]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item
        {...errors['email or password']}
        label="Password"
        name="password"
        hasFeedback
        rules={[formRulesHandler.required('Please input your password')]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
    </FormWrapper>
  );
};

export default SignInPage;
