import type { PostFragment } from "@hey/indexer";
import ThreadBody from "../ThreadBody";

interface CommentedProps {
  commentOn: PostFragment;
}

const Commented = ({ commentOn }: CommentedProps) => {
  return <ThreadBody post={commentOn} />;
};

export default Commented;
