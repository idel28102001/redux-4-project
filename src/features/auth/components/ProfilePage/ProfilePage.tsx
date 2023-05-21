import FormWrapper from '@/components/Elements/FormWrapper';
import { Form, Input } from 'antd';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useFormEdit } from '@/hooks/useFormEdit.ts';

const ProfilePage = () => {
  const { user } = useAppSelector(selectAuth);
  if (!user) throw new Error('There is no user');
  const { onFinish, isLoading, errors } = useFormEdit();
  console.log(errors);
  const { username, email, image } = user;

  return (
    <FormWrapper isLoading={isLoading} title="Edit Profile" submitText="Save" onFinish={onFinish}>
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
        name="email"
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
      <Form.Item label="Avatar image (url)" name="image" rules={[formRulesHandler.urlField()]} initialValue={image}>
        <Input placeholder="Avatar image" />
      </Form.Item>
    </FormWrapper>
  );
};

export default ProfilePage;
