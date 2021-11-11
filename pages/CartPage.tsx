import React from 'react';
import { ItsyGrid } from '@itsy-ui/data-native';
import { ItsyContainer, ItsyRow } from '@itsy-ui/layout-native';
import { ItsyButton } from '@itsy-ui/common-native';
import { ScrollView } from 'react-native';

const gridSchema = {
  title: 'List',
  propertyType: 'GridList',
  gridSchemaId: 'cart',
  controlID: '',
  widget: 'GridWidget',
  'ui:widget': 'grid',
  gridViewType: 'list',
  widgetType: 'bound',
  dataSource: 'datasource',
  rowSelectionMode: 1,
  typeId: 'cart',
  primaryColumn: 'id',
  gridViewAttributes: {
    attributes: {
      listType: 'simpleVertical',
      primary: 'name',
      secondary: 'price',
      avatar: 'imageUrl',
      incrementalAdd: true,
    },
  },
  emptyRecordsMessage: 'No items in cart',
};

const commandSchema = {
  title: 'Checkout',
  iconPosition: 'startIcon',
  iconName: 'shopping-cart',
  commandName: 'checkout',
  alignText: 'center',
};

const Cart = (props: any) => {
  return (
    <ItsyContainer style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <ItsyRow padding={5}>
          <ItsyGrid schema={gridSchema} />
        </ItsyRow>
        <ItsyRow hAlignment="center" padding={5}>
          <ItsyButton schema={commandSchema} style={{ width: '100%' }} />
        </ItsyRow>
      </ScrollView>
    </ItsyContainer>
  );
};

export default Cart;