import { Form, FormListFieldData, Input } from 'antd';
import styles from './FormTagItem.module.scss';
import { FC } from 'react';
import GhostButton from '@/components/Elements/Buttons/GhostButton';
import { formRulesHandler } from '@/utils/formRulesHandler.ts';
import GhostRedButton from '@/components/Elements/Buttons/GhostRedButton';

export type AddFunc = () => void;
export type RemoveFunc = (ind: number | number[]) => void;

interface FormTagItemProps {
  field: FormListFieldData;
  isLast: boolean;
  remove: RemoveFunc;
  add: AddFunc;
}

const FormTagItem: FC<FormTagItemProps> = ({ field, isLast, remove, add }) => {
  return (
    <div className={styles.root}>
      <Form.Item
        validateTrigger={['onChange', 'onBlur']}
        rules={[formRulesHandler.required('Please input tag or delete this field.')]}
        noStyle
        {...field}
      >
        <Input placeholder="Tag" className={styles.input} size="large" />
      </Form.Item>
      <GhostRedButton onClick={() => remove(field.name)}>Удалить</GhostRedButton>
      {isLast && <GhostButton onClick={() => add()}>Add tag</GhostButton>}
    </div>
  );
};

export default FormTagItem;
