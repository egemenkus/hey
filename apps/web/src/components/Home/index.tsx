import NewPost from "@/components/Composer/NewPost";
import ExploreFeed from "@/components/Explore/ExploreFeed";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { useHomeTabStore } from "@/store/persisted/useHomeTabStore";
import { HomeFeedType } from "@hey/data/enums";
import { GridItemEight, GridItemFour, GridLayout } from "@hey/ui";
import FeedType from "./FeedType";
import ForYou from "./ForYou";
import Hero from "./Hero";
import Highlights from "./Highlights";
import Sidebar from "./Sidebar";
import Timeline from "./Timeline";

const Home = () => {
  const { currentAccount } = useAccountStore();
  const { feedType } = useHomeTabStore();

  const loggedInWithProfile = Boolean(currentAccount);

  return (
    <>
      {!loggedInWithProfile && <Hero />}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {loggedInWithProfile ? (
            <>
              <NewPost />
              <FeedType />
              {feedType === HomeFeedType.FOLLOWING ? (
                <Timeline />
              ) : feedType === HomeFeedType.HIGHLIGHTS ? (
                <Highlights />
              ) : feedType === HomeFeedType.FORYOU ? (
                <ForYou />
              ) : null}
            </>
          ) : (
            <ExploreFeed />
          )}
        </GridItemEight>
        <GridItemFour>
          <Sidebar />
        </GridItemFour>
      </GridLayout>
    </>
  );
};

export default Home;
