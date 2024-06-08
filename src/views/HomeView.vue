<template>
    <div class="home_body">
        <navMenu></navMenu>

    </div>
</template>

<script>
import navMenu from '../components/NavMenu.vue'
export default{
    data(){
        return{

        }
    },
    components:{
        navMenu
    },
    computed:{
        
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
.home_body{
    justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: url('../assets/fon.png') no-repeat;
	background-size: cover;
	background-position: center;
}

</style>