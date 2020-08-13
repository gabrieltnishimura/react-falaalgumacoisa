import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();
  const click = () => {
    navigate('/gravar', { replace: true });
  }

  return (
    <div>
      Success!
      <button onClick={click}>Gravar outra</button>
    </div>
  );
}

export default SuccessPage;
