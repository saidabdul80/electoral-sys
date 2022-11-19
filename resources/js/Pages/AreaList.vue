<script setup>
import { reactive } from '@vue/reactivity';
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import HEADER from "./../Components/Header.vue";
import SIDENAV from "./../Components/Sidenav.vue";
import PAGINATE from "./../Components/Paginate.vue";
import PrimaryButton from '@/Components/PrimaryButton.vue';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  states:Array,
  lgas:Array,
  wards:Array,
  arealists:Array,
});
const data = reactive({
    switch:'list',    
    wards:[],
    lgas:[],
    states:[],
    ward_ready:false,
    lga_ready:false,
    queries:{
        lga_id:null,
        ward_id:null,
        state_id:null
    }    
})
async function trigerLgas() {
  
  let response =  await axios.get(`/lgas/${form.state_id}`)
  data.lgas = response.data
}
async function trigerWards() {
  let response =  await axios.get(`/wards/${form.lga_id}`)
  data.wards = response.data
}

async function trigerAreas() {
  let response =  await axios.get(`/areas/${form.ward_id}`)
  data.areas = response.data    
}

const form = reactive({
    state_id:0,
    lga_id:0,
    ward_id:0,
    name:"",
    description:"",
    id:""
});

function edit(item){
    form.id = item.id;
    form.state_id = item.state_id;
    trigerLgas()
    setTimeout(()=>{
        form.lga_id = item.lga_id;
        setTimeout(()=>{
            trigerWards()
            form.ward_id = item.ward_id;        
        }, 100)
    }, 100)
    form.name = item.name;
    form.description = item.description;
    data.switch = 'add';    
}
function add(){
    form.state_id= 0;
    form.lga_id= 0;
    form.ward_id= 0;
    form.name="" ;
    form.description= "";
    form.id="" ;
    data.switch = 'add'
}

const submit = async () => {
    data.addingTeamMember = true;
    let response =  await axios.post("add_area",form)    
    if(response.data.ok == true){
        if(form.id == ''){            
            Swal.fire(response.data.msg, 'success')
            Inertia.reload()
        }else{
            showAlert(response.data.msg, 'success')
            Inertia.reload()
        }
    }else{
        showAlert('try again', 'error')
    }
    data.addingTeamMember = false  
};
</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active="Area"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Area List</h4>
    </div>
    <button :disabled="data.switch=='add'" @click="add()" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Add</button>
    <button :disabled="data.switch=='list'" @click="data.switch='list'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">List</button>
    <div v-show="data.switch=='list'" class="px-3" >
        <table class="table table-bordered">
            <thead>
                <tr>
                    <td>S/N</td>
                    <td>State</td>
                    <td>LGA</td>
                    <td>Ward</td>
                    <td>Area name</td>
                    <td>Description</td>
                    <td width="200px"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(arealist,i) in arealists.data" :key="i">
                    <td>{{ arealists.from + i }}</td>
                    <td>{{arealist.state}}</td>
                    <td>{{arealist.lga}}</td>
                    <td>{{arealist.ward}}</td>
                    <td>{{arealist.name}}</td>
                    <td>{{arealist.description}}</td>                    
                    <td>
                        <button @click="edit(arealist)" class="btn btn-sm bg-primary text-white">Edit</button>
                        <button class="btn btn-sm ml-2 bg-danger text-white">Delete</button>                        
                    </td>                    
                </tr>
            </tbody>
        </table>
        <PAGINATE :next="arealists.next_page_url" :prev="arealists.prev_page_url"></PAGINATE>
    </div>
    <div v-show="data.switch=='add'" class="px-3" >
        <form @submit.prevent="submit">
            <div class="row w-100">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                    
                    <div class="col-md-4 mb-2">  
                        <label>State</label>                      
                        <select @change="trigerLgas()" v-model="form.state_id" type="text" class="form-control">
                            <option value="0">-</option>
                            <option v-for="(state) in states" :key="state.id" :value="state.id">{{state.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4 mb-2"> 
                        <label>LGA</label>                      
                        <select @change="trigerWards()" v-model="form.lga_id" type="text"  class="form-control">                            
                            <option v-for="(lga) in data.lgas" :key="'lg_'+lga.id" :value="lga.id">{{lga.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4 mb-2">
                        <label>Ward</label>                      
                        <select v-model="form.ward_id" type="text" class="form-control">                            
                            <option v-for="(ward) in data.wards" :key="'ward_'+ward.id" :value="ward.id">{{ward.name}}</option>
                        </select>   
                    </div>

                    <div class="col-md-4 mb-2">
                        <label>Area Name</label>                      
                        <input v-model="form.name" type="text" class="form-control">                                                        
                    </div>

                    <div class="col-md-4 mb-2">
                        <label>Area Description</label>                      
                        <input v-model="form.description" type="text" class="form-control">                                                        
                    </div>
                    <input v-model="form.id" type="text" class="form-control d-none">                                                        
                    <div class="col-md-4 mb-2">
                        <label style="visibility: hidden;">Area Description</label>                      
                        <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">                                
                                <span v-if="form.id==''">Add</span>
                                <span v-else>Update</span>
                        </PrimaryButton>  
                    </div>
                </div>
            </div>
            </div>
        </form>
    </div>
  </div>
</template>