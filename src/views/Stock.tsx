import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ROW_HEIGHT} from '../components/ticker-table/constants';
import TableHeader from '../components/ticker-table/TableHeader';
import TableRow from '../components/ticker-table/TableRow';
import {HandledTicker} from '../store/ticker';
import TickerStore from '../store/ticker-store';

function renderTableRow({item}: {item: HandledTicker}) {
  return <TableRow item={item} />;
}

function Stock() {
  const [store] = useState(() => new TickerStore());

  useEffect(() => {
    return function cleanup() {
      store.clearInterval();
    };
  }, [store]);

  const data = store.tickersArray;

  return (
    <View style={StyleSheet.absoluteFill}>
      <FlatList<HandledTicker>
        ListHeaderComponent={() => <TableHeader store={store} />}
        data={data}
        renderItem={renderTableRow}
        keyExtractor={item => `${item.id}`}
        refreshing={store.isLoading}
        onRefresh={() => store.fetch()}
        stickyHeaderIndices={[0]}
        getItemLayout={(_, index) => ({
          length: ROW_HEIGHT,
          offset: ROW_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

export default observer(Stock);
