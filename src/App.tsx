import {
  createAppKit,
  useAppKitEvents,
  useAppKitState,
  useAppKitTheme,
  CaipNetwork
} from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { http, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiHooks } from './WagmiHooks'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
// import { fantom } from 'viem/chains'

// 0. Setup queryClient for WAGMIv2
const queryClient = new QueryClient()

const projectId = '84bbdd9b4b3a87e8e8fefb1eaad97e2e'

const metadata = {
  name: 'AppKit',
  description: 'AppKit React Wagmi Example',
  url: '',
  icons: []
}

const fantomCaip: CaipNetwork = {
  chainId: 250,
  chainNamespace: "eip155",
  currency: "FTM",
  explorerUrl: "https://ftmscan.com",
  id: "eip155:250",
  name: "Fantom",
  rpcUrl: "https://rpcapi.fantom.network",
}
export const networks = [fantomCaip]

const connectors = []
connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
connectors.push(injected({ shimDisconnect: true }))
connectors.push(
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0]
  })
)

const wagmiAdapter = new WagmiAdapter({
  transports: {
    [fantomCaip.id]: http(),
  },
  connectors,
  projectId,
  // chains: [fantom],
  networks,
  ssr: false,
  pollingInterval: 500,
})

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  themeMode: 'dark',
})

export default function App() {
  const state = useAppKitState()
  const { themeMode, themeVariables } = useAppKitTheme()
  const events = useAppKitEvents()

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <w3m-button />
        <w3m-network-button />
        <WagmiHooks wagmiAdapter={wagmiAdapter} />
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <pre>{JSON.stringify({ themeMode, themeVariables }, null, 2)}</pre>
        <pre>{JSON.stringify(events, null, 2)}</pre>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
