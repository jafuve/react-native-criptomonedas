
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Image, View, ScrollView, ActivityIndicator
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';


const App = () => {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptoMoneda, guardarCriptoMoneda ] = useState('');

  const [ consultarAPI, guardarConsultarAPI ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  const [ cargando, guardarCargando ] = useState(false);

  useEffect( () => {

    if( consultarAPI ){

      // CONSULTAR API PARA OBTENER COTIZACION
      const cotizarMoneda = async () =>{
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptoMoneda }&tsyms=${ moneda }`;

        const resultado = await axios.get( url );
        
        guardarCargando(true);

        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          guardarConsultarAPI(false);  
          guardarCargando(false);
        }, 3000);

      };

      cotizarMoneda();
      
    }

  }, [consultarAPI]);

  const componente = cargando ? <ActivityIndicator size='large' color='#5e49e2' /> : <Cotizacion resultado={ resultado }/>;

  return (
    <ScrollView>
      <Header />

      <Image 
        style={ styles.image }
        source={ require('./assets/img/cryptomonedas.png') }
      />

      <View style={ styles.content }>
        <Formulario 
          moneda={ moneda }
          criptomoneda ={ criptoMoneda }
          guardarMoneda={ guardarMoneda }
          guardarCriptoMoneda={ guardarCriptoMoneda }
          guardarConsultarAPI={ guardarConsultarAPI }
        />

        
      </View>

      <View style={{marginTop: 40}}>
      { componente }
      </View>
      

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },

  content: {
    marginHorizontal: '2.5%'
  }

});

export default App;
