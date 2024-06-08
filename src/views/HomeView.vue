<template>
    <div class="home_body">
        <h1>
            Главная страница
        </h1>
        <router-link to="/list">Войти на страницу списка</router-link> 
        <br><br>
        <router-link to="/login">Вход</router-link>
        <br><br>
        <button @click="SignOut()">Выход</button>
        <!-- <router-link to="register">Войти на страницу регистрации</router-link> -->



        <br><br><br><br>
        <p>Состояние входа пользователя:</p>
        <p v-if="user">Авторизован</p>
        <p v-else>Не авторизован</p>
    </div>
</template>

<script>
import {store} from '../store/index.js'
export default{
    data(){
        return{

        }
    },
    computed:{
        user(){
            return store.state.user
        }
    },
    methods:{
        SignOut(){
            store.dispatch("signout")
        }
    }
}
</script>
<style>

</style>