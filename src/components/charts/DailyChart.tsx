import { TimeRecordPoint } from "@/types/TimeRecordChartPoint";
import dynamic from "next/dynamic";
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
} from "recharts";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false },
);

interface DailyChartProps {
  data: TimeRecordPoint[];
}

export const DailyChart: React.FC<DailyChartProps> = ({ data }) => {
  const formatter = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours >= 1
      ? `${hours} 時間 ${minutes - hours * 60} 分 ${seconds - minutes * 60} 秒`
      : minutes >= 1
        ? `${minutes} 分 ${seconds - minutes * 60} 秒`
        : `${seconds} 秒`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <Tooltip formatter={formatter} />
        <Bar type="monotone" dataKey="totalTime" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
