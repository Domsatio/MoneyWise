import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Trash ,Camera, Image as ImageIcon } from 'lucide-react-native';

interface ImagePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onImageSelect: (uri: string) => void;
  removeImage?: () => void;
}

export default function ImagePickerModal({
  isVisible,
  onClose,
  onImageSelect,
  removeImage,
}: ImagePickerModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      onImageSelect(imageUri);
      onClose();
    }
  };

  const handleOpenCamera = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
      onImageSelect(imageUri);
      onClose();
    }
  };

  const handleRemoveImage = (): void => {
    setSelectedImage(null);
    removeImage && removeImage();
  }

  return (
    <Modal visible={isVisible} transparent={true}  animationType="slide">
      <View style={styles.modalOverlay} onTouchEnd={() => onClose()}>
        <View style={styles.modalContent}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={handlePickImage}>
              <ImageIcon color="#3b82f6" size={40} />
              <Text style={styles.optionText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={handleOpenCamera}>
              <Camera color="#10b981" size={40} />
              <Text style={styles.optionText}>Camera</Text>
            </TouchableOpacity>

            {selectedImage && (
              <TouchableOpacity style={styles.optionButton} onPress={handleRemoveImage}>
                <Trash color="#ef4444" size={40} />
                <Text style={styles.optionText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
  },
});
