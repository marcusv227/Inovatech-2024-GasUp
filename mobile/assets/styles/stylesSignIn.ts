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
      gap: 10, 
    },
    input: {
      gap: 8
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold', 
    },
    title: {
      
      fontSize: 24,           
      fontWeight: 'bold',      
      textAlign: 'center',   
  
    },
    text: {
      fontSize:14,
      textAlign: 'right',
      alignSelf: 'flex-end',
      color: '#2563eb'
    },
    createButton: {
      flexDirection: 'row',  
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: 8,
      marginTop: 8
     
    },
    button: {
      flex: 1,
      borderWidth: 8,
      borderRadius: 8
    },
    icon: {
      color: "#"
    },
    logo: {
        alignSelf: 'center',
    }
    
  });
  