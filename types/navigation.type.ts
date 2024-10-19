import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ScreenNavigationProp = NativeStackNavigationProp<{
    tabs: undefined;
    login: undefined;
    register: undefined;
    budget_category: { id: string | number };
  }>;
  
  interface NavigationProps {
    navigation: ScreenNavigationProp;
  }

  export { NavigationProps };