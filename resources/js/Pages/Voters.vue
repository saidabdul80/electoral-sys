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


const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  areas: Array,
  voters: Array,  
  states:Array
});
const data = reactive({
  switch: "list",
  wards: [],
  lgas: [],
  states: [],  
  areas:[],
  indexNum:0
});
function trigerLgas() {
  data.lga_ready = false;

  // let state = document.getElementById('state_id').value;
  data.lga_id = null;
  data.ward_id = null;
  setTimeout(function () {
    props.states.every((item) => {
      if (item.id == form.state_id) {
        data.lgas = item.lgas;
        return false;
      }
      return true;
    });
  }, 400);
}
function trigerWards() {
  data.ward_id = null;
  // let state = document.getElementById('state_id').value;
  setTimeout(function () {
    data.lgas.every((item) => {
      if (item.id == form.lga_id) {
        data.wards = item.wards;
        return false;
      }
      return true;
    });
  }, 400);
}
const form = useForm({
    name:'',
    email:'',
    phone:'',
    address:'',
    state_id:'',
    lga_id:'',
    ward_id:'',
    area_id:'',
    id: "",
    voter_id:"",
    gender:"",
    dob:""
});
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
    form.voter_id = item.voter_id;  
    form.gender = item.gender;  
    form.dob = item.dob;  
  data.switch = "add";
}
function add() {
    form.name =''
    form.email =''
    form.phone =''
    form.address =''
    form.state_id =''
    form.lga_id =''
    form.ward_id =''
    form.area_id =''
    form.id = '';
    form.voter_id='';
    form.gender='';
    form.dob='';
  data.switch = "add";
}
const submit = () => {
  form.post(route("add_voters"), {
    onFinish: ($res) => {
        if(form.id != ''){
            props.voters.data[data.indexNum]=form
        }else{
            props.voters.data.push(form)
        }
    },
  });
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
</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active=""></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Voters</h4>
    </div>
    <button @click="add()" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Add</button>
    <button @click="data.switch='list'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">List</button>
    <div v-show="data.switch=='list'" class="px-3" >
        <table class="table table-bordered">
            <thead>
                <tr>
                    <td>S/N</td>
                    <td>Voter's ID</td>
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
                <tr v-for="(voter,i) in voters.data" :key="i">
                    <td>{{ voters.from + i }}</td>
                    <td>{{voter.voter_id}}</td>                    
                    <td>{{voter.name}}</td>                    
                    <td>{{voter.email}}</td>                    
                    <td>{{voter.phone}}</td>                    
                    <td>{{voter.address}}</td>                    
                    <td>{{voter.state}}</td>
                    <td>{{voter.lga}}</td>
                    <td>{{voter.ward}}</td>
                    <td>{{voter.area}}</td>
                    <td>{{voter.dob}}</td>
                    <td>{{voter.gender}}</td>
                    <td><img :src="voter.image"></td>
                    <td>
                        <button @click="edit(voter,i)" class="btn btn-sm bg-primary text-white">Edit</button>
                        <button class="btn btn-sm ml-2 bg-danger text-white">Delete</button>                        
                    </td>                    
                </tr>
            </tbody>
        </table>
        <PAGINATE :next="voters.next_page_url" :prev="voters.prev_page_url"></PAGINATE>
    </div>
    <div v-show="data.switch=='add'" class="px-3" >
        <form @submit.prevent="submit">
            <div class="row w-100">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                    
                    <div class="col-md-4 mb-2">  
                        <label>Voter's ID</label>                      
                        <input required v-model="form.voter_id" type="text" class="form-control">                            
                    </div>
                    <div class="col-md-4 mb-2">  
                        <label>Name</label>                      
                        <input required v-model="form.name" type="text" class="form-control">                            
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
                        <label>States</label>                      
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
                        <select v-model="form.area_id" type="text" class="form-control">                            
                            <option v-for="(area) in areas" :key="'a_'+area.id" :value="area.id">{{area.name}}</option>
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