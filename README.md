# vuejs-fundamentals

https://www.pluralsight.com/courses/vuejs-fundamentals
 
https://nodejs.org
npm install -g @vue/cli
 
vue --version
node --version
npm --version
 
https://marketplace.visualstudio.com/items?itemName=octref.vetur
https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets
https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en
 
---------------------------------------------------------------------
Start up.      Was working with vue 2.5.16
---------------------------------------------------------------------
cd build-a-bot-server
npm start
 
Localhost:8081/api/parts  
 
Root directory: npm run dev 
 
---------------------------------------------------------------------
Using the Vue CLI
---------------------------------------------------------------------
vue create <project-name> -d  // <--- Create a new project with the defaults (don't prompt for anything)
 
There is also a UI that can walk you through this process visually: 
Type: Vue ui 
 
---------------------------------------------------------------------
npm run dev // <-- Add --open to the dev script in package.json
 
 
Use Vue with a CDN:
 
<script src="https://cdn.jsdelivr.net/npm/vue "></script>
<body>
 
    <div id="app">
        <input type="text" v-model="name">
        <p>Hello {{name}}</p>
    </div>
 
    <script>
        new Vue({
            el: "#app",
            data() {
                return {
                    name: 'Tim'
                }
            }
        });
    </script>
 
</body>
 
-----------------------------------------------------------------------
 
main.js is the starting place for the app. 
It renders App (Index.html) and mounts #app (app.vue)
app.vue pulls in styles in the style section
 
-----------------------------------------------------------------------
Create a new vue file              ** vbase ** 
-----------------------------------------------------------------------
type vbase to start a new file 
 
<template>
  <div>
    Hello
  </div>
</template>
 
<script>
export default {
  name: 'HeroDetail', //<-- give it a name 
};
</script>
 
we give it a name and now we can use it in another vue file...
 
import HeroDetail from '../components/heros-detail'; // <-- Import it 
 
add it to the components section...
 
type vcomponents
 
components: {
  HeroDetail,
},
 
Use it in the code...
 
<HeroDetail />
 
-----------------------------------------------------------------------
Add a nested component 
-----------------------------------------------------------------------
create a .vue file with the HTMl you need 
 
In the parent, import the file and include it in the components section, then it can be used like an html tag...
 
<script>
import HeaderBar from '@/components/header-bar'; //<-- Import it
import NavBar from '@/components/navbar';
 
export default {
  name: 'App',
  components: { HeaderBar, NavBar },  //<-- Declare it 
};
</script>
 
//and use it in the HTML
 
<NavBar /> //<-- Use it
 
-----------------------------------------------------------------------
V-html - Render HTML
-----------------------------------------------------------------------
 
If you need to render HTML markup use v-html
 
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
 
 
-----------------------------------------------------------------------
Pass values from parent to child with Props
-----------------------------------------------------------------------
04-component-communication/vue-heroes/src/components/heroes
04-component-communication/vue-heroes/src/components/heros-detail 
 
On the parent (heroes.vue), we can pass an object down to the child, binding it to the hero variable...
 
<HeroDetail v-if="selectedHero" :hero="selectedHero" /> //<-- we use binding here because we are evaluating an expression. Otherwise we don't need the colon.
 
in the child, type vprops to build out the props section...
 
