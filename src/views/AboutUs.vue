<template>
    <div class="aboutUs_body">
        <NavMenu></NavMenu>
        <div class="aboutUs-container"><!-- данные страницы О нас, все что внутри этого блока, можешь удалить и переделать   -->
            <div class="container mx-auto p-2 pt-6 md:p-6 lg:p-2">
                <h1 class="text-3xl font-bold mb-4">О нас</h1>
                <p class="text-lg mb-4">Муниципальное бюджетное общеобразовательное учреждение «Саглынская средняя общеобразовательная школа Овюрского кожууна»</p>
                <p class="text-lg mb-4">Краткое наименование: МБОУ «Саглынская СОШ Овюрского кожууна»</p>
                <p class="text-lg mb-4">Дата создания: с 1934 года</p>
                <p class="text-lg mb-4">Учредитель: Администрация муниципального района «Овюрский кожуун» Республики Тыва</p>
                <p class="text-lg mb-4">Место нахождения: 668141, Республика Тыва, Овюрский р-н, с. Саглы, ул.Чанчы-Хоо, д.2</p>
                <p class="text-lg mb-4">Филиалов и представительств образовательная организация не имеет</p>
                <h2 class="text-2xl font-bold mb-4">График работы школы</h2>
                <p class="text-lg mb-4">Понедельник-суббота: 8:30 — 17:30</p>
                <p class="text-lg mb-4">Учебный год начинается с 1 сентября</p>
                <p class="text-lg mb-4">Учебные занятия проводятся по графику 6-ти дневной рабочей недели</p>
                <p class="text-lg mb-4">Начало занятий: 8ч. 30 мин.</p>
                <h2 class="text-2xl font-bold mb-4">Контакты</h2>
                <p class="text-lg mb-4">E-mail: <a href="mailto:tyva_school_122@mail.ru" class="text-blue-600 hover:text-blue-900">tyva_school_122@mail.ru</a></p>
            </div>
        </div>
        <BottomUi></BottomUi>
    </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';
import BottomUi from '../components/BottomUi.vue'

// import {store} from '../store/index.js';    

export default {
    components: {
        NavMenu,
        BottomUi
    },
};
</script>

<style scoped>
.aboutUs_body{
    min-height: 100vh;
	background: url('../assets/fon.png') no-repeat;
	background-size: cover;
	background-position: center;
}
.aboutUs-container{
    min-height: 100vh;
}

</style>