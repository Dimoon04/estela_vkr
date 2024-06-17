<template>
    <div class="schedule_body">
        <NavMenu></NavMenu>
        <div class="schedule-container">
            <h2 class="text-2xl text-center w-full font-bold">Расписание</h2>
            <div v-for="(classGroup, index) in groupedLessons" :key="index" class="w-full m-auto md:w-full lg:w-2/3 xl:w-2/3 p-4">
                <h3 class="text-lg font-bold mb-4">{{ classGroup.classNumber }}</h3>
                <el-table :data="classGroup.lessons" class="shadow-md rounded">
                    <el-table-column prop="lessonNumber" label="№ урока" width="120px"></el-table-column>
                    <el-table-column prop="monday" label="Понедельник"></el-table-column>
                    <el-table-column prop="tuesday" label="Вторник"></el-table-column>
                    <el-table-column prop="wednesday" label="Среда"></el-table-column>
                    <el-table-column prop="thursday" label="Четверг"></el-table-column>
                    <el-table-column prop="friday" label="Пятница"></el-table-column>
                    <el-table-column label="Действия" v-if="userCondition">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="editLesson(scope.row)">Изменить</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class='w-full flex justify-center m-4' v-if="userCondition">
                <button
                    type="button"
                    class="w-[250px]  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                    @click.prevent="clearSchedule()">
                    Очистить расписание
                </button>
            </div>

            <div class="max-w-md md:w-full lg:w-2/3 xl:w-2/3 mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md" v-if="userCondition">
                <h2 class="text-lg font-bold mb-4">Добавить новое расписание</h2>
                <form class="">
                    <div class="flex flex-wrap -mx-3 mb-4">
                        <div class=" md:w-1/2 lg:w-full xl:w-full px-3 mb-4 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="class">
                                Класс
                            </label>
                            <input
                                id="classNumber"
                                v-model="newLesson.classNumber"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="lessonNumber">
                                № урока
                            </label>
                            <input
                                id="lessonNumber"
                                v-model="newLesson.lessonNumber"
                                type="number"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/1 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="monday">
                                Понедельник
                            </label>
                            <input
                                id="monday"
                                v-model="newLesson.monday"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/1 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tuesday">
                                Вторник
                            </label>
                            <input
                                id="tuesday"
                                v-model="newLesson.tuesday"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/1 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="wednesday">
                                Среда
                            </label>
                            <input
                                id="wednesday"
                                v-model="newLesson.wednesday"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/1 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="thursday">
                                Четверг
                            </label>
                            <input
                                id="thursday"
                                v-model="newLesson.thursday"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/1 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="friday">
                                Пятница
                            </label>
                            <input
                                id="friday"
                                v-model="newLesson.friday"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        @click.prevent="addLesson()">
                        Добавить
                    </button>
                </form>
            </div>

        </div>

        <BottomUi></BottomUi>

        <!-- Диалоговое окно для изменения урока -->
        <el-dialog title="Изменить урок" :visible.sync="editDialogVisible">
            <form>
                <div class="flex flex-wrap -mx-3 mb-4">
                    <div class=" md:w-1/2 lg:w-full xl:w-full px-3 mb-4 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="class">
                            Класс
                        </label>
                        <input
                            id="classNumber"
                            v-model="editedLesson.classNumber"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="lessonNumber">
                            № урока
                        </label>
                        <input
                            id="lessonNumber"
                            v-model="editedLesson.lessonNumber"
                            type="number"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/1 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="monday">
                            Понедельник
                        </label>
                        <input
                            id="monday"
                            v-model="editedLesson.monday"
                            type="text"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/1 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="tuesday">
                            Вторник
                        </label>
                        <input
                            id="tuesday"
                            v-model="editedLesson.tuesday"
                            type="text"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/1 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="wednesday">
                            Среда
                        </label>
                        <input
                            id="wednesday"
                            v-model="editedLesson.wednesday"
                            type="text"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/1 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="thursday">
                            Четверг
                        </label>
                        <input
                            id="thursday"
                            v-model="editedLesson.thursday"
                            type="text"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/1 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="friday">
                            Пятница
                        </label>
                        <input
                            id="friday"
                            v-model="editedLesson.friday"
                            type="text"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    @click.prevent="updateLesson()">
                    Обновить
                </button>
            </form>
        </el-dialog>
    </div>
