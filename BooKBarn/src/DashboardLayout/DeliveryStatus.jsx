import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Paper } from "@mui/material";

const deliverySteps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function DeliveryStatus() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate delivery progress update every 4 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < deliverySteps.length - 1) return prev + 1;
        clearInterval(interval); // Stop at final step
        return prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Delivery Progress
      </Typography>

      <Paper sx={{ p: 3 }}>
        {deliverySteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <Box
              key={step}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                opacity: isCompleted ? 0.6 : 1,
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "primary.main" : "text.primary",
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: isCompleted
                    ? "success.main"
                    : isActive
                    ? "primary.main"
                    : "grey.400",
                }}
              />
              <Typography>{step}</Typography>
            </Box>
          );
        })}

        <Box sx={{ mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={((currentStep + 1) / deliverySteps.length) * 100}
          />
        </Box>
      </Paper>
    </Box>
  );
}
