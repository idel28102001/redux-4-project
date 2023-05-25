import styles from './ArticleBlank.module.scss';
import FormWrapper from '../../../../components/Elements/Form/FormWrapper';
import { Form, Input } from 'antd';
import FormTags from '../../../../components/Elements/Form/FormTags';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import { FC } from 'react';
import { ErrorDataTypes } from '@/utils/formHandlerHeplers.ts';
import { Article } from '@/features/articles/api/types.ts';

interface ArticleBlankProps {
  onFinish: (e: Record<string, string | string[]>) => void;
  isSubmitting: boolean;
  errors: ErrorDataTypes;
  defaultData?: Article;
}

const ArticleBlank: FC<ArticleBlankProps> = ({ isSubmitting, onFinish, errors, defaultData }) => {
  const title = defaultData ? 'Edit article' : 'Create new article';
  const buttonText = defaultData ? 'Save' : 'Send';
  return (
    <div className={styles.root}>
      <FormWrapper
        initialValues={defaultData}
        isArticle={true}
        title={title}
        submitText={buttonText}
        isLoading={isSubmitting}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          {...errors['title']}
          name="title"
          rules={[formRulesHandler.required('Title field is required')]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          {...errors['description']}
          label="Short description"
          name="description"
          rules={[formRulesHandler.required('Short description field is required')]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Text"
          {...errors['body']}
          name="body"
          rules={[formRulesHandler.required('Text field is required')]}
        >
          <Input.TextArea placeholder="Text" autoSize={{ minRows: 7 }} />
        </Form.Item>
        <Form.Item label="Tags" {...errors['tagList']}>
          <FormTags formName="tagList" />
        </Form.Item>
      </FormWrapper>
    </div>
  );
};

export default ArticleBlank;
