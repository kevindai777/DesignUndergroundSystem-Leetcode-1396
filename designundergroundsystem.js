//Objective is to design an 'underground system' where customers check in and out
//of train stations


//Design of UndergroundSystem using two hashmaps
//checkIn: O(1) since we're just setting a pair into a hashmap
//checkOut: O(1) since we're just grabbing a pair out of a hashmap and doing some math
//average: O(1) since we're just grabbing a pair out of a hashmap

class UndergroundSystem {
    constructor() {
        this.train = new Map()
        this.avg = new Map()
    }

    checkIn(id, stationName, time) {
        this.train.set(id, [stationName, time])
    }

    checkOut(id, endStation, time) {
        let [startStation, start] = this.train.get(id)
        let key = [startStation, endStation].join(',')

        //First time this pair has occurred
        if (!this.avg.has(key)) {
            this.avg.set(key, [(time - start), 1])
        
        //Pair has occurred already, update the average
        } else {
            let [avg, freq] = this.avg.get(key)
            this.avg.set(key, [avg * freq / ++freq + (time - start) / freq, freq])
        }
    }

    average(startStation, endStation) {
        return this.avg.get([startStation, endStation].join(','))
    }
}