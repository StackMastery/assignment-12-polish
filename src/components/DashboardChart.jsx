import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/axiosSecure";
import { Skeleton } from "./ui/skeleton";
import { CartesianGrid, Line, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { LineChart } from "recharts";
import moment from "moment";

export default function DashboardChart() {
  const fetchDonationsStats = async () => {
    const { data } = await axiosSecure.get(`/dashboard/donations/chart`);
    const result = data.map((item) => {
      return {
        time: moment(item.date).fromNow(),
        count: item.count,
        date: item.date,
      };
    });
    return result;
  };

  const {
    data: donationsStats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donationsStats"],
    queryFn: fetchDonationsStats,
  });

  const chartConfig = {};

  return (
    <>
      <section className="flex w-full justify-center flex-col items-center pt-5">
        <div className="flex items-center w-full justify-between flex-wrap gap-5">
          <div>
            <h2 className="text-2xl font-semibold">Donations Chart</h2>
            <span className="w-[50px] h-1 bg-red-500 flex mt-2"></span>
          </div>
        </div>
        <div className="w-full mt-5">
          {isLoading && (
            <Skeleton
              className={`w-full min-h-[250px] rounded-xl border border-slate-300`}
            />
          )}
          {donationsStats && (
            <>
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={donationsStats}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[200px]"
                        nameKey="time"
                      />
                    }
                  />
                  <Line
                    stroke="red"
                    dataKey={"count"}
                    type="monotone"
                    strokeWidth={2}
                    dot={false}
                    name="Donations"
                  />
                  <Line
                    stroke="#ef4444"
                    dataKey={"time"}
                    type="monotone"
                    strokeWidth={2}
                    dot={false}
                    name="Time"
                  />
                </LineChart>
              </ChartContainer>
            </>
          )}
        </div>
      </section>
    </>
  );
}
