import { Form, FormListFieldData } from 'antd';
import { FC } from 'react';
import FormTagItem from '@/components/Elements/Form/FormTagItem';
import { AddFunc, RemoveFunc } from '@/components/Elements/Form/FormTagItem/FormTagItem.tsx';

interface FormTagItemsProps {
  fields: FormListFieldData[];
  add: AddFunc;
  remove: RemoveFunc;
}

const FormTagItems: FC<FormTagItemsProps> = ({ fields, add, remove }) => {
  return (
    <>
      {fields.map((field, index) => (
        <Form.Item key={field.key}>
          <FormTagItem add={add} remove={remove} field={field} isLast={fields.length - 1 === index} />
        </Form.Item>
      ))}
    </>
  );
};

export default FormTagItems;
