import styles from './ArticleBlank.module.scss';
import FormWrapper from '../../../../components/Elements/Form/FormWrapper';
import { Form, Input } from 'antd';
import FormTags from '../../../../components/Elements/Form/FormTags';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { FC } from 'react';

export interface ArticleBlankProps {
  onFinish: (data: Record<string, string | string[]>) => void;
}

const ArticleBlank: FC<ArticleBlankProps> = ({ onFinish }) => {
  return (
    <div className={styles.root}>
      <FormWrapper
        isArticle={true}
        title={'Create new article'}
        submitText={'Send'}
        isLoading={false}
        onFinish={onFinish}
      >
        <Form.Item label="Title" name="title" rules={[formRulesHandler.required('Title field is required')]}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Short description"
          name="description"
          rules={[formRulesHandler.required('Short description field is required')]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Text" name="body" rules={[formRulesHandler.required('Text field is required')]}>
          <Input.TextArea placeholder="Text" autoSize={{ minRows: 7 }} />
        </Form.Item>
        <Form.Item label="Tags">
          <FormTags formName="tagList" />
        </Form.Item>
      </FormWrapper>
    </div>
  );
};

export default ArticleBlank;