<script>
export default {
  name: 'HeroDetail',
  props: {
    hero: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
 
--- Or just simply ---
 
props: ['hero']
 
 
the variable hero holds the information from the parent. It is an object and we initialize it.
 
-----------------------------------------------------------------------
Prop Validation
-----------------------------------------------------------------------
Validate the props that are being passed in...
 
props: {
  position: {
    type: String,
    required: true,
    validator(value) {
      return ['left', 'right', 'top', 'bottom', 'center'].includes(value) 
    },
  },
}, 
 
 
-----------------------------------------------------------------------
Passing objects in props 
-----------------------------------------------------------------------
04-component-communication/vue-heroes/src/components/heroes
04-component-communication/vue-heroes/src/components/heros-detail 
 
If we try to change the value of an object in the child, we will see this error: 
"Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders."
 
We don't want to modify data directly from the parent to child. So we clone it.
 
props: {
  hero: {
    type: Object,
    default: () => {},
  },
},
data() {
  return {
    clonedHero: { ...this.hero }, //<-- we can do a shallow copy with destructuring since our object is only 1 level deep
  };
},
 
and then we change 'hero' in our heros-detail file to be 'clonedHero'
 
Now if we change the name in the app, we are only changing the value in the child, not the parent. 
We can verify this in the vue tab of the debugger. Change a name and look at the object of the parent. 
It has not been changed. But look at the child component. It HAS changed there.
 
-----------------------------------------------------------------------
Passing data from child to parent with Emit
-----------------------------------------------------------------------
 
In the child we emit an event:
this.$emit('partSelected', this.selectedPart) //<-- emit a value from a computed property
 
And we define the emit like this...
emits: ['partSelected'],
 
In the parent, we listen for that event when we call the child:
<PartSelector @partSelected="part => selectedRobot.rightArm = part" />
 
-----------------------------------------------------------------------
Data bindimg with v-bind 
-----------------------------------------------------------------------
01-data-and-events/vue-heroes/sr/components/header-bar-links.vue
 
v-bind shortcut is :
 
In header-bar-links.vue, we have this html:
 
<a :href="github" target="_blank" rel="noopener noreferrer">
 
We use v-bind with ':' and specify an alias for the href value.
 
After the template tag, type script and select <script> javascript.vue 
 
That will build out this...
 
<script>
export default {
 
}
</script>
 
Inside of the export, give the model a name:
name: 'HeaderBarLink'
 
Then type vdata and we get this...
 
data() {
  return {
    key: value
  }
},
 
Then we make aliases for the hrefs:
 
github: 'https://github.com/johnpapa/vue-getting-started',
twitter: 'https://twitter.com/john_papa'
 
 
final result:
 
 
<script>
export default {
  name: 'HeaderBarLinks',
  data() {
    return {
      github: 'https://github.com/johnpapa/vue-getting-started',
      twitter: 'https://twitter.com/john_papa'
    }
  },
}
</script>
 
 
-----------------------------------------------------------------------
Displaying Text
-----------------------------------------------------------------------
02-lists-and-conditionals/vue-heroes/src/components/heroes.vue 
 
at the bottom of the file, built out script and type vbind
 
return a hero object
We use interpolation here to display the values
 
{{ hero.firstName }}
{{ hero.id }}
 
<script>
export default {
  name: 'Heroes',
  data() {
    return {
      hero: {
        id: 17,
        firstName: 'Maleah',
        lastName: 'Nooteboom',
        description: 'the dancer',
        capeColor: '',
        power: '',
        active: true,
      },
      message: '',
    };
  },
};
</script>
 
 
-----------------------------------------------------------------------
Event Binding
-----------------------------------------------------------------------
02-lists-and-conditionals/vue-heroes/src/components/heroes.vue
 
 
v-on:<event>="method-name"
Shortcut is @
@click="cancel"          // <-- Parens here are optional
 
under the data() object, type vmethod to build out the method syntax
 
methods: {
  cancel() {
    this.message = '';
  },
  save() {
    this.message = JSON.stringify(this.hero, null, '\n');
  },
},
 
-----------------------------------------------------------------------
V-Model: Two way binding
-----------------------------------------------------------------------
02-lists-and-conditionals/vue-heroes/src/components/heroes.vue
 
 
Add v-model to the element that should have 2 way binding. 
A binding between a value in our template to a value in our data property. 
 
<input class="input" id="firstName" v-model="hero.firstName" />
 
Now when we load the page, the input is pre-populated with the value and changes when we type 
 
Modifiers that can be used with v-model:
 
.lazy //by default, vue syncs with any input event (change, blur, focus). When we add .lazy it only syncs with change
.number          //only accepts numbers
.trim    //removes leading and trailing whitespace characters
 
 
-----------------------------------------------------------------------
V-Model with Components
-----------------------------------------------------------------------
We can have a 2-way binding with a parent and child. 
More info here: https://learnvue.co/2021/01/everything-you-need-to-know-about-vue-v-model/
 
PARENT - 
 
<custom-text-input v-model="value" />
 
Or we can give it a name: 
 
<custom-text-input v-model:name ="value" />
 
IS THE SAME AS
 
<custom-text-input 
   :modelValue="value" //<-- If no name is given, it is modelValue
   @update:modelValue="value = $event"
/>
 
CHILD - 
 
We have to do two things:
1) Accept the v-model value as a prop
2) Emit an update event when the input changes (declare the emit)
 
props: ['parts']
 
--- OR ---
 
props: {
  modelValue: String,
}
 
emits: ['update:modelValue'],
 
<template>
  <div>
    <label> First Name </label>
    <input 
      type='text'
      placeholder='Input'
      :value='modelValue' //<-- modelValue is the default name if none is given
      @input='$emit("update:modelValue", $event.target.value)'
    />
  </div>
</template>
 
 
-----------------------------------------------------------------------
Dynamic components
-----------------------------------------------------------------------
 
If you’ve ever wanted the option to switch between two arbitrary components mounted in the DOM without creating routes, you may want to employ dynamic components.
 
Vue dynamic components enable users to switch between two or more components without routing, and even retain the state of data when switching back to the initial component.
 
<component v-bind:is=”currentComponent”/>
Or
<component v-bind:is=”currentComponent”></component>
 
 
See an example here: src/views/registration/components/registration-step1.vue
 
data() {
  return {
    strSignIn: {
      template: `<span>${this.$strings.registration.SIGN_IN}</span>`,
      components: { CjLink },
    }
  }
}
 
- it is used like this - 
 
<component :is="strSignIn" />
 
-----------------------------------------------------------------------
Refs using Options API
-----------------------------------------------------------------------
 
Vue Template Refs give our Javascript code a reference to easily access the template. For example, if we needed quick access to a component or HTML element, template refs is the perfect solution.
 
<template>
  <div>
    <input 
      type="text"
      placeholder="Start typing..."
      ref="input" //<-- Create a unique name as a string
    />
  </div>
</template>
 
<script>
export default {
  mounted() {
    // the first life cycle hook that refs are available is mounted
    // access our input using template refs, then focus
    // this.$refs.input.focus()
    this.$refs["input"].focus() //<-- Can also be called this way  
  }
}
</script>
 
-----------------------------------------------------------------------
Refs using Composition API
-----------------------------------------------------------------------
 
In Vue 3, the Composition API gives us another way to use template refs. It joins the concept of reactive refs and template refs giving us just one syntax in our Javascript for both situations.
 
import { ref, onMounted } from 'vue'
export default {
  setup () {
    const input = ref(null)
 
    onMounted(() => {
      input.value.focus()
    })
    
    return {
      input
    }
  }
}
 
-----------------------------------------------------------------------
Class / Style Binding
-----------------------------------------------------------------------
We use the v-bind shortcut to use a style binding 
 
