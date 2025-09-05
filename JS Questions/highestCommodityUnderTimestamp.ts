class Commodity {
    private map: Map<string, string[]>;
    constructor() {
        this.map = new Map();
    }

    addCommodity(timestamp: string, commodityPrice: string): void {
        if (!this.map.has(timestamp)) {
            this.map.set(timestamp, [commodityPrice])
        } else {
            const maxCommodityPrice = this.map.get(timestamp) || [];
            this.map.set(timestamp, [Math.max(Number(commodityPrice), Number(maxCommodityPrice[0])).toString()])
        }
    }

    addCheckpoint(timestamp: string, checkpoint: string): void {
        const prices = this.map.get(timestamp);
        prices?.push(checkpoint);
    }

    getHighest(timestamp: string): string {
        const price = this.map.get(timestamp);
        return price ? price[0] : 'No commodity exists at given timestamp'
    }

    getHighestTillCheckpoint(timestamp: string, checkpoint: string): string {
        const prices = this.map.get(timestamp);
        if (!prices) {
            return 'No commodity exists at given timestamp';
        }
        const index = prices.findIndex(e => e === checkpoint);
        if (index === -1 || index === 0) {
            return 'No commodity exists before the given checkpoint';
        }
        return prices[index - 1];
    }
}