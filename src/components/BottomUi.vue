<template>
    <footer class="bg-gray-200 h-1/5 md:h-48 py-12 md:py-6">
            <div class="container w-full  p-4 md:p-6 ">
                <div class="flex flex-wrap justify-center md:flex-no-wrap">
                  <div class="w-full md:w-1/2 xl:w-1/3 p-4 md:p-6">
                      <h5 class="uppercase text-lg mb-2">О школе</h5>
                      <ul>
                      <!-- <li><a href="#" >О нас</a></li> -->
                      <li><router-link to="/about-us" class="text-gray-600 hover:text-gray-900" aria-expanded="false">О нас</router-link></li>
                      <li><router-link to="/epmloy" class="text-gray-600 hover:text-gray-900" aria-expanded="false">Сотрудники</router-link></li>
                      
                      </ul>
                  </div>
                  <div class="w-full md:w-1/2 xl:w-1/3 p-4 md:p-6">
                      <h5 class="uppercase text-lg mb-2">Учебный процесс</h5>
                      <ul>
                      
                      <!-- <li><a href="#" class="text-gray-600 hover:text-gray-900"></a></li> -->
                      <li><router-link to="/lessons" class="text-gray-600 hover:text-gray-900" aria-expanded="false">Расписание занятий</router-link></li>
                      
                      </ul>
                  </div>
                  <div class="w-full md:w-1/2 xl:w-1/3 p-4 md:p-6">
                      <h5 class="uppercase text-lg mb-2">Контакты</h5>
                      <ul>
                      <li><a href="https://yandex.ru/maps/-/CDrfbYpr" class="text-gray-600 hover:text-gray-900">с. Саглы , ул.Чанчы-Хоо, д.2</a></li>
                      <li><a href="tel:+79233891975" class="text-gray-600 hover:text-gray-900">+7 923 389 1975</a></li>
                      <li><a href="mailto:tyva_school_122@mail.ru" type="email" class="text-gray-600 hover:text-gray-900">tyva_school_122@mail.ru</a></li>
                      </ul>
                  </div>
                </div>
                <p class="text-center text-gray-600 mt-1">
                &copy; 2024 МБОУ «Саглынская СОШ Овюрского кожууна». Все права защищены.
                </p>
            </div>
        </footer>
  </template>
  
  <script>
  export default {
    name: "Footer"
  }
  </script>