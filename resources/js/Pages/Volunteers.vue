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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import { Inertia } from '@inertiajs/inertia'

const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,  
  volunteers: Array,  
  states:Array,
  departments:Array,
  statuses:Array,
  partyMembers:Array
});
const data = reactive({
  switch: "list",
  wards: [],
  lgas: [],
  states: [],  
  areas:[],
  page:'volunteers',
  indexNum:0,
  loading:false
});

const formUpload = reactive({
    file_to_upload:'',
    department_id:'',
    status_id:'',
    user_type:''
})
const form = reactive({
    name:'',
    email:'',
    phone:'',
    address:'',
    state_id:'',
    lga_id:'',
    ward_id:'',
    area_id:'',
    id: "",
    gender:"",
    dob:"",
    password:'',
    volunteer_id:'',
    status_id:'',
    user_type:'Volunteer',
    department_id:''
});

async function uploadData(){
    data.loading = true    
    let response = await axios.post('upload_volunteer_data',formUpload, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });       
        data.loading = false
    if(response.data.ok == true){
        Swal.fire(response.data.msg, 'success')
        Inertia.reload()
    }else{
        Swal.fire({
            icon: 'error',   
            html: response.data.msg,
            footer: 'Correct the issues from your file and Upload Again'
        })        
    }
}

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


function edit(item,i) {
    data.indexNum = i;
  form.id = item.id;
  form.state_id = item.state_id;
  trigerLgas();
  setTimeout(() => {
    form.lga_id = item.lga_id;
    setTimeout(() => {
      trigerWards();
      form.ward_id = item.ward_id;
    }, 100);
  }, 100);
    form.name  = item.name ;
    form.email = item.email;
    form.phone = item.phone;
    form.address = item.address;
    form.area_id = item.area_id;  
    form.gender = item.gender;  
    form.dob = item.dob;    
    form.volunteer_id = item.volunteer_id;    
    form.department_id=item.department_id;
    form.status_id=item.status_id;
    form.user_type = item.user_type;
    form.password = '',    
    data.switch = "add";
}
function add() {
    clearFields()
    data.switch = "add"; 
}
function clearFields(){
    form.name =''
    form.email =''
    form.phone =''
    form.address =''
    form.state_id =''
    form.lga_id =''
    form.ward_id =''
    form.area_id =''
    form.id = '';
    form.gender='';
    form.dob='';
    form.volunteer_id='';
    form.department_id='';
    form.status_id="";
    form.user_type = "";
}
const submit = async () => {
    data.addingTeamMember = true;
    let response =  await axios.post("add_volunteer",form)    
    if(response.data.ok == true){
        if(form.id == ''){            
            Swal.fire(response.data.msg, 'success')
            Inertia.reload({ only: ['teams'] })
        }else{
            showAlert(response.data.msg, 'success')
            Inertia.reload({ only: ['teams'] })
        }
    }else{
        showAlert('try again', 'error')
    }
    data.addingTeamMember = false  
};

