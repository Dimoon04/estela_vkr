<template>
    <div class=" bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${require('../assets/fon.png')})` }">
        <NavMenu></NavMenu>
        <div class="rate_body container mx-auto p-4 pt-6 md:p-6 lg:p-12">
            <h2 class="text-2xl font-bold text-center">Оценки</h2>
            
            <div class="flex flex-wrap justify-center">
                <div v-for="(classGroup, index) in groupedStudents" :key="index" class="w-full md:w-full xl:w-full p-4">
                    <el-table :data="classGroup" class="shadow-md rounded">
                        <el-table-column
                        prop="classNumber" 
                        label="Класс"
                        width="120px">
                        </el-table-column>
                        <el-table-column
                        prop="fullName" 
                        label="ФИО"
                        width="200px">
                        </el-table-column>
                        <el-table-column
                        prop="monday" 
                        label="Понедельник">
                        </el-table-column>
                        <el-table-column
                        prop="tuesday"
                        label="Вторник">
                        </el-table-column>
                        <el-table-column
                        prop="wednesday"
                        label="Среда">
                        </el-table-column>
                        <el-table-column
                        prop="thursday"
                        label="Четверг">
                        </el-table-column>
                        <el-table-column
                        prop="friday"
                        label="Пятница">
                        </el-table-column>
                        <el-table-column width="120px" v-if="userCondition">
                            <template slot-scope="scope">
                                <el-button type="warning" size="small" @click="redackStudent(scope.row)">Изменить</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <el-dialog title="Изменить данные об ученике" :visible.sync="dialogVisible" class="mobile-dialog">
            <el-form :model="student" label-width="120px">
                <el-form-item label="Класс">
                    <el-input v-model="student.classNumber" />
                </el-form-item>
                <el-form-item label="ФИО">
                    <el-input v-model="student.fullName" />
                </el-form-item>
                <el-form-item label="Понедельник">
                    <el-input v-model="student.monday" :min="2" :max="5" type="number"/>
                </el-form-item>
                <el-form-item label="Вторник">
                    <el-input v-model="student.tuesday" :min="2" :max="5" type="number"/>
                </el-form-item>
                <el-form-item label="Среда">
                    <el-input v-model="student.wednesday" :min="2" :max="5" type="number"/>
                </el-form-item>
                <el-form-item label="Четверг">
                    <el-input v-model="student.thursday" :min="2" :max="5" type="number"/>
                </el-form-item>
                <el-form-item label="Пятница">
                    <el-input v-model="student.friday" :min="2" :max="5" type="number"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Отмена</el-button>
                <el-button type="primary" @click="saveChanges()">Изменить</el-button>
            </span>
        </el-dialog>
        </div>
        <BottomUi></BottomUi>
    </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';
import {store} from '../store/index.js';    
import BottomUi from '@/components/BottomUi.vue';

export default {
    data() {
        return {
            dialogVisible: false,
            student: {
                classNumber: '',
                fullName: '',
                monday: null,
                tuesday: null,
                wednesday: null,
                thursday: null,
                friday: null
            },
            selectedStudent: null       
        }
    },
    components: {
        NavMenu
        , BottomUi
    },
    computed:{
        userCondition(){
            return store.state.user
        },
        stud(){
            return store.state.students
        },
        groupedStudents() {
            const grouped = {};
            store.state.students.forEach(student => {
                if (!grouped[student.classNumber]) {
                grouped[student.classNumber] = [];
                }
                grouped[student.classNumber].push(student);
            });
            return Object.values(grouped);
        }
    },
    methods: {
        redackStudent(row) {
            this.student = { 
                classNumber: row.classNumber,
                fullName: row.fullName,
                monday: row.monday,
                tuesday: row.tuesday,
                wednesday: row.wednesday,
                thursday: row.thursday,
                friday: row.friday
            };
            this.selectedStudent = row;
            this.dialogVisible = true;
        },
        saveChanges() {
            this.selectedStudent.monday = this.student.monday;
            this.selectedStudent.tuesday = this.student.tuesday;
            this.selectedStudent.wednesday = this.student.wednesday;
            this.selectedStudent.thursday = this.student.thursday;
            this.selectedStudent.friday = this.student.friday;
            store.dispatch('updateStudent', { id:this.selectedStudent.id, doc:{
                ...this.selectedStudent
            }}) 
            console.log("update", this.selectedStudent.id)
            this.dialogVisible = false;
            this.selectedStudent = null;
        }
       
//         saveRate() {
//   if (this.selectedStudent) {
//     store.dispatch('updateStudent', {
//       id: this.selectedStudent.id,
//       doc: {
//         fio: this.newStudent.fio,
//         monday: this.newStudent.monday,
//         tuesday: this.newStudent.tuesday,
//         wednesday: this.newStudent.wednesday,
//         thursday: this.newStudent.thursday,
//         friday: this.newStudent.friday
//       }
//     });
//     console.log("update", this.selectedStudent.id)
//     this.selectedStudent = null; // сбрасываем выбранного студента
//   } else {
//     console.error('Selected student is undefined');
//   }
// }
    }
};
</script>
<style>
.rate_body{
    min-height: 92vh;
}
</style>