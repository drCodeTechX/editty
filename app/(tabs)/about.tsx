import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AboutScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.my_text}>AboutScreen</Text>
      </View> 
    </>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  my_text : {
    fontWeight: "bold",
    fontSize: 30,
    color : "#fff"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#13181eff"
  },
  link: {
    fontSize: 15,
    paddingTop: 10,
    color: "#0ed8c1ff"
  }
})