<template>
    <div class="list_body">
        <NavMenu></NavMenu>
        <div class="list-container">
            <h2 class="text-2xl text-center w-full font-bold">Список сотрудников</h2>
            <div class="flex flex-wrap justify-center">
                <div v-for="(employeeGroup, index) in groupedEmployees" :key="index" class="w-full md:w-full lg:w-2/3 xl:w-2/3 p-4">
                    <el-table :data="employeeGroup" class="shadow-md rounded">
                        <el-table-column
                        prop="fullName" 
                        label="ФИО"
                        width="200px">
                        </el-table-column>
                        <el-table-column
                        prop="position" 
                        label="Должность">
                        </el-table-column>
                        <el-table-column
                        prop="phoneNumber" 
                        label="Номер телефона">
                        </el-table-column>
                        <el-table-column width="120px" v-if="userCondition">
                            <template slot-scope="scope">
                                <el-button type="danger" size="small" @click="deleteEmployee(scope.row)">Удалить</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md" v-if="userCondition">
                <h2 class="text-lg font-bold mb-4">Добавить нового сотрудника</h2>
                <form>
                    <div class="flex flex-wrap -mx-3 mb-4">
                        <div class=" md:w-1/2 lg:w-full xl:w-full px-3 mb-4 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="full-name">
                                ФИО
                            </label>
                            <input
                                id="full-name"
                                v-model="newEmployee.fullName"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="position">
                                Должность
                            </label>
                            <input
                                id="position"
                                v-model="newEmployee.position"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phoneNumber">
                                Номер телефона
                            </label>
                            <input
                                id="phoneNumber"
                                v-model="newEmployee.phoneNumber"
                                type="text"
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        @click.prevent="addEmployee()">
                        Добавить
                    </button>
                </form>
            </div>

        </div>

        <BottomUi></BottomUi>
    </div>
</template>

<script>
import {store} from '../store/index.js'
import NavMenu from '@/components/NavMenu.vue';
import BottomUi from '@/components/BottomUi.vue';

export default {
    name: 'employees',
    data() {
        return {
            newEmployee: {
            fullName: '',
            position: '',
            phoneNumber: ''
        },
        // employees: []
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
        employees() {
            return store.state.employees
        },
        groupedEmployees() {
            const groupedEmploy = {};
            this.employees.forEach(employee => {
                if (!groupedEmploy[employee.position]) {
                    groupedEmploy[employee.position] = [];
                }
                groupedEmploy[employee.position].push(employee);
            });
            return Object.values(groupedEmploy);
        }
    },
    methods: {
        addEmployee() {
            try {
                console.log('Добавлен новый сотрудник:', this.newEmployee)
                store.dispatch('addEmployee', this.newEmployee)
                this.$message({
                    type: 'success',
                    message: 'Сотрудник добавлен!'
                });
            } catch (error) {
                this.$message({
                    message: 'Ошибка при добавлении сотрудника!',
                    type: 'warning'
                });
            }
        },
        deleteEmployee(employee) {
            this.$confirm('Вы действительно хотите удалить сотрудника?', 'Warning', {
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            type: 'warning'
            }).then(() => {
                store.dispatch('removeEmployee', employee.id);
            console.log(`Delete employee: ${employee.fullName}`);

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

.list_body {
    min-height: 100vh;
    background: url('../assets/fon.png') no-repeat;
    background-size: cover;
    background-position: center;
}

.list-container {
    min-height: 92vh;
}
</style>