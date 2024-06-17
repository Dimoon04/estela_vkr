    <template>
        <div class="list_body">
            <NavMenu></NavMenu>
            <div class="list-container">
                <h2 class="text-2xl text-center w-full font-bold">Cписок учеников</h2>
                <div class="flex flex-wrap justify-center">
                    <div v-for="(classGroup, index) in groupedStudents" :key="index" class="w-full md:w-full lg:w-2/3 xl:w-2/3 p-4">
                    <el-table :data="classGroup" class="shadow-md rounded">
                        <el-table-column
                        prop="classNumber" 
                        label="Класс"
                        width="120px">
                        </el-table-column>
                        <el-table-column
                        prop="fullName" 
                        label="ФИО">
                        </el-table-column>
                        <el-table-column width="120px" v-if="userCondition">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="deleteStudent(scope.row)">Удалить</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </div>
                
                


                <div class="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md" v-if="userCondition">
                    <h2 class="text-lg font-bold mb-4">Добавить нового ученика</h2>
                    <form>
                    <div class="flex flex-wrap -mx-3 mb-4">
                        <div class=" md:w-1/2 lg:w-full xl:w-full px-3 mb-4 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="full-name">
                            ФИО
                        </label>
                        <input
                            id="full-name"
                            v-model="newStudent.fullName"
                            type="text"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="class">
                            Класс
                        </label>
                        <input
                            id="class"
                            v-model="newStudent.classNumber"
                            type="text"
                            
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        @click="addStudent()">
                        Добавить
                    </button>
                    </form>
                </div>  
            </div>
            <BottomUi></BottomUi>
            
        </div>
    </template>

    <script>
    // import { data } from 'autoprefixer';

    import {store} from '../store/index.js'
    import NavMenu from '@/components/NavMenu.vue';
    import BottomUi from '@/components/BottomUi.vue';
    export default{
        name:'list',
        data(){
            return{
                newStudent:{
                    fullName: '',
                    classNumber: '',
                    monday:null,
                    tuesday:null,
                    wednesday:null,
                    thursday:null,
                    friday:null,
                },
                studets: []

                
            }
        },
        components:{
            NavMenu,
            BottomUi
        },
        computed:{
            userCondition(){
                return store.state.user
            },
            lessons(){
                return store.state.lessons
            },
            students(){
                return store.state.students
            },
            groupedStudents() {
                const grouped = {};
                this.students.forEach(student => {
                    if (!grouped[student.classNumber]) {
                    grouped[student.classNumber] = [];
                    }
                    grouped[student.classNumber].push(student);
                });
                return Object.values(grouped);
            }
        },
        methods:{
            addStudent() {
                try {
                    console.log('Добавлен новый ученик:', this.newStudent)
                    store.dispatch('addStudent', this.newStudent)
                    this.$message({
                        type: 'success',
                        message: 'Запись добавлен!'
                    });
                    
                } catch (error) {
                    this.$message({
                        message: 'Ошибка при добавлении записи!',
                        type: 'warning'
                    });
                }
                    // Здесь будет логика добавления нового ученика
            },
            deleteStudent(student) {
                // Implement your delete logic here
                console.log(`Delete student: ${student.fullName}`);
            }
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
    .list-container{
        min-height: 92vh;
    }
    </style>