# stacks-wallet-js


### 一. Stacks(STX) 简介
Stacks 2.0 是连接到比特币并为其带来智能合约和去中心化应用程序的第 1 层区块链。在 Stacks 平台上开发的智能合约和应用程序与比特币的安全性、稳定性和经济能力原生集成。

#### 1. 共识
Stacks 2.0 实现了一种称为传输证明（“PoX”）的新挖掘机制。PoX 是两个区块链之间的共识算法。它使用已建立的区块链（在本例中为比特币）来保护新的区块链（堆栈）。PoX 以 1:1 的块比连接到比特币，这意味着 Stacks 区块链上发生的任何事情都可以在比特币区块链上进行验证。PoX 不是在工作证明上燃烧电力，而是将已经铸造的比特币重新用作“计算证明”，矿工直接用比特币表示他们的挖掘成本。

#### 2. 挖矿
需要挖矿才能使网络可用、值得信赖和安全。矿工验证传入的交易，参与共识机制，并将新块写入区块链。为了激励挖矿，如果矿工赢得成为下一轮领导者的竞标，他们将获得新铸造的 Stacks (STX) 代币。

#### 3. 堆叠
用于矿工出价的比特币被发送到一组特定地址，这些地址对应于积极参与共识的 Stacks (STX) 代币持有者（“Stackers”）。因此，在挖矿过程中消耗的比特币不会被销毁，而是根据他们持有的 Stacks 和参与 Stacking 算法的情况，作为奖励流向有生产力的 Stacks 持有者。Stackers 必须将他们的 Stacks (STX) 代币锁定一段时间。

#### 4. 智能合约
Clarity 是 Stacks 2.0 区块链上智能合约的新语言。Clarity 智能合约语言针对可预测性和安全性进行了优化。Stacks 2.0 将清晰的智能合约锚定到比特币，使智能合约能够根据在比特币区块链上看到的操作进行操作。
在清晰的开源项目是由堆栈和支持Algorand

Clarity 在以下几个方面与其他为编写智能合约而设计的语言不同：

- 可预测性：Clarity 语言使用精确且明确的语法，允许开发人员准确预测他们的合约将如何执行。
- 安全性：Clarity 语言允许用户为交易提供自己的条件，以确保合约永远不会意外转移用户拥有的代币。
- 无编译器：用 Clarity 编写的合约完全按照开发人员编写的方式在 Stacks 区块链上广播。这确保了代码开发人员编写、分析和测试的内容正是要执行的内容。

### 二.Stacks(STX) 相关的社区

官网链接： https://www.stacks.co/
coinmarketcap链接： https://coinmarketcap.com/zh/currencies/stacks/
coingecko链接： https://www.coingecko.com/en/coins/stacks
github链接： https://github.com/blockstack
电报链接： https://t.me/StacksChat⁣ 
节点搭建链接：https://docs.stacks.co/understand-stacks/running-mainnet-node⁣ ；
Reddit链接：https://www.reddit.com/r/stacks/⁣ ；
twitter链接:  https://twitter.com/Stacks⁣ ;
discord链接:  https://discord.com/invite/C8ycHu4⁣

### 三. Stacks(STX) 节点搭建

#### 1. 介绍
此过程演示了如何使用 Docker 映像运行本地主网节点。此过程侧重于类 Unix 操作系统（Linux 和 MacOS）。此过程尚未在 Windows 上进行测试。

#### 2. 先决条件
运行节点没有专门的硬件要求。用户已经成功地在 Raspberry Pi 板和其他片上系统架构上运行节点。为了完成此过程，您必须在节点主机上安装以下软件：
- docker
- curl
- jq

#### 3. 防火墙配置
为了使 API 节点服务正常工作，您必须配置任何网络防火墙规则以允许本节中讨论的端口上的流量。网络和防火墙配置的详细信息非常特定于您的机器和网络，因此不提供详细示例。必须在主机上打开以下端口：入口：
stacks-blockchain（开放0.0.0.0/0）：

- 20443 TCP
- 20444 TCP

出口：
- 8332
- 8333
- 20443-20444

这些出口端口用于同步stacks-blockchain和比特币标头。如果它们未打开，则同步将失败。

