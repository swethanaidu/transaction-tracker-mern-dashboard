import React from "react";
import { tokens } from "../theme";
import { ResponsivePie } from "@nivo/pie";
import { useGetOverallStatsQuery } from "../slices/overallStatsApiSlice";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import Loader from "./Loader";
import { getFormatedCurrency } from "./common/Utils";
var mockdata = [
  {
    id: "Borewell work",
    label: "Borewell work",
    value: 415,
    color: "hsl(122, 70%, 50%)",
  },
  {
    id: "Construction work",
    label: "Construction work",
    value: 588,
    color: "hsl(325, 70%, 50%)",
  },
  {
    id: "Interiors",
    label: "Interiors",
    value: 307,
    color: "hsl(60, 70%, 50%)",
  },
  {
    id: "Additional Construction",
    label: "Additional Construction",
    value: 316,
    color: "hsl(51, 70%, 50%)",
  },
  {
    id: "Misc",
    label: "Misc",
    value: 420,
    color: "hsl(258, 70%, 50%)",
  },
];
const PieChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetOverallStatsQuery();
  // console.log(data);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!data || isLoading) return <Loader />;

  const pieColors = [
   colors.greenAccent[500],
   colors.greenAccent[900],
   colors.greenAccent[300],
   colors.greenAccent[500],
  ];
  const formattedData = Object.entries(data?.mappedPieData).map(
    ([category, cost], i) => ({
      id: category,
      label: category,
      value: cost,
      color: pieColors[i],
    })
  );
  // console.log(formattedData);
  return (
    <Box
    height={isDashboard ? "400px" : "100%"}
    width={undefined}
    minHeight={isDashboard ? "325px" : undefined}
    minWidth={isDashboard ? "325px" : undefined}
    position="relative">
      <ResponsivePie
        data={formattedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ theme: "background" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#FFF"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        theme={{
          tooltip: {
            wrapper: {},
            container: {
              background: "#ffffff",
              color: "#000",
              fontSize: 12,
            },
          },
        }}
       
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#FFF",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#FFF",
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h4">
          {!isDashboard && "Total:"} {getFormatedCurrency(data.yearlyExpenseTotal)}
        </Typography>
      </Box>
    </Box>
  );
};

export default PieChart;