:style="{ 'background-color': hero.capeColor }"
 
This can also be bound to a computed property:
 
:style="headerBorderStyle"
 
computed: {
  headerBorderStyle() {
    return { border: '1px solid red' }
  }
}
 
There can be more computed properties too...
 
:style="[headerBorderStyle, moreStyles]"
 
 
Assign a class based on an expression or a computed property
 
:class="{ invalid: !hero.power }" //<-- class name : expression
 
We can also add multiple classes this way and include a computed property...
 
:class="[borderClass, 'top', 'part']"  //<-- add a computed prop and other classes
 
computed: {
  borderClass() {
    return this.selectedRobot.head.onSale ? 'sale-border' : '';
  }
}
 
-----------------------------------------------------------------------
Key bindings
-----------------------------------------------------------------------
Look for when a key is pressed (the escape key) and call a function 
 
@keyup.esc="clearPower"
 
 
-----------------------------------------------------------------------
Directives
-----------------------------------------------------------------------
V-for: is used to loop through elements...
 
<li v-for="hero in heroes" :key="hero.id">
 
 
V-if: conditionally renders the DOM. If this is not true, it does not show up in the DOM
 
<div class="columns" v-if="selectedHero"> //<-- Will only show this div if expression = true 
 
V-if
V-else-if
V-else
 
V-show: It always shows in the DOM, but with a display: none if it is false
 
<div class="columns" v-show="selectedHero"> 
 
 
 
 
-----------------------------------------------------------------------
 Computed Properties
-----------------------------------------------------------------------
03-interacting-within-a-component/vue-heroes/src/components/heroes.vue 
 
Fires only when any dependency values changes. In this example, when first name or last name is changed: https://guivern.hashnode.dev/vue-js-differences-between-computed-and-watch
 
Example:
 
computed: {
  fullName() {
    return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
  },
},
 
To stub out the code, we type vcomputed after the data() object 
 
-----------------------------------------------------------------------
CSS - Deep Selector >>>
-----------------------------------------------------------------------
 
A parent can style a child component (with the scoped attribute on the parent) as long as the element is the root of the child.
Otherwise we can use the deep selector. >>>
 
Example: 
<div class=“content”> //<— Parent can reach root element by default
            <div id=“name”> //<— Parent can reach nested child element with deep selector only // .content >>> #name
            </div>
</div>
 
-----------------------------------------------------------------------
Life Cycle Hooks 
-----------------------------------------------------------------------
03-interacting-within-a-component/vue-heroes/src/components/heroes.vue 
 
beforeCreate 
created - Dom not available, but can hit API
beforeMounted
mounted - Dom has been mounted. Interact with 3rd party components 
beforeUpdate
updated - Data changes 
beforeDestroyed
destroyed - Component goes away
 
We tap into the created life cycle hook (type vcreated) and run a function that prints a message and simulates
load time then returns our data...
 
