interface Swap {
    id: string;
    timestamp: string;
    amount0: string;
    amount1: string;
    transaction: Transaction;
    tick: string;
    sqrtPriceX96: string;
}

interface Transaction {
    id: string;
    blockNumber: string;
}

export class SwapParser {
    public offset: u32 = 18;
    public max_len: u32;

    private endNext: boolean = false;
    constructor(private data: string) {
        this.max_len = u32(this.data.length - 2);
    }
    private getEnd(startOffset: u32): u32 {
        while (startOffset < <u32>this.data.length) {
            if (this.data.charCodeAt(startOffset) === 34) return startOffset;
            startOffset++;
        }
        return 0;
    }
    parse<T extends Swap>(): T[] {
        const offset = this.offset;
        this.offset = 18;
        const swaps = new Array<T>();
        while (true) {
            const swap = this.parseNextSwap<T>();
            if (!swap) break;
            swaps.push(swap);
        }
        this.offset = offset;
        return swaps;
    }
    parseTo<T extends Swap>(dst: T[]): void {
        const offset = this.offset;
        this.offset = 18;
        while (true) {
            const swap = this.parseNextSwap<T>();
            if (!swap) break;
            dst.push(swap);
        }
        this.offset = offset;
    }
    parseNextSwap<T extends Swap>(): T | null {
        if (this.endNext) return null;
        const swap = instantiate<T>();
        let shift: u32 = 0;
        swap.id = this.data.slice(this.offset + 7, this.offset + 80);
        swap.timestamp = this.data.slice(this.offset + 95, shift = this.getEnd(this.offset + 95));
        swap.amount0 = this.data.slice(shift + 13, shift = this.getEnd(shift + 14));
        swap.amount1 = this.data.slice(shift + 13, shift = this.getEnd(shift + 14));
        swap.transaction.id = this.data.slice(this.offset + 7, this.offset + 73);
        swap.transaction.blockNumber = this.data.slice(shift + 106, shift = this.getEnd(shift + 107));
        swap.tick = this.data.slice(shift + 11, shift = this.getEnd(shift + 12));
        swap.sqrtPriceX96 = this.data.slice(shift + 18, shift = this.getEnd(shift + 19));
        this.offset = shift + 3;
        if (this.offset === this.max_len) this.endNext = true;
        return swap;
    }
}