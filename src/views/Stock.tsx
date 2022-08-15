import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ROW_HEIGHT} from '../components/ticker-table/constants';
import TableHeader from '../components/ticker-table/TableHeader';
import TableRow from '../components/ticker-table/TableRow';
import {HandledTicker} from '../store/ticker';
import TickerStore from '../store/ticker-store';

function renderTableRow({item}: {item: HandledTicker}) {
  return <TableRow item={item} />;
}

function useAnimatedLoadingIndicator(isLoading: boolean) {
  const isLoadingAnimated = useSharedValue(isLoading ? 1 : 0);
  useEffect(() => {
    isLoadingAnimated.value = withTiming(isLoading ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isLoading, isLoadingAnimated]);
  const loadingIndicatorAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(isLoadingAnimated.value, [0, 1], [0, 50]);
    const bottom = interpolate(isLoadingAnimated.value, [0, 1], [0, 10]);
    return {height, bottom};
  }, [isLoadingAnimated]);

  return loadingIndicatorAnimatedStyle;
}

function Stock() {
  const [store] = useState(() => new TickerStore());

  useEffect(() => {
    return function cleanup() {
      store.clearInterval();
    };
  }, [store]);

  const data = store.tickersArray;
  const isLoading = store.isLoading;

  const loadingIndicatorAnimatedStyle = useAnimatedLoadingIndicator(isLoading);

  return (
    <View style={StyleSheet.absoluteFill}>
      <FlatList<HandledTicker>
        ListHeaderComponent={() => <TableHeader store={store} />}
        data={data}
        renderItem={renderTableRow}
        keyExtractor={item => `${item.id}`}
        stickyHeaderIndices={[0]}
        getItemLayout={(_, index) => ({
          length: ROW_HEIGHT,
          offset: ROW_HEIGHT * index,
          index,
        })}
      />
      <Animated.View
        style={[
          styles.loadingIndicator,
          styles.loadingIndicatorShadow,
          loadingIndicatorAnimatedStyle,
        ]}>
        {isLoading ? (
          <>
            <Text>Обновление</Text>
            <ActivityIndicator />
          </>
        ) : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    left: 10,
    right: 10,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loadingIndicatorShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default observer(Stock);
