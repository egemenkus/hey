import { Image } from "@/components/Shared/UI";
import cn from "@/helpers/cn";
import getAvatar from "@hey/helpers/getAvatar";
import getMentions from "@hey/helpers/getMentions";
import type { GroupFragment } from "@hey/indexer";
import { memo } from "react";
import { Link } from "react-router";
import JoinLeaveButton from "./Group/JoinLeaveButton";
import Markup from "./Markup";

interface SingleGroupProps {
  hideJoinButton?: boolean;
  hideLeaveButton?: boolean;
  isBig?: boolean;
  linkToGroup?: boolean;
  showDescription?: boolean;
  group: GroupFragment;
}

const SingleGroup = ({
  hideJoinButton = false,
  hideLeaveButton = false,
  isBig = false,
  linkToGroup = true,
  showDescription = false,
  group
}: SingleGroupProps) => {
  const GroupAvatar = () => (
    <Image
      alt={group.address}
      className={cn(
        isBig ? "size-14" : "size-11",
        "rounded-lg border border-neutral-200 bg-neutral-200 dark:border-neutral-700"
      )}
      height={isBig ? 56 : 44}
      loading="lazy"
      src={getAvatar(group)}
      width={isBig ? 56 : 44}
    />
  );

  const GroupInfo = () => (
    <div className="mr-8 flex items-center space-x-3">
      <GroupAvatar />
      <div>
        <div className="truncate font-semibold">{group.metadata?.name}</div>
        {showDescription && group.metadata?.description && (
          <div
            className="linkify mt-2 text-base leading-6"
            style={{ wordBreak: "break-word" }}
          >
            <Markup mentions={getMentions(group.metadata.description)}>
              {group.metadata.description}
            </Markup>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between">
      {linkToGroup ? (
        <Link to={`/g/${group.address}`}>
          <GroupInfo />
        </Link>
      ) : (
        <GroupInfo />
      )}
      <JoinLeaveButton
        hideJoinButton={hideJoinButton}
        hideLeaveButton={hideLeaveButton}
        group={group}
        small
      />
    </div>
  );
};

export default memo(SingleGroup);