function showAlert(msg,icon='success'){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addexpenseListener('mouseenter', Swal.stopTimer)
        toast.addexpenseListener('mouseleave', Swal.resumeTimer)
    }
    })

    Toast.fire({
    icon: icon,
    title: msg
    })
}
function changePage(page){
    clearFields()
    data.switch = "list"
    data.page=page
}
</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active="Volunteer"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div style="position:fixed; display: flex; justify-content: center;padding:5px; width:100%;background:#2223;color:white;align-items: center;" v-if="data.loading">
       Please Wait <div class="spinner-border text-white" role="status"></div>
    </div>
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Volunteers</h4>
    </div>
    
    <div class="row w-100">
        <div class="col-md-7">
            <div class="row w-100">
                <button @click="data.switch='uploads'" :disabled="data.switch=='uploads'" class="w-1x  mb-3 btn btn-sm bg-dark text-white">Upload</button>
                <button @click="add()" :disabled="data.switch=='add'" class="w-1x ml-3 mb-3 btn btn-sm bg-dark text-white">Add </button>
                <div class="col-sm-12 col-md-4">
                    <button @click="data.switch='list'" :disabled="data.switch=='list'" class="w-1x ml-3 mb-3 btn btn-sm bg-dark text-white mx-auto">List of {{data.page}}</button>
                </div>
            </div>
        </div>
        <div class="col-md-5 mt-1">
            <div>
                <button @click="changePage('volunteers')" :disabled="data.page=='volunteers'" class="w-1x m-0 btn btn-sm bg-success text-white">Volunteers</button>
                <button @click="changePage('party members')" :disabled="data.page=='party members'" class="w-1x ml-3 mt-0 btn btn-sm bg-success text-white">Party Members</button>
            </div>
        </div>        
    </div>
    <div v-if="data.page=='volunteers'">
        <div v-show="data.switch=='list'" class="px-3" >
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <td>S/N</td>
                        <td>Volunteer ID</td>                    
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address</td>
                        <td>State</td>
                        <td>LGA</td>
                        <td>Ward</td>
                        <td>Area</td>
                        <td>Date of Birth</td>
                        <td>Gender</td>
                        <td>Pix</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(volunteer,i) in volunteers.data" :key="i">
                        <td>{{ volunteers.from + i }}</td>
                        <td>{{volunteer.volunteer_id}}</td>                    
                        <td>{{volunteer.name}}</td>                    
                        <td>{{volunteer.email}}</td>                    
                        <td>{{volunteer.phone}}</td>                    
                        <td>{{volunteer.address}}</td>                    
                        <td>{{volunteer.state}}</td>
                        <td>{{volunteer.lga}}</td>
                        <td>{{volunteer.ward}}</td>
                        <td>{{volunteer.area}}</td>
                        <td>{{volunteer.dob}}</td>
                        <td>{{volunteer.gender}}</td>
                        <td><img :src="volunteer.image" alt="image"></td>
                        <td>
                            <button @click="edit(volunteer,i)" class="btn btn-sm bg-primary text-white">Edit</button>
                            <button class="btn btn-sm ml-2 bg-danger text-white">Delete</button>                        
                        </td>                    
                    </tr>
                </tbody>
            </table>
            <PAGINATE :next="volunteers.next_page_url" :prev="volunteers.prev_page_url"></PAGINATE>
        </div>
    </div>
    <div v-if="data.page=='party members'">
        <div v-show="data.switch=='list'" class="px-3" >
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <td>S/N</td>
                        <td>Volunteer ID</td>                    
                        <td>Department</td>
                        <td>Status</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address</td>
                        <td>State</td>
                        <td>LGA</td>
                        <td>Ward</td>
                        <td>Area</td>
                        <td>Date of Birth</td>
                        <td>Gender</td>
                        <td>Pix</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(partyMember,i) in partyMembers.data" :key="i">
                    <td>{{ partyMembers.from + i }}</td>
                    <td>{{partyMember.partyMember_id}}</td>                    
                    <td>{{partyMember.department}}</td>                    
                    <td>{{partyMember.status}}</td>                    
                    <td>{{partyMember.name}}</td>                    
                    <td>{{partyMember.email}}</td>                    
                    <td>{{partyMember.phone}}</td>                    
                    <td>{{partyMember.address}}</td>                    
                    <td>{{partyMember.state}}</td>
                    <td>{{partyMember.lga}}</td>
                    <td>{{partyMember.ward}}</td>
                    <td>{{partyMember.area}}</td>
                    <td>{{partyMember.dob}}</td>
                    <td>{{partyMember.gender}}</td>
                    <td><img :src="partyMember.image" alt="image"></td>
                    <td>
                        <button @click="edit(partyMember,i)" class="btn btn-sm bg-primary text-white">Edit</button>
                        <button class="btn btn-sm ml-2 bg-danger text-white">Delete</button>                        
                    </td>                    
                </tr>
                </tbody>
            </table>
            <PAGINATE :next="partyMembers.next_page_url" :prev="partyMembers.prev_page_url"></PAGINATE>
        </div>
    </div>
    
    <div v-show="data.switch=='uploads'" class="px-3" >
        <a  class="ml-3 mb-3 btn btn-sm bg-primary text-white w-1x" href="template/volunteers_upload_template.csv" target="_blank">Download Template</a>
        <form @submit.prevent="uploadData()" class="mt-5 ml-5" enctype="multipart/form-data">                        
            <div class="col-md-4 mb-4">
                <label>Select User type</label>                      
                <select required v-model="formUpload.user_type" type="text" class="form-control">                            
                    <option value="Volunteer">Volunteer</option>
                    <option value="Party Member">Party Member</option>
                </select>   
            </div>  
            <div v-if="formUpload.user_type == 'Party Member'" class="col-md-4 mb-2">
                <label>Select Status</label>                      
                <select required v-model="formUpload.status_id" type="text" class="form-control">                            
                    <option v-for="(status) in statuses" :key="'dep_'+status.id" :value="status.id">{{status.name}}</option>
                </select>   
            </div>         
            <div v-if="formUpload.user_type=='Party Member'" class="col-md-4 mb-4">
                <label>Select Department</label>                      
                <select required v-model="formUpload.department_id" type="text" class="form-control">                            
                    <option v-for="(department) in departments" :key="'dep_'+department.id" :value="department.id">{{department.name}}</option>
                </select>   
            </div>  
            <div class="mt-4">
                <InputLabel for="file_to_upload" value="CSV File To uplad" />                                
                <input required id="file_to_upload" @input="formUpload.file_to_upload = $event.target.files[0]"  type="file" class=" mt-1 block" />               
            </div>                            
            <div class=" mt-4">
                <button class="ml-4 btn btn-dark" :class="{ 'opacity-25': form.processing }" >
                    Upload Data
                </button>
            </div>                    
        </form>  
    </div>
    <div v-show="data.switch=='add'" class="px-3" >
        <form @submit.prevent="submit">
            <div class="row w-100">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                    
                    <div class="col-md-4 mb-2">  
                        <label>Name</label>                      
                        <input required v-model="form.name" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Volunteer ID</label>                      
                        <input required v-model="form.volunteer_id" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Email</label>                      
                        <input required v-model="form.email" type="email" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Phone</label>                      
                        <input required v-model="form.phone" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Address</label>                      
                        <input v-model="form.address" type="text" class="form-control">                            
                    </div>
                    
                    <div class="col-md-4 mb-2">  
                        <label>State</label>                      
                        <select required @change="trigerLgas()" v-model="form.state_id" type="text" class="form-control">
                            <option value="0">-</option>
                            <option v-for="(state) in states" :key="state.id" :value="state.id">{{state.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4 mb-2"> 
                        <label>Lga</label>                      
                        <select required @change="trigerWards()" v-model="form.lga_id" type="text"  class="form-control">                            
                            <option v-for="(lga) in data.lgas" :key="'lg_'+lga.id" :value="lga.id">{{lga.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4 mb-2">
                        <label>Ward</label>                      
                        <select @change="trigerAreas()" required v-model="form.ward_id" type="text" class="form-control">                            
                            <option v-for="(ward) in data.wards" :key="'ward_'+ward.id" :value="ward.id">{{ward.name}}</option>
                        </select>   
                    </div>          
                    <div class="col-md-4 mb-2">
                        <label>Area Name</label>                      
                        <select v-model="form.area_id" type="text" class="form-control">                            
                            <option v-for="(area) in data.areas" :key="'a_'+area.id" :value="area.id">{{area.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4 mb-2">
                        <label>User type</label>                      
                        <select required v-model="form.user_type" type="text" class="form-control">                            
                            <option value="Volunteer">Volunteer</option>
                            <option value="Party Member">Party Member</option>
                        </select>   
                    </div>          
                    <div v-if="form.user_type == 'Party Member'" class="col-md-4 mb-2">
                        <label>Department</label>                      
                        <select required v-model="form.department_id" type="text" class="form-control">                            
                            <option v-for="(department) in departments" :key="'dep_'+department.id" :value="department.id">{{department.name}}</option>
                        </select>   
                    </div>  
                    <div v-if="form.user_type == 'Party Member'" class="col-md-4 mb-2">
                        <label>Status</label>                      
                        <select required v-model="form.status_id" type="text" class="form-control">                            
                            <option v-for="(status) in statuses" :key="'dep_'+status.id" :value="status.id">{{status.name}}</option>
                        </select>   
                    </div>  
                    <div class="col-md-4 mb-2">
                        <label>Gender</label>                      
                        <select v-model="form.gender" type="text" class="form-control">                            
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>   
                    </div>    
                    <div class="col-md-4 mb-2">  
                        <label>Date of Birth</label>                      
                        <input v-model="form.dob" type="date" class="form-control">                            
                    </div> 
                    <div class="col-md-4 mb-2">  
                        <label>Password</label>                      
                        <input v-model="form.password" type="date" class="form-control">                            
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
<style scoped>

.w-1x{
    width:160px;    
    text-transform: capitalize;
}
</style>