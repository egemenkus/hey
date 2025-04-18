import ToggleWithHelper from "@/components/Shared/ToggleWithHelper";
import { Input } from "@/components/Shared/UI";
import { useCollectActionStore } from "@/store/non-persisted/post/useCollectActionStore";
import { StarIcon } from "@heroicons/react/24/outline";
import type { CollectActionType } from "@hey/types/hey";

interface CollectLimitConfigProps {
  setCollectType: (data: CollectActionType) => void;
}

const CollectLimitConfig = ({ setCollectType }: CollectLimitConfigProps) => {
  const { collectAction } = useCollectActionStore((state) => state);

  return (
    <div className="mt-5">
      <ToggleWithHelper
        description="Make collects limited edition"
        heading="Exclusive content"
        icon={<StarIcon className="size-5" />}
        on={Boolean(collectAction.collectLimit)}
        setOn={() =>
          setCollectType({
            collectLimit: collectAction.collectLimit ? null : 1
          })
        }
      />
      {collectAction.collectLimit ? (
        <div className="mt-4 ml-8 text-sm">
          <Input
            label="Collect limit"
            max="100000"
            min="1"
            onChange={(event) => {
              setCollectType({
                collectLimit: Number(event.target.value || 1)
              });
            }}
            placeholder="5"
            type="number"
            value={collectAction.collectLimit}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CollectLimitConfig;
