import { TouchableOpacity } from "react-native";

export const Button = ({ children, variant, style, ...props }: any) => (
    <TouchableOpacity
      style={[styles.button, variant === 'ghost' && styles.ghostButton, style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );

const styles = {
    button: {
      backgroundColor: '#3b82f6',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    ghostButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#3b82f6',
    },
  };