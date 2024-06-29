import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import Loader from "./Loader";
import { mockLineData as Linedata } from "../data/mockData";
import { useGetMonthlyStatsDataQuery } from "../slices/statsSlice";
import { useGetBarChartStatsDataQuery } from "../slices/statsSlice";
import { useMemo } from "react";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetMonthlyStatsDataQuery();
  // console.log(data);
  const [totalMonthlyExpensesLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalMonthlyExpensesLine = {
      id: "2024",
      color: colors.greenAccent[500],
      data: [],
    };
    totalMonthlyExpensesLine.data = Object.entries(data).map(
      ([_id, data ], i) => ({
        x: data.Month,
        y: data.totalCost/100000,
      })
    );
    // Object.values(monthlyData).reduce(
    //   (acc, { Month, totalCost }) => {
    //     // const curSales = acc.sales + totalSales;
    //     // const curUnits = acc.units + totalUnits;

    //     totalMonthlyExpensesLine.data = [
    //       ...totalMonthlyExpensesLine.data,
    //       { x: Month, y: totalCost },
    //     ];
         

    //     return { Month: Month, totalCost: totalCost };
    //   },
    //   { Month: "", totalCost: 0 }
    // );
   
    return [[totalMonthlyExpensesLine]];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(totalMonthlyExpensesLine);
  if (!data || isLoading) return <Loader />;

  return (
    <div style={{ height: isDashboard? "100% " : "70vh", width: "100%" }}>
    <ResponsiveLine
      data={totalMonthlyExpensesLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Monthly report for the year - 2024", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Expenses in lakhs", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    </div>
  );
};

export default LineChart;