import React, { useEffect } from 'react';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import HeadingTitle from '../shared/typography/HeadingTitle';
import ItemizedList from '../shared/typography/ItemizedList';
import SectionText from '../shared/typography/SectionText';
import SectionTitle from '../shared/typography/SectionTitle';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';

function PrivacyPolicyPage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  useEffect(() => {
    setLoading(false); // each page has to implement its own stop loading logic
  }, [setLoading]);

  return (
    <>
      <Header logoColor="white" />
      <WhitePageWrapper>
        <HeadingTitle>Política de Privacidade</HeadingTitle>
        <SectionText>
          A sua privacidade é importante para nós. É política do Fale Alguma Coisa respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no aplicativo Fale Alguma Coisa, e outros sites que possuímos e operamos.
        </SectionText>
        <SectionText>
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
        </SectionText>
        <SectionText>
          Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
        </SectionText>
        <SectionText>
          O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
        </SectionText>
        <SectionText>
          Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
        </SectionText>
        <SectionText>
          O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
        </SectionText>

        <HeadingTitle>Política de Cookies Fale Alguma Coisa</HeadingTitle>
        <SectionTitle>O que são cookies?</SectionTitle>
        <SectionText>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.</SectionText>

        <SectionTitle>Como usamos os cookies?</SectionTitle>
        <SectionText>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados ​​para fornecer um serviço que você usa.</SectionText>

        <SectionTitle>Desativar cookies</SectionTitle>
        <SectionText>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.</SectionText>

        <SectionTitle>Cookies que definimos</SectionTitle>
        <ItemizedList list={[
          { title: 'Cookies relacionados à conta', description: 'Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.' },
          { title: 'Cookies relacionados ao login', description: 'Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página. Esses cookies são normalmente removidos ou limpos quando você efetua logout para garantir que você possa acessar apenas a recursos e áreas restritas ao efetuar login.' },
          { title: 'Cookies relacionados a boletins por e-mail', description: 'Este site oferece serviços de assinatura de boletim informativo ou e-mail e os cookies podem ser usados ​​para lembrar se você já está registrado e se deve mostrar determinadas notificações válidas apenas para usuários inscritos / não inscritos.' },
          { title: 'Pedidos processando cookies relacionados', description: 'Este site oferece facilidades de comércio eletrônico ou pagamento e alguns cookies são essenciais para garantir que seu pedido seja lembrado entre as páginas, para que possamos processá-lo adequadamente.' },
          { title: 'Cookies relacionados a pesquisas', description: 'Periodicamente, oferecemos pesquisas e questionários para fornecer informações interessantes, ferramentas úteis ou para entender nossa base de usuários com mais precisão. Essas pesquisas podem usar cookies para lembrar quem já participou numa pesquisa ou para fornecer resultados precisos após a alteração das páginas.' },
          { title: 'Cookies relacionados a formulários', description: 'Quando você envia dados por meio de um formulário como os encontrados nas páginas de contacto ou nos formulários de comentários, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.' },
          { title: 'Cookies de preferências do site', description: 'Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.' },
        ]} />

        <HeadingTitle>Cookies de Terceiros</HeadingTitle>
        <SectionText>Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.</SectionText>
        <ItemizedList list={[
          { title: 'Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.' },
        ]} />
        <SectionText>Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.</SectionText>

        <SectionTitle>3. Isenção de responsabilidade</SectionTitle>
        <ItemizedList list={[
          { title: 'As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.' },
          { title: 'Periodicamente, testamos novos recursos e fazemos alterações subtis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.' },
          { title: 'À medida que vendemos produtos, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente compram e, portanto, esse é o tipo de dados que esses cookies rastrearão. Isso é importante para você, pois significa que podemos fazer previsões de negócios com precisão que nos permitem analizar nossos custos de publicidade e produtos para garantir o melhor preço possível.' },
        ]} />

        <SectionTitle>Mais informações</SectionTitle>
        <SectionText>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</SectionText>

        <SectionText>Esta política é efetiva a partir de Novembro/2020.</SectionText>
      </WhitePageWrapper>
    </>
  );
}

export default PrivacyPolicyPage;
