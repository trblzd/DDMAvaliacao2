import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import MeuEstilo from "../meuestilo";
import { auth, firestore } from "../firebase";

const Escrever = () => {
  const [nomeidol, setNomeidol] = useState("");
  const [generoidol, setGeneroidol] = useState("");
  const [idadeidol, setIdadeidol] = useState("");

  const ref = firestore
    .collection("User")
    .doc(auth.currentUser.uid)
    .collection("KpopIdol")
    .doc();
  const enviarDados = () => {
    ref
      .set({
        idadeidol: idadeidol,
        generoidol: generoidol,
        nomeidol: nomeidol,
        id: ref.id,
      })
      .then(() => {
        alert("Kpop Idol " + nomeidol + " Adicionado com Sucesso!");
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const limparFormulario = () => {};

  return (
    <KeyboardAvoidingView style={MeuEstilo.containerlistar} behavior="padding">
      <View style={MeuEstilo.inputcontainerlistar}>
        <TextInput
          placeholder="Nome"
          value={nomeidol}
          onChangeText={(text) => setNomeidol(text)}
          style={MeuEstilo.input}
        />
        <TextInput
          placeholder="Idade"
          value={idadeidol}
          onChangeText={(text) => setIdadeidol(text)}
          style={MeuEstilo.input}
        />
        <TextInput
          placeholder="Genero"
          value={generoidol}
          onChangeText={(text) => setGeneroidol(text)}
          style={MeuEstilo.input}
        />
      </View>

      <View style={MeuEstilo.buttoncontainerlistar}>
        <TouchableOpacity onPress={enviarDados} style={MeuEstilo.button}>
          <Text style={MeuEstilo.buttonText}>Enviar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={limparFormulario}
          style={[MeuEstilo.button, MeuEstilo.buttonOutline]}
        >
          <Text style={MeuEstilo.buttonOutlineText}>Limpar Formulario</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={MeuEstilo.button}>
          <Text style={MeuEstilo.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Escrever;
