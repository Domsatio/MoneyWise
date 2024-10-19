import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const useSetHeader = (option: any) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(option);
  }, [navigation]);
};

export { useSetHeader };