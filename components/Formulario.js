import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableHighlight, Alert
} from 'react-native';

import {Picker} from '@react-native-community/picker';

import axios from 'axios';

const Formulario = ({ moneda, criptomoneda, guardarMoneda, guardarCriptoMoneda, guardarConsultarAPI }) => {

    
    const [ criptomonedas, guardarCriptoMonedas ] = useState([]);

    useEffect( () => {

        const fetchAPI = async () => {

            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get( url );
            
            guardarCriptoMonedas( result.data.Data );

            

        };

        fetchAPI();

        

    }, []);

    const obtenerMoneda = currency => {
        guardarMoneda( currency );
    };

    const obtenerCriptomoneda = cripto => {
        guardarCriptoMoneda( cripto );
    };

    const cotizarPrecio = () => {
        
        if( moneda.trim() === '' || criptomoneda.trim() === '' ){
            mostrarAlerta();
            return;
        }

        // IS VALID
        guardarConsultarAPI(true);

    };

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                { text: 'OK'}
            ]
        )
    };

    return (

        <View>
            <Text style={ styles.label }>Moneda</Text>

            <Picker
                selectedValue={ moneda }
                onValueChange={ currency => obtenerMoneda(currency) }
                itemStyle={{ height: 120 }}
            >
              
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar Estadounidense" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
                <Picker.Item label="Quetzal Guatemalteco" value="GTQ" />
                
            </Picker>

            <Text style={ styles.label }>Criptomoneda</Text>

            <Picker
                selectedValue={ criptomoneda }
                onValueChange={ cripto => obtenerCriptomoneda(cripto) }
            >
              
                <Picker.Item label="- Seleccione -" value="" />
                {
                    ( criptomonedas ) ?

                    
                    criptomonedas.map( cripto => (
                        <Picker.Item key={ cripto.CoinInfo.Id } label={ cripto.CoinInfo.FullName } value={ cripto.CoinInfo.Name } />
                    ) )

                    : <Picker.Item label="- Seleccione -" value="" />
                }
                
            </Picker>

            <TouchableHighlight
                style={ styles.btnCotizar }
                onPress = { () => cotizarPrecio() }
            >
                <Text style={ styles.textCotizar }>Cotizar</Text>
            </TouchableHighlight>

        </View>
    );

};

const styles = StyleSheet.create({

    label: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        marginVertical: 20,
        textTransform: 'uppercase'
    },

    btnCotizar: {
        backgroundColor: '#5e49e2',
        padding: 10,
        marginTop: 20
    },

    textCotizar:{
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }

});

export default Formulario;
