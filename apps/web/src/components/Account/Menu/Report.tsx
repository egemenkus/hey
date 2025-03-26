import { useReportAccountModalStore } from "@/store/non-persisted/modal/useReportAccountModalStore";
import { MenuItem } from "@headlessui/react";
import { FlagIcon } from "@heroicons/react/24/outline";
import type { AccountFragment } from "@hey/indexer";
import cn from "@hey/ui/cn";

interface ReportProps {
  account: AccountFragment;
}

const Report = ({ account }: ReportProps) => {
  const { setShowReportAccountModal } = useReportAccountModalStore();

  return (
    <MenuItem
      as="div"
      className={({ focus }) =>
        cn(
          { "dropdown-active": focus },
          "m-2 flex cursor-pointer items-center space-x-2 rounded-lg px-2 py-1.5 text-sm"
        )
      }
      onClick={() => setShowReportAccountModal(true, account)}
    >
      <FlagIcon className="size-4" />
      <div>Report account</div>
    </MenuItem>
  );
};

export default Report;