</template>

<script>
import {store} from '../store/index.js'
import NavMenu from '@/components/NavMenu.vue';
import BottomUi from '@/components/BottomUi.vue';

export default {
    name: 'schedule',
    data() {
        return {
            newLesson: {
                classNumber: '',
                lessonNumber: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            },
            editedLesson: {
                classNumber: '',
                lessonNumber: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            },
            editDialogVisible: false,
            students: []
        }
    },
    components: {
        NavMenu,
        BottomUi
    },
    computed: {
        userCondition() {
            return store.state.user
        },
        groupedLessons() {
            const groupedLessons = {};
            store.state.lessons.forEach(lesson => {
                if (!groupedLessons[lesson.classNumber]) {
                    groupedLessons[lesson.classNumber] = { classNumber: lesson.classNumber, lessons: [] };
                }
                groupedLessons[lesson.classNumber].lessons.push(lesson);
            });
            return Object.values(groupedLessons);
        }
    },
    methods: {
        addLesson() {
            if (this.newLesson.classNumber.trim() && this.newLesson.lessonNumber.trim() && this.newLesson.monday.trim() && this.newLesson.tuesday.trim() && this.newLesson.wednesday.trim() && this.newLesson.thursday.trim() && this.newLesson.friday.trim()) {
                if (!store.state.lessons.find(lesson => lesson.classNumber === this.newLesson.classNumber && lesson.lessonNumber === this.newLesson.lessonNumber)) {
                    try {
                        console.log('Добавлен новый урок:', this.newLesson)
                        store.dispatch('addLesson', this.newLesson)
                        this.$message({
                            type: 'success',
                            message: 'Урок добавлен!'
                        });
                        this.newLesson.classNumber = '';
                        this.newLesson.lessonNumber = '';
                        this.newLesson.monday = '';
                        this.newLesson.tuesday = '';
                        this.newLesson.wednesday = '';
                        this.newLesson.thursday = '';
                        this.newLesson.friday = '';
                    } catch (error) {
                        this.$message({
                            message: 'Ошибка при добавлении урока!',
                            type: 'warning'
                        });
                    }
                } else {
                    this.$message({
                        message: 'Такой урок уже существует!',
                        type: 'warning'
                    });
                }
            } else {
                this.$message({
                    message: 'Пожалуйста, заполните все поля!',
                    type: 'warning'
                });
            }
        },
        editLesson(lesson) {
            this.editedLesson = lesson;
            this.editDialogVisible = true;
        },
        updateLesson() {
            if (this.editedLesson.classNumber.trim() && this.editedLesson.lessonNumber.trim() && this.editedLesson.monday.trim() && this.editedLesson.tuesday.trim() && this.editedLesson.wednesday.trim() && this.editedLesson.thursday.trim() && this.editedLesson.friday.trim()) {
                try {
                    console.log('Обновлен урок:', this.editedLesson)
                    store.dispatch('updateLesson', this.editedLesson)
                    this.$message({
                        type: 'success',
                        message: 'Урок обновлен!'
                    });
                    this.editDialogVisible = false;
                } catch (error) {
                    this.$message({
                        message: 'Ошибка при обновлении урока!',
                        type: 'warning'
                    });
                }
            } else {
                this.$message({
                    message: 'Пожалуйста, заполните все поля!',
                    type: 'warning'
                });
            }
        },
        clearSchedule(){
            this.$confirm('Вы действительно хотите удалить расписание целиком?', 'Warning', {
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            type: 'warning'
            }).then(() => {
            store.dispatch('delLessons')
            this.$message({
                type: 'success',
                message: 'Расписание удалено!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: 'Удаление отменено'
            });          
            });
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.schedule_body {
    min-height: 100vh;
    background: url('../assets/fon.png') no-repeat;
    background-size: cover;
    background-position: center;
}

.schedule-container {
    min-height: 92vh;
}
</style>