import {observer} from 'mobx-react-lite';
import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import TickerStore from '../../store/ticker-store';
import {ROW_HEIGHT} from './constants';

interface TableHeaderProps {
  store: TickerStore;
}

function TableHeader({store}: TableHeaderProps) {
  const isError = store?.isError;

  const {width: windowWidth} = useWindowDimensions();
  const widthStyle = {width: (windowWidth - 20) / 4};
  const numberColumnStyling = [
    tableHeaderStyles.columnHeading,
    tableHeaderStyles.numberColumnHeading,
    widthStyle,
  ];

  return (
    <View>
      <View style={tableHeaderStyles.tableHeader}>
        <Text
          style={[
            tableHeaderStyles.columnHeading,
            tableHeaderStyles.textColumnHeading,
            widthStyle,
          ]}>
          Тикер
        </Text>
        <Text style={numberColumnStyling}>Послед. значение</Text>
        <Text style={numberColumnStyling}>Высш</Text>
        <Text style={numberColumnStyling}>Изменение</Text>
      </View>
      {isError ? (
        <View style={tableHeaderStyles.errorRow}>
          <Text style={tableHeaderStyles.errorText}>Ошибка</Text>
        </View>
      ) : null}
    </View>
  );
}

const tableHeaderStyles = StyleSheet.create({
  columnHeading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textColumnHeading: {
    textAlign: 'left',
  },
  numberColumnHeading: {
    textAlign: 'right',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#00897B',
  },
  errorRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e53935',
    height: ROW_HEIGHT,
  },
  errorText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default observer(TableHeader);
