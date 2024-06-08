<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item >
                <router-link to="/">Главная</router-link>
            </el-menu-item>
            <el-menu-item >
                <router-link to="/list">Список</router-link>
            </el-menu-item>
            <el-menu-item >
                <router-link v-if="!user" to="/login">Вход/Регистрация</router-link>
                <el-button v-if="user" @click="SignOut()" type="primary">Выход</el-button>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script >
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
        async SignOut(){
            
            this.$confirm('Вы действительно хотите выйти из аккаунта?', 'Выход', {
                confirmButtonText: 'Да',
                cancelButtonText: 'нет',
                type: 'warning'
            }).then(() => {
                store.dispatch("signout") //вызов метода выхода из аккаунта (в файле store)
                this.$message({
                    type: 'info',
                    message: 'Выполнен выход из аккаунта'
                });
            }).catch(() => {
                this.$message({
                    type: 'success',
                    message: 'Отменено'
                });          
            });
        }
    }
}
</script>

<style>

</style>