import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSession } from '../utils/sessionUtils';
import { checkRole } from '../utils/checkRole';

const useCheckRole = (allowedRoles) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserRole = () => {
      const account = handleSession(navigate);
      if (!account) {
        navigate('/login');
        return;
      }
      try {
        const accountrole = checkRole();
        if (!allowedRoles.includes(accountrole.role)) {
          navigate('/nopermission');
        }
      } catch (error) {
        console.error('Error verifying user role:', error);
        navigate('/nopermission');
      }
    };

    verifyUserRole();
  }, [allowedRoles, navigate]);
};

export default useCheckRole;
