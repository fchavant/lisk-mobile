import bitcoin from 'bitcoinjs-lib';
import config from '../../../../btc.config';
import { extractAddress, getDerivedPathFromPassphrase } from './account';
import { merge } from '../../helpers';
import { validateAddress } from '../../validators';
import { tokenMap } from '../../../constants/tokens';

/**
 * Normalizes transaction data retrieved from Blockchain.info API
 * @param {Object} data
 * @param {String} data.address Base address to use for formatting transactions
 * @param {Array} data.list Transaction list retrieved from API
 * @param {Number} data.blockHeight Latest block height for calculating confirmation count
 */
const normalizeTransactionsResponse = ({
  address,
  list,
  blockHeight,
}) => list.map(({
  feeSatoshi, height, tx, timestamp,
}) => {
  const data = {
    id: tx.txid,
    timestamp: Number(timestamp) * 1000,
    confirmations: blockHeight > 0 ? (blockHeight - height) + 1 : height,
    type: 0,
    data: '',
  };

  data.fee = feeSatoshi;

  const ownedInput = tx.inputs.find(i => i.txDetail.scriptPubKey.addresses.includes(address));

  if (ownedInput) {
    data.senderAddress = address;
    const extractedAddress = tx.outputs[0].scriptPubKey.addresses[0];
    data.recipientAddress = validateAddress(tokenMap.BTC.key, extractedAddress) === 0 ? extractedAddress : 'Unparsed Address';
    data.amount = tx.outputs[0].satoshi;
  } else {
    const output = tx.outputs.find(o => o.scriptPubKey.addresses.includes(address));
    const extractedAddress = tx.inputs[0].txDetail.scriptPubKey.addresses[0];
    data.senderAddress = validateAddress(tokenMap.BTC.key, extractedAddress) === 0 ? extractedAddress : 'Unparsed Address';
    data.recipientAddress = address;
    data.amount = output.satoshi;
  }

  return data;
});

/**
 * Retrieves latest block from the Blockchain.info API and returns the height.
 * @returns {Promise<Number>}
 */
export const getLatestBlockHeight = () => new Promise(async (resolve) => {
  try {
    const response = await fetch(`${config.url}/latestblock`);
    const json = await response.json();

    if (response.ok) {
      resolve(json.height);
    } else {
      resolve(0);
    }
  } catch (error) {
    resolve(0);
  }
});

export const get = ({
  id,
  address,
  limit = 50,
  offset = 0,
}) => new Promise(async (resolve, reject) => {
  try {
    let response;

    if (id) {
      response = await fetch(`${config.url}/transaction/${id}`, config.requestOptions);
    } else {
      response = await fetch(`${config.url}/transactions/${address}?limit=${limit}&offset=${offset}`, config.requestOptions);
    }

    const json = await response.json();

    if (response.ok) {
      const blockHeight = await exports.getLatestBlockHeight();

      const data = normalizeTransactionsResponse({
        address,
        list: id ? [json] : json.data,
        blockHeight,
      });

      resolve({
        data,
        meta: json.meta || {},
      });
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});

/**
 * Normalizes transaction data retrieved from Blockchain.info API
 * @param {Object} data
 * @param {Number} data.inputCount
 * @param {Number} data.outputCount
 * @param {Number} data.dynamicFeePerByte - in satoshis/byte.
 */
export const calculateTransactionFee = ({
  inputCount,
  outputCount,
  dynamicFeePerByte,
}) => ((inputCount * 180) + (outputCount * 34) + 10 + inputCount) * dynamicFeePerByte;

/**
 * Retrieves unspent tx outputs of a BTC address from Blockchain.info API
 * @param {String} address
 * @returns {Promise<Array>}
 */
export const getUnspentTransactionOutputs = address => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`${config.url}/unspent?active=${address}`);
    const json = await response.json();

    if (response.ok) {
      resolve(json.unspent_outputs);
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});

export const create = ({
  passphrase,
  recipientAddress,
  amount,
  dynamicFeePerByte,
}) => new Promise(async (resolve, reject) => {
  try {
    amount = Number(amount);
    dynamicFeePerByte = Number(dynamicFeePerByte);

    const senderAddress = extractAddress(passphrase);
    const unspentTxOuts = await exports.getUnspentTransactionOutputs(senderAddress);

    // Estimate total cost (currently estimates max cost by assuming the worst case)
    const estimatedMinerFee = calculateTransactionFee({
      inputCount: unspentTxOuts.length,
      outputCount: 2,
      dynamicFeePerByte,
    });

    const estimatedTotal = amount + estimatedMinerFee;

    // Check if balance is sufficient
    const unspentTxOutsTotal = unspentTxOuts.reduce((total, tx) => {
      total += tx.value;
      return total;
    }, 0);

    if (unspentTxOutsTotal < estimatedTotal) {
      reject(new Error('Insufficient (estimated) balance'));
    }

    // Find unspent txOuts to spend for this tx
    let txOutIndex = 0;
    let sumOfConsumedOutputs = 0;
    const txOutsToConsume = [];

    while (sumOfConsumedOutputs <= estimatedTotal) {
      const tx = unspentTxOuts[txOutIndex];
      txOutsToConsume.push(tx);
      txOutIndex += 1;
      sumOfConsumedOutputs += tx.value;
    }

    const txb = new bitcoin.TransactionBuilder(config.network);

    // Add inputs from unspent txOuts
    // eslint-disable-next-line
    for (const tx of txOutsToConsume) {
      txb.addInput(tx.tx_hash_big_endian, tx.tx_output_n);
    }

    // Output to Recipient
    txb.addOutput(recipientAddress, amount);

    // Calculate final fee
    const calculatedMinerFee = calculateTransactionFee({
      inputCount: txOutsToConsume.length,
      outputCount: 2,
      dynamicFeePerByte,
    });

    // Calculate total
    const calculatedTotal = amount + calculatedMinerFee;

    // Output to Change Address
    const change = sumOfConsumedOutputs - calculatedTotal;
    txb.addOutput(senderAddress, change);

    // Sign inputs
    const derivedPath = getDerivedPathFromPassphrase(passphrase);
    const keyPair = bitcoin.ECPair.fromWIF(derivedPath.toWIF(), config.network);
    for (let i = 0; i < txOutsToConsume.length; i++) {
      txb.sign(i, keyPair);
    }

    resolve(txb.build().toHex());
  } catch (error) {
    reject(error);
  }
});

export const broadcast = transactionHex => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`${config.apiURL}/transaction`, merge(config.requestOptions, {
      method: 'POST',
      body: JSON.stringify({ tx: transactionHex }),
    }));

    const json = await response.json();

    if (response.ok) {
      resolve(json);
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});

/**
 * Generates a Transaction Explorer URL for given transaction id
 * based on the configured network type
 * @param {String} - Transaction ID
 * @returns {String} - URL
 */
export const getTransactionExplorerURL = id => `${config.transactionExplorerURL}/${id}`;
