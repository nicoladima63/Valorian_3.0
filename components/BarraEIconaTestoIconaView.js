import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assicurati di avere questa libreria installata

const BarraEIconaTestoIconaView = ({ 
  item,
  theme,
  isToday,
  updateBisogno,
  selectBisogno
}) => {
  return (
    <View style={[theme.grid, theme.mb10, { backgroundColor: theme.colors.slate4, flexDirection: 'row', alignItems: 'center' }]}>
      <View style={[styles.barra, { backgroundColor: item.colore }]} />
      <View style={styles.content}>
        <Pressable onPress={() => updateBisogno(item)} style={styles.leftIconContainer}>
          <Icon 
            name="check" 
            size={18} 
            color={item.soddisfattoil && isToday(new Date(item.soddisfattoil)) ? theme.colors.green10 : theme.colors.slate4} 
            style={theme.mrl0} 
          />
        </Pressable>
        <Pressable onPress={() => updateBisogno(item)} style={styles.textContainer}>
          <Text style={[theme.text, theme.text14]}>{item.nome}</Text>
        </Pressable>
        <Pressable onPress={() => selectBisogno(item)} style={styles.rightIconContainer}>
          <Icon 
            name="angle-right" 
            size={24} 
            color={theme.colors.slate10} 
            style={theme.mr20} 
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barra: {
    width: 10,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  leftIconContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 3,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rightIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default BarraEIconaTestoIconaView;