#### 第 1 步：初始设置
为了运行主网节点，您必须下载 Docker 镜像并创建一个目录结构来保存来自服务的持久数据。使用以下命令下载并配置 Docker 镜像：
```
docker pull blockstack/stacks-blockchain
```
使用以下命令为服务数据创建目录结构：
```
mkdir -p ./stacks-node/{persistent-data/stacks-blockchain/mainnet,config/mainnet} && cd stacks-node
```
#### 第 2 步：运行 Stacks 区块链
首先，创建./config/mainnet/Config.toml文件并使用文本编辑器将以下内容添加到文件中：
```
[node]
working_dir = "/root/stacks-node/data"
rpc_bind = "0.0.0.0:20443"
p2p_bind = "0.0.0.0:20444"
bootstrap_node = "02da7a464ac770ae8337a343670778b93410f2f3fef6bea98dd1c3e9224459d36b@seed-0.mainnet.stacks.co:20444,02afeae522aab5f8c99a00ddf75fbcb4a641e052dd48836408d9cf437344b63516@seed-1.mainnet.stacks.co:20444,03652212ea76be0ed4cd83a25c06e57819993029a7b9999f7d63c36340b34a4e62@seed-2.mainnet.stacks.co:20444"
wait_time_for_microblocks = 10000

[burnchain]
chain = "bitcoin"
mode = "mainnet"
peer_host = "bitcoin.blockstack.com"
username = "blockstack"
password = "blockstacksystem"
rpc_port = 8332
peer_port = 8333

[connection_options]
read_only_call_limit_write_length = 0
read_only_call_limit_read_length = 100000
read_only_call_limit_write_count = 0
read_only_call_limit_read_count = 30
read_only_call_limit_runtime = 1000000000

```
开始使用下面命令运行 stacks-blockchain 容器
```
docker run -d --rm \
  --name stacks-blockchain \
  -v $(pwd)/persistent-data/stacks-blockchain/mainnet:/root/stacks-node/data \
  -v $(pwd)/config/mainnet:/src/stacks-node \
  -p 20443:20443 \
  -p 20444:20444 \
  blockstack/stacks-blockchain \
/bin/stacks-node start --config /src/stacks-node/Config.toml
```
您可以stacks-blockchain使用以下命令验证正在运行的容器：
```
docker ps --filter name=stacks-blockchain
```
#### 第 3 步：验证服务
最初的burnchain 头同步可能需要几分钟，直到完成以下命令将不起作用
要验证stacks-blockchainBurnchain 标头同步进度：
```
docker logs stacks-blockchain
```
输出应类似于以下内容：
```
INFO [1626290705.886954] [src/burnchains/bitcoin/spv.rs:926] [main] Syncing Bitcoin headers: 1.2% (8000 out of 691034)
INFO [1626290748.103291] [src/burnchains/bitcoin/spv.rs:926] [main] Syncing Bitcoin headers: 1.4% (10000 out of 691034)
INFO [1626290776.956535] [src/burnchains/bitcoin/spv.rs:926] [main] Syncing Bitcoin headers: 1.7% (12000 out of 691034)
```
要验证stacks-blockchain尖端高度是否在进步，请使用以下命令：
```
curl -sL localhost:20443/v2/info | jq
```
如果实例正在运行，您应该会收到类似于以下内容的终端输出：
```
{
  "peer_version": 402653184,
  "pox_consensus": "89d752034e73ed10d3b97e6bcf3cff53367b4166",
  "burn_block_height": 666143,
  "stable_pox_consensus": "707f26d9d0d1b4c62881a093c99f9232bc74e744",
  "stable_burn_block_height": 666136,
  "server_version": "stacks-node 2.0.11.1.0-rc1 (master:67dccdf, release build, linux [x86_64])",
  "network_id": 1,
  "parent_network_id": 3652501241,
  "stacks_tip_height": 61,
  "stacks_tip": "e08b2fe3dce36fd6d015c2a839c8eb0885cbe29119c1e2a581f75bc5814bce6f",
  "stacks_tip_consensus_hash": "ad9f4cb6155a5b4f5dcb719d0f6bee043038bc63",
  "genesis_chainstate_hash": "74237aa39aa50a83de11a4f53e9d3bb7d43461d1de9873f402e5453ae60bc59b",
  "unanchored_tip": "74d172df8f8934b468c5b0af2efdefe938e9848772d69bcaeffcfe1d6c6ef041",
  "unanchored_seq": 0,
  "exit_at_block_height": null
}
```
#### 停止主网节点
使用以下命令停止本地主网节点：
```
docker stop stacks-blockchain
```

### 四.  Stacks(STX) 地址离线生成

#### 1. 直接生成地址

```
import keychain from '@stacks/keychain';
import { ChainID, TransactionVersion } from '@stacks/transactions';
import { deriveRootKeychainFromMnemonic, deriveStxAddressChain } from '@stacks/keychain';

export async function CreateAddress(params) {
    const {network, password} = params;
    if (network == "mainnet") {
        const generated = await keychain.Wallet.generate(password, ChainID.Testnet);
        const signer = generated.getSigner();
        const privateKey = signer.getSTXPrivateKey()
        const mainnetAddress = signer.getSTXAddress(TransactionVersion.Mainnet);
        return {
            "address" :mainnetAddress,
            "privateKey": privateKey.toString("hex"),
        }
    } else {
        const generated = await keychain.Wallet.generate(password, ChainID.Mainnet);
        const signer = generated.getSigner();
        const privateKey = signer.getSTXPrivateKey()
        const testnetAddress = signer.getSTXAddress(TransactionVersion.Testnet);
        return {
            "address" :testnetAddress,
            "privateKey": privateKey.toString("hex"),
        }
    }
}

```
#### 2. 助记词生成地址

```
export async function CreateAddressByPhrase(params) {
    const {network, phrase} = params;
    const address_code = network === "mainnet" ? ChainID.Mainnet : ChainID.Testnet;
    const deriveStxMainnetAddressChain = deriveStxAddressChain(address_code);
    const rootNode = await deriveRootKeychainFromMnemonic(phrase);
    const result = deriveStxMainnetAddressChain(rootNode);
    return {
        "address" :result.address,
        "privateKey": result.privateKey,
    }
}
```

#### 3. 测试代码
```
import {
    CreateAddress,
    CreateAddressByPhrase
} from "../src/address";


describe('Create Address', () => {
    test('it returns stx address', async () => {
        const address = await CreateAddress({
            netwrok: "mainnet",
            password: ""
        })
        console.log("address==", address)
    });
    test('it returns stx address by ', async () => {
        const address = await CreateAddressByPhrase({
            netwrok: "mainnet",
            phrase: "oblige boat easily source clip remind steel hockey nut arrow swallow keep run fragile fresh river expire stay monster black defy box fiber wave"
        })
        console.log("address==", address)
    });
});
```

### 五.  Stacks(STX) 离线签名

#### 1.正式代码

```
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
```

#### 2. 测试代码

```
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
```

### 六. 钱包扫块相关的 RPC(API)

接口文档：https://hirosystems.github.io/stacks-blockchain-api

### 七. 代码链接

https://github.com/wenwoha/stacks-wallet-js/
