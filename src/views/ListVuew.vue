<template>
    <div class="list_body">
        <h2>Страница для авторизованных пользователей</h2>
        <ul>
            <li v-for="i in testList" :key="i.id">
                Текст: <b>{{ i.testSpisok }}</b>, цифра: <b>{{ i.testnumber }}</b>
            </li>
        </ul>
    </div>
</template>

<script>
import {store} from '../store/index.js'
export default{
    name:'list',
    data(){
        return{

        }
    },
    computed:{
        testList(){
            return store.state.testList
        }
    },
    methods:{
       
    }
}
</script>

<style>

</style>