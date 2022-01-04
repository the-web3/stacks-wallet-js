import {
    makeSTXTokenTransfer,
    AnchorMode,
    validateStacksAddress,
    TransactionVersion,
    getAddressFromPublicKey
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';


export async function SignTransaction(params){
    const {
        to, amount, fee, nonce, memo, privateKey, network
    } = params;
    const stacksNet = network === "mainnet" ? new StacksMainnet() : new StacksTestnet();
    const txOptions = {
        recipient: to,
        amount: amount,
        senderKey: privateKey,
        network: stacksNet,
        memo: memo,
        nonce: nonce,
        fee: fee,
        anchorMode: AnchorMode.Any
    };
    const transaction = await makeSTXTokenTransfer(txOptions);
    return transaction.serialize().toString('hex')
}