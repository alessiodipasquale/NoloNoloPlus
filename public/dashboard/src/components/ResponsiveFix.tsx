import React from "react";
import { ResponsiveContainer, ResponsiveContainerProps } from "recharts";

function ResponsiveFix(props: JSX.IntrinsicAttributes & ResponsiveContainerProps & React.RefAttributes<unknown>) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <ResponsiveContainer {...props} />
      </div>
    </div>
  );
}

export default ResponsiveFix;
