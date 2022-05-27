import {BigNumber} from 'ethers'
import {Position} from '@steerprotocol/uniswap-position-quoter'

export type Candle = {
  open: number,
  high: number,
  low: number,
  close: number,
  timestamp: number,
}

export type TickData = {
  index: number;
  value: string;
}

export type GraphToken = {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface UniswapSwap {
  id: string
  timestamp: string
  amount0: string
  amount1: string
  transaction: Transaction
  tick: string
  sqrtPriceX96: string
  sender: string
  recipient: string
  token0: Token0
  pool: Pool
  token1: Token1
  logIndex: string
  type: string
}

export interface Transaction {
  id: string
  blockNumber: string
}

export interface Token0 {
  decimals: string
  id: string
  name: string
  symbol: string
}

export interface Pool {
  liquidity: string
  feeTier: string
}

export interface Token1 {
  decimals: string
  id: string
  name: string
  symbol: string
}

export interface UniswapMint {
  id: string
  tickUpper: string
  tickLower: string
  amount0: string
  amount1: string
  amount: string
  timestamp: string
  owner: string
  timeStamp: string
  tokenID: string
  transaction: Transaction
  token0: Token0
  token1: Token1
  position: _Position
  type: string
}

export interface Token0 {
  decimals: string
  id: string
  name: string
  symbol: string
}

export interface _Position {
  owner: string
}

export interface UniswapBurn {
  id: string
  tickUpper: string
  tickLower: string
  amount0: string
  amount1: string
  amount: string
  timestamp: string
  owner: string
  timeStamp: string
  tokenID: string
  transaction: Transaction
  token0: Token0
  token1: Token1
  position: _Position
  type: string
}
