import React from "react";
import Modal from './Modal';

function TermsOfServiceModal(props: { onAgree: () => void, onDisagree: () => void }) {
  return (
    <Modal
      title="Legal! Antes de começar, entenda o que faremos com a sua contribuição"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam mauris, convallis eu pharetra nec, facilisis id massa. Sed vel libero sed dolor iaculis dignissim. Aenean mollis, est ac malesuada facilisis, est dui bibendum elit, non ornare orci velit sed tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam mauris, convallis eu pharetra nec, facilisis id massa. Sed vel libero sed dolor iaculis dignissim. Aenean mollis, est ac malesuada facilisis, est dui bibendum elit, non ornare orci velit sed tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam mauris, convallis eu pharetra nec, facilisis id massa. Sed vel libero sed dolor iaculis dignissim. Aenean"
      primaryButton={{
        title: 'Ok!',
        enabled: true,
        onClick: () => props.onAgree(),
      }}
      secondaryButton={{
        title: 'Não concordo',
        disabled: false,
        onClick: () => props.onDisagree()
      }}
    >
    </Modal>
  );
}

export default TermsOfServiceModal;