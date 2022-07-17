"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
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
];
function checkWalletForVanity(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const match = searchArray.find(searchString => wallet.address.startsWith(`0x${searchString}`) || wallet.address.endsWith(searchString));
        if (match) {
            console.log(`Address: ${wallet.address} - Mnemonic: ${wallet.mnemonic.phrase} - PrivateKey: ${wallet.privateKey}`);
        }
    });
}
function checkWalletForMoney(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        let provider = new ethers_1.ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/lfMGm9rvDwO-uiLShA8ef4Xpl3_xDwI5');
        let account = wallet.connect(provider);
        const balance = yield account.getBalance();
        if (balance.toString() !== '0') {
            console.log(`!Address: ${wallet.address} - Mnemonic: ${wallet.mnemonic.phrase} - PrivateKey: ${wallet.privateKey}`);
        }
        return balance;
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wallet = ethers_1.ethers.Wallet.createRandom();
            yield checkWalletForVanity(wallet);
            yield checkWalletForMoney(wallet);
        }
        catch (_a) { }
        init();
    });
}
init();
//# sourceMappingURL=index.js.map