import FormWrapper from '../../../../components/Elements/Form/FormWrapper';
import { Checkbox, Form, Input } from 'antd';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { FormSignUpProps } from '@/store/reducers/auth';
import { useSignUp } from '@/hooks/useFormAuth.ts';

const SignUpPage = () => {
  const { errors, onFinish, isLoading } = useSignUp();
  return (
    <FormWrapper
      isLoading={isLoading}
      onFinish={(e) => onFinish(e as never as FormSignUpProps)}
      title="Create new account"
      submitText="Create"
      extraLink={{ linkTo: '/sign-in', linkText: 'Sign In', text: 'Already have an account?' }}
    >
      <Form.Item
        {...errors.username}
        label="Username"
        name="username"
        rules={[formRulesHandler.required('Please input your username'), formRulesHandler.inRange('username', 3, 20)]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        {...errors.email}
        label="Email address"
        name="email"
        rules={[formRulesHandler.required('Please input your email'), formRulesHandler.emailField()]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item
        {...errors.password}
        label="Password"
        name="password"
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
