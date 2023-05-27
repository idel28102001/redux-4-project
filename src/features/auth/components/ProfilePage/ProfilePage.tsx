import FormWrapper from '../../../../components/Elements/Form/FormWrapper';
import { Form, Input } from 'antd';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useEditUser } from '@/hooks/useFormAuth.ts';

const ProfilePage = () => {
  const { user } = useAppSelector(selectAuth);
  if (!user) throw new Error('There is no user');
  const { onFinish, isLoading, errors } = useEditUser();
  const { username, email, image } = user;

  return (
    <FormWrapper
      initialValues={{ username, email, image }}
      isLoading={isLoading}
      title="Edit Profile"
      submitText="Save"
      onFinish={(data) => {
        if (data['password'] && !data['password'].trim()) {
          delete data['password'];
        }
        onFinish(data as Record<string, string>);
      }}
    >
      <Form.Item
        label="Username"
        name="username"
        {...errors['username']}
        rules={[formRulesHandler.required('Please input your username'), formRulesHandler.inRange('username', 3, 20)]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        {...errors['email']}
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
        {...errors['password']}
        label="New password"
        name="password"
        hasFeedback
        rules={[formRulesHandler.inRange('password', 6, 40)]}
      >
        <Input.Password placeholder="New password" />
      </Form.Item>
      <Form.Item {...errors['image']} label="Avatar image (url)" name="image" rules={[formRulesHandler.urlField()]}>
        <Input placeholder="Avatar image" />
      </Form.Item>
    </FormWrapper>
  );
};

export default ProfilePage;
