import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import redirectToRecording from '../home/RecordingRedirectionService';
import ActionButtons, { ActionButtonsInput } from '../shared/buttons/ActionButtons';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import HeadingTitle from '../shared/typography/HeadingTitle';
import ItemizedList from '../shared/typography/ItemizedList';
import SectionText from '../shared/typography/SectionText';
import SectionTitle from '../shared/typography/SectionTitle';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';

function TermsOfServicePage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const location: { state: any } = useLocation();
  const navigate = useNavigate();
  const [buttons, setButtons] = useState<ActionButtonsInput | null>(null)

  useEffect(() => {
    const agree = () => {
      localStorage.setItem('tos', 'agreed');
      redirectToRecording(location?.state?.theme, navigate);
    }

    const disagree = () => {
      navigate('/');
    }

    setLoading(false); // each page has to implement its own stop loading logic
    if (!localStorage.getItem('tos')) {
      setButtons({
        primary: {
          title: 'Concordo',
          enabled: true,
          onClick: agree,
        },
        secondary: {
          title: 'Não concordo',
          disabled: false,
          onClick: disagree,
        }
      })
    }
  }, []);

  return (
    <>
      <Header logoColor="white" />
      <WhitePageWrapper>
        <HeadingTitle>Termos de Serviço</HeadingTitle>
        <SectionTitle>1. Termos</SectionTitle>
        <SectionText>Ao acessar ao site Fale Alguma Coisa, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</SectionText>

        <SectionTitle>2. Uso de Licença</SectionTitle>
        <SectionText>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Fale Alguma Coisa , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</SectionText>

        <ItemizedList list={[
          { title: 'modificar ou copiar os materiais;' },
          { title: 'usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou ,não comercial);' },
          { title: 'tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Fale Alguma Coisa;' },
          { title: 'remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou' },
          { title: 'transferir os materiais para outra pessoa ou \'espelhe\' os materiais em qualquer outro servidor.' },
        ]} ordered />

        <SectionText>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Fale Alguma Coisa a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</SectionText>

        <SectionTitle>3. Isenção de responsabilidade</SectionTitle>

        <ItemizedList list={[
          { title: 'Os materiais no site da Fale Alguma Coisa são fornecidos \'como estão\'. Fale Alguma Coisa não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.' },
          { title: 'Além disso, o Fale Alguma Coisa não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.' },
        ]} />

        <SectionTitle>4. Limitações</SectionTitle>
        <SectionText>Em nenhum caso o Fale Alguma Coisa ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Fale Alguma Coisa, mesmo que Fale Alguma Coisa ou um representante autorizado da Fale Alguma Coisa tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</SectionText>

        <SectionTitle>Precisão dos materiais</SectionTitle>
        <SectionText>Os materiais exibidos no site da Fale Alguma Coisa podem incluir erros técnicos, tipográficos ou fotográficos. Fale Alguma Coisa não garante que qualquer material em seu site seja preciso, completo ou atual. Fale Alguma Coisa pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Fale Alguma Coisa não se compromete a atualizar os materiais.</SectionText>

        <SectionTitle>5. Links</SectionTitle>
        <SectionText>O Fale Alguma Coisa não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Fale Alguma Coisa do site. O uso de qualquer site vinculado é por conta e risco do usuário.</SectionText>

        <SectionTitle>Modificações</SectionTitle>
        <SectionText>O Fale Alguma Coisa pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</SectionText>

        <SectionTitle>Lei aplicável</SectionTitle>
        <SectionText>Estes termos e condições são regidos e interpretados de acordo com as leis do Fale Alguma Coisa e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</SectionText>
        {buttons ?
          <ActionButtons
            primary={buttons.primary}
            secondary={buttons.secondary}
          ></ActionButtons>
          : null}
      </WhitePageWrapper>
    </>
  );
}

export default TermsOfServicePage;
