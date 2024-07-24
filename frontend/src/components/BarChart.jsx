import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as bardata } from "../data/mockData";
import { Box, Typography, useTheme, IconButton , useMediaQuery} from "@mui/material";
import Loader from "./Loader";
import { getFormatedCurrency } from "./common/Utils";
import { useGetBarChartStatsDataQuery } from "../slices/statsSlice";

const BarChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetBarChartStatsDataQuery();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // console.log(data);
  if (!data || isLoading) return <Loader />;
   const pieColors = [
      colors.greenAccent[500],
      colors.greenAccent[900],
      colors.greenAccent[300],
      colors.greenAccent[500],
     ];
     
    const formattedData =  Object.entries(data).map(
      ([_id, data, totalExpenseAmount ], i) => ({
        category: data._id,
        "Expected Budget": data.plannedBudget/100000,
        "Expected BudgetColor": pieColors[0],
        "Total Spent": data.totalExpenseAmount/100000,
        "Total SpentColor": pieColors[1],
      })
    );
  
  
  return (
    <Box style={{ height: isDashboard? "100% " : isNonMobile? "70vh" : "400px" , width: isDashboard? "100% " : "100%"}}>
    <ResponsiveBar
      data={formattedData}
      theme={{
        // added
        tooltip: {
          wrapper: {},
          container: {
            background: "#ffffff",
            color: "#000",
            fontSize: 12,
          },
        },
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
      }}
      groupMode="grouped"
      keys={["Expected Budget", "Total Spent"]}
      indexBy="category"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: 'set3' }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      // enableTotals={true}
      axisTop={null}
      axisRight={null}
      axisBottom={isDashboard || !isNonMobile ? null : {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "House Construction Category", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}

     
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "expense(in lakhs)", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          translateX: 70,
          translateY:isNonMobile? 50 : 40,
          itemsSpacing: 10,
          itemWidth: 120,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
    </Box>
  );
};

export default BarChart;