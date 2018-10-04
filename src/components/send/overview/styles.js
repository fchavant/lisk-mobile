import { StyleSheet } from 'react-native';
import { boxes, colors, fonts } from '../../../constants/styleGuide';

const styles = {
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: boxes.boxPadding,
    marginLeft: boxes.boxPadding,
    paddingTop: 36,
    paddingBottom: 35,
  },
  verticalAligner: {
    padding: 20,
  },
  centerAlign: {
    textAlign: 'center',
  },
  leftAlign: {
    textAlign: 'left',
  },
  black: {
    color: colors.black,
  },
  heading: {
    fontSize: 24,
    paddingBottom: 80,
  },
  row: {
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    paddingBottom: 10,
  },
  amount: {
    paddingBottom: 15,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  button: {
    borderRadius: 0,
    marginBottom: 0,
    marginTop: 20,
  },
  label: {
    marginTop: 15,
    marginBottom: 7,

    color: colors.grayScale1,
    fontFamily: fonts.family.contextLight,
    fontSize: fonts.size.input,
    fontWeight: '400',
  },
  subtitle: {
    marginTop: 7,
    color: colors.grayScale2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    paddingBottom: 0,
    marginRight: 20,
  },
  link: {
    color: colors.primary5,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    paddingRight: 20,
    opacity: 0,
  },
  error: {
    color: colors.grayScale1,
    fontFamily: fonts.family.context,
    fontSize: fonts.size.input,
  },
  errorIcon: {
    color: colors.action1,
    marginRight: 5,
  },
  visible: {
    opacity: 1,
  },
};

export default StyleSheet.create(styles);