created() {
  this.loadHeroes();
},
methods: {
  async getHeros() {
    return new Promise(resolve => {
      setTimeout(() => resolve(ourHeroes), 1500);
    });
  },
  async loadHeroes() {
    this.heroes = [];
    this.message = 'getting the heroes. please be patient';
    this.heroes = await this.getHeros();
    this.message = '';
  },
 
-----------------------------------------------------------------------
Watched Properties
-----------------------------------------------------------------------
03-interacting-within-a-component/vue-heroes/src/components/heroes.vue 
 
listen and respond to data changes with custom logic with a watcher
https://guivern.hashnode.dev/vue-js-differences-between-computed-and-watch
 
type vwatcher-options
 
watch: { // This runs every time capeCounter is changed 
  'selectedHero.capeCounter': { //<-- This needs to be quoted if there is a dot separator
    immediate: true,
    handler(newValue, oldValue) {
      console.log(`Watcher evaluated. Old=${oldValue}, New=${newValue}`);
      this.handleTheCapes(newValue);
    },
  },
},
 
-----------------------------------------------------------------------
Filters
-----------------------------------------------------------------------
03-interacting-within-a-component/vue-heroes/src/components/heroes.vue 
 
Create a filter to transform the output (not the model) that the user sees
 
type vfilter
 
//we included a package called date-fns to help with formatting the dates
This give us the function to transform our dates like this: format() //<-- pass in value and format 
filters: {
  shortDate: function(value) {
    return format(value, displayDateFormat);
  },
},
 
Use it like this...
 
<p class="comment">
  My origin story began on
  {{ selectedHero.originDate | shortDate }}
</p>
 
 
-----------------------------------------------------------------------
Non-Prop Attributes
-----------------------------------------------------------------------
https://v3.vuejs.org/guide/component-attrs.html
 
A component non-prop attribute is an attribute or event listener that is passed to a component, but does not have a corresponding property defined in props or emits. 
 
 
COMPONENT
<div class="date-picker">
  <input type="datetime-local" />
</div>
 
 
PARENT
<date-picker data-status="activated"></date-picker> //pass in data-status to child
 
 
THE RENDERED COMPONENT
<div class="date-picker" data-status="activated"> //data-status is passed in to the root node
  <input type="datetime-local" />
</div>
 
We can also pass in an event listener to a child and the event will be active on the root element of the child (The select tag). An emit does not need to be set up. The event can be handled on the parent:
 
COMPONENT (date-picker)
<select>
  <option value="1">Yesterday</option>
  <option value="2">Today</option>
  <option value="3">Tomorrow</option>
</select>
 
PARENT
  <date-picker @change="showChange"></date-picker> // pass the change event to the child
 
In the parent, we handle the event
 
methods: {
  showChange(event) {
    console.log(event.target.value) // will log a value of the selected option
  }
}
 
If we don't need the attributes to be passed to the root node, we can turn that off using inheritAttrs: false and put the attributes where we want using v-bind="$attrs"
 
COMPONENT
<div class="date-picker">
  <input type="datetime-local" v-bind="$attrs" /> // put the attributes on this element instead of the root node
</div>
 
 
PARENT
<date-picker data-status="activated"></date-picker> // pass in the data-status to child
 
 
THE RENDERED COMPONENT
<div class="date-picker"> 
  <input type="datetime-local" data-status="activated" /> // The attributes get put here with the v-bind="$attrs"
</div>
 
-----------------------------------------------------------------------
Pass information from Child to Parent 
-----------------------------------------------------------------------
04-component-communication/vue-heroes/src/components/heroes
04-component-communication/vue-heroes/src/components/heros-detail 
 
 
In our child component we want to pass info up to the parent. We do this by emitting an event. 
 
we emit events called 'save' and 'cancel' that the parent will be listening for...
 
saveHero() {
    this.$emit('save', this.clonedHero);
},
cancelHero() {
    this.$emit('cancel');
},
 
In the parent, we can listen for these events like this...
 
<HeroDetail v-if="selectedHero" :hero="selectedHero" @save="saveHero" @cancel="cancelHero" />
 
now we call the 'saveHero' and 'cancelHero' functions when these events fire...
 
the saveHero function now takes in the object passed from the child, so it will look like this...
 
saveHero(hero) {
  //use the hero object passed from the child 
},
 
Now test it in the app. Click on a component, change the name. Verify that the name changed in the child but
not the parent (in the dev tools). Now click save in the child and verify it changed in child and parent. 
 
-----------------------------------------------------------------------
Slots
-----------------------------------------------------------------------
https://v3.vuejs.org/guide/component-slots.html#slot-content
 
Vue slots let us pass template content to a child component
 
In parent component...
 
<component-name>
    Content goes here (any template markup)
</component-name>
 
In the child component...
Add a slot tag anywhere in the template and the content inside the components tag (from parent) gets added in the slot tag in the child. If nothing is passed from the parent, the default content is used in the child.
 
 
<template>
    <slot>Default Content</slot>
</template>
 
 
-- USING MULTIPLE SLOTS --
 
 
The child uses the name attribute for the slots
 
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>           // A slot with no name attr is named "default"
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
 
Now in the parent, we use v-slot directive for the slots
 
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
 
  <template v-slot:default>     //The slot that has no implicit name
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
 
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
 
 
 
-----------------------------------------------------------------------
Mixins
-----------------------------------------------------------------------
Mixins are used to share logic between components 
Ex: methods, components, computeds, data, watches and life cycle hooks 
 
Methods, compoents and computeds: They will be merged. If the exact one is already on the component, the component version is used.
Data: They are merged and we get a superset. Precedence given to the components data. 
Watch, Hooks: Both run, with mixins running before component 
 
In the heroes.vue file, we want to pull in the mixins...
 
type vmixin-use
 
we want to use 'lifecycleHooks' and 'heroWatchers'
 
components: {
    HeroDetail,
},
mixins: [lifecycleHooks, heroWatchers],
 
now we have to import them...
 
import { ourHeroes, lifecycleHooks, heroWatchers, logger } from '../shared';
 
-----------------------------------------------------------------------
Fetching data with Axios
-----------------------------------------------------------------------
05-accessing-data/vue-heroes/src/shared//data.js
 
download and import axios
create an async function 'getHeroes' to get the data from /public/api/heroes.json 
map over the data and format the dates and return the object 
 
import * as axios from 'axios';
import { format } from 'date-fns';
import { inputDateFormat } from './constants';
 
const getHeroes = async function() {
  const response = await axios.get('api/heroes.json');
  const heroes = response.data.map(h => {
    h.originDate = format(h.originDate, inputDateFormat);
    return h;
  });
  return heroes;
};
 
export const data = {
  getHeroes,
};
 
in the heroes.vue, call the 'getHeroes' function...
 
async loadHeroes() {
  this.heroes = [];
  this.message = 'getting the heroes, please be patient';
  this.heroes = await data.getHeroes();
  this.message = '';
}
 
 
-----------------------------------------------------------------------
Routing  <router-view></router-view>
-----------------------------------------------------------------------
router/index.js
 
npm install vue-router@4 --save
 
Specify the route and the component that it goes to, then import the component 
 
By convention we have our vue files that we use with router in the views folder. 
Nested components belong in components folder 
 
we replace our nested components with <router-view></router-view>
 
<Heroes /> 
 
becomes
 
<router-view></router-view>
 
The router view will display the components that match the current route in the URL
 
-----------------------------------------------------------------------
Navigation                   ** vroutepath
-----------------------------------------------------------------------
06-routing/vue-heroes/src/components/navbar.vue 
06-routing/vue-heroes/src/app.vue
 
use router links for navigation. 
We use this to build out the navbar. 
router links also gives us an active class that we can use to style 
 
<ul class="menu-list">
  <router-link to="/heroes">Heroes</router-link>    //<-- Use the shortcut vroutepath to build this out 
  <router-link to="/about">About</router-link>
</ul>
 
 
-----------------------------------------------------------------------
Route Parameters       **vroutenameparam
-----------------------------------------------------------------------
06-routing/vue-heroes/src/views/heroes.vue
 
Add a router link. Type vroutenameparam to build this out...
 
<router-link
  :to="{ name: 'hero-detail', params: { id: hero.id } }"
  tag="button"
  class="link card-footer-item"
> 

We can add this class to style our active link:
.router-link-active { color: #eee; }
The active link gets this class by default. 
 
********
We could also have a click event call a function and navigate through code: (See next section)
 
showPartInfo() {
  this.$router.push({ //add router info with code instead of with <router-link>
    name: 'Parts', 
      params: {
        id: this.selectedPart.id,
        partType: this.selectedPart.type
      }
    }) 
  }
********
 
In the router.js, add the last line about props to make sure to pass the id down to the child.
We also make sure the id is a number. r = route. 
 
{
  path: '/heroes/:id',
  name: 'hero-detail',
  component: HeroDetail,
  //props: true, // <-- We can just set props as true then we can use props to pass the information in.
  props: r => ({ id: parseInt(r.params.id) }),  // <-- We can also do this to have validation
},
 
If we choose to receive the route params via props, we would set this to 'true' as show above. 
Now in the child component, we can receive the params. 
 
First we receive them off the route:
 
computed: {
    part() {
        const {partType, id} = this.$route.params
        return parts[partType].find(part => part.id === +id) 
    },
},
 
Now since we are receiving them as props, we can add them as props and pull the values from 'this'
 
Props: ['partType', 'id'], //<-- Add the props. (We could add validation to the props as shown in next section)
computed: {
    part() {
        const {partType, id} = this //<-- Pull the props from 'this' instead of the route params
 
        return parts[partType].find(part => part.id === +id) 
    },
},
 
 
-----------------------------------------------------------------------
Navigating Routes via Code
-----------------------------------------------------------------------
06-routing/vue-heroes/src/views/hero-detail.vue 
 
When the 'save' and 'cancel' buttons were clicked, we emitted that event to the parent. Now we are using routes and we don't have
that parent/child relationship. 
 
  methods: {
    cancelHero() {
      this.$router.push({ name: 'heroes' }); // <-- This is how we manually go back to the heroes page. (The name is found in router.js)
    },
    async saveHero() {
      await dataService.updateHero(this.hero);
      this.$router.push({ name: 'heroes' }); // <-- This is how we manually go back to the heroes page. (The name is found in router.js)
    },
  },
 
-----------------------------------------------------------------------
Nested Routes
-----------------------------------------------------------------------
We can add a child array in the routes for nested routes
{
        path: '/parts/browse',
        name: 'BrowseParts',
        component: BrowseParts,
        children: [
            {
                name: 'BrowseHeads',
                path: 'heads',
                component: RobotHeads
            },
            {
                name: 'BrowseArms',
                path: 'arms',
                component: RobotArms
            }
            ]
}
 
In the Vue file, we can name a nested <router-view>
 
<template>
  <div>
    <h1>Browse Parts</h1>
    <ul class="menu">
      <li><router-link :to="{name: 'BrowseHeads'}">Heads</router-link></li>
      <li><router-link :to="{name: 'BrowseArms'}">Arms</router-link></li>
      <li><router-link :to="{name: 'BrowseTorsos'}">Torsos</router-link></li>
      <li><router-link :to="{name: 'BrowseBases'}">Bases</router-link></li>
    </ul>
    <router-view />
  </div>
</template>
 
-----------------------------------------------------------------------
Adding Validation to Props
-----------------------------------------------------------------------
 
Props: {
  partType: {type: String},
  id: {
    type: [Number, String],
    validator(value) {
      return Number.isInteger(Number(value)) 
    } 
  } 
}
 
-----------------------------------------------------------------------
Named Views (multiple <router-view> for a Vue file)
-----------------------------------------------------------------------
In App.vue we have this:
 
<div class="container">
  <aside class="aside">
    <router-view name="sidebar"/> //<-- We have a router view with a name
  </aside>  
  <main>
    <router-view/> //<-- A router view with no name has the name of 'Default' automatically
  </main>
</div>
 
In the routes, we can specify multiple components with the 'components' keyword and give the names:
 
    import SidebarBuild from '../sidebar/SidebarBuild' //<-- import the name of the vue file
    routes: [{
        path: '/',
        name: 'Home',
        components: { //<-- Change this to components and add an object. Now we can name our views and have multiple <router-view> tags in our file
            default: HomePage, //<-- If we have no name for the <router-view> it gets the name of 'default'
            sidebar: SidebarStandard
        }
    }

——————————————————————————————————————
Passing Routes info as params
——————————————————————————————————————
In the router we add props: true. Now we can accept the params as props 
 {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    props: true,
  }

In our Vue file we can access the router params as props:

  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },

 // we can also use a computed property with those props
  computed: {
    part() {
      const { partType, id } = this;
      return parts[partType].find((part) => part.id === +id);
    },
  },


-----------------------------------------------------------------------
Exact Matches for Routing
-----------------------------------------------------------------------
 
In the router link, we need to add the 'exact' keyword: 
 
<router-link class="nav-link" :to="{name: 'Home'}" exact>
 
If you don't like the .router-link-active class, we can also add 'active-class="foo"' to the router link.
Now we can have a class of 'foo' for our active class.
 
-----------------------------------------------------------------------
Route Guards
-----------------------------------------------------------------------
Keep a page from being displayed if an id is invalid. 
We can apply a guard on the route or a component.
 
Route:
{
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id))
        next(isValidId)
    }
}
 
Component: (RobotBuilder.vue)
beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true); // allow the navigation to leave the page
    } else {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-restricted-globals
      const response = confirm('You have not added your item to the cart. Are you sure you want to leave?');
      next(response);
    }
  },

 
-----------------------------------------------------------------------
Lazy Loading
-----------------------------------------------------------------------
06-routing/vue-heroes/src/router.js
 
We can choose to set up lazy loading so only that component will be loaded when called upon.
The eager syntax...
Just specify the component and import it. This is the default case if a page does not exist
 
{
  path: '*',
  component: PageNotFound,
},
 
Lazy Loading syntax...
 
component: () =>
            import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
 
-------------------------------------
The webpackChunkName is designed so you can lazy load several modules together instead of lazy loading every single one separately
 
{
  path: '/heroes',
  name: 'heroes',
  component: () =>
    import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
},
{
  path: '/heroes/:id',
  name: 'hero-detail',
  component: () =>
    import(/* webpackChunkName: "bundle-heroes" */ './views/hero-detail.vue'),
  props: r => ({ id: parseInt(r.params.id) }),
},
 
-----------------------------------------------------------------------
 Vuex   ** vue add vuex 
-----------------------------------------------------------------------
Mutation - Change the data in store. (Synchronous)
Action - Async call that commits mutations
Getters - Functions in the store that manipulates the data
 
dispatch Actions
commit Mutations
getters or state 
 
 
1) Add Vuex to the Vue app (store/index.js)
 
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
  },
});

 
2) Add default data to our Store (store/index.js)
 
export default new Vuex.Store({
    state: {
        cart: [],
    },
})
 
-----------------------------------------------------------------------
Adding data to the store with Mutations
-----------------------------------------------------------------------
src/store/modules/robots.js
 
mutations: {
  addRobotToCart(state, robot) {
    state.cart.push(robot);
  },
},
 
This mutation is getting called in /build/RobotBuilder.vue
this.$store.commmit('addRobotToCart', { ...robot, cost });
// commit the mutation on the store
 
-----------------------------------------------------------------------
Getting values from the store directly
-----------------------------------------------------------------------
 
Return values from the store in the ShoppingCart.vue file
 
computed: {
    cart() {
        return this.$store.state.cart
    },
},
 
-----------------------------------------------------------------------
Getting values with Getters
-----------------------------------------------------------------------
Getters are set up at the store level to do calculation and return data that is reusable
 
src/store/modules/robots.js
In the store...
 
getters: {
  cartSaleItems(state) {
    return state.cart.filter(item => item.head.onSale);
  },
},
 
 
src/cart/ShoppingCart.vue
In ShoppingCart.vue...
 
computed: {
    cartSaleItems() {
        return this.$store.getters.cartSaleItems
    }
},
 
Getters can also have an argument passed in: 
https://vuex.vuejs.org/guide/getters.html#method-style-access
 
 
-----------------------------------------------------------------------
Getting data from an API with an ACTION
-----------------------------------------------------------------------
cd build-a-bot-server
npm start
Localhost:8081/api/parts  
Root directory: npm run dev 
 
Now our data is not hard coded.
 
src/build/RobotBuilder.vue uses the Created hook to dispatch an Action (getParts).
 
created() {
  this.$store.dispatch('getParts')
},
 
This action pulls data from the API with Axios then commits the data 
With a mutation (updateParts)
 
actions: {
  getParts({ commit }) {
    axios.get('/api/parts').then(result => commit('updateParts', result.data)).catch(console.error)
  },
},
mutations: {
  updateParts(state, parts) {
    state.parts = parts;
  },   
},
 
 
In the following files (PartInfo, RobotArms, RobotBases, RobotHeads, RobotTorsos) we need to 
1) Dispatch an action (which gets the data from the API and calls the Mutation to update the store)
2) Retrieve the data from the store in a computed section
 
This is a great reason to have a mixin to do this for us. 
They all include the get-parts-mixin
 
created() {
    this.$store.dispatch('getParts')
},
computed: {
    parts() {
        return this.$store.state.parts || {
            heads: [],
            arms: [],
            torsos: [],
            bases: []
        }
    }
}
 
-----------------------------------------------------------------------
Adding an ACTION to save data to an API (call a mutation and update the store)
-----------------------------------------------------------------------
 
actions: {
  addRobotToCart({commit, state}, robot) {
     const cart = [...state.cart, robot] //Take what we have from the state and add to it
     axios.post('/api/cart', cart).then(() => commit('addRobotToCart', robot))
  }
},
mutations: {
  addRobotToCart(state, robot) { //update the store with the new data that we sent to the API
    state.cart.push(robot);
  },
},
 
