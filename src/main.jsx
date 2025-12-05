import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {
  AppKitProvider,
  createAppKit
} from "@reown/appkit/react";

import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, sepolia } from "@reown/appkit/networks";

const projectId = "0c6b589fefb7f15b69f8a04bee6bd360";

const appkit = createAppKit({
  adapters: [new EthersAdapter()],
  projectId,
  metadata: { name: "Crossport" },
  networks: [mainnet, sepolia],
});

createRoot(document.getElementById("root")).render(
  <AppKitProvider instance={appkit}>
    <App />
  </AppKitProvider>
);