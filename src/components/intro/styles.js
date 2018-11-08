import { StyleSheet } from 'react-native';
import { colors } from '../../constants/styleGuide';
import { deviceHeight } from '../../utilities/device';

const styles = {
  wrapper: {
    backgroundColor: colors.light.white,
    height: '100%',
  },
  splashContainer: {
    backgroundColor: colors.light.white,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashBg: {
    backgroundColor: colors.light.actionBlue,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
  splashTopButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 375,
    height: 97,
    zIndex: 3,
  },
  splashFigure: {
    height: 60,
    width: 153,
    left: '50%',
    marginLeft: -76,
    position: 'absolute',
  },
  splashStatic: {
    zIndex: 2,
    top: (deviceHeight() / 2) - 80,
  },
  splashAnimating: {
    zIndex: 1,
    top: '50%',
    marginTop: -30,
  },
  splashImage: {
    height: 60,
    width: 153,
  },
  splashDescription: {
    height: 60,
    width: '80%',
    left: '10%',
    top: (deviceHeight() / 2) + 20,
    position: 'absolute',
    textAlign: 'center',
  },
  splashDescriptionP: {
    color: colors.light.gray2,
    textAlign: 'center',
  },
  headingContainer: {
    backgroundColor: colors.light.white,
    position: 'absolute',
    left: 0,
    top: 20,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  headingTopBar: {
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  headingSkipButton: {
    lineHeight: 30,
    height: 30,
    width: 60,
    borderWidth: 0,
    textAlign: 'right',
  },
  descriptionsWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'flex-start',
    zIndex: 3,
  },
  headingDescription: {
    padding: 0,
  },
  headingDescriptionCntr: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  headingDescriptionItem: {
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  itemWrapper: {
    height: 175,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centralized: {
    paddingBottom: 8,
    paddingTop: 8,
    width: '100%',
    textAlign: 'center',
  },
  headingPagination: {
    top: 165,
    position: 'absolute',
    height: 13,
  },
  illustrations: {
    width: 320,
    height: 523,
    position: 'absolute',
    top: 260,
    left: '50%',
    marginLeft: -160,
  },
  frame: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  screens: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  deviceFrame: {
    width: '100%',
    height: '100%',
  },
  activityIllustration: {
    width: 367,
    height: 429,
    top: 67,
    marginLeft: -23,
  },
  transferIllustration: {
    width: 282,
    height: 321,
    top: 120,
    marginLeft: 19,
  },
  bioAuth: {
    height: deviceHeight() - 300,
  },
  faceIdIllustration: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -170,
    marginTop: -190,
    width: 250,
    height: 250,
  },
  touchIdIllustration: {
    position: 'absolute',
    bottom: '50%',
    right: '50%',
    marginRight: -170,
    marginBottom: -150,
    width: 250,
    height: 250,
  },
  startButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
};

export default StyleSheet.create(styles);