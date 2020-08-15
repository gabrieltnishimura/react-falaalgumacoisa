import { useState } from 'react';

export function useInput<K = string>(initialValue: K) {
  const [value, setValue] = useState<K>(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      }
    }
  };
};
