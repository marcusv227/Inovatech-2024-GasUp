import { StyleSheet, } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'space-between', 
    },
    formContainer: {
      flex: 1,
      justifyContent: 'center', 
      gap: 16, 
    },
    input: {
      gap: 4
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold', 
    },
    title: {
      fontSize: 24,           
      fontWeight: 'bold',      
        
    },
    text: {
      fontSize:14,
      textAlign: 'right',
      alignSelf: 'flex-end',
      color: '#2563eb'
    },
    createButton: {
      justifyContent: 'flex-end', 
      gap: 8, 
    },
    logo: {
      justifyContent: 'center',
      alignItems: 'center', 
      flexDirection: 'row',
    },
    tipoLogin: {
      marginLeft: -25,
      marginBottom: 0,
    },
  
  });