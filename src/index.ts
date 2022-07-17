import { ethers } from 'ethers';

const searchArray = [
    'acc1',
    'acc2',
    'acc3',
    '0000',
    'b00b',
    'b0b0',
    'd00b',
    'bad',
    'cafe',
    'dead',
    'face',
    'f00d',
    '1312',
    'babe',
    'badbabe'
]

async function checkWalletForVanity(wallet: ethers.Wallet) {
    const match = searchArray.find(searchString => wallet.address.startsWith(`0x${searchString}`) || wallet.address.endsWith(searchString));
    if (match) {
        console.log(`Address: ${wallet.address} - Mnemonic: ${wallet.mnemonic.phrase} - PrivateKey: ${wallet.privateKey}`);
    }
}

async function checkWalletForMoney(wallet: ethers.Wallet) {
    let provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
    let account = wallet.connect(provider);
    const balance = await account.getBalance();
    if (balance.toString() !== '0') {
        console.log(`!Address: ${wallet.address} - Mnemonic: ${wallet.mnemonic.phrase} - PrivateKey: ${wallet.privateKey}`);
    }
    return balance;
}

async function init() {
    try {
        const wallet = ethers.Wallet.createRandom();
        await checkWalletForVanity(wallet);
        await checkWalletForMoney(wallet);
    } catch {}

    init();
}

init();