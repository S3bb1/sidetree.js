/*
 * Copyright 2020 - Transmute Industries Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { toKeyPair } from './toKeyPair';

import { wallet } from '@evan.network/sidetree-test-vectors';

it('can generate key pair Ed25519', async () => {
  const content = await toKeyPair(
    wallet.keypair[0].mnemonic,
    'Ed25519',
    "m/44'/1'/0'/0/0"
  );
  expect(content).toEqual(wallet.keypair[0].Ed25519);
});

it('can generate key pair X25519', async () => {
  const content = await toKeyPair(
    wallet.keypair[0].mnemonic,
    'X25519',
    "m/44'/1'/0'/0/0"
  );
  expect(content).toEqual(wallet.keypair[0].X25519);
});

it('can generate key pair secp256k1', async () => {
  const content = await toKeyPair(
    wallet.keypair[0].mnemonic,
    'secp256k1',
    "m/44'/1'/0'/0/0"
  );
  expect(content).toEqual(wallet.keypair[0].secp256k1);
});
