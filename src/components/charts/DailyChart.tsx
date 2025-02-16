import { TimeRecordPoint } from "@/types/TimeRecordChartPoint";
import dynamic from "next/dynamic";
import {
  XAxis,
  YAxis,
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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar type="monotone" dataKey="totalTime" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
