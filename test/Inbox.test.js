// contract test code will go here
const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const { beforeEach, describe, it } = require('mocha');
const web3 = new Web3(ganache.provider());

let accounts;

beforeEach(async () => {
  // Getting Accounts from Ganache Ethereum Network
  accounts = await web3.eth.getAccounts()
})

describe('Inbox', () => {
  it('Received accounts', () => {
    assert(0 < accounts.length, 'Failed Accounts import.')
  })
})