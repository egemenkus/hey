import WalletAccount from "@/components/Shared/Account/WalletAccount";
import Loader from "@/components/Shared/Loader";
import { Button, EmptyState, ErrorMessage } from "@/components/Shared/UI";
import errorToast from "@/helpers/errorToast";
import useTransactionLifecycle from "@/hooks/useTransactionLifecycle";
import { useAccountStatus } from "@/store/non-persisted/useAccountStatus";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { useApolloClient } from "@apollo/client";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Errors } from "@hey/data/errors";
import {
  AccountManagersDocument,
  type AccountManagersRequest,
  PageSize,
  useAccountManagersQuery,
  useRemoveAccountManagerMutation
} from "@hey/indexer";
import { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { toast } from "sonner";
import Permission from "./Permission";

const List = () => {
  const { currentAccount } = useAccountStore();
  const { isSuspended } = useAccountStatus();
  const [removingAddress, setRemovingAddress] = useState<string | null>(null);
  const { cache } = useApolloClient();
  const handleTransactionLifecycle = useTransactionLifecycle();

  const updateCache = () => {
    if (data?.accountManagers?.items) {
      const updatedManagers = data.accountManagers.items.filter(
        (item) => item.manager !== removingAddress
      );

      cache.writeQuery({
        query: AccountManagersDocument,
        variables: { request },
        data: {
          accountManagers: {
            ...data.accountManagers,
            items: updatedManagers
          }
        }
      });
    }
  };

  const onCompleted = () => {
    setRemovingAddress(null);
    updateCache();
    toast.success("Manager removed successfully");
  };

  const onError = (error: Error) => {
    errorToast(error);
    setRemovingAddress(null);
  };

  const request: AccountManagersRequest = { pageSize: PageSize.Fifty };
  const { data, error, fetchMore, loading } = useAccountManagersQuery({
    variables: { request }
  });

  const [removeAccountManager] = useRemoveAccountManagerMutation({
    onCompleted: async ({ removeAccountManager }) => {
      return await handleTransactionLifecycle({
        transactionData: removeAccountManager,
        onCompleted,
        onError
      });
    },
    onError
  });

  const handleRemoveManager = async (manager: string) => {
    if (!currentAccount) {
      return toast.error(Errors.SignWallet);
    }

    if (isSuspended) {
      return toast.error(Errors.Suspended);
    }

    setRemovingAddress(manager);

    return await removeAccountManager({
      variables: { request: { manager } }
    });
  };

  const accountManagers = data?.accountManagers.items.filter(
    (item) => !item.isLensManager
  );
  const pageInfo = data?.accountManagers?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (hasMore) {
      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  };

  if (loading) {
    return <Loader className="my-10" />;
  }

  if (error) {
    return (
      <ErrorMessage error={error} title="Failed to load account managers" />
    );
  }

  if (!accountManagers?.length) {
    return (
      <EmptyState
        hideCard
        icon={<UserCircleIcon className="size-8" />}
        message="No account managers added!"
      />
    );
  }

  return (
    <Virtuoso
      data={accountManagers}
      endReached={onEndReached}
      className="virtual-divider-list-window"
      itemContent={(_, accountManager) => (
        <div className="flex flex-wrap items-center justify-between p-5">
          <div className="flex flex-col gap-y-3">
            <WalletAccount address={accountManager.manager} />
            <Permission
              title="Can spend funds"
              enabled={
                accountManager.permissions.canExecuteTransactions &&
                accountManager.permissions.canTransferNative &&
                accountManager.permissions.canTransferTokens
              }
              manager={accountManager}
            />
          </div>
          <Button
            disabled={removingAddress === accountManager.manager}
            loading={removingAddress === accountManager.manager}
            onClick={() => handleRemoveManager(accountManager.manager)}
            outline
          >
            Remove
          </Button>
        </div>
      )}
      useWindowScroll
    />
  );
};

export default List;
