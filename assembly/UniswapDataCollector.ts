import {UniswapSwap} from "./types/Uniswap";

export class UniswapDataCollector {

    // private page = 0;
    private limit = 1000;
    public beginingDate: i32;
    public endDate: i32;
    public poolAddress: string;

    public data: Array<UniswapSwap> = [];

    // Variables delivered from the node at epoch runtime
    constructor(beginingDate: i32, endDate: i32, poolAddress: string) {
        this.beginingDate = beginingDate;
        this.endDate = endDate;
        this.poolAddress = poolAddress;
    }

    // Here we have a callback system that should be agnostic to the data source,
    // any logic for params that change to handle datasets that require multiple calls should live here
    // The schema returned as the string is a rough idea atm, we would fine tune this
    public call(response?: Array<UniswapSwap> | null): [boolean, string] {
        if (response == null) { // Presumably the first call
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
                    "query getSwaps(address: ${this.poolAddress}, startDate: ${this.beginingDate}, endDate: ${this.endDate}, limit: ${this.limit}, skip: 0){
                        swaps(first: ${this.limit}, skip: 0, where: {
                            timestamp_gt: ${this.beginingDate}
                            timestamp_lt: ${this.endDate}
                            pool: ${this.poolAddress}
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
            // There is data being returned from a call, so we update and check if another call is needed
            if (response.length == 0) {
                // Here if we have updated to the point where there is no more data to return,
                // we return true to indicate that we are done. This means there is an extra superfluous 
                // call that does nothing but confirm we are done.
                return [true, ""];
            }
            else {
                //Here we add our data, and update the beginingDate
                this.data = this.data.concat(response);
                // We add one to not include the last
                this.beginingDate = this.data[this.data.length - 1].timestamp + 1;
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
                        "query getSwaps(address: ${this.poolAddress}, startDate: ${this.beginingDate}, endDate: ${this.endDate}, limit: ${this.limit}, skip: 0){
                            swaps(first: ${this.limit}, skip: 0, where: {
                                timestamp_gt: ${this.beginingDate}
                                timestamp_lt: ${this.endDate}
                                pool: ${this.poolAddress}
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

    // This function returns the full data set once collected as a string, this will also depend on how we pass the data to the bundle
    public getData(): string {
        return JSON.stringify(this.data);
    }

}