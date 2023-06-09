import { Form, FormListFieldData } from 'antd';
import { FC } from 'react';
import FormTagItem from '@/components/Elements/Form/FormTagItem';
import { AddFunc, RemoveFunc } from '@/components/Elements/Form/FormTagItem/FormTagItem.tsx';
import styles from './FormTagItems.module.scss';

interface FormTagItemsProps {
  fields: FormListFieldData[];
  add: AddFunc;
  remove: RemoveFunc;
  isDisable?: boolean;
}

const FormTagItems: FC<FormTagItemsProps> = ({ isDisable, fields, add, remove }) => {
  return (
    <ul className={styles.root}>
      {fields.map((field, index) => (
        <Form.Item key={field.key}>
          <FormTagItem
            isDisable={isDisable}
            add={add}
            remove={remove}
            field={field}
            isLast={fields.length - 1 === index}
          />
        </Form.Item>
      ))}
    </ul>
  );
};

export default FormTagItems;
