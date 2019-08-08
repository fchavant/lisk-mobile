import { Platform, Dimensions, NativeModules } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Returns a simple string defining the device type
 *
 * @returns {String} - iOSx for iPhoneX, iOS for the rest of iPhones
 *  and android for all the android phones
 */

/**
 * @returns {Number} - The with of the screen
 */
export const deviceWidth = () => width;

/**
 * @returns {Number} - The height of the screen
 */
export const deviceHeight = () => height;

/**
 * @returns {Number} - The height of the TabBarBottom
 */
// https://github.com/react-navigation/react-navigation/blob/1.x/src/views/TabView/TabBarBottom.js#L296-L297
export const tabBarHeight = () => 49;

export const SCREEN_HEIGHTS = {
  SM: 640, // 640
  MD: 960, // 960
  LG: 1200, // Rest
};

export const deviceLocale = () => {
  if (Platform.OS === 'ios') {
    return NativeModules.SettingsManager.settings.AppleLocale.substr(0, 2);
  }
  return NativeModules.I18nManager.localeIdentifier.substr(0, 2);
};
