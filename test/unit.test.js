import {
    CreateAddress,
    CreateAddressByPhrase
} from "../src/address";
import { SignTransaction } from  "../src/transaction"


describe('Create Address', () => {
    test('it returns stx address', async () => {
        const address = await CreateAddress({
            network: "mainnet",
            password: ""
        })
        console.log("address==", address)
    });
    test('it returns stx address by ', async () => {
        const address = await CreateAddressByPhrase({
            network: "mainnet",
            phrase: "oblige boat easily source clip remind steel hockey nut arrow swallow keep run fragile fresh river expire stay monster black defy box fiber wave"
        })
        console.log("address==", address)
    });
});


describe('sign transaction', () => {
    test('it returns stx address', async () => {
        const tx = await SignTransaction({
            to: "SP28GPST6VJDQGR4MSNXM5YRBDGPE5E6FVXV2KR4H",
            amount: 100000,
            fee: 100000,
            nonce: 0,
            memo: "wenwoha",
            privateKey: "0697b8de5adad51f50a6c147549228b58ec9055991b8518762f06ae552bccdb401",
            network: "mainnet"
        })
        console.log("tx==", tx)
    });
});
