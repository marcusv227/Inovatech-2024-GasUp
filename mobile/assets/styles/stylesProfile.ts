import { StyleSheet } from 'react-native';
import theme from '../../assets/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    marginTop: 50,
    flexDirection: 'column',  
    alignItems: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    width: '80%',
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 130,
    alignItems: 'center',
    gap: 10,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  avatar: {
    marginBottom: 30,
    alignItems: 'center',
  },
  profileContainer: {
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    padding: 24,
    alignItems: 'center',
  },
  infoCard: {
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  divider: {
    marginVertical: 3,
  },
  menu: {
    top: 100,
    backgroundColor: theme.colors.background,
  },
  intro: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 130,
  },
});
