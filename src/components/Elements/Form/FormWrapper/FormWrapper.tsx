import styles from './FormWrapper.module.scss';
import { Form } from 'antd';
import SubmitButton from '@/components/Elements/Buttons/SubmitButton';
import { Link } from 'react-router-dom';
import { Children, FC, ReactFragment } from 'react';
import { FormProps } from 'antd/es/form/Form';
import { MessageInfo } from '@/utils/axiosErrorHandler.ts';

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
  isArticle?: boolean;
  dataInfo?: MessageInfo;
}

const FormWrapper: FC<FormWrapperProps> = ({
  isArticle,
  isLoading,
  children,
  extraLink,
  title,
  submitText,
  ...formFields
}) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>{title}</header>
      <div className={styles.form}>
        <Form layout="vertical" requiredMark={false} {...formFields} disabled={isLoading}>
          {Children.map(children, (child, index) => (
            <div key={index} className={styles.child}>
              {child}
            </div>
          ))}
          {/*{children}*/}
          <SubmitButton isArticle={isArticle} size="large" loading={isLoading}>
            {submitText}
          </SubmitButton>
        </Form>
      </div>

      {extraLink && <ExtraLinkEl item={extraLink} />}
    </div>
  );
};

export default FormWrapper;
