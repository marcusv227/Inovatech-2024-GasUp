import { StyleSheet } from 'react-native';
import theme from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 35
  },
  mainBox: {
    padding: 10,
    borderRadius: 10,
  },
  innerBox: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginVertical: 5,
    marginBottom: 5,
  },
  infoText: {

    marginLeft: 10,
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

});