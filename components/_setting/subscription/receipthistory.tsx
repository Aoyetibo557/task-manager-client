import { formatDate } from "@/lib/utils/truncate";

type Props = {
  theme?: string;
  receipts?: [];
};

const tempReceipts = [
  {
    id: "1",
    name: "Essential (Monthly)",
    date: "2021-09-01",
    format: "PDF",
  },
  {
    id: "2",
    name: "Essential (Monthly)",
    date: "2021-09-01",
    format: "PDF",
  },

  {
    id: "3",
    name: "Essential (Monthly)",
    date: "2021-09-01",
    format: "PDF",
  },

  {
    id: "4",
    name: "Essential (Monthly)",
    date: "2021-09-01",
    format: "PDF",
  },

  {
    id: "5",
    name: "Essential (Monthly)",
    date: "2021-09-01",
    format: "PDF",
  },
] as any;

export const ReceiptHistory = ({ theme, receipts }: Props) => {
  return (
    <div
      className={`w-2/4 p-4 h-full flex flex-col gap-4 rounded-md golos-font receipt-container ${
        theme === "light"
          ? "bg-task-light-white text-task-dark"
          : "bg-task-sidebar-light-dark text-task-light-white"
      }`}>
      <div>Receipt History</div>

      <div className={`flex flex-col gap-4`}>
        {/* {receipts
          ? receipts.map((receipt, idx) => (
              <div
                key={receipt?.id}
                className={`flex flex-row items-center justify-between`}>
                <span>{receipt?.name}</span>
                <span>{receipt?.date}</span>
                <span>{receipt?.format}</span>
              </div>
            ))
          : tempReceipts.map((receipt) => (
              <div
                key={receipt?.id}
                className={`flex flex-row items-center justify-between border-b-[0.6px] border-neutral-500 p-4`}>
                <span>{receipt?.name}</span>
                <span>{receipt?.date}</span>
                <span>{receipt?.format}</span>
              </div>
            ))} */}
        {tempReceipts.map((receipt: any) => (
          <div
            key={receipt?.id}
            className={`flex flex-row items-center justify-between border-b-[0.6px] border-neutral-500 p-4`}>
            <span className={`text-sm`}>{receipt?.name}</span>
            <span className={`text-sm`}>{receipt?.date}</span>
            <span>{receipt?.format}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
