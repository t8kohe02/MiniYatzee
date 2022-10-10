import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 30
  },
  status: {
    fontSize: 15,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  bonus: {
    fontSize: 13,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    marginTop: 30,
    backgroundColor: 'lightgreen',
    flexDirection: 'row'
  },
  footer: {
    marginTop: 30,
    backgroundColor: 'lightgreen',
    flexDirection: 'row'
  },
  title: {
    color: 'darkgreen',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: 'darkgreen',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    alignContent: 'center',
    flex: 1,
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "green",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  column: {
    alignItems: 'center',
  },
  grid: {
    alignItems: 'center'
  }
})