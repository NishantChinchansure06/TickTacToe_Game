/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const [winner, setWinner] = useState('');
  const [isCircle, setIsCircle] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    new Array(9).fill('null', 0, 9),
  );

  useEffect(() => {
    if (winner) {
      Alert.alert('Congratulatiuons !!!', winner, [
        {
          text: 'Restrt',
          onPress: () => restartGame(),
          style: 'cancel',
        },
      ]);
    }
  }, [winner]);

  const restartGame = () => {
    setIsCircle(false);
    setWinner('');
    setCurrentStatus(new Array(9).fill('null', 0, 9));
  };

  const getWinner = () => {
    if (
      currentStatus[0] !== 'null' &&
      currentStatus[0] === currentStatus[1] &&
      currentStatus[0] === currentStatus[2]
    ) {
      setWinner(`${currentStatus[0].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[0] !== 'null' &&
      currentStatus[0] === currentStatus[3] &&
      currentStatus[0] === currentStatus[6]
    ) {
      setWinner(`${currentStatus[0].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[0] !== 'null' &&
      currentStatus[0] === currentStatus[4] &&
      currentStatus[0] === currentStatus[8]
    ) {
      setWinner(`${currentStatus[0].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[1] !== 'null' &&
      currentStatus[1] === currentStatus[4] &&
      currentStatus[1] === currentStatus[7]
    ) {
      setWinner(`${currentStatus[1].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[2] !== 'null' &&
      currentStatus[2] === currentStatus[5] &&
      currentStatus[2] === currentStatus[8]
    ) {
      setWinner(`${currentStatus[2].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[2] !== 'null' &&
      currentStatus[2] === currentStatus[4] &&
      currentStatus[2] === currentStatus[6]
    ) {
      setWinner(`${currentStatus[2].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[3] !== 'null' &&
      currentStatus[3] === currentStatus[4] &&
      currentStatus[3] === currentStatus[5]
    ) {
      setWinner(`${currentStatus[3].toUpperCase()} is the Winner`);
    } else if (
      currentStatus[6] !== 'null' &&
      currentStatus[6] === currentStatus[7] &&
      currentStatus[6] === currentStatus[8]
    ) {
      setWinner(`${currentStatus[6].toUpperCase()} is the Winner`);
    }
  };

  const RenderCard = ({index}) => {
    console.log('asdfds', index, winner);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          onCardClick(index);
        }}
        style={{
          width: windowWidth * 0.3,
          height: windowHeight * 0.15,
          margin: 5,
          backgroundColor: 'pink',
          alignItems: 'center',
          justifyContent: 'center',
         
        }}>
        <Icon
          name={`${
            currentStatus[index] === 'null'
              ? 'pencil'
              : currentStatus[index] === 'circle'
              ? 'circle-o'
              : 'close'
          }`}
          size={40}
          color="black"
        />
      </TouchableOpacity>
    );
  };

  const checkAllPostionsFilled = () => {
    if (!currentStatus?.includes('null')) {
      Alert.alert(`It's a Tie !!!`, '', [
        {
          text: 'Restrt',
          onPress: () => restartGame(),
          style: 'cancel',
        },
      ]);
    }
  };

  const onCardClick = index => {
    if (winner) {
      Snackbar.show({
        text: winner.toUpperCase(),
        textColor: 'white',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Restart',
          textColor: 'green',
          onPress: () => {
            restartGame();
          },
        },
      });
    }

    if (currentStatus[index] === 'null') {
      currentStatus[index] = isCircle ? 'circle' : 'cross';
      setIsCircle(!isCircle);
    } else {
      Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: '#fff',
        textColor: '#000',
      });
    }
    getWinner();
    checkAllPostionsFilled();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'pink',
          width: '100%',
          height: '5%',
          borderRadius: 10,
        }}>
        <Text>{`${isCircle ? 'Circle' : 'Cross'} to play`}</Text>
      </View>
      <View>
        <FlatList
          numColumns={3}
          data={currentStatus}
          renderItem={({item, index}) => {
            return <RenderCard key={index} index={index} />;
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={restartGame}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'pink',
          width: '100%',
          height: '5%',
          borderRadius: 10,
        }}>
        <Text>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
