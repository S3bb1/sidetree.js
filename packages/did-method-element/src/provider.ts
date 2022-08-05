import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import { EthereumLedger } from '@evan.network/sidetree-ethereum';
import { IpfsCasWithCache } from '@evan.network/sidetree-cas-ipfs';
import { MockCas } from '@evan.network/sidetree-cas';
import Element from './Element';

export type ElementNodeConfigs = {
  contentAddressableStoreServiceUri: string;
  databaseName: string;
  didMethodName: string;
  ethereumRpcUrl: string;
  mongoDbConnectionString: string;
  batchingIntervalInSeconds: number;
  observingIntervalInSeconds: number;
  maxConcurrentDownloads: number;
  versions: [
    {
      startingBlockchainTime: number;
      version: string;
    }
  ];
  elementAnchorContract?: string;
  ethereumMnemonic?: string;
  ethereumPrivateKey?: string;
};

const getLedger = async (elementNodeConfigs: ElementNodeConfigs) => {
  let web3 = new Web3(elementNodeConfigs.ethereumRpcUrl);
  if (elementNodeConfigs.ethereumMnemonic) {
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: elementNodeConfigs.ethereumMnemonic,
      },
      providerOrUrl: elementNodeConfigs.ethereumRpcUrl,
    });
    web3 = new Web3(provider);
  } else if (elementNodeConfigs.ethereumPrivateKey) {
    const provider = new HDWalletProvider({
      privateKeys: [elementNodeConfigs.ethereumPrivateKey],
      providerOrUrl: elementNodeConfigs.ethereumRpcUrl,
    });
    web3 = new Web3(provider);
  }
  const ledger = new EthereumLedger(
    web3,
    elementNodeConfigs.elementAnchorContract
  );
  await ledger.initialize();
  return ledger;
};

const getTestCas = async () => {
  const cas = new MockCas();
  await cas.initialize();
  return cas;
};

const getCas = async (config: ElementNodeConfigs) => {
  const cas = new IpfsCasWithCache(
    config.contentAddressableStoreServiceUri,
    config.mongoDbConnectionString,
    config.databaseName
  );
  await cas.initialize();
  return cas;
};

export const getTestNodeInstance = async (
  elementNodeConfigs: ElementNodeConfigs
): Promise<Element> => {
  const ledger = await getLedger(elementNodeConfigs);
  const cas = await getTestCas();
  const element = new Element(
    elementNodeConfigs as any,
    elementNodeConfigs.versions,
    cas,
    ledger
  );
  await element.initialize();
  return element;
};

export const getNodeInstance = async (
  elementNodeConfigs: ElementNodeConfigs
): Promise<Element> => {
  const ledger = await getLedger(elementNodeConfigs);
  const cas = await getCas(elementNodeConfigs);
  const element = new Element(
    elementNodeConfigs as any,
    elementNodeConfigs.versions,
    cas,
    ledger
  );
  await element.initialize();
  return element;
};
