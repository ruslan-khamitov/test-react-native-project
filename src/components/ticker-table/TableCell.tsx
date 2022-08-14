import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CellType, ROW_HEIGHT} from './constants';

export interface TableCellProps {
  value: string;
  type: CellType;
  width: number;
  isAsc?: boolean;
  isDesc?: boolean;
}

function TableCell(props: TableCellProps) {
  const {value, type, width, isAsc, isDesc} = props;

  const cellValue = useMemo(() => {
    if (type !== CellType.Number) {
      return value;
    }
    return parseFloat(value).toFixed(3);
  }, [value, type]);

  const isString = type === CellType.String;
  const justifyContent = isString ? 'flex-start' : 'flex-end';
  const textAlign = isString ? 'left' : 'right';
  const fontWeight = isString ? 'bold' : 'normal';
  const showIcon = isAsc != null;

  const color = isAsc ? '#4CAF50' : isDesc ? '#f44336' : 'transparent';

  return (
    <View
      style={{
        ...tableCellStyles.cell,
        justifyContent,
        width,
      }}>
      {showIcon ? (
        <Icon
          name={isAsc ? 'trending-up-outline' : 'trending-down-outline'}
          size={14}
          color={color}
        />
      ) : null}
      <Text
        style={{
          textAlign,
          fontWeight,
          ...tableCellStyles.cellText,
        }}>
        {cellValue}
      </Text>
    </View>
  );
}

const tableCellStyles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  cellText: {
    fontSize: 12,
    paddingLeft: 5,
  },
});

export default TableCell;
