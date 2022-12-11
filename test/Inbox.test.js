// contract test code will go here
const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const { beforeEach, describe, it } = require('mocha');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');
const _ = require('lodash');

let accounts, inbox;

beforeEach(async () => {
  // Getting Accounts from Ganache Ethereum Network
  accounts = await web3.eth.getAccounts()
  if (accounts && accounts.length > 0) {
    inbox = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
      .send({ from: _.first(accounts), gas: '1000000' });
  }
})

describe('Inbox', () => {
  it('Receives accounts and deploys a contract', () => {
    assert(0 < accounts.length, 'Failed Accounts import.');
    assert.ok(inbox.options.address, 'Contract deployment failed');
  })

  it('It has a default message message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal('Hi there!', message);
  });

  it('It can change message', async () => {
    await inbox.methods.setMessage('Go there!').send({ from: _.first(accounts) });
    const message = await inbox.methods.message().call();
    assert.equal('Go there!', message);
  });

})