'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SELYO_QUEST from '@/constants/selyo-quest';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useState } from 'react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [tokenId, setTokenId] = useState(1);
  const [amount, setAmount] = useState(1);
  const [tokenURI, setTokenURI] = useState("");
  const { writeContract: mint } = useWriteContract();
  const { writeContract: burn } = useWriteContract();
  
  const fetchTokenURI = async () => {
    try {
      const { data } = useReadContract({
        address: SELYO_QUEST.ADDRESS as `0x${string}`,
        abi: SELYO_QUEST.ABI,
        functionName: 'uri',
        args: [tokenId],
      })
      setTokenURI(data)
    } catch (error) {}
  }
  
  const mintToken = async () => {
    try {
      mint({
        address: SELYO_QUEST.ADDRESS as `0x${string}`,
        abi: SELYO_QUEST.ABI,
        functionName: 'mint',
        args: [address, tokenId, amount]
      });
    } catch (error) {}
  }
  
  const burnToken = async () => {
    try {
      burn({
        address: SELYO_QUEST.ADDRESS as `0x${string}`,
        abi: SELYO_QUEST.ABI,
        functionName: 'burnBadge',
        args: [tokenId, amount]
      });
    } catch (error) {}
  }

  return (
    <main className='bg-black'>
      <section className='flex justify-center items-center min-h-screen outline'>
        <div className='flex flex-col justify-center items-center h-full'>
          <div>
            <Card className='bg-black p-20 border border-zinc-700'>
              <CardHeader>
                <CardTitle className='text-8xl font-bold text-center text-white'>
                  Selyo Quest
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col justify-center items-center gap-4'>
                <ConnectButton />
                {isConnected && (
                  <>
                    <div className="mt-5">
                      <input
                        type="number"
                        value={tokenId}
                        onChange={(e) => setTokenId(Number(e.target.value))}
                        className="border px-2 py-1 rounded"
                        placeholder="Token ID"
                      />
                      <Button onClick={fetchTokenURI} className="ml-2 px-4 py-2 bg-green-600 text-white rounded">
                        Get Token URI
                      </Button>
                    </div>

                    {tokenURI && <p className="mt-3">Token URI: {tokenURI}</p>}

                    <div className="mt-5">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border px-2 py-1 rounded"
                        placeholder="Amount"
                      />
                      <Button onClick={mintToken} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
                        Mint Token
                      </Button>
                      <Button onClick={burnToken} className="ml-2 px-4 py-2 bg-red-600 text-white rounded">
                        Burn Token
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
