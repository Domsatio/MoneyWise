import { View } from "react-native";

export const Progress = ({ value, color = '#3b82f6' }: any) => (
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${value}%`, backgroundColor: color },
        ]}
      />
    </View>
  );

const styles = {
    progressContainer: {
      height: 10,
      backgroundColor: '#f3f4f6',
      borderRadius: 5,
      marginTop: 8,
    },
    progressBar: {
      height: 10,
      borderRadius: 5,
    },
  };