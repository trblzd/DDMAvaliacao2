import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  MeuEstiloheet,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";

const ListaComFiltro = () => {
  const [search, setSearch] = useState("");
  const [dadosFiltrados, setdadosFiltrados] = useState([]);
  const [kpopidol, setKpopIdol] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setdadosFiltrados(kpopidol);
        setKpopIdol(kpopidol);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = kpopidol.filter(function (item) {
        if (item.nomeidol) {
          const itemData = item.nomeidol.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setdadosFiltrados(newData);
      setSearch(text);
    } else {
      setdadosFiltrados(kpopidol);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={MeuEstilo.item} onPress={() => getItem(item)}>
        {/* {item.id}
        {' - '} */}
        {item.nomeidol.toUpperCase()}
      </Text>
    );
  };

  const getItem = (item) => {
    alert("Nome : " + item.nomeidol);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={MeuEstilo.containerlistarcomfiltro}>
        <TextInput
          style={MeuEstilo.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Procure Aqui"
        />
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.nomeidol}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListaComFiltro;
