const libra = require('libra-grpc')

const axios = require('axios');

// Init gRPC client
const client = new libra.Client('ac.testnet.libra.org:8000');
//const client = new libra.Client('localhost:57880');
const address = 'f98c7ed9bbd833b6674b89933da9727d2453d81f28379bb8fb00fb92d19154f6'


module.exports.getAccountState = async (req,res) => {  
    let serviceName = 'LibraExproler : get AccountState'
    let response = {};
    console.log("address : ",req.params.address)
    let address = req.params.address
    let params = {
        address: Buffer.from(address, 'hex')
    };

    const accountState = await client.request('get_account_state', params);

    response = accountState;
    console.log(serviceName)
    return res.status(200).send(response);
   
}

module.exports.getTransaction = async (req,res) =>{
    let serviceName = 'LibraExproler : get Transaction'
    let lasttransactionid = 0;
    
   await axios.get('https://api-test.libexplorer.com/api?module=version&action=latest')
    .then(function (resp) {
        // handle success
        console.log(resp.data);
        lasttransactionid = resp.data.result
    })
console.log('lasttransactionid : ',lasttransactionid)
    
    let showCount = 100
    let response = [];
    let params = {
        start_version: lasttransactionid-showCount,
        limit: showCount,
        fetch_events: true,
      };
    console.log('params',params)

    client.request('get_transactions', params, function(err, result) {
      console.log(err, result);
    });

    const transactions = await client.request('get_transactions', params)
    //  response = transactions
    transactionss = transactions.txn_list_with_proof.transactions;
    console.log(transactionss.length)
    // infos = transactions.txn_list_with_proof.infos;
    //console.log()
    let count = 0
    for(let i = transactionss.length-1 ; i >=0  ; i--){
         console.log(i)
        // console.log(transactions.txn_list_with_proof.transactions[i].raw_txn_bytes)
        
        response[count++] = {
             _id: --lasttransactionid,
            // transactions: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes,
            // infos: transactions.txn_list_with_proof.infos[i],
            from: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes.senderAccount,
            seq_nr: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes.sequenceNumber,
            to: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes.program.argumentsList[0].data,
            value: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes.program.argumentsList[1].data,
            gas_max: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes.maxGasAmount,
            gasUsed: transactions.txn_list_with_proof.infos[i].gas_used,
            gas_price: transactions.txn_list_with_proof.transactions[i].raw_txn_bytes.gasUnitPrice
       }  
    }
    


    console.log(serviceName)
    return res.status(200).send(response);
    
}

module.exports.getEvent = async (req,res) => {
    let serviceName = 'LibraExproler : get Event'
    let response = {};
    console.log("address : ",req.params.address)
    let address = req.params.address
    params = {
        access_path: {
          address: Buffer.from(address, 'hex'),
        },
        start_event_seq_num: 0,
        ascending: true,
        limit: 10,
      };
    const events = await client.request('get_events_by_event_access_path', params);

    response = events;
    console.log(serviceName)
    return res.status(200).send(response);
}

module.exports.getTransactionbyAddress = async(req,res) =>{
  
  let serviceName = 'LibraExproler : get Transaction by Address'
  let response = [];
  console.log("address : ",req.params.address)
  let address = req.params.address
  let params = {
    account: Buffer.from(address, 'hex'),
    sequence_number: 2,
    fetch_events: false,
  };
  //const transaction = await client.request('get_account_transaction_by_sequence_number', params);
  await axios.get('https://api-test.libexplorer.com/api?module=account&action=txlist&address='+address)
    .then(function (resp) {
        // handle success
        console.log(resp.data);
        transactionlist = resp.data.result
    })
    let count=0    
    for(let i = transactionlist.length-1 ; i >=0  ; i--){
      console.log(i)
      console.log(transactionlist[i].version)
      response[count++] = {
        _id: transactionlist[i].version,
        from: transactionlist[i].from,
        seq_nr: transactionlist[i].sequenceNumber,
        to: transactionlist[i].to,
        value: transactionlist[i].value,
        gas_max: transactionlist[i].maxGasAmount,
        gasUsed: transactionlist[i].gasUsed,
        gas_price: transactionlist[i].gasUnitPrice,
        status: transactionlist[i].status
      }  
    }

  await axios.get('https://api-test.libexplorer.com/api?module=account&action=balance&address='+address)
    .then(function (resp) {
        // handle success
        console.log(resp.data);
        addressBalance = resp.data.result
    })
    
  
  //response['balance']=addressBalance
  
  console.log(serviceName)
  return res.status(200).send(response);
 
}

module.exports.getTransactionbyVersion = async(req,res) =>{
  let serviceName = 'LibraExproler : get Transaction by Version'
  let response = []
  console.log(serviceName)

  await axios.get('https://api-test.libexplorer.com/api?module=version&action=getversion&version='+req.params.version)
    .then(function (resp) {
        // handle success
        console.log(resp.data);
        transactionlist = resp.data.result
    })
  
    response = transactionlist
    
    return res.status(200).send(response);

}

module.exports.getBalance = async(req,res) => {
  let serviceName = 'LibraExproler : get Balance'
  console.log(serviceName)

  await axios.get('https://api-test.libexplorer.com/api?module=account&action=balance&address='+req.params.address)
    .then(function (resp) {
        // handle success
        console.log(resp.data);
        transactionlist = {'balance' : resp.data.result}
    })
  
    response = transactionlist
    
    return res.status(200).send(response);



}