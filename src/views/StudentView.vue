<template>
  <PageComponent>
    <template v-slot:header>
      <div class="felx items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.name : "Create Student" }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="saveStudent">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!-- Student Fields -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!--Name-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="model.name"
              autocomplete="student_name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--Birthdate-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Bith Date
            </label>
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              v-model="model.birthdate"
              autocomplete="student_birthdate"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--FatherName-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Father Name
            </label>
            <input
              type="text"
              name="father_name"
              id="father_name"
              v-model="model.father_name"
              autocomplete="student_father_name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--MotherName-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Mother Name
            </label>
            <input
              type="text"
              name="mother_name"
              id="mother_name"
              v-model="model.mother_name"
              autocomplete="student_mother_name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--CourseGrade-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Course Grade
            </label>
            <input
              type="text"
              name="course_grade"
              id="course_grade"
              v-model="model.course_grade"
              autocomplete="student_course_grade"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--Section-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Section
            </label>
            <input
              type="text"
              name="section"
              id="section"
              v-model="model.section"
              autocomplete="student_section"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--Carnet-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Carnet
            </label>
            <input
              type="text"
              name="carnet"
              id="carnet"
              v-model="model.carnet"
              autocomplete="student_carnet"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--DateAdmission-->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Date of Admission
            </label>
            <input
              type="date"
              name="date_admission"
              id="date_admission"
              v-model="model.date_admission"
              autocomplete="student_date_admission"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <!--Buttons-->
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>
<script setup>
import store from "../store";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import PageComponent from "../components/PageComponent.vue";


const route = useRoute();
const router = useRouter();

let model = ref({
  name: "",
  birthdate: "",
  father_name: "",
  mother_name: "",
  course_grade: "",
  section: "",
  carnet: "",
  date_admission: "",
});

watch(
    () => store.state.currentStudent.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal))
        }
    }
)

if (route.params.id) {
  store.dispatch('getStudent', route.params.id);
}

function saveStudent(){
    store.dispatch("saveStudent", model.value).then(({data}) => {
        router.push({
            name: "StudentCreate",
            params: {id: data.data.id}
        })
    });
}

</script>
