<template>
    <div class="home_body">
        <navMenu></navMenu>
        <div class="home-container">
            <div class="max-w-lg mx-auto p-4 pt-6 pb-8 mt-4 mb-4 bg-white rounded shadow-md md:max-w-2xl" v-if="userCondition">
                <h1 class="text-3xl font-bold mb-4">Добавить новость</h1>
                <form >
                <div class="mb-4">
                    <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Заголовок:</label>
                    <input type="text" id="title" v-model="newPost.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-4">
                    <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Текст:</label>
                    <textarea id="text" v-model="newPost.text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                </div>
                <div class="mb-4">
                    <label for="hashtags" class="block text-gray-700 text-sm font-bold mb-2">Хештеги:</label>
                    <input type="text" id="hashtags" v-model="newPost.hashtags" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-4">
                    <label for="hashtags" class="block text-gray-700 text-sm font-bold mb-2">Ссылка:</label>
                    <input type="text" id="hashtags" v-model="newPost.link" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <!-- <input type="hidden" v-model="date" :value="today"> -->
                <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="submit" @click="addNews()">Добавить новость</button>
                </form>
            </div>

            <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
                <h1 class="text-3xl font-bold mb-4">Новости</h1>
                <div class="flex flex-wrap -mx-4">
                <div v-for="news in posts" :key="news.date" class="w-full  md:w-1/2 lg:w-1/2 xl:w-full p-4">
                    <div class="bg-white rounded shadow-md p-4 min-h-28" >
                        <h2 class="text-2xl font-bold mb-2">{{ news.title }}</h2>
                        <p class="text-gray-600 pb-6">{{ news.text }}</p>
                        <p class="text-gray-600 pb-6">
                            <a :href="news.link" target="_blank">Ссылка</a>
                        </p>
                        <div class="flex justify-between">
                            <p class="text-gray-500 text-sm">{{ news.hashtags }}</p>
                            <p class="text-gray-500 text-sm">{{ news.date }}</p>
                        </div>
                        <button v-if="userCondition" class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="open(news)">Удалить</button>
                    
                    </div>
                </div>
                </div>
            </div>
        </div>
        <BottomUi></BottomUi>
    </div>
</template>

<script>
import navMenu from '../components/NavMenu.vue'
import BottomUi from '../components/BottomUi.vue'
import {store} from '../store/index.js'
export default{
    data(){
        return{
            newPost:{
                title: '',
                text: '',
                hashtags: '',
                date: '',
                link:''
            }
        }
    },
    components:{
        navMenu,
        BottomUi
    },
    computed:{
        posts(){
            return store.state.posts
        },
        userCondition(){
            return store.state.user
        },
        today() {
            return new Date().toISOString().slice(0, 10);
        }
    },
    methods:{
        addNews() {
            this.newPost.date = this.today;
            try {
                store.dispatch('addPost', this.newPost)
                this.$message({
                    type: 'success',
                    message: 'Запись добавлен!'
                });
                this.newPost.title = '';
                this.newPost.text = '';
                this.newPost.hashtags = '';
                this.newPost.link = '';

                
            } catch (error) {
                this.$message({
                    message: 'Ошибка при добавлении записи!',
                    type: 'warning'
                });
            }
      
            console.log('Добавлена новость:', {
                title: this.newPost.title,
                text: this.newPost.text,
                hashtags: this.newPost.hashtags,
                date: this.newPost.today
            });
        },
        open(news) {
            this.$confirm('Вы действительно хотите удалить эту запись?', 'Удаление', {
            confirmButtonText: 'Да',
            cancelButtonText: 'нет',
            type: 'warning'
            }).then(() => {
            this.deleteNews(news)
            this.$message({
                type: 'success',
                message: 'Запись удалена'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: 'Удаление отменено'
            });          
            });
      },
        deleteNews(news) {
        try {
            store.dispatch('delPost', news.id)
            this.$message({
                type: 'success',
                message: 'Запись удалена!'
            });
        } catch (error) {
            this.$message({
                message: 'Ошибка при удалении записи!',
                type: 'warning'
            });
        }
    }
        
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
.home-container{
    min-height: 100vh;
}


</style>