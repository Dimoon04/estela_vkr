<template>
    <div class="list_body">
        <NavMenu></NavMenu>
        <div class="list-container">
            <h2>Страница для авторизованных пользователей</h2>
            <el-table :data="testList">
                <el-table-column
                    prop="testnumber"
                    label="Цифра"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="testSpisok"
                    label="Текст"
                    width="180">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {store} from '../store/index.js'
import NavMenu from '@/components/NavMenu.vue';
export default{
    name:'list',
    data(){
        return{

        }
    },
    components:{
        NavMenu
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
*{
    margin: 0;
    padding: 0;
}
.list_body{
	min-height: 100vh;
	background: url('../assets/fon.png') no-repeat;
	background-size: cover;
	background-position: center;
}

</style>