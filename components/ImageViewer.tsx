import { Image } from "expo-image";
import { StyleSheet } from "react-native";

type image_props = {
    path: string,
}

export default function ImageViewer({path} : image_props) {
    return <Image source={path} style={styles.image}/>;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  }
})