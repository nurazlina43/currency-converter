<template>
<div id="index">
    <h1 id="main-heading">Currency Conversion</h1>
    <div id="input-container">
        <span class="input-text">Convert</span>
        <select id="from-currency" v-model="fromCurrency">
            <option value="">Select currency</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="GBP">Pound Sterling (GBP)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="AED">United Arab Emirates dirham (AED)</option>
        </select>

        <input type="number" id="amount" placeholder="Amount" v-model="amount">
        <span class="input-text">To</span>
        <select id="to-currency" v-model="toCurrency">
            <option value="">Select currency</option>
            <option value="AED">United Arab Emirates dirham (AED)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Pound Sterling (GBP)</option>
            <option value="USD">US Dollar (USD)</option>
        </select>

        <button type="button" id="convert-btn" @click="clickConvert()">Convert</button>
        <!-- <button type = "button" id = "clear-btn" @click = "clear()">Clear</button> -->

    </div>
    <div id="result-container" v-if="convertClicked">
        <h2 id="result" v-if="!loading">
            <span id="from-span">{{amount}} {{fromCurrency}}</span> = <span id="to-span">{{result}} {{toCurrency}}</span>
        </h2>
        <h2 v-else>Loading...</h2>
    </div>
</div>
</template>

<script>
//import { mapGetters } from 'vuex'
export default {
    name: 'Index', //App
    components: {
        //History,
    },
    data() {
        return {
            apiKey: 'da87694f32msh84ee7bf60ee75c2p18f40ejsn5fe58c757632',
            fromCurrency: '',
            toCurrency: '',
            amount: 0,
            result: 0,
            convertClicked: false,
            loading: false,
        }
    },
    methods: {

        clickConvert() {
            if (!(this.fromCurrency == '' || this.toCurrency == '' || (this.amount <= 0) || this.fromCurrency == this.toCurrency)) {
                this.convertClicked = true

            }
            this.convert()
        },

        convert() {
            if (this.fromCurrency == '' || this.toCurrency == '' || (this.amount <= 0) || this.fromCurrency == this.toCurrency) {
                alert("Please check your inputs and try again")
            } else {
                this.loading = true
                let uri = 'https://currency-exchange.p.rapidapi.com/exchange?from=' + this.fromCurrency + '&to=' + this.toCurrency + '&q=' + this.amount
                fetch(uri, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
                            "x-rapidapi-key": this.apiKey,
                            "useQueryString": true
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            response.json()
                                .then(response1 => {
                                    this.result = response1.result
                                    this.loading = false
                                    //this.$store.commit('addToHistory',{fromCurrency: this.fromCurrency, toCurrency: this.toCurrency, amount: this.amount, result: this.result})
                                })
                        }
                    })
                    .catch(err => {
                        alert("There was a problem fetching the results. Please try again." + err)
                    })
            }
        },

        clear() {
            this.amount = 0
            this.fromCurrency = ''
            this.toCurrency = ''
            this.convertClicked = false
        }
    },

    watch: {
        amount: function () {
            this.convertClicked = false
        },
        fromCurrency: function () {
            this.convertClicked = false
        },
        toCurrency: function () {
            this.convertClicked = false
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sen&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

* {
    margin: 0;
    padding: 0;
}

#index {
    width: 80%;
    margin: auto;
    text-align: center;
    padding: 50px;
}

#main-heading {
    padding: 15px;
    border-bottom: 2px solid #000;
    width: 80%;
    margin: auto;
    font-family: 'Sen', sans-serif;
}

#input-container {
    padding: 30px;
    text-align: center;
}

#from-currency,
#to-currency {
    border: 1px solid #ccc;
    padding: 10px;
    width: 150px;
    margin: 5px;
}

#amount {
    border: 1px solid #ccc;
    padding: 11px;
}

#result-container {
    padding: 15px;
    margin-top: 20px;
    font-family: 'Roboto', sans-serif;
}

#from-span {
    color: #DA3732;
}

#to-span {
    color: #008000;
}

#convert-btn,
#clear-btn {
    padding: 11px 15px;
    border: none;
    color: #f4f4f4;
    margin-top: 15px;
    border-radius: 5px;
}

#convert-btn {
    background-color: #008000;
    color: #fff
}

#clear-btn {
    color: #000;
}

.input-text {
    font-family: 'Roboto', sans-serif;
}
</style>
