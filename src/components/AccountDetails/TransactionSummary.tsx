import { Decimal, Utils } from '@animeswap.org/v1-sdk'

import {
  ExecuteTransactionInfo,
  QueueTransactionInfo,
  SubmitProposalTransactionInfo,
  TransactionInfo,
  TransactionType,
} from '../../state/transactions/types'

function formatAmount(amountRaw: string, decimals: number, sigFigs: number): string {
  return Utils.d(amountRaw).mul(new Decimal(10).pow(-decimals)).toSignificantDigits(sigFigs).toString()
}

function FormattedCoinAmount({
  rawAmount,
  symbol,
  decimals,
  sigFigs,
}: {
  rawAmount: string
  symbol: string
  decimals: number
  sigFigs: number
}) {
  return (
    <>
      {formatAmount(rawAmount, decimals, sigFigs)} {symbol}
    </>
  )
}

function FormattedCoinAmountManaged({
  rawAmount,
  coinId,
  sigFigs = 6,
}: {
  rawAmount: string
  coinId: string
  sigFigs: number
}) {
  // const currency = useCurrency(coinId)
  // return currency ? (
  //   <FormattedCoinAmount
  //     rawAmount={rawAmount}
  //     decimals={currency.decimals}
  //     sigFigs={sigFigs}
  //     symbol={currency.symbol ?? '???'}
  //   />
  // ) : null
  return null
}

function SubmitProposalTransactionSummary(_: { info: SubmitProposalTransactionInfo }) {
  return <>Submit new proposal</>
}

function QueueSummary({ info }: { info: QueueTransactionInfo }) {
  const proposalKey = `${info.governorAddress}/${info.proposalId}`
  return <>Queue proposal {proposalKey}.</>
}

function ExecuteSummary({ info }: { info: ExecuteTransactionInfo }) {
  const proposalKey = `${info.governorAddress}/${info.proposalId}`
  return <>Execute proposal {proposalKey}.</>
}

export function TransactionSummary({ info }: { info: TransactionInfo }) {
  switch (info.type) {
    case TransactionType.QUEUE:
      return <QueueSummary info={info} />

    case TransactionType.EXECUTE:
      return <ExecuteSummary info={info} />

    case TransactionType.SUBMIT_PROPOSAL:
      return <SubmitProposalTransactionSummary info={info} />
  }
}
