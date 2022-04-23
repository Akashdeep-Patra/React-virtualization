import "./styles.css";
import Window from "./components/Window";
import { motion } from "framer-motion";
import { FpsView } from "react-fps";
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

export default function App() {
  const [isVirtualizationEnabled, setIsVirtualizationEnabled] = React.useState(
    true
  );
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0
        }}
      >
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => setIsVirtualizationEnabled(e.target.checked)}
              checked={isVirtualizationEnabled}
            />
          }
          label={
            isVirtualizationEnabled
              ? "Virtualization Enabled"
              : "Virtualization Disabled"
          }
        />
      </div>
      <div className="App">
        <FpsView />
        <Window
          isVirtualizationEnabled={isVirtualizationEnabled}
          rowHeight={60}
        >
          {new Array(16000)
            .fill({})
            .map((_, index) => ({ id: index }))
            .map((it) => (
              <motion.li
                animate={{
                  scale: [0.89, 1]
                }}
                className="row"
                key={it.id}
              >
                {it.id}
              </motion.li>
            ))}
        </Window>
      </div>
    </>
  );
}
