import React from 'react';
import facebookStyles from './FacebookLoginButton.module.css';
import styles from './SocialMediaButtons.module.css';

function FacebookLoginButton(props: { click: () => void }) {
  return (
    <div className={`${styles.button} ${facebookStyles.button}`} onClick={props.click}>
      <div>
        <div className={styles.iconWrapper}>
          <svg className={`${styles.icon} ${facebookStyles.icon}`} viewBox="0 0 408.788 408.788">
            <path d="M353.701,0H55.087C24.665,0,0.002,24.662,0.002,55.085v298.616c0,30.423,24.662,55.085,55.085,55.085
	h147.275l0.251-146.078h-37.951c-4.932,0-8.935-3.988-8.954-8.92l-0.182-47.087c-0.019-4.959,3.996-8.989,8.955-8.989h37.882
	v-45.498c0-52.8,32.247-81.55,79.348-81.55h38.65c4.945,0,8.955,4.009,8.955,8.955v39.704c0,4.944-4.007,8.952-8.95,8.955
	l-23.719,0.011c-25.615,0-30.575,12.172-30.575,30.035v39.389h56.285c5.363,0,9.524,4.683,8.892,10.009l-5.581,47.087
	c-0.534,4.506-4.355,7.901-8.892,7.901h-50.453l-0.251,146.078h87.631c30.422,0,55.084-24.662,55.084-55.084V55.085
	C408.786,24.662,384.124,0,353.701,0z"/></svg>
        </div>
        <span>Login com Facebook</span>
      </div>
    </div >
  );
}

export default FacebookLoginButton;