In RobotBuilder.vue...
// dispatch an action that will commit the mutation
this.$store.dispatch(''addRobotToCart', { ...robot, cost }); 
 
 
If we want to redirect to the cart page after an item has been added, we can add a return statement to the axios post when that promise is resolved and add a ".then" to the action call to redirect to the cart.....
 
addRobotToCart({commit, state}, robot) {
   const cart = [...state.cart, robot]
   //add a return here to be alerted when the promise has been resolved
   return axios.post('/api/cart', cart).then(() => commit('addRobotToCart', robot))
} 
 
this.$store.dispatch('addRobotToCart', { ...robot, cost })
.then(() => this.$router.push('/cart')); // Add a '.then' here to redirect to the cart page
this.addedToCart = true;
 
-----------------------------------------------------------------------
Organize the store with Modules
-----------------------------------------------------------------------
 
Modules allow us to break up a store for maintainability so the file does not get too large
We created folders under store called modules and added our files there.
The store gets parsed out and added to these files. 
They are imported in the /store/index.js file
 
export default new Vuex.Store({
  modules: {
    robots: robotsModule,
    users: usersModule
  }
});
 
-----------------------------------------------------------------------
Name-spacing Modules
-----------------------------------------------------------------------
 
The state is always name-spaced. (You have to add the module name)...
return this.$store.state.robots.cart; //<-- We always have to have the module name in there (robots)
 
Mutation, Action, and Getters are only name-spaced if it is explicitly set: 
If a Mutation, Action or Getter is used, you do not have to explicitly call it, Vue will automatically look through all modules and execute all of them that match the name.
This may not be what we want!! 
 
Example:
If robots and users (modules from above) both had an Action, Mutation or Getter with the same name, all will be executed...
 
If they both had a mutation called 'addRobotToCart', both would be executed so we need to add a namespace to the module...
 
/store/modules/robots/robots.js
 
export default {
    name-spaced: true, //<-- add this flag so it will be name-spaced
    state: {
        cart: [],
        parts: null,
    },
...
 
Now that it is name-spaced, we will have to update our mutation (and Action, Getters) like this...
Src/build/RobotBuilder.vue
 
this.$store.dispatch('addRobotToCart', { ...robot, cost })
 
-- becomes --
 
this.$store.dispatch('robots/addRobotToCart', { ...robot, cost })
 
 
-----------------------------------------------------------------------
Module name-spaced with Getters
-----------------------------------------------------------------------
Using name-spacing with getters is a different syntax. We have to do this...
Src/cart/ShoppingCart.vue
 
 
cartSaleItems() {
  return this.$store.getters.cartSaleItems
}
 
-- becomes --
 
cartSaleItems() {
  return this.$store.getters['robots/cartSaleItems']
}
 
-----------------------------------------------------------------------
Accessing root state in a named module
-----------------------------------------------------------------------
src/store/modules/users.js
 
*Params* for actions and getters. We can destructure what we want to use here. Any combination of these params

State - The store in the current namespace
Getters - In no namespace, it is the getters in all instances, otherwise the getters in the current scope
rootState - Gives us access to the root state. Works with Actions too, but not Mutations
rootGetters - Gives us access to the root getters
 
getters: {
  foo(state, getters, rootState) { //<-- Look at the definitions above
    // return `users-getter/${state.foo}`; //<-- This gives us the state in the current module
    return `users-getter/${rootState.foo}`; //<-- This gives us the state in the root module
  }
},
 
-----------------------------------------------------------------------
Map state
-----------------------------------------------------------------------
We can use a helper to pull data from the store
 
src/App.vue
 
import { mapState } from 'vuex';
 
// computed: {
//   rootFoo() {
//     return this.$store.state.foo;
//   },
//   usersFoo() {
//     return this.$store.state.users.foo;
//   },
// }
 
VERSION ONE
————————
computed: {
  ...mapState({
    rootFoo: 'foo',
    usersFoo: state => state.users.foo, //<-- We have to use this because it is in a module (or the method below)
  }),
}
 
*** Or if we don't need to change the name, we can do this for rootFoo ***
 
...mapState(['foo']), // array syntax for no name changes

 VERSION TWO
————————-
//There is another syntax we can use for accessing namespaced states instead of using the state => syntax above

// robotsFoo() {
//   return this.$store.state.robots.foo;
// },
 
...mapState('robots', {robotsFoo: 'foo' }), //We have to do this for namespaced objects
 
*** Or if we don't need to change the name of the property, we can do this.., ***
 
...mapState('robots', ['foo'])
 
-----------------------------------------------------------------------
Map Getters
-----------------------------------------------------------------------
 
src/App.vue
 
Import { mapGetters } from 'vuex';
 
// computed: {
//   rootGetterFoo() {
//     return this.$store.getters.foo;
//   },
//   robotsGetterFoo() {
//     return this.$store.getters['robots/foo'];
//   },
// }
 
 
...mapGetters({ rootGetterFoo: 'foo' }),
...mapGetters( 'robots', { robotsGetterFoo: 'foo' }),
 
*** Or if we don't need to change the name of the property, we can do this.., ***
 
...mapGetters(['property1', 'property2', 'property3'])
 
*** Using namespaced getters ***
 
...mapGetters('namespace-title-here', ['property1', 'property2', 'property3'])
 
-----------------------------------------------------------------------
Map Actions
-----------------------------------------------------------------------
 
src/build/RobotBuilder.vue
 
 
Import { mapActions } from 'vuex'; 
 
Add this to the method section...
 
methods: {
//we are exposing the actions and we can call them below as methods (getParts) in the created section
//addRobotToCart is turned into a method and we call it in the last section below
  ...mapActions('robots', ['getParts', 'addRobotToCart']);
}
 
*** Or if we need to change the name of the property, we can do this with the object syntax.., ***
 
...mapActions({
  newPartsName: 'robots/getParts', 
  newRobotName: 'robots/addRobotToCart'
});
 
Remove from the created and the methods sections...
 
// created() {
//   this.$store.dispatch('robots/getParts')
// },
 
 
*** This changes to ***
 
created() {
  this.getParts(); //<-- Now we don't have to call dispatch anymore. These are methods now. Dispatch is taken care of with the mapActions
}
 
 
// methods: {
//  addToCart() {
//    this.$store.dispatch('robots/addRobotToCart', Object.assign({}, robot, { cost }))
//    .then(() => this.$router.push('/cart')); 
//    this.addedToCart = true;
//  },
// },
 
*** This changes to ***
 
// we no longer need to dispatch an action. We now have methods from mapActions

methods: {
  addToCart() {
    this.addRobotToCart({ ...robot, cost })
    .then(() => this.$router.push('/cart')); 
    this.addedToCart = true;
  },
},
 
 
-----------------------------------------------------------------------
Map Mutations
-----------------------------------------------------------------------
 
We don't have an example of a mapMutation, but the syntax is as follows...
 
Add { mapMutations } from 'vuex';
 
methods: { 
  ...mapMutations('robots', ['someMutation'])
}
 
-----------------------------------------------------------------------
Custom Directives
-----------------------------------------------------------------------
We made a custom directive to place the "sale" icon in the bottom right. 
We got rid of the CSS positioning and added a directive. 
Now on the span we can just use the v-pin directive. 
Add "V-" to the directive name
 
https://v3.vuejs.org/guide/migration/custom-directives.html#_3-x-syntax

Src/shared/pin-directive.js
export default {
  beforeMount(element) {
    element.style.position = 'absolute';
    element.style.bottom = '5px';
    element.style.right = '5px';
  },
};
 
src/build/PartSelector.vue we use v-pin
import pinDirective from '../shared/pin-directive'; //Import it
directives: { pin: pinDirective }, //declare it
<span v-pin class="sale" v-show="selectedPart.onSale">Sale!</span> // Use it
 
-----------------------------------------------------------------------
Passing data to Directives
-----------------------------------------------------------------------
There are 2 ways to do this...
 
1) Pass in with dot notation (arguments and modifiers)
 
<span v-pin:position.bottom.right class="sale" v-show="selectedPart.onSale">Sale!</span>
 
// binding.arg = position
// binding.modifiers = [bottom, right]

// pin-directive.js
export default {
  beforeMount(element, binding) {
    if (binding.arg !== 'position') return; // if we don’t pass in ‘position’, then we leave. This is not the right format
    // loop through each modifier 
    Object.keys(binding.modifiers).forEach((key) => {
      element.style[key] = '5px';
    });
    element.style.position = 'absolute';
  },
};

 
 
2) Pass in an object
 
