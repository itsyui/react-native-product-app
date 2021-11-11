/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { useTransition } from '@itsy-ui/core';
import { ItsyProvider } from '@itsy-ui/app-native';
import { ItsyNotification, ItsyLoadingOverlay } from '@itsy-ui/feedback-native';
import { WidgetsFactory } from '@itsy-ui/core';
import { ItsyTabs } from '@itsy-ui/navigation-native';
import '@itsy-ui/data-native';
import '@itsy-ui/common-native';
import '@itsy-ui/freshui-native-theme';

import './schema';
import './data/datasource';
import './command';

import Home from './pages/HomePage';
import Details from './pages/DetailsPage';
import Cart from './pages/CartPage';
import Order from './pages/OrderPage';

const AppActions = {
  State: {
    NAVIGATE_URL: 'NAVIGATE_URL',
    NAVIGATION_DONE: 'NAVIGATION_DONE',
    LOADED: 'LOADED',
  },
  UpdateProductId: 'UpdateProductId',
};

const initialState = {
  productId: '',
};

function reducer(state: any, action: any) {
  switch (action.type) {
    default:
      return state === undefined
        ? initialState
        : Object.keys(state).length === 0
        ? initialState
        : state;
  }
}

function doNavigateUrl(event: any) {
  return (getState: any, dispatch: any, transition: any) => {
    const { pageUrl, params, url } = event;
    const currentURL = pageUrl ? pageUrl : url;
    Actions[currentURL]({ ...(params && params) });
    transition({
      type: AppActions.State.NAVIGATION_DONE,
    });
  };
}

const stateJSON = {
  initial: 'onLoaded',
  states: {
    onLoaded: {
      on: {
        NAVIGATE_URL: 'navigateUrl',
      },
    },
    navigateUrl: {
      onEntry: ['onNavigateUrl'],
      on: {
        NAVIGATION_DONE: 'onLoaded',
      },
    },
  },
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onNavigateUrl: (event: any) => dispatch(doNavigateUrl(event)),
  };
};

const dataLoader = WidgetsFactory.instance.services['DataLoaderFactory'];
const datasource = dataLoader.getLoader('datasource');

const Title = (props: any) => {
  const id = props.id;
  const data = datasource.getObject(null, id);
  return data && data.name ? data.name : 'Details';
};

const tabNav = {
  tabType: 'tab-nav',
  propertyType: 'Tabs',
  widget: 'TabsWidget',
  widgetType: 'itemsControl',
  items: [
    {
      title: 'Home',
      icon: 'home',
      path: '/home',
      primary: true,
    },
    {
      title: 'Cart',
      icon: 'shopping-cart',
      path: '/cart',
      primary: true,
    },
  ],
};

const PublicRoutes = ({ transition }) => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="home"
          path="home"
          component={Home}
          title="Hi James,"
          initial={true}
          transition={transition}
        />
        <Scene
          key="details"
          path="details"
          component={Details}
          transition={transition}
          renderTitle={Title}
        />
        <Scene key="cart" path="cart" component={Cart} title="Cart" />
        <Scene key="success" path="success" component={Order} title="Order" />
      </Scene>
    </Router>
  );
};

const App = (props: any) => {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        100: '#FFFFFF',
        500: '#fb952f', //orange
      },
    },
    components: {
      Button: {
        variants: {
          rounded: ({ colorScheme }: any) => {
            return {
              bg: `${colorScheme}.500`,
              rounded: 'full',
            };
          },
        },
      },
    },
  });
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const [state, transition] = useTransition(
    'App',
    reducer,
    mapDispatchToProps,
    stateJSON
  );
  return (
    <ItsyProvider>
      <NativeBaseProvider theme={theme}>
        <ItsyLoadingOverlay />
        <ItsyNotification />
        <PublicRoutes transition={transition} />
        <ItsyTabs schema={tabNav} />
      </NativeBaseProvider>
    </ItsyProvider>
  );
};

export default App;
