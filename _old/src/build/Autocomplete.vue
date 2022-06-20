<template>
    <div>
        <div id="names">
            <input type="text" v-model="filteredNames" placeholder="Type to filter the names">
            <ul>
                <li v-for="(name, index) in filtered" :key="index">{{name.name}}</li>
            </ul>
        </div>
        <div id="counter">
            <input type="number" v-model="counter">
            <p>Counter is being watched:</p>
            <p>{{counterText}}</p>
        </div>
        <div id="conversion">
            <div id="temp">
                <input type="radio" @click="updateTemp('fahrenheit')" id="Fahrenheit" name="conversion" value="fahrenheit" checked>
                <label for="Fahrenheit">Fahrenheit</label><br/>
                <input type="radio" @click="updateTemp('celcius')" id="Celsius" name="conversion" value="celsius">
                <label for="Celsius">Celsius</label>
            </div>
            <div id="result">
                <input type="number" v-model="temperature" id="convert">
                <p>{{result}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import NamesList from '../data/names'
    export default {
        data() {
            return {
                names: NamesList,
                filteredNames: '',
                temperature: 0,
                result: 0,
                radioBtn: 'fahrenheit',
                counter: 0,
                counterText: ''
            }
        },
        computed: {
            filtered() {
                return this.names.filter(el=>el.name.toLowerCase().indexOf(this.filteredNames.toLowerCase()) > -1)
            }
        },
        watch: {
            counter() {
                this.counterText = `Counter is ${this.counter}`
            },
            temperature() {
                this.updateTemp(this.radioBtn);
            }
        },
        methods: {
            updateTemp(val) {
                this.radioBtn = val
                if(val === 'fahrenheit') {
                    this.result = (((this.temperature-32)*5)/9).toFixed(2) + "C"
                } else {
                    this.result = ((this.temperature*1.8)+32).toFixed(2) + "F"
                }
            }
        },
    }
</script>

<style scoped>
    input {
        padding: 5px;
        margin-bottom: 10px;
    }
    ul {
        display: block;
    }
    #names, #counter, #conversion {
        float:left;
        margin-right: 50px;
        min-height: 400px;
    }
    #temp, #result {
        float: left;
        padding-right: 15px;
    }
</style>