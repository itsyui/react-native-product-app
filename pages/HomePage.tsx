import React from 'react';
import { StateManagerContext } from '@itsy-ui/core';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { ItsyProvider } from '@itsy-ui/app-native';
import { ItsySearch, ItsyGrid } from '@itsy-ui/data-native';
import { ItsyRow } from '@itsy-ui/layout-native';
import { ItsyLabel } from '@itsy-ui/common-native';

import '../handler/navigationHandler';

const descriptionSchema = {
  title: 'What you like to order today?',
  style: { fontSize: 22, padding: 10 },
};

const gridSchema = {
  controlID: 'food_details',
  gridSchemaId: 'product',
  gridViewType: 'card',
  dataSource: 'datasource',
  rowSelectionMode: 1,
  typeId: 'product',
  primaryColumn: 'id',
  gridViewAttributes: {
    attributes: {
      cardType: 'media',
      primary: 'name',
      media: 'imageUrl',
    },
  },
};
const searchSchema = {
  title: 'Search',
  typeId: 'product',
  gridSchemaId: 'product',
  placeholder: 'Search',
};

const Home = () => {
  return (
    <ItsyProvider>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <ScrollView>
          <ItsyRow>
            <ItsyLabel schema={descriptionSchema} />
          </ItsyRow>
          <ItsyRow style={styles.searchAlign}>
            <StateManagerContext.Provider
              key="grid-context"
              value={{ contextPath: { id: 'product_search' } }}
            >
              <ItsySearch style={{ width: '100%' }} schema={searchSchema} />
            </StateManagerContext.Provider>
          </ItsyRow>
          <ItsyRow>
            <StateManagerContext.Provider
              key="grid-context"
              value={{ contextPath: { id: 'food_details' } }}
            >
              <ItsyGrid className="home-page" schema={gridSchema} />
            </StateManagerContext.Provider>
          </ItsyRow>
        </ScrollView>
      </SafeAreaView>
    </ItsyProvider>
  );
};

const styles = StyleSheet.create({
  searchAlign: {
    paddingHorizontal: 6,
  },
});

export default Home;