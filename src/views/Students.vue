<template lang="">
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Students</h1>
        <router-link 
          :to="{name: 'StudentCreate'}"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 -mt-1 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        > 
          <path
            stroke-linecap = "round"
            stroke-linejoin = "round"
            stroke-width = "2"
            d="M12 4v16m8-8H4"
          />
        </svg>
          Register Student
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="student in students" :key="student.id" class="flex flex-col py-1 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
      >
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold" >{{student.name}}</h4>
        <p> <strong>Birth Date: </strong>  {{student.birthdate}}</p>
        <p><strong>Father Name: </strong> {{student.father_name}}</p>
        <p><strong>Mother Name: </strong> {{student.mother_name}}</p>
        <p><strong>Course Grade: </strong> {{student.course_grade}}</p>
        <p><strong>Section: </strong> {{student.section}}</p>
        <p><strong>Carnet: </strong> {{student.carnet}}</p>
        <p><strong>Date Admission: </strong> {{student.date_admission}}</p>
        <div class="flex justify-between items-center mt-3">
          <router-link 
            :to="{name: 'StudentUpdate', params: {id: student.id}}"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </router-link>
          <button
            v-if="student.id"
            type="button"
            @click="deleteStudent(student)"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </PageComponent>
</template>
<script setup>
import store from "../store";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue"

const students = computed(()=> store.state.students)

function deleteStudent(student){
  if(confirm(`Are you sure you want to delete this student? Operation can't be undone!!`)){
    
  }
}

</script>