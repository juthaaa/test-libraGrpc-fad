var libra = require('libra-grpc');

// Init gRPC client
var client = new libra.Client('ac.testnet.libra.org:8000');
var address = '21b931d508ddffb60efd15a915ea6959504eafc4673f3d0072bc80c47a324c89'

const test = async () => {
// Get account state
var params = {
  address: Buffer.from(address, 'hex')
};
const accountState = await client.request('get_account_state', params);
console.log('Account state', accountState);

/** Get account transaction */
  params = {
    account: Buffer.from(address, 'hex'),
    sequence_number: 2,
    fetch_events: false,
  };
  const transaction = await client.request('get_account_transaction_by_sequence_number', params);
//  console.log('/*/*/*/*/*/*', transaction);

/** Get events */
  params = {
    access_path: {
      address: Buffer.from(address, 'hex'),
    },
    start_event_seq_num: 0,
    ascending: true,
    limit: 2,
  };
  const events = await client.request('get_events_by_event_access_path', params);
 // console.log('***//****',events );
 // var GasUsed = events.proof_of_latest_event.proof.transaction_info.gas_used

  /** Get transactions */
  params = {
    start_version: 1,
    limit: 20,
    fetch_events: true,
  };
  client.request('get_transactions', params).then(transactions => {
  //  console.log('gasUnitPrice', transactions.txn_list_with_proof.transactions/*[].raw_txn_bytes.gasUnitPrice*/);
  //  console.log('count',transactions.txn_list_with_proof.transactions.length)
  //  var gasUnitPrice = transactions.txn_list_with_proof.transactions[0].raw_txn_bytes.gasUnitPrice
  //  console.log('fee',((GasUsed/1000000)*(gasUnitPrice/1000000)))
  });



};


test();

