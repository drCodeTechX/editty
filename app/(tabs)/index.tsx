import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButon";
import ImageViewer from "@/components/ImageViewer";
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import * as ImagePicker from 'expo-image-picker';


export default function Index() {
  const [permissionStatus, requestPermission] = MediaLibrary.usePermissions();

  if(permissionStatus === null){
    requestPermission();
  }

  const imageRef = useRef<View>(null);

  const ImageProvider = require('@/assets/images/background-image.png');
  const [image, setImage] = useState<String | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [showEmojiPickerModal, setShowEmojiPickerModal] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ['images'],
      quality: 1
    })

    if(!result.canceled){
      setImage(result.assets[0].uri);
      setShowAppOptions(true);
    }else {
      alert("You did not select an Image");
      console.log(result);
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
    setImage(ImageProvider);
    setPickedEmoji(undefined);
  }

  const onAddSticker = () => {
    setShowEmojiPickerModal(true);
  }

  const onEmojiModalClose = () => {
    setShowEmojiPickerModal(false);
  }

  const onSaveImageAsync = async () => {
    try{

      const localUri = await captureRef(imageRef, {
        height: 700,
        quality: 1
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri){
        alert('Saved Succesfully!!!');
      }else{
        alert('Save Failed!! ):');
      }

    }catch (error){
      console.log(error);
    }
  }



  return (
    <>
      <GestureHandlerRootView style ={styles.container}>
        <View ref={imageRef} collapsable={false} style={styles.imageContainer}>
          <ImageViewer path={image? image: ImageProvider} />
          {pickedEmoji && <EmojiSticker stickerSource={pickedEmoji} imageSize={40} />}
        </View>
        {showAppOptions? (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="restore" label={"Reset"} onPress={onReset}/>
                <CircleButton onPress={onAddSticker}/>
                <IconButton icon="save-alt" label={"Save"} onPress={onSaveImageAsync}/>
              </View>
            </View>
          ):(
            <View style={styles.footerContainer}>
              <Button label={"Choose a photo"} theme="primary" onPress={pickImageAsync}/>
              <Button label={"Use this photo"} onPress={() => setShowAppOptions(true)}/>
            </View>
        )}
        <EmojiPicker isVisible={showEmojiPickerModal} onClose={onEmojiModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onEmojiModalClose}/>
        </EmojiPicker>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#13181eff"
  },  
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
   optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})



