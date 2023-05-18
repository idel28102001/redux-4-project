import FormWrapper from '@/components/Elements/FormWrapper';
import { Form, Input } from 'antd';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';

const ProfilePage = () => {
  const username = 'John Doe';
  const email = 'john@example.com';
  const url = '';

  return (
    <FormWrapper title="Edit Profile" submitText="Save">
      <Form.Item
        label="Username"
        name="username"
        rules={[formRulesHandler.required('Please input your username'), formRulesHandler.inRange('username', 3, 20)]}
        initialValue={username}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Email address"
        name="address"
        rules={[
          formRulesHandler.required('Please input your email'),
          formRulesHandler.emailField(),
          formRulesHandler.lowerCase('Your email must be in lower case'),
        ]}
        initialValue={email}
      >
        <Input placeholder="Email address" />
      </Form.Item>
      <Form.Item label="New password" name="password" hasFeedback rules={[formRulesHandler.inRange('password', 6, 40)]}>
        <Input.Password placeholder="New password" />
      </Form.Item>
      <Form.Item label="Avatar image (url)" name="avatar" rules={[formRulesHandler.urlField()]} initialValue={url}>
        <Input placeholder="Avatar image" />
      </Form.Item>
    </FormWrapper>
  );
};

export default ProfilePage;
