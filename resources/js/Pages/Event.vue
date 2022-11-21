<script setup>
import { reactive } from '@vue/reactivity';
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import HEADER from "./../Components/Header.vue";
import SIDENAV from "./../Components/Sidenav.vue";
import PAGINATE from "./../Components/Paginate.vue";
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import './../../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import { Inertia } from '@inertiajs/inertia'
const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,  
  events: Array,  
  states:Array
});
const data = reactive({
  switch: "list",  
  states: [],  
  saving:false,
  deleting:false,
  form:{
    organiser:'',
    location:'',
    contact:'',
    date:'',
    subject:'',
    description:'',
    guest:'',
    state_id:'',
    id:''
    },
  indexNum:0
});

function edit(item,i) {
    data.form.organiser = item.organiser
    data.form.location = item.location
    data.form.contact = item.contact
    data.form.date = item.date
    data.form.subject = item.subject
    data.form.description = item.description
    data.form.guest = item.guest
    data.form.state_id = item.state_id
    data.form.id = item.id
  data.switch = "add";
}
function add() {
    data.form.organiser = ""
    data.form.location = ""
    data.form.contact = ""
    data.form.date = ""
    data.form.subject = ""
    data.form.description = ""
    data.form.guest = ""
    data.form.state_id = ""
    data.form.id=""
  data.switch = "add";
}

async function saveEvent() {
    data.saving = true;
  let response = await axios.post(route('save_event'),data.form);
  let resp = response.data   
  data.saving = false;
  if (resp) {
    if(data.form.id ==''){
        showAlert("Added Successfuly");
    }else{
        showAlert("Updated Successfuly");
    }
      Inertia.reload();
  } else {
    showAlert("oh-no! something went wrong...");
  }
}

async function deleteEvent(id) {
    data.deleting = true
  let response = await axios.post(route('delete_event'),{id:id});
  let resp = response.data   
  data.deleting =false
  if (resp) {

      showAlert("Deleted Successfuly");
      Inertia.reload();
  } else {
    showAlert("oh-no! something went wrong...");
  }
}



function showAlert(msg,icon='success'){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
    })

    Toast.fire({
    icon: icon,
    title: msg
    })
}
</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active=""></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Events</h4>
    </div>
    <button @click="add()" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Add</button>
    <button @click="data.switch='list'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">List</button>
    <div v-show="data.switch=='list'" class="px-3" >
        <table class="table table-bordered">
            <thead>
                <tr>                                                                                                
                    <td>S/N</td>
                    <td>Organiser</td>                    
                    <td>State</td>
                    <td>Location</td>
                    <td>Contact</td>
                    <td>Date</td>
                    <td>Subject</td>
                    <td>Description</td>
                    <td>Guest</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(event,i) in events.data" :key="i">
                    <td>{{ events.from + i }}</td>
                    <td>{{event.organiser}}</td>                    
                    <td>{{event.state}}</td>
                    <td>{{event.location}}</td>                    
                    <td>{{event.contact}}</td>                    
                    <td>{{event.date}}</td>                    
                    <td>{{event.subject}}</td>                    
                    <td>{{event.description}}</td>
                    <td>{{event.guest}}</td>
                    <td>
                        <button @click="edit(event,i)" class="btn btn-sm bg-primary text-white">Edit</button>
                        <button @click="deleteEvent(event.id)" class="btn btn-sm ml-2 bg-danger text-white">Delete <div v-if="data.deleting" class="spinner-border text-white" role="status"></div></button>                        
                    </td>                    
                </tr>
            </tbody>
        </table>
        <PAGINATE :next="events.next_page_url" :prev="events.prev_page_url"></PAGINATE>
    </div>
    <div v-show="data.switch=='add'" class="px-3" >
        <form @submit.prevent="saveEvent()">
            <div class="row w-100">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                                      
                    <div class="col-md-4 mb-2">  
                        <label>Subject</label>                      
                        <input required v-model="data.form.subject" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Organiser</label>                      
                        <input required v-model="data.form.organiser" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Location</label>                      
                        <input required v-model="data.form.location" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>contact</label>                      
                        <input v-model="data.form.contact" type="text" class="form-control">                            
                    </div>
                    
                    <div class="col-md-4 mb-2">  
                        <label>States</label>                      
                        <select v-model="data.form.state_id" type="text" class="form-control">
                            <option value="0">-</option>
                            <option v-for="(state) in states" :key="state.id" :value="state.id">{{state.name}}</option>
                        </select>   
                    </div>                                                 
                    
                    <div class="col-md-4 mb-2">  
                        <label>Description</label>                      
                        <input v-model="data.form.description" type="text" class="form-control">                            
                    </div>                                   
                    <div class="col-md-4 mb-2">  
                        <label>Guest</label>                      
                        <input v-model="data.form.guest" type="text" class="form-control">                            
                    </div>                                   
                    <input v-model="data.form.id" type="text" class="form-control d-none">                                                        
                    <div class="col-md-4 mb-2">
                        <label style="visibility: hidden;">Area Description</label>                      
                        <PrimaryButton class="ml-4" :class="{ 'opacity-25': data.processing }" >                                
                                <span v-if="data.form.id==''">Add</span>
                                <span v-else>Update</span>
                                <div v-if="data.saving" class="spinner-border text-white h6" role="status"></div>
                        </PrimaryButton>  
                    </div>
                </div>
            </div>
            </div>
        </form>
    </div>
  </div>
</template>