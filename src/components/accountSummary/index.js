import React from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
// import Modal from '../followedAccountsModal';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { H4, P, H2 } from '../toolBox/typography';
import stripesLight from '../../assets/images/stripesLight.png';
import stripesDark from '../../assets/images/stripesDark.png';
import easing from '../../utilities/easing';
import withTheme from '../withTheme';
import getStyles, { animationRanges } from './styles';
import { themes } from '../../constants/styleGuide';

@connect(state => ({
  followedAccounts: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction,
})
class AccountSummary extends React.Component {
  state = {
    modalVisible: false,
    balanceWidth: 0,
    addressWidth: 0,
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(-20),
    },
  }

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  createInterpolatedValue = (outputRange, inputRange = [0, 80]) =>
    this.props.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

  interpolate = (key, props, range) =>
    props.reduce((interpolated, prop) => {
      interpolated[prop] = this.createInterpolatedValue(animationRanges[key][prop], range);
      return interpolated;
    }, {});

  setPadding = (e, name) => {
    if (animationRanges[name].left[0] === 33) {
      const { width } = e.nativeEvent.layout;
      animationRanges[name].left[0] = Math.floor((this.screenWidth - width) / 2);
    }
  }

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100,
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart,
    }).start();
  }

  render() {
    const { styles, account, theme } = this.props;
    const Anim = Animated.View;
    const itpl = this.interpolate;
    const { opacity, top } = this.state.initialAnimations;
    const avatarScale = this.createInterpolatedValue([1, 0.85]);
    const avatarTranslate = this.createInterpolatedValue([0, -6]);
    return (<View style={this.props.style}>
      <Anim style={[styles.bg, itpl('bg', ['height'])]}>
        {
          theme === themes.light ? <Image style={styles.bgImage} source={ stripesLight} /> :
            <Image style={styles.bgImage} source={stripesDark} />
        }
      </Anim>
      {
        account && account.address ?
        <Anim style={[styles.container, { opacity, top }, itpl('container', ['height'])]}>
          <Anim style={[styles.avatar, { opacity },
            itpl('avatar', ['width', 'height', 'left', 'top'], [0, 35, 70])]}>
            <Avatar address={account.address}
              size={80} scale={avatarScale} translate={avatarTranslate} />
          </Anim>
          <Anim onLayout={e => this.setPadding(e, 'address')}
            style={[styles.address, { opacity }, itpl('address', ['top', 'left'])]}>
            <Share type={P} style={[styles.addressP, styles.theme.addressP]}
              containerStyle={styles.addressContainer}
              value={account.address} icon={true} />
          </Anim>
          <Anim onLayout={e => this.setPadding(e, 'balance')}
            style={[styles.balance, { opacity }, itpl('balance', ['top', 'left'])]}>
            <H2 style={[styles.value, styles.theme.value]}>
              <FormattedNumber>{fromRawLsk(account.balance)}</FormattedNumber>
            </H2>
            <H2 style={[styles.unit, styles.theme.unit]}>Ⱡ</H2>
          </Anim>
          <Anim style={[styles.box, styles.theme.box, itpl('box', ['top', 'height'])]} />
        </Anim> :
        <H4>Fetching account info</H4>
      }
      {/* <Modal
        hide={this.toggleModal.bind(this)}
        address={account ? account.address : {}}
      isVisible={this.state.modalVisible}/> */ }
    </View>);
  }
}

export default withTheme(AccountSummary, getStyles());
