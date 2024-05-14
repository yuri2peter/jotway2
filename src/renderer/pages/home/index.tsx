import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageHome: React.FC<{}> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/a/jottings');
  }, [navigate]);
  return null;
};

export default PageHome;