<span v-pin="{bottom: '10px', right: '10px'}" class="sale" v-show="selectedPart.onSale">Sale!</span>

// pin-directive.js

// function applyStyle(element, binding) {
//   Object.keys(binding.value).forEach((position) => {
//     element.style[position] = binding.value[position];
//   });
//   element.style.position = 'absolute';
// }

// we use the updated function here to make sure this happens if the directive is updated 

// export default {
//   beforeMount(element, binding) {
//     applyStyle(element, binding);
//   },
//   updated: (element, binding) => {
//     applyStyle(element, binding);
//   },
// };


// we are tapping into the beforeMount and updated life cycle hooks. This is so common that there is a simpler format

export default function (element, binding) {
  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });
  element.style.position = 'absolute';
}

/* if we want our directive to be available everywhere, we can remove the import directive from PartSelector and do it globally. 
Import it in main.js

Import pinDirective from ‘./shared/pin-directive’

In the createApp section…
.directive(‘pin’, pinDirective)
*/

// now it can be used globally

-----------------------------------------------------------------------
Filters Vue 2
-----------------------------------------------------------------------
 
Create a filter to format our cost and add it to a JS file called currency-filter.js
We pass in the amount and the dollar symbol
 
export default function (amt, symbol) {
    return `${symbol}${amt.toFixed(2)}`
}
 
In ShoppingCart.vue we do this... (src/cart/ShoppingCart.vue)
 
import currencyFilter from '../shared/currency-filter'
 
filters: {
  currency: currencyFilter,
},
 
And we use it like this...
 
{{robot.cost | currency(‘$’}}
 
 
 
-----------------------------------------------------------------------
Filters Vue 3
-----------------------------------------------------------------------
 
Change filters to use a method...
 
filters: {
  currency: currencyFilter,
},
 
--- This becomes ---
 
methods: {
  currency: currencyFilter,
},
 
--- And we call it like this ---
 
{{ currency(robot.cost, '$') }}

 
-----------------------------------------------------------------------
Provide / Inject
-----------------------------------------------------------------------
A Vue 3 way to pass data to nested children
 
1) Provide the value in the parent component
2) Inject the value in child component
 
PARENT - 
 
If we only need the data in the nested component (not the parent) we can simply use provide 
 
provide: {
  username: 'First Last'
}
 
If we want to use the data in the parent component and pass it down, we have to make provide a function...
 
data() {
  return {
    name: 'First Last'
  }
},
 
provide() {
  return {
    username: this.name
  }
}
 
CHILD - 
 
Similar to props...
 
inject: ['username']
 
Then we can bind the property like this in the template...
 
{{ username }}
 
 
 
If we want the component to be reactive (the value may change), we can import computed in the parent
Provide/Inject bindings are not reactive by default
 
import { computed } from "vue";
 
provide() {
  return {
    Username: computed(() => this.name), //<-- This is the composition API computed property
  }
}
 
And in the child, we can access the value from '.value'
 
inject: ['username']
 
And use it in the template:
 
{{ username.value }}
 
Docs: https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity
 
-----------------------------------------------------------------------
Teleport
-----------------------------------------------------------------------
Teleport allows us to take a component out of its original position in a document and move it to any existing element on the page.
 
Just wrap the content in a <teleport> tag and tell it where to go with the "to" attribute. 
There is also a disabled option too but it is not mandatory
 
 
<teleport to:"#endofbody" :disabled="toggle">
  <p>Some text here</p>
</teleport>
 
<div id="endofbody"></div>
 
