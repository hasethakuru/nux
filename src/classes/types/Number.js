import RTError from "../runtime/RTError.js";

export default class Number {
    /**
     * Number
     * @param {number} value 
     */
    constructor (value) {
        this.value = value;
        this.setPosition()
        this.setContext();
    } 

    setPosition(start=null, end=null) {
        this.start = start;
        this.end = end;
        return this;
    }

    setContext(context) {
        this.context = context;
        return this;
    }

    addTo (num) {
        if(num instanceof Number) {
            return {
                data: new Number(this.value + num.value).setContext(this.context)
            }
        } 
    }

    subtractBy (num) {
        if(num instanceof Number) {
            return {
                data: new Number(this.value - num.value).setContext(this.context)
            }
        } 
    }

    multiplyBy (num) {
        if(num instanceof Number) {
            return {
                data: new Number(this.value * num.value).setContext(this.context)
            }
        } 
    }

    powedBy (num) {
        if(num instanceof Number) {
            return {
                data: new Number(this.value ** num.value).setContext(this.context)
            }
        }
    }

    dividedBy (num) {
        if(num instanceof Number) {
            if(num.value === 0) {
                return {
                    data: null,
                    error: true,
                    errorMessage: new RTError('Division by zero', this.start, this.end, this.context)
                }
            }
            return {
                data: new Number(this.value / num.value).setContext(this.context)
            }
        } 
    }

    toString () {
        return this.value.toString();
    }
    
}