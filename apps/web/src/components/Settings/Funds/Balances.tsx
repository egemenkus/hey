import TransferFundButton from "@/components/Shared/Account/Fund/FundButton";
import Loader from "@/components/Shared/Loader";
import { ErrorMessage, Image } from "@/components/Shared/UI";
import {
  DEFAULT_COLLECT_TOKEN,
  DEFAULT_TOKEN,
  NATIVE_TOKEN_SYMBOL
} from "@hey/data/constants";
import { tokens } from "@hey/data/tokens";
import getTokenImage from "@hey/helpers/getTokenImage";
import { useAccountBalancesQuery } from "@hey/indexer";
import type { Address } from "viem";
import Unwrap from "./Unwrap";
import Withdraw from "./Withdraw";
import Wrap from "./Wrap";

const Balances = () => {
  const { data, loading, error, refetch } = useAccountBalancesQuery({
    variables: {
      request: {
        includeNative: true,
        tokens: tokens.map((token) => token.contractAddress)
      }
    },
    pollInterval: 5000
  });

  interface TokenBalanceProps {
    value: string;
    symbol: string;
    currency?: Address;
  }

  const TokenBalance = ({ value, symbol, currency }: TokenBalanceProps) => {
    return (
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Image src={getTokenImage(symbol)} alt={symbol} className="size-5" />
          <b>{Number.parseFloat(value).toFixed(2)} </b>
          {symbol}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Withdraw currency={currency} value={value} refetch={refetch} />
          {!currency && (
            <>
              <Wrap value={value} refetch={refetch} />
              <TransferFundButton size="sm" outline />
            </>
          )}
          {currency === DEFAULT_COLLECT_TOKEN && (
            <>
              <Unwrap value={value} refetch={refetch} />
              <TransferFundButton size="sm" outline token={DEFAULT_TOKEN} />
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loader className="my-10" />;
  }

  if (error) {
    return (
      <ErrorMessage
        className="m-5"
        error={error}
        title="Failed to load balances"
      />
    );
  }

  return (
    <div className="m-5 space-y-7">
      {data?.accountBalances.map((balance, index) => (
        <div key={index}>
          {balance.__typename === "NativeAmount" && (
            <TokenBalance value={balance.value} symbol={NATIVE_TOKEN_SYMBOL} />
          )}
          {balance.__typename === "Erc20Amount" && (
            <TokenBalance
              value={balance.value}
              symbol={balance.asset.symbol}
              currency={balance.asset.contract.address}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Balances;
