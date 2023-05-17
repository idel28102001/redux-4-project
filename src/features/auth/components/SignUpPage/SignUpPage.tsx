import styles from './SignUpPage.module.scss';
import { Checkbox, Form, Input } from 'antd';
import SubmitButton from '@/components/Elements/Buttons/SubmitButton';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>Create new account</header>
      <Form layout="vertical" requiredMark={false} className={styles.form}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            {
              min: 3,
              max: 20,
              message: 'Username must be within 3 to 20 characters',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="address"
          rules={[
            { required: true, message: 'Please input your email' },
            {
              message: 'Invalid email',
              type: 'email',
            },
          ]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              min: 6,
              max: 40,
              message: 'Your password must to be within 6 to 40 characters.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Repeat password"
          name="confirm"
          hasFeedback
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please repeat your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords must match'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="personal">
          <Checkbox defaultChecked={true}>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <SubmitButton>Create</SubmitButton>
      </Form>
      <div className={styles.extraText}>
        Already have an account?&nbsp;
        <Link to="/sign-in">Sign In</Link>.
      </div>
    </div>
  );
};

export default SignUpPage;
