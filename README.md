<p align="center"><a href="http://emanuelcapurro.com"><img src="https://i.ibb.co/z62TS9M/logo-removebg-preview.png"  width="420px" /></a></p>

# vue-tiny-store
![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")
![Vue 3.x](https://img.shields.io/badge/vue-3.x-green.svg "Vue 3 Compatible")

A very simple, elegant and easy alternative to vuex within less than 1.5kb

**Note:**
Vue 1.x is not  supported. 

## Usage

#### Install

Download "vue-tiny-store.min.js", after import and register Vue plugin:

```js
import Vue from 'vue'
import VueTinyStore  from "@/plugins/vue-tiny-store"

Vue.use(VueTinyStore,{
  stores: [ yourStores ],
})

```

#### Quickstart
Create your stores in separate files, for example  `counter.js`

```javascript
// Make a store for the "counter"
export default {
    // You must define the name of the individual store
    name: "counter",

    // The state of the counter
    state: {
        count: 0
    },

    /**
      All actions to mutate the counter state
    */
    increment() {
        this.state.count += 1
    },
    decrement() {
        this.state.count -= 1
    }
}
```

Reference store in `main.js` with `stores` parameter

```javascript
import VueTinyStore from "@/plugins/vue-tiny-store"
import counterStore from '@/store/counter'

Vue.use(VueTinyStore,{
  stores: [counterStore],
})
```

Finally, just manage global state in your components, without importing in each file of store. It's clean!

```javascript
<template>
  <div>
    <p>counter {{$state("counter").count}}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  methods:{
      increment(){
        this.$action('counter:increment')
      },
      decrement(){
        this.$action('counter:decrement')
      },
    }
}
</script>
```

#### Configuration

Vue Tiny Store takes 2 parameter: `(stores, [debug])`

##### Options

Parameter | Type |Default| Requiered | Description
--------- | ---- | ------|----------- |-----------
stores | `array` | `null` | `true` | Names or references of stores
debug | `boolean` | `false` | `false` | Watch debug events/actions into development console


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](http://opensource.org/licenses/MIT)

## Contact me
- email: [hola@emanuelcapurro.com](mailto:hola@emanuelcapurro.com)
- twitter: [@ecapurro_ok](https://twitter.com/ecapurro_ok)

## Author
Copyright © 2022 - [Emanuel Capurro](http://www.emanuelcapurro.com) 



