import { Button } from 'antd';
import GreenButton from '@/components/Elements/Buttons/GreenButton';
import { Link } from 'react-router-dom';

const NotAuthenticatedGroup = () => {
  return (
    <>
      <Button type="text" size="large">
        <Link to={'/profile'}>Profile</Link>
      </Button>
      <Button type="text" size="large">
        <Link to={'/sign-in'}>Sign In</Link>
      </Button>
      <GreenButton size="large">
        <Link to={'/sign-up'}>Sign Up</Link>
      </GreenButton>
    </>
  );
};

export default NotAuthenticatedGroup;
