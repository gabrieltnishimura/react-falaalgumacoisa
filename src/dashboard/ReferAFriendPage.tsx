import React, { useEffect, useState } from 'react';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';
import { getReferralCode } from '../registration/RegistrationIntegrationService';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import DescriptionText from '../shared/typography/DescriptionText';
import MinorDescriptionText from '../shared/typography/MinorDescriptionText';
import MinorHeadingTitle from '../shared/typography/MinorHeadingTitle';
import SectionTitle from '../shared/typography/SectionTitle';
import DashboardPageWrapper from './DashboardPageWrapper';
import styles from './ReferAFriendPage.module.css';


function ReferAFriendPage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [referCode, setReferCode] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const referral: any = await getReferralCode();
        setReferCode(referral?.code);
        setLoading(false);
      } catch (err) {
        console.error('Could not get referral code', err);
      }
    };
    fetchData();
  }, [setLoading]);

  const shareFn = async () => {
    if (!(navigator as any).share) {
      console.log('Not supported');
      return;
    }

    try {
      await (navigator as any).share({
        title: 'Fale Alguma Coisa',
        text: 'Faça o cadastro no site para contribuir com a ciência e competir comigo!',
        url: `https://falealgumacoisa.herokuapp.com/cadastro?refer=${referCode}`,
      });
    } catch (err) {
      console.log('could not share with user', err);
    }
  }

  const copyFn = async () => {
    if (!navigator.clipboard) {
      console.error('Clipboard api not supported');
      return;
    }

    try {
      await navigator.clipboard.writeText(`Faça o cadastro no Fale Alguma Coisa para contribuir com a ciência e competir comigo!
        Use o link abaixo: https://falealgumacoisa.herokuapp.com/cadastro?refer=${referCode}`);
      // TODO make sure to add toasty afterwards
    } catch (err) {
      console.log('could not copy to clipboard');
    }

  }

  return (
    <DashboardPageWrapper>
      <div>
        <MinorHeadingTitle>Indique um amigo</MinorHeadingTitle>
        <DescriptionText>Traga seus amigos para a ciência e ganhe pontos assim que eles realizarem o cadastro no Fale Alguma Coisa!</DescriptionText>
        <SectionTitle>Código do seu cupom</SectionTitle>
        <div className={styles.refferalWrapper}>
          <span className={styles.referCode}>{referCode}</span>
          <button className={styles.copyButton} onClick={copyFn}>
            <CopyIcon ></CopyIcon>
          </button>
        </div>
        <MinorDescriptionText>Seu amigo receberá um link para fazer o cadastro de maneira direta</MinorDescriptionText>
        <div className={styles.shareButton}>
          <RectangularButton title="Compartilhar" onClick={shareFn} primary></RectangularButton>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}

export default ReferAFriendPage;