import { PageLayout } from "@/components/Shared/PageLayout";
import GraphStatsShimmer from "@/components/Shared/Shimmer/GraphStatsShimmer";
import PostsShimmer from "@/components/Shared/Shimmer/PostsShimmer";

const GroupPageShimmer = () => {
  return (
    <PageLayout zeroTopMargin>
      <div className="container mx-auto">
        <div className="shimmer h-52 sm:h-64 md:rounded-xl" />
      </div>
      <div className="mb-4 space-y-8 px-5 md:px-0">
        <div className="flex items-start justify-between">
          <div className="-mt-24 sm:-mt-24 relative ml-5 size-32 bg-gray-100 sm:size-36">
            <div className="shimmer size-32 rounded-xl ring-3 ring-gray-50 sm:size-36 dark:bg-gray-700 dark:ring-black" />
          </div>
          <div className="shimmer h-[34px] w-20 rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="shimmer h-5 w-1/3 rounded-lg" />
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="shimmer h-3 w-7/12 rounded-lg" />
            <div className="shimmer h-3 w-1/3 rounded-lg" />
          </div>
          <GraphStatsShimmer count={1} />
        </div>
      </div>
      <PostsShimmer />
    </PageLayout>
  );
};

export default GroupPageShimmer;
