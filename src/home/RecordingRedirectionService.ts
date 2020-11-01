import { checkMicPermissions } from '../shared/utils';

const redirectToRecording = (theme: string, navigate: any) => {
  if (!theme || !navigate) {
    return;
  }

  const agreed = !!localStorage.getItem('tos');
  if (agreed) { // go to next page
    const grantedFn = () => {
      navigate(`/fale/${theme}`);
    }

    const notGrantedFn = () => {
      navigate(`/habilitar-microfone`, { state: { theme } });
    }

    checkMicPermissions(grantedFn, notGrantedFn);
  } else { // go to ToS
    navigate('/termos-de-servico', { state: { theme } })
  }
}

export default redirectToRecording;