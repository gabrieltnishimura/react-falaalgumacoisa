import React, { useEffect, useRef, useState } from 'react';
import { fromEvent, race } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import './Microphone.css';

type PressedType = React.MouseEvent<any> | React.TouchEvent<any>;
interface MicrophoneInput {
  pressed: (e: PressedType) => void;
  unpressed: (e: PressedType) => void;
}

function Microphone(props: MicrophoneInput) {
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

    const mouseDown = fromEvent<PressedType>(imageRef.current, 'mousedown');
    const touchStart = fromEvent<PressedType>(imageRef.current, 'touchstart');
    const pressedSubscription = race(mouseDown, touchStart)
      .pipe(debounceTime(1))
      .subscribe(componentPressed);

    const mouseUp = fromEvent<PressedType>(imageRef.current, 'mouseup');
    const touchEnd = fromEvent<PressedType>(imageRef.current, 'touchend');
    const unpressedSubscription = race(mouseUp, touchEnd)
      .pipe(
        debounceTime(1),
        delay(200), // what why
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
    <div
      onContextMenu={ignoreContextDropdown}
      ref={imageRef}
    >
      <svg className={recording ? 'microphone-icon recording' : 'microphone-icon'}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
        <path d="M336 192h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16zM176 352c53.02 0 96-42.98 96-96h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96z" />
      </svg>
    </div >
  );
}

export default Microphone;
