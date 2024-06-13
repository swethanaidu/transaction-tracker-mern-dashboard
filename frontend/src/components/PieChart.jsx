import React from "react";
import { ResponsivePie } from "@nivo/pie";
var data = [
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
  return (
    <div style={{ height: isDashboard? "100% " : "70vh", width: "100%" }}>
      <ResponsivePie
        data={data}
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
    </div>
  );
};

export default PieChart;
