'use client';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';
import { hardhat } from 'viem/chains';
import { http, WagmiProvider } from 'wagmi';

const query = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const rainbowConfig = getDefaultConfig({
  appName: 'MintX',
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID as string,
  chains: [hardhat],
  transports: {
    [hardhat.id]: http(process.env.NEXT_PUBLIC_TESTNET_RPC_URL as string),
  },
  ssr: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={query}>
        <NextThemesProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
