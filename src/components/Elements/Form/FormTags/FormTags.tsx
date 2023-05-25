import { Form } from 'antd';
import styles from './FormTags.module.scss';
import { FC } from 'react';
import GhostButton from '@/components/Elements/Buttons/GhostButton';
import FormTagItems from '@/components/Elements/Form/FormTagItems';

interface FormTagsProps {
  formName: string;
  isDisable?: boolean;
}

const FormTags: FC<FormTagsProps> = ({ isDisable, formName }) => {
  return (
    <Form.List name={formName}>
      {(fields, { add, remove }) => (
        <div className={styles.fields}>
          <FormTagItems isDisable={isDisable} add={add} remove={remove} fields={fields} />
          {!fields.length && (
            <GhostButton disabled={isDisable} onClick={() => add()}>
              Add tag
            </GhostButton>
          )}
        </div>
      )}
    </Form.List>
  );
};

export default FormTags;
