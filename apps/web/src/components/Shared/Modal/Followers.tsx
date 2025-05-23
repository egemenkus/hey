import SingleAccount from "@/components/Shared/Account/SingleAccount";
import AccountListShimmer from "@/components/Shared/Shimmer/AccountListShimmer";
import { EmptyState, ErrorMessage } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { accountsList } from "@/variants";
import { UsersIcon } from "@heroicons/react/24/outline";
import type { FollowersRequest } from "@hey/indexer";
import { PageSize, useFollowersQuery } from "@hey/indexer";
import { LazyMotion, domAnimation } from "motion/react";
import * as m from "motion/react-m";
import { Virtuoso } from "react-virtuoso";

interface FollowersProps {
  username: string;
  address: string;
}

const Followers = ({ username, address }: FollowersProps) => {
  const { currentAccount } = useAccountStore();

  const request: FollowersRequest = {
    pageSize: PageSize.Fifty,
    account: address
  };

  const { data, error, fetchMore, loading } = useFollowersQuery({
    skip: !address,
    variables: { request }
  });

  const followers = data?.followers?.items;
  const pageInfo = data?.followers?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (hasMore) {
      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  };

  if (loading) {
    return <AccountListShimmer />;
  }

  if (!followers?.length) {
    return (
      <EmptyState
        icon={<UsersIcon className="size-8" />}
        message={
          <div>
            <span className="mr-1 font-bold">@{username}</span>
            <span>doesn't have any followers yet.</span>
          </div>
        }
        hideCard
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        className="m-5"
        error={error}
        title="Failed to load followers"
      />
    );
  }

  return (
    <Virtuoso
      className="!h-[80vh]"
      data={followers}
      endReached={onEndReached}
      itemContent={(index, follower) => (
        <LazyMotion features={domAnimation}>
          <m.div
            className={cn(
              "divider p-5",
              index === followers.slice(5).length - 1 && "border-b-0"
            )}
            variants={accountsList}
            initial="hidden"
            animate="visible"
          >
            <SingleAccount
              hideFollowButton={
                currentAccount?.address === follower.follower.address
              }
              hideUnfollowButton={
                currentAccount?.address === follower.follower.address
              }
              account={follower.follower}
              showBio
              showUserPreview={false}
            />
          </m.div>
        </LazyMotion>
      )}
    />
  );
};

export default Followers;
