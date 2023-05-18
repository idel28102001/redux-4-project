import FormWrapper from '@/components/Elements/FormWrapper';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { Form, Input } from 'antd';

const SignInPage = () => {
  return (
    <FormWrapper
      title="Sign In"
      submitText="Login"
      extraLink={{ linkTo: '/sign-up', linkText: 'Sign Up', text: "Don' have an account?" }}
    >
      <Form.Item
        label="Email address"
        name="address"
        rules={[
          formRulesHandler.required('Please input your email'),
          formRulesHandler.emailField(),
          formRulesHandler.lowerCase('Your email must be in lower case'),
        ]}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item
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
