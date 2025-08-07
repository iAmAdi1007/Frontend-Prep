/* The Builder Design Pattern in JavaScript is used to construct complex objects step-by-step. It separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
This is especially useful when you have objects with many optional parameters or configurations.
*/

class Payment{
    currency: string;
    amount: number;
    constructor(){
        this.amount = 0;
        this.currency = 'Rupees';
    }
}

class Builder {
    payment: Payment;
    
    constructor(){
        this.payment = new Payment();
    }

    changeCurrency(newCurrency: string):this{
        this.payment.currency = newCurrency;
        return this;
    }

    addAmount(amount: number):this{
        this.payment.amount += amount;
        return this;
    }

    pay():void{
        console.log(`You are paying ${this.payment.currency} ${this.payment.amount}`)
    }
}

const builderObj = new Builder();

builderObj.addAmount(300).addAmount(900).changeCurrency('Dollar').pay();