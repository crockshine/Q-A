import {createApp} from 'vue'
import App from './App.vue'
const app = createApp(App)

import './assets/style.css'

import {createWebHashHistory, createRouter} from 'vue-router'
import {createPinia} from "pinia";


import SignUpForm from "./Pages/SignUpForm.vue";
import RegistrationForm from "./Pages/RegistrationForm.vue";
import Home from "./Pages/HomeWrapper.vue";
import CreateTest from "./Pages/CreateTest.vue";
import TestBody from "./Pages/TestBody.vue";
import EditTest from "./Pages/EditTest.vue";
import Game from "./Pages/Game.vue";
import Result from "./components/Result.vue";
import Profile from "./Pages/Profile.vue";

const routes = [
    {
        path: '/', name: 'Home', component: Home,
        children: [
            {name: 'Tests', path: 'tests', component: TestBody},
            {name: 'Create-test', path: 'create-test', component: CreateTest},
            {name: 'Edit-test', path: 'edit-test/:id', component: EditTest},
            {name: 'Game', path: 'game/:id', component: Game},
            {name: 'Result', path: 'game/result', component: Result},
            {name: 'Profile', path: 'profile', component: Profile}
        ]
    },
    {path: '/registration', name: 'Registration', component: RegistrationForm},
    {path: '/signup', name: 'SignUp', component: SignUpForm},


    // { path: '/menu/:dish/:recipes', name:'Info', component: Info},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


import components from './components/UI'

components.forEach(component => {
    app.component(component.__name as string, component)
})

app.use(router)
app.use(createPinia())
app.mount('#app')