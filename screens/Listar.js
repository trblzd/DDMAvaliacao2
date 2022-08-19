import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  MeuEstiloheet,
  Text,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";

const Listar = () => {
  const [loading, setLoading] = useState(true);
  const [kpopidol, setKpopIdol] = useState([]);

  useEffect(() => {
    const subscriber = firestore
      .collection("User")
      .doc(auth.currentUser.uid)
      .collection("KpopIdol")
      .onSnapshot((querySnapshot) => {
        const kpopidol = [];
        querySnapshot.forEach((documentSnapshot) => {
          kpopidol.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.nomeidol,
          });
        });
        setKpopIdol(kpopidol);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ nomeidol }) => (
    <View style={MeuEstilo.item}>
      <Text style={MeuEstilo.title}>{nomeidol}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item nomeidol={item.nomeidol} />;

  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList
        data={kpopidol}
        renderItem={renderItem}
        keyExtractor={(item) => item.nomeidol}
      />
    </SafeAreaView>
  );
};

export default Listar;
