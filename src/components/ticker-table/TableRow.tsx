import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {HandledTicker} from '../../store/ticker';
import {CellType, ROW_HEIGHT} from './constants';
import TableCell from './TableCell';

export interface TableRowProps {
  item: HandledTicker;
}

function TableRow(props: TableRowProps) {
  const {item} = props;

  const {width: windowWidth} = useWindowDimensions();
  const width = windowWidth / 4;

  return (
    <View style={tableRowStyles.tableRow}>
      <TableCell
        isAsc={item.isAsc}
        isDesc={item.isDesc}
        width={width}
        type={CellType.String}
        value={item.ticker}
      />
      <TableCell width={width} type={CellType.Number} value={item.last} />
      <TableCell width={width} type={CellType.Number} value={item.highestBid} />
      <TableCell
        width={width}
        type={CellType.Number}
        value={item.percentChange}
      />
    </View>
  );
}

const tableRowStyles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
  },
});

export default TableRow;
