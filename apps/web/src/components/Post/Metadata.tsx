import getAssetLicense from "@/helpers/getAssetLicense";
import { ScaleIcon } from "@heroicons/react/24/outline";
import getPostData from "@hey/helpers/getPostData";
import type { PostMetadataFragment } from "@hey/indexer";
import { Card } from "@hey/ui";
import { memo } from "react";

interface MetadataProps {
  metadata: PostMetadataFragment;
}

const Metadata = ({ metadata }: MetadataProps) => {
  const filteredAsset = getPostData(metadata)?.asset;
  const license = getAssetLicense(filteredAsset?.license);

  if (!license) {
    return null;
  }

  return (
    <Card
      className="ld-text-gray-500 mt-3 space-y-2 px-3 py-2 text-sm"
      forceRounded
    >
      <div className="flex items-center space-x-2">
        <ScaleIcon className="size-4 min-w-max" />
        <div>
          Licence: <b>{license.label}</b>
        </div>
      </div>
    </Card>
  );
};

export default memo(Metadata);
