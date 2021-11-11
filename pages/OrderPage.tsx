import React from 'react';
import { ItsyContainer, ItsyRow, ItsyColumn } from '@itsy-ui/layout-native';
import { ItsyLabel } from '@itsy-ui/common-native';

const titleSchema = {
  title: 'Order placed successfully.',
  headerSize: 'h2',
  alignText: 'center',
  style: {
    fontSize: 20,
    padding: 10,
  },
};

const Order = (props: any) => {
  return (
    <ItsyContainer style={{ height: '100%', backgroundColor: 'white' }}>
      <ItsyRow>
        <ItsyLabel schema={titleSchema} />
      </ItsyRow>
    </ItsyContainer>
  );
};

export default Order;