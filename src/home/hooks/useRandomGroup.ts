import { useEffect, useState } from 'react';
import * as wordSuggestionService from '../../recording/suggestions/WordSuggestionService';

type UseRandomGroupReturnType = {
  group?: string | null;
  isError: boolean;
};

export const useRandomGroup = (): UseRandomGroupReturnType => {
  const [group, setGroup] = useState<string | undefined>();
  const [error, setError] = useState<boolean | undefined>();

  useEffect(() => {
    const getRandomGroup = async () => {
      try {
        const theme = await wordSuggestionService.getRandomGroup();
        setGroup(theme);
      } catch (err) {
        setError(Boolean(err));
      }
    };
    getRandomGroup();
  }, []);

  return {
    group,
    isError: Boolean(error),
  };
};
