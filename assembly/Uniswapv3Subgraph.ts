// import {UniswapSwap} from "./types/Uniswap";
import { JSON } from "assemblyscript-json";

export class Uniswapv3Subgraph {

    public epochTimestamp: i32; 

    // Defaults
    private page: i32 = 0;
    private limit: i32 = 1000;
    private skip: i32 = 0;

    public data: Array<JSON.Value> = [];

    // Variables delivered from the node at epoch runtime
    constructor(epochTimestamp: i32) {
        this.epochTimestamp = epochTimestamp;
    }

    // GetSwaps persistant variables
    private GetSwaps_beginingDate: i32;
    // public GetSwaps_data: Array<UniswapSwap> = [];

    public getUniswapSwap(response: string, poolAddress: string, period: i32): string {
        
        if (response == '') { // Presumably the first call, initialize the variables
            this.GetSwaps_beginingDate = this.epochTimestamp - period;
            return this.GetSwaps_beginingDate.toString();
            // this.GetSwaps_endDate = this.epochTimestamp;
            // this.GetSwaps_poolAddress = callConfig.poolAddress;
            return `{
                "method": "post",
                "url": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
                "headers": {},
                "data": {
                    "variables": {},
                    "operationName": "getSwaps",
                    "query": "query getSwaps(address: `+ poolAddress+`, startDate: `+this.GetSwaps_beginingDate.toString() + `, endDate: `+ this.epochTimestamp.toString()+`, limit: `+this.limit.toString()+ `, skip: 0){
                        swaps(first:`+ this.limit.toString() + `, skip: 0, where: {
                            timestamp_gt: `+this.GetSwaps_beginingDate.toString()+`
                            timestamp_lt: `+this.epochTimestamp.toString()+`
                            pool: `+poolAddress+`
                            }, orderBy: timestamp, orderDirection: asc){
                            id
                            timestamp
                            amount0
                            amount1
                            transaction {
                                id
                                blockNumber
                            }
                            tick
                            sqrtPriceX96
                            }
                        }
                    }",
                    }
                }
            }`;
        }

        else {

            // parse the response
            const new_response = <JSON.Obj>JSON.parse(response);
            const new_data = new_response.getObj("data");
            if (new_data == null) {throw new Error("No data in response");}
            const new_arr = new_data.getArr("swaps");
            if (new_arr == null) {throw new Error("No swaps in response");}
            const new_swaps = new_arr._arr;
            // const new_swaps = new_response.data.swaps as Array<UniswapSwap>;

            // There is data being returned from a call, so we update and check if another call is needed
            if (new_swaps.length == 0) {
                // Here if we have updated to the point where there is no more data to return,
                // we return true to indicate that we are done. This means there is an extra superfluous 
                // call that does nothing but confirm we are done.
                return "true";
            }
            else {
                //Here we add our data, and update the beginingDate
                this.data = this.data.concat(new_swaps);
                // We add one to not include the last
                const last_swap = <JSON.Obj>this.data[this.data.length - 1];
                const timestamp = last_swap.getNum("timestamp");
                if (timestamp == null) {throw new Error("No timestamp in last swap");}
                this.GetSwaps_beginingDate = i32(timestamp._num + 1);
                return `{
                    "method": "post",
                    "url": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
                    "headers": {},
                    "data": {
                        "variables": {},
                        "operationName": "getSwaps",
                        "query": "query getSwaps(address: ${poolAddress}, startDate: ${this.GetSwaps_beginingDate.toString()}, endDate: ${this.epochTimestamp.toString()}, limit: ${this.limit.toString()}, skip: 0){
                            swaps(first: ${this.limit.toString()}, skip: 0, where: {
                                timestamp_gt: ${this.GetSwaps_beginingDate.toString()}
                                timestamp_lt: ${this.epochTimestamp.toString()}
                                pool: ${poolAddress}
                                }, orderBy: timestamp, orderDirection: asc){
                                id
                                timestamp
                                amount0
                                amount1
                                transaction {
                                    id
                                    blockNumber
                                }
                                tick
                                sqrtPriceX96
                                }
                            }
                        }",
                        }
                    }
                }`
            }
        }
    }

    // public getGetSwapData(): Array<UniswapSwap> {
    //     // Wipe the data so if there is another call for swap data it will be fresh
    //     const temp = this.GetSwaps_data;
    //     this.GetSwaps_data = [];
    //     return temp;
    // }

    // public TransformSwapsToCandles(swaps: Array<UniswapSwap>, config: JSON): string {
    //     const swapData = swaps.map((d: any) => {
    //         return {
    //             index: d.timeStamp * 1000,
    //             value: Math.pow(1.0001,d.tick).toFixed(8),
    //         }
    //     });
    //     const series = timeSeries({
    //         name: 'swaps',
    //         columns: [...Object.keys(swapData[0])],
    //         points: swapData.map((point: any) => {
    //             return [...Object.values(point)].map(value => Number(value))
    //             }),
    //         })
        
    //         const windowRollup = series
    //         .fixedWindowRollup({
    //         window: window(duration(config.candleWidth * 1000)),
    //         aggregation: {
    //             high: ['value', max()],
    //             low: ['value', min()],
    //             close: ['value', last()],
    //             open: ['value', first()],
    //         },
    //         })
    //         .fill({
    //         fieldSpec: 'value',
    //         method: 2,
    //         })
        
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-ignore
    //         const transformed = windowRollup
    //         .toJSON()
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-ignore
    //         .points.map((p: any) => {
    //         // Convert time range to timestamp of beginning of range
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         p[0] = new Index(p[0])
    //         .toTimeRange()
    //         .toTime(TimeAlignment.Begin)
    //         .toDate()
    //         .getTime()
    //         return p
    //         })
    //         .map((p: any) => {
    //         return {
    //             timestamp: p[0],
    //             high: p[1],
    //             low: p[2],
    //             close: p[3],
    //             open: p[4],
    //         }
    //         })
        
    //     return JSON.stringify(transformed);
    //     }
        
    }

