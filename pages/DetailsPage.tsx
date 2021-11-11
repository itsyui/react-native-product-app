import React, { useEffect, useState } from 'react';
import { ItsyButton } from '@itsy-ui/common-native';
import { ItsyContainer, ItsyRow } from '@itsy-ui/layout-native';
import { WidgetsFactory } from '@itsy-ui/core';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';

const dataLoader = WidgetsFactory.instance.services['DataLoaderFactory'];

const DetailPage = (props: any) => {
  const { id } = props;
  const [item, setItem] = useState(null);
  const datasource = dataLoader.getLoader('datasource');

  useEffect(() => {
    const data = datasource.getObject(null, id);
    setItem(data);
  }, []);

  const commandSchema = {
    title: 'Add to cart',
    iconPosition: 'startIcon',
    iconName: 'add-shopping-cart',
    commandName: 'add_cart',
    alignText: 'center',
    onContext: () => {
      return id;
    },
  };

  return (
    item && (
      <ItsyContainer
        style={{ padding: 3, backgroundColor: 'white', height: '100%' }}
      >
        <ScrollView>
          <ItsyRow style={{}}>
            <Image
              style={styles.imageAlign}
              resizeMode="cover"
              source={{ uri: `${item.imageUrl}` }}
            />
          </ItsyRow>
          <ItsyRow hAlignment="right">
            <Text style={{ fontSize: 20 }}>{` ₹ ${item.price}`}</Text>
          </ItsyRow>
          <ItsyRow>
            <Text style={styles.textAlign}>{item.description}</Text>
          </ItsyRow>

          <ItsyRow hAlignment="right">
            <ItsyButton schema={commandSchema} />
          </ItsyRow>
        </ScrollView>
      </ItsyContainer>
    )
  );
};

const styles = StyleSheet.create({
  buttonBottom: {
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textAlign: {
    margin: 10,
    textAlign: 'justify',
  },
  imageAlign: {
    justifyContent: 'center',
    width: '100%',
    height: 300,
  },
  rowAlign: {
    justifyContent: 'flex-end',
  },
});

export default DetailPage;
