import Card from '@/components/Elements/Card';
import { Outlet } from 'react-router-dom';

const FormLayout = () => {
  return (
    <Card isForm={true}>
      <Outlet />
    </Card>
  );
};

export default FormLayout;
