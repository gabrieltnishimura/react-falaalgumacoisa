import React, { useEffect, useRef, useState } from 'react';
import { fromEvent, race } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import styles from './LongPressButton.module.css';

type PressedType = React.MouseEvent<any> | React.TouchEvent<any>;
interface LongPressButtonInput {
  pressed: (e: PressedType) => void;
  unpressed: (e: PressedType) => void;
}

function LongPressButton(props: LongPressButtonInput) {
  const [recording, setRecording] = useState<boolean>(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const componentPressed = (e: PressedType) => {
    setRecording(true);
    props.pressed(e);
  }

  const componentUnpressed = (e: PressedType) => {
    setRecording(false);
    props.unpressed(e);
  }

  useEffect(() => {
    if (!imageRef || !imageRef.current) {
      return;
    }

    const mouseDown = fromEvent<PressedType>(imageRef.current, 'mousedown', { passive: true });
    const touchStart = fromEvent<PressedType>(imageRef.current, 'touchstart', { passive: true });
    const pressedSubscription = race(mouseDown, touchStart)
      .pipe(debounceTime(1))
      .subscribe(componentPressed);

    const mouseUp = fromEvent<PressedType>(imageRef.current, 'mouseup', { passive: true });
    const touchEnd = fromEvent<PressedType>(imageRef.current, 'touchend', { passive: true });
    const unpressedSubscription = race(mouseUp, touchEnd)
      .pipe(
        debounceTime(1),
        delay(10), // what why
      )
      .subscribe(componentUnpressed);

    return () => {
      pressedSubscription.unsubscribe();
      unpressedSubscription.unsubscribe();
    };
  });

  const ignoreContextDropdown = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    e.stopPropagation()
    return false;
  }

  return (
    <>
      <div
        onContextMenu={ignoreContextDropdown}
        className={`${recording ? styles.animatedCircle : ''}`}>
      </div>
      <div
        onContextMenu={ignoreContextDropdown}
        className={styles.container}>

        <div
          ref={imageRef}
          className={styles.outerCircle}
          onContextMenu={ignoreContextDropdown}
        >
          <div
            className={styles.innerCircle}
            onContextMenu={ignoreContextDropdown}
          >
            <div
              className={styles.innerMostCircle}
              onContextMenu={ignoreContextDropdown}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LongPressButton;
