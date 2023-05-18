import styles from './FormWrapper.module.scss';
import { Form } from 'antd';
import SubmitButton from '@/components/Elements/Buttons/SubmitButton';
import { Link } from 'react-router-dom';
import { FC, ReactFragment } from 'react';
import { FormProps } from 'antd/es/form/Form';

interface ExtraLink {
  text: string;
  linkText: string;
  linkTo: string;
}

interface ExtraLinkElProps {
  item: ExtraLink;
}

const ExtraLinkEl: FC<ExtraLinkElProps> = ({ item: { linkTo, linkText, text } }) => {
  return (
    <div className={styles.extraText}>
      {text}&nbsp;
      <Link to={linkTo}>{linkText}</Link>.
    </div>
  );
};

interface FormWrapperProps extends FormProps<HTMLFormElement> {
  title: string;
  submitText: string;
  extraLink?: ExtraLink;
  isLoading: boolean;
  children: ReactFragment | JSX.Element;
}

const FormWrapper: FC<FormWrapperProps> = ({ isLoading, children, extraLink, title, submitText, ...formFields }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>{title}</header>
      <div className={styles.form}>
        <Form layout="vertical" requiredMark={false} {...formFields} disabled={isLoading}>
          {children}
          <SubmitButton loading={isLoading}>{submitText}</SubmitButton>
        </Form>
      </div>

      {extraLink && <ExtraLinkEl item={extraLink} />}
    </div>
  );
};

export default FormWrapper;
