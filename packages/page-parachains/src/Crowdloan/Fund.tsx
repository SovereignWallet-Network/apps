// Copyright 2017-2021 @polkadot/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { BlockNumber } from '@polkadot/types/interfaces';
import type { Campaign } from './types';

import React, { useMemo } from 'react';

import { AddressMini, Digits, ParaLink, TxButton } from '@polkadot/react-components';
import { useAccounts, useApi } from '@polkadot/react-hooks';
import { BlockToTime, FormatBalance } from '@polkadot/react-query';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';
import FundContribute from './FundContribute';

interface Props {
  bestNumber?: BN;
  className?: string;
  isOngoing?: boolean;
  value: Campaign;
}

function Fund ({ bestNumber, className, isOngoing, value: { info: { cap, depositor, end, firstSlot, lastSlot, raised, retiring }, isEnded, paraId } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const { allAccounts } = useAccounts();

  const isDepositor = useMemo(
    (): boolean => {
      const address = depositor.toString();

      return allAccounts.some((a) => a === address);
    },
    [allAccounts, depositor]
  );

  const blocksLeft = useMemo(
    () => bestNumber && end.gt(bestNumber) && end.sub(bestNumber),
    [bestNumber, end]
  );

  // TODO Dissolve should look at retirement and the actual period

  const [percentage, isCapped] = useMemo(
    () => [
      `${(raised.muln(10000).div(cap).toNumber() / 100).toFixed(2)}%`,
      cap.sub(raised).lt(api.consts.crowdloan.minContribution as BlockNumber)
    ],
    [api, cap, raised]
  );

  const canContribute = blocksLeft && !isCapped && retiring.isFalse;
  const canDissolve = raised.isZero();

  return (
    <tr className={className}>
      <td className='number'><h1>{formatNumber(paraId)}</h1></td>
      <td className='badge'><ParaLink id={paraId} /></td>
      <td>
        {retiring.isTrue
          ? t<string>('Retiring')
          : blocksLeft
            ? isCapped
              ? t<string>('Capped')
              : t<string>('Active')
            : t<string>('Ended')
        }
      </td>
      <td className='address'><AddressMini value={depositor} /></td>
      <td className='all number together'>
        {blocksLeft && (
          <BlockToTime value={blocksLeft} />
        )}
        #{formatNumber(end)}
      </td>
      <td className='number'><Digits value={`${formatNumber(firstSlot)} - ${formatNumber(lastSlot)}`} /></td>
      <td className='number together'>
        <FormatBalance
          value={raised}
          withCurrency={false}
        />&nbsp;/&nbsp;<FormatBalance
          value={cap}
        />
        <div>{percentage}</div>
      </td>
      {isOngoing && (
        <td className='button'>
          {canDissolve && (
            <TxButton
              accountId={depositor}
              icon='times'
              isDisabled={!isDepositor}
              label={
                isEnded
                  ? t<string>('Dissolve')
                  : t<string>('Cancel')
              }
              params={[paraId]}
              tx={api.tx.crowdloan.dissolve}
            />
          )}
          {canContribute && (
            <FundContribute
              cap={cap}
              paraId={paraId}
              raised={raised}
            />
          )}
        </td>
      )}
    </tr>
  );
}

export default React.memo(Fund);
