import {UniswapSwap} from "./types/Uniswap";
import {
    timeSeries,
    window,
    duration,
    last,
    min,
    max,
    first,
    Index,
} from 'pondjs'
import {TimeAlignment} from 'pondjs/lib/types'

export class Uniswapv3Subgraph {

    public epochTimestamp: i32; 

    // Defaults
    private page = 0;
    private limit = 1000;
    private skip = 0;

    // Variables delivered from the node at epoch runtime
    constructor(epochTimestamp: i32) {
        this.epochTimestamp = epochTimestamp;
    }

    // GetSwaps persistant variables
    private GetSwaps_beginingDate: i32;
    private GetSwaps_endDate: i32;
    private GetSwaps_poolAddress: string;
    public GetSwaps_data: Array<UniswapSwap> = [];

    public GetSwaps(response: string | null, callConfig: JSON): [boolean, string] {

        if (!(callConfig.poolAddress == undefined && callConfig.period == undefined)) {
            throw new Error("Invalid call config");
        }

        if (response == null) { // Presumably the first call, initialize the variables
            this.GetSwaps_beginingDate = this.epochTimestamp - callConfig.period;
            this.GetSwaps_endDate = this.epochTimestamp;
            this.GetSwaps_poolAddress = callConfig.poolAddress;
            return [false, `{
                "name": "Uniswapv3 Subgraph",
                "method": "post",
                "url": {
                    "enpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
                    "variables": {}
                }
                "headers": {}
                "payload": {
                    "params": {},
                    "graphql": {
                    "query": 
                    "query getSwaps(address: ${this.GetSwaps_poolAddress}, startDate: ${this.GetSwaps_beginingDate}, endDate: ${this.GetSwaps_endDate}, limit: ${this.limit}, skip: 0){
                        swaps(first: ${this.limit}, skip: 0, where: {
                            timestamp_gt: ${this.GetSwaps_beginingDate}
                            timestamp_lt: ${this.GetSwaps_endDate}
                            pool: ${this.GetSwaps_poolAddress}
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
                    "variables": {}
                    }
                    "variables": {}
                }
            }`
                
            ];
        }

        else {

            // parse the response
            const new_response = JSON.parse(response);
            const new_swaps = new_response.data.swaps as Array<UniswapSwap>;

            // There is data being returned from a call, so we update and check if another call is needed
            if (new_swaps.length == 0) {
                // Here if we have updated to the point where there is no more data to return,
                // we return true to indicate that we are done. This means there is an extra superfluous 
                // call that does nothing but confirm we are done.
                return [true, null];
            }
            else {
                //Here we add our data, and update the beginingDate
                this.GetSwaps_data = this.GetSwaps_data.concat(new_swaps);
                // We add one to not include the last
                this.GetSwaps_beginingDate = this.GetSwaps_data[this.GetSwaps_data.length - 1].timestamp + 1;
                return [false, `{
                    "name": "Uniswapv3 Subgraph",
                    "method": "post",
                    "url": {
                        "enpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
                        "variables": {}
                    }
                    "headers": {}
                    "payload": {
                        "params": {},
                        "graphql": {
                        "query": 
                        "query getSwaps(address: ${this.GetSwaps_poolAddress}, startDate: ${this.GetSwaps_beginingDate}, endDate: ${this.GetSwaps_endDate}, limit: ${this.limit}, skip: 0){
                            swaps(first: ${this.limit}, skip: 0, where: {
                                timestamp_gt: ${this.GetSwaps_beginingDate}
                                timestamp_lt: ${this.GetSwaps_endDate}
                                pool: ${this.GetSwaps_poolAddress}
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
                        "variables": {}
                        }
                        "variables": {}
                    }
                }`]
            }
        }
    }

    public getGetSwapData(): Array<UniswapSwap> {
        // Wipe the data so if there is another call for swap data it will be fresh
        const temp = this.GetSwaps_data;
        this.GetSwaps_data = [];
        return temp;
    }

    public TransformSwapsToCandles(swaps: Array<UniswapSwap>, config: JSON): string {
        const swapData = swaps.map((d: any) => {
            return {
                index: d.timeStamp * 1000,
                value: Math.pow(1.0001,d.tick).toFixed(8),
            }
        });
        const series = timeSeries({
            name: 'swaps',
            columns: [...Object.keys(swapData[0])],
            points: swapData.map((point: any) => {
                return [...Object.values(point)].map(value => Number(value))
                }),
            })
        
            const windowRollup = series
            .fixedWindowRollup({
            window: window(duration(config.candleWidth * 1000)),
            aggregation: {
                high: ['value', max()],
                low: ['value', min()],
                close: ['value', last()],
                open: ['value', first()],
            },
            })
            .fill({
            fieldSpec: 'value',
            method: 2,
            })
        
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            const transformed = windowRollup
            .toJSON()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            .points.map((p: any) => {
            // Convert time range to timestamp of beginning of range
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            p[0] = new Index(p[0])
            .toTimeRange()
            .toTime(TimeAlignment.Begin)
            .toDate()
            .getTime()
            return p
            })
            .map((p: any) => {
            return {
                timestamp: p[0],
                high: p[1],
                low: p[2],
                close: p[3],
                open: p[4],
            }
            })
        
        return JSON.stringify(transformed);
        }
        
    }

}