// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from '../settings/types';

import { createCustom, createDev, createOwn } from './development';
import { createProduction } from './production';
import { createTesting } from './testing';
import { createRococo } from './testingRococo';

export { CUSTOM_ENDPOINT_KEY } from './development';

export function createWsEndpoints (t: TFunction): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isDevelopment: true,
      isDisabled: false,
      isHeader: true,
      text: t('rpc.header.dev', 'MetaMUI networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
