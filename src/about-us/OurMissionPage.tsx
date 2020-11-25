import React, { useEffect } from 'react';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import HeadingTitle from '../shared/typography/HeadingTitle';
import SectionText from '../shared/typography/SectionText';
import SectionTitle from '../shared/typography/SectionTitle';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';

function OurMissionPage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <>
      <Header logoColor="white" />
      <WhitePageWrapper>
        <HeadingTitle>Nossa missão</HeadingTitle>
        <SectionText>
          Para contribuir de forma eficaz à ciência, o aplicativo Fale Alguma Coisa tem as seguintes missões e objetivos:
        </SectionText>

        <SectionTitle>Citizen science acessível</SectionTitle>
        <SectionText>Para facilitar a contribuição por usuários, o aplicativo Fale Alguma Coisa possui interface amigável e responsiva. Suas funcionalidades foram testadas em dispositivos iOS, Android, MacOS, Windows e browsers Chrome, Firefox, Safari, Edge. Caso tenha alguma sugestão de melhoria ou erro, por gentileza reporte na página de sugestões.</SectionText>

        <SectionTitle>Construção do Corpus de Fala</SectionTitle>
        <SectionText>Todas as vozes aqui geradas pelos contribuidores serão validadas de forma estruturada, removendo gravações vazias e incorretas. Após essa etapa, será feito um estudo estatístico das gravações para garantir que elas tem variabilidade e quantidade suficiente para representar a língua portuguesa.</SectionText>

        <SectionTitle>Distribuição do Corpus de Fala</SectionTitle>
        <SectionText>As gravações validadas constituirão uma base de dados chamada de Corpus de Fala. Esse corpus será importante para realizar pesquisas em reconhecimento de voz e será distribuída na licença CC BY 4.0. Ele estará disponibilizado </SectionText>
      </WhitePageWrapper>
    </>
  );
}

export default OurMissionPage;
