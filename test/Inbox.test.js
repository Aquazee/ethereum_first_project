// contract test code will go here
const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const { beforeEach, describe, it } = require('mocha');
const web3 = new Web3(ganache.provider());
