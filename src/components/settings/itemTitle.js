import React, { Fragment } from 'react';
import { View, TouchableHighlight, Platform } from 'react-native';
import { P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
import {
  bioMetricAuthentication,
} from '../../utilities/passphrase';
import withTheme from '../withTheme';
import getStyles from './styles';

/**
 * A single setting item with icon and title
 *
 * @param {Object} data
 * @param {String} data.icon - The name of the icon in our icon font asset
 * @param {Number} data.iconSize - The size of the icon in pixels
 * @param {String} data.title - The title of the setting item
 * @param {String} data.target - The name of the route to navigate to.
 *  The route must be defined in the router
 * @param {Object} data.navigation - The Navigation object. if the target props is passed,
 *  we need this to ba able to navigate.
 */
class ItemTitle extends React.Component {
  authenticate = (cb) => {
    bioMetricAuthentication({
      successCallback: () => {
        this.props.hideDialog();
        cb();
      },
      errorCallback: () => {},
      androidError: error => this.props.setError(error),
    });

    if (Platform.OS === 'android') {
      this.props.navigation.setParams({
        headerVisible: false,
      });
      this.props.showDialog();
    }
  }

  render() {
    const {
      styles, icon, iconSize, title, target, navigation, targetStateLabel, authenticate,
    } = this.props;

    const props = {
      style: styles.itemTitle,
      underlayColor: 'transparent',
    };
    if (target) {
      props.onPress = () => {
        if (authenticate) {
          this.authenticate(() => {
            navigation.navigate({
              routeName: target,
              params: { title },
            });
          });
        } else {
          navigation.navigate({
            routeName: target,
            params: { title },
          });
        }
      };
    }

    return (<TouchableHighlight {...props}>
      <Fragment>
        <Icon name={icon} size={iconSize} color={colors.light.grayScale6} style={styles.itemIcon} />
        <View style={styles.itemName}><P style={styles.itemNameText}>{title}</P></View>
        <View style={styles.itemArrow}>
          {
            target ?
            <Fragment>
              { targetStateLabel }
              <Icon name='forward' size={21} color={colors.light.black} />
            </Fragment> : <Fragment>{ targetStateLabel }</Fragment>
          }
        </View>
      </Fragment>
    </TouchableHighlight>);
  }
}

export default withTheme(ItemTitle, getStyles());
