import SingleAccount from "@/components/Shared/Account/SingleAccount";
import SingleAccountsShimmer from "@/components/Shared/Shimmer/SingleAccountsShimmer";
import { Card, EmptyState, ErrorMessage } from "@/components/Shared/UI";
import { UsersIcon } from "@heroicons/react/24/outline";
import { type AccountsRequest, PageSize, useAccountsQuery } from "@hey/indexer";
import { Virtuoso } from "react-virtuoso";

interface AccountsProps {
  query: string;
}

const Accounts = ({ query }: AccountsProps) => {
  const request: AccountsRequest = {
    pageSize: PageSize.Fifty,
    filter: { searchBy: { localNameQuery: query } }
  };

  const { data, error, fetchMore, loading } = useAccountsQuery({
    skip: !query,
    variables: { request }
  });

  const accounts = data?.accounts?.items;
  const pageInfo = data?.accounts?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (hasMore) {
      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  };

  if (loading) {
    return <SingleAccountsShimmer isBig />;
  }

  if (!accounts?.length) {
    return (
      <EmptyState
        icon={<UsersIcon className="size-8" />}
        message={
          <span>
            No accounts for <b>&ldquo;{query}&rdquo;</b>
          </span>
        }
      />
    );
  }

  if (error) {
    return <ErrorMessage error={error} title="Failed to load accounts" />;
  }

  return (
    <Virtuoso
      className="[&>div>div]:space-y-3"
      data={accounts}
      endReached={onEndReached}
      itemContent={(_, account) => (
        <Card className="p-5">
          <SingleAccount isBig account={account} showBio />
        </Card>
      )}
      useWindowScroll
    />
  );
};

export default Accounts;
