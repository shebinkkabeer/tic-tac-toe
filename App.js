import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {
  H1,
  Header,
  Title,
  Text,
  Container,
  Content,
  Button,
  Body,
  Card,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [drawMessage, setDrawMessage] = useState('');

  const changeItem = index => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: 'black',
        textColor: '#FFF',
      });
    }

    if (itemArray[index] === 'empty') {
      itemArray[index] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Postion already occupied',
        textColor: '#FFF',
        backgroundColor: 'red',
      });
    }

    isWinner();
  };

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    itemArray.fill('empty', 0, 9);
  };

  const isWinner = () => {
    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2]
    ) {
      setWinMessage(`${itemArray[0]} wins`);
    }

    if (
      itemArray[3] !== 'empty' &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} wins`);
    }

    if (
      itemArray[6] !== 'empty' &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} wins`);
    }

    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} wins`);
    }

    if (
      itemArray[1] !== 'empty' &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} wins`);
    }

    if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} wins`);
    }

    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} wins`);
    }

    if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} wins`);
    }

    if (itemArray.every(val => val !== 'empty')) {
      setDrawMessage('Game Draw');
    }
  };

  return (
    <Container style={{borderColor: '333945', padding: 5}}>
      <Header>
        <Body style={{alignItems: 'center'}}>
          <Title>Tic-Tac-Toe</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>
          {itemArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => changeItem(index)}>
              <Card style={styles.card}>
                <Icons name={itemArray[index]} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>
        {winMessage ? (
          <View>
            <H1 style={styles.message}> {winMessage}</H1>
            <Button onPress={reloadGame} primary block rounded>
              <Text>Reload Game</Text>
            </Button>
          </View>
        ) : drawMessage ? (
          <View>
            <H1 style={styles.message}>Game Draw </H1>
            <Button onPress={reloadGame} primary block rounded>
              <Text>Reload Game</Text>
            </Button>
          </View>
        ) : (
          <H1 style={styles.message}>{isCross ? 'Cross' : 'Circle'} turns </H1>
        )}
      </Content>
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  box: {
    width: '33%',
    marginBottom: 6,
  },
  card: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  message: {
    textTransform: 'uppercase',
    textAlign: 'center',
    //color: '#FFF',
    marginTop: 20,
    paddingVertical: 10,
    borderColor: '#4652B3',
  },
});
