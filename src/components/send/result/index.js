import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';
import { SecondaryButton } from '../../toolBox/button';
import { H1, P } from '../../toolBox/typography';
import txCreatedAnim from '../../../assets/animations/tx-created.json';
import txPendingAnim from '../../../assets/animations/tx-pending.json';
import txConfirmedAnim from '../../../assets/animations/tx-confirmed.json';

const createdAnimDuration = 4340;

@connect(state => ({
  account: state.accounts.active,
  transactions: state.transactions,
}), {})
class Result extends React.Component {
  state = {
    step: 0,
  };
  animation = [];
  timeouts = {
    created: null,
    confirmed: null,
  };

  componentDidMount() {
    this.props.navigation.setParams({ showButtonLeft: false });
    this.startDate = new Date();
    this.play('created');
  }

  componentWillUnmount() {
    clearTimeout(this.timeouts.created);
    clearTimeout(this.timeouts.confirmed);
  }

  componentWillUpdate(nextProp) {
    const nowPending = this.props.transactions.pending.filter(tx =>
      tx.id === this.props.txId).length > 0;
    const nextConfirmed = nextProp.transactions.confirmed.filter(tx =>
      tx.id === this.props.txId).length > 0;

    if (nowPending && nextConfirmed) {
      this.play('confirmed');
    }
  }

  play(stage) {
    if (stage === 'created') {
      this.animation[0].play();
      this.timeouts.created = setTimeout(() => {
        this.setState({
          step: 1,
        }, () => {
          this.animation[1].play();
        });
      }, createdAnimDuration);
    } else if (stage === 'confirmed') {
      this.setState({
        step: 2,
      }, () => {
        this.animation[2].play();
      });
    }
  }

  render() {
    return (<View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <H1>Sent</H1>
          <P style={styles.subtitle}>
            Thank you. Your transaction is being processed.
            It may take up to 15 minutes to be secured in the blockchain.
          </P>
        </View>
        <View style={styles.illustration}>
          {this.state.step === 0 ? <LottieView
            source={txCreatedAnim}
            loop={false}
            ref={(el) => { this.animation[0] = el; }}/>
            : null}
          {this.state.step === 1 ? <LottieView
            source={txPendingAnim}
            loop={true}
            ref={(el) => { this.animation[1] = el; }}/>
            : null}
          {this.state.step === 2 ? <LottieView
            source={txConfirmedAnim}
            loop={false}
            ref={(el) => { this.animation[2] = el; }}/>
            : null}
        </View>
        <SecondaryButton
          style={styles.button}
          onClick={() => {
            this.props.finalCallback();
            this.props.reset();
          }}
          title='Return to home' />
      </View>
    </View>);
  }
}

export default Result;
