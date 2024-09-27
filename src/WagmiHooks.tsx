import { useAppKitAccount } from '@reown/appkit/react'
import { readContract } from "@wagmi/core"
import { useAccount, useReadContract } from 'wagmi'
import abi from './abi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export function WagmiHooks({wagmiAdapter}: {wagmiAdapter: WagmiAdapter}) {
  const { address } = useAppKitAccount()
  const { isConnected, chainId } = useAccount()

  const {data: wagmiBalance, error, isLoading, isError, isLoadingError} = useReadContract({
    address: '0x493F7909E5CA979646Abb86A81a11701420B784F' as `0x${string}`,
    abi: abi,
    functionName: "getAllNFTs",
    args: [address as `0x${string}`],
  })

  const wagmiBalanceSum = (wagmiBalance as string[])?.reduce((sum, current) => sum + BigInt(current), 0n) || 0n

  const readBalance = async () => {
    const readParams = {
      address: '0x493F7909E5CA979646Abb86A81a11701420B784F' as `0x${string}`,
      abi: abi,
      functionName: "getAllNFTs",
      args: [address as `0x${string}`],
    }
    const balance = await readContract(wagmiAdapter.wagmiConfig, readParams)
    console.log(balance)
  }

  console.log("wagmiBalance", wagmiBalance)

  return (
    <div>
      {isConnected ? (
        <>
          <div>
            <p>Address: {address}</p>
            <p>Chain ID: {chainId}</p>
          </div>
          <div>
            <p>Balance: {wagmiBalanceSum.toString()}</p>
            <p>Error: {(error as any) ?? 'No error'}</p>
            <p>Is Loading: {isLoading ? 'Yes' : 'No'}</p>
            <p>Is Error: {isError ? 'Yes' : 'No'}</p>
            <p>Is Loading Error: {isLoadingError ? 'Yes' : 'No'}</p>
            <button onClick={readBalance}>Read Balance</button>
          </div>
        </>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  )
}
