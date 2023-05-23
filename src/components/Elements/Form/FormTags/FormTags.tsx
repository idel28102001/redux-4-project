import { Form } from 'antd';
import styles from './FormTags.module.scss';
import { FC } from 'react';
import GhostButton from '@/components/Elements/Buttons/GhostButton';
import FormTagItems from '@/components/Elements/Form/FormTagItems';

interface FormTagsProps {
  formName: string;
}

const FormTags: FC<FormTagsProps> = ({ formName }) => {
  return (
    <Form.List name={formName}>
      {(fields, { add, remove }) => (
        <div className={styles.fields}>
          <FormTagItems add={add} remove={remove} fields={fields} />
          {!fields.length && <GhostButton onClick={() => add()}>Add tag</GhostButton>}
        </div>
      )}
    </Form.List>
  );
};

export default FormTags;
