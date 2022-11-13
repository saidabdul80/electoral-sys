<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import Panel from "./Panel.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { reactive } from "@vue/reactivity";
import HEADER from "./../Components/Header.vue";
import SIDENAV from "./../Components/Sidenav.vue";
import { onMounted } from "@vue/runtime-core";
import PAGINATE from "./../Components/Paginate.vue";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import { Inertia } from '@inertiajs/inertia'
import './../boostrap5.js'
import LightLoader from './../Components/LightLoader.vue';

const data = reactive({
  loading:false,
  user: {},
  state_id: [],
  lgas: [],
  wards:[],
  areas:[],
  selected_states: "",
  addingTeam:false,
  removingTeam:false,
  addingTeamMember:false,
  removingTeamMember:false,
  switch:'add',
  team_id:'',
  team_name:'',
  volunteers:[],
  volunteersTable:{},  
  members_id:[],
  form:{
    team_name:'',    
    state_id:'',
    lga_id:'',
    ward_id:'',
    area_id:'',
    id: "",
    task:"",
}
});

const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,    
  states: Array,
  teams:Array
});

async function trigerLgas() {
  
    let response =  await axios.get(`/lgas/${data.form.state_id}`)
    data.lgas = response.data
}
async function trigerWards() {
    let response =  await axios.get(`/wards/${data.form.lga_id}`)
    data.wards = response.data
}

async function trigerAreas() {
    let response =  await axios.get(`/areas/${data.form.ward_id}`)
    data.areas = response.data    
}

async function addTeamMember(volunteer_id) {
    data.addingTeamMember = true;
    let response =  await axios.post(`/add_team_member`,{team_id:data.team_id ,volunteer_id:volunteer_id})    
    if(response.data == true){
        showAlert('Successfuly Added ', 'success')
        Inertia.reload({ only: ['teams'] })
    }else{
        showAlert('try again', 'error')
    }
    data.addingTeamMember = false
}

async function removeMember(team_id,volunteer_id) {
    data.loading = true
    let response =  await axios.post('/remove_team_member',{team_id:team_id ,volunteer_id:volunteer_id})    
    if(response.data == true){
        showAlert('Successfuly removed ', 'success')
        Inertia.reload({ only: ['teams'] })
    }else{
        showAlert('try again', 'error')
    }
    data.loading = false
}


async function fetchData(url){
    let response =  await axios.get(url)
    return response.data     
}

async function addTeam() {
    data.addingTeam = true;
    let response =  await axios.post('/add_team',data.form)
    if(response.data == true){
        showAlert('added', 'success')
        Inertia.reload({ only: ['teams'] })
    }else{
        showAlert('try again', 'error')
    }
    data.addingTeam = false
}



function edit(item,i) {
  data.indexNum = i;
  data.form.id = item.id;
  data.form.state_id = item.state_id;
  trigerLgas();
  setTimeout(() => {
    data.form.lga_id = item.lga_id;
    setTimeout(() => {
        trigerWards();
        data.form.ward_id = item.ward_id;
        setTimeout(() => {
            trigerAreas();
            data.form.area_id = item.area_id;
        }, 50);
    }, 50);    
  }, 50);
  data.form.team_name  = item.team_name ;        
  data.form.task = item.task;  
  data.switch = "add";
}
function add() {    
    data.form.team_name =''   
    data.form.state_id =''
    data.form.lga_id =''
    data.form.ward_id =''
    data.form.area_id =''
    data.form.id = '';
    data.form.task='';
    data.switch = "add";
    $('#list').toggleClass('col-md-9');
    setTimeout(() => {
        $('#add').show();        
    }, 200);
}

function addx() {    
    data.form.team_name =''   
    data.form.state_id =''
    data.form.lga_id =''
    data.form.ward_id =''
    data.form.area_id =''
    data.form.id = '';
    data.form.task='';
    data.switch = "add";  
}

function searchBox(e) {
  let val = e.target.value.toLowerCase();
  $(".tags").each(function () {
    $(this).parent().toggle($(this).text().toLowerCase().includes(val));
  });

  
}
function list(){
    data.switch ='list',
    $('#add').hide();
    $('#list').toggleClass('col-md-9');
}
async function remove(id){
    data.loading = true    
    let response =  await axios.post('/delete_team',{id:id})
    if(response.data == true){
        showAlert('Successfuly removed ', 'success')
        Inertia.reload({ only: ['teams'] })
    }else{
        showAlert('try again', 'error')
    }
    data.loading = false
}
function volunteerTable(init = false){
    if(init){
        $('#vtablex').DataTable({
               pageLength:10,                         
           });
    }else{
        $('#vtablex').DataTable({
               pageLength:10,           
               //destroy:true,         
           });
    }
}

function array_col(array, column){
  let result = [];

  for (let item of array) {
    result.push(item[column]);
  }
  return result;
}
async function openMemberModal(team){
    data.members_id = array_col(team.members,'id');    
    data.team_id = team.id
    data.team_name = team.team_name
    let res = await fetchData('/volunteers')
    data.volunteers = res;
    //volunteerTable(true)
    $("#exampleModal").modal("show");
}
async function nextVolunteers(){
    let res = await fetchData(data.volunteers.next_page_url)
    data.volunteers = res;
    //volunteerTable()
}
async function prevVolunteers(){
    let res = await fetchData(data.volunteers.prev_page_url)    
    data.volunteers = res;
    //volunteerTable()
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
    <LightLoader v-if="data.loading" />       
  <HEADER></HEADER>
  <SIDENAV active="Team"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <Toast></Toast>
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Teams</h4>
    </div>                
    <button v-if="data.form.id==''" :disabled="data.switch=='add'" @click="add()" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Add Team</button>
    <button v-else  @click="addx()" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Add Team</button>
    <button :disabled="data.switch=='list'" @click="list()" class="ml-3 mb-3 btn btn-sm bg-dark text-white">List</button>
    <div class="pl-3  row w-100">
        <div class="row">
            <form @submit.prevent="submit" class="col-md-3" id="add">          
                <div class="mb-2">
                    <InputLabel for="team_name" value="Team Name" />
                    <TextInput id="team_name" type="text" class="mt-1 block w-full" v-model="data.form.team_name" required autofocus autocomplete="team_name"/>                    
                </div>
                <div class="mb-2">  
                        <label>State</label>                      
                        <select required @change="trigerLgas()" v-model="data.form.state_id" type="text" class="form-control">
                            <option value="0">-</option>
                            <option v-for="(state) in states" :key="state.id" :value="state.id">{{state.name}}</option>
                        </select>   
                    </div>
                    <div class="mb-2"> 
                        <label>LGA</label>                      
                        <select required @change="trigerWards()" v-model="data.form.lga_id" type="text"  class="form-control">                            
                            <option v-for="lga in data.lgas" :key="'lg_'+lga.id" :value="lga.id">{{lga.name}}</option>
                        </select>   
                    </div>
                    <div class="mb-2">
                        <label>Ward</label>                      
                        <select @change="trigerAreas()" required v-model="data.form.ward_id" type="text" class="form-control">                            
                            <option v-for="(ward) in data.wards" :key="'ward_'+ward.id" :value="ward.id">{{ward.name}}</option>
                        </select>   
                    </div>          
                    <div class="mb-2">
                        <label>Area Name</label>                      
                        <select v-model="data.form.area_id" type="text" class="form-control">                            
                            <option v-for="(area) in data.areas" :key="'a_'+area.id" :value="area.id">{{area.name}}</option>
                        </select>   
                    </div>   
                    <div class="mb-2">
                        <label>Task</label>                      
                        <input v-model="data.form.task" type="text" class="form-control">                                                                                
                    </div>      
                <div class="mt-4">
                <PrimaryButton @click="addTeam()" class="ml-4 d-flex" :class="{ 'opacity-25': data.form.processing, 'bg-success':data.form.id }" :disabled="data.form.processing" >
                    <span v-if="data.form.id ==''">Add</span>
                    <span v-else>Update</span> <div v-if="data.addingTeam" class="spinner-border text-white" role="status"></div>
                </PrimaryButton>
            </div>
            </form>
            <div class="col-md-9" id="list">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <td>Team Name</td>
                            <td>State, LGA, Ward</td>                                                        
                            <td>Area</td>
                            <td>Task</td>
                            <td>Members</td>
                            <td>Options</td>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="team in teams.data" :key="'i'+team.id">
                            <td>{{team.team_name}}</td>
                            <td>{{team.state}}, {{team.lga}}, {{team.ward}}</td>
                            <td>{{team.area}}</td>
                            <td>{{team.task}}</td>
                            <td style="width:30%; overflow-x:scroll;box-shadow: inset 0px 2px 4px #ccc;">
                                <span  class="btn btn-secondary btn-sm text-white p-1 m-1" v-for="member in team.members" @dblclick="removeMember(team.id,member.id)" :key="'m'+member.id">
                                    {{member.name}} <span>&times</span>
                                </span>
                            </td>
                            <td>
                                <button title="Add Members" @click="openMemberModal(team)"  class="btn btn-sm btn-info text-white"><i class="bi bi-file-plus-fill"></i></button>
                                <button @click="edit(team)" title="Edit" class="btn btn-sm ml-1 btn-info text-white"><i class="bi bi-pencil-square"></i></button>
                                <button @click="remove(team.id)" title="Delete" class="btn btn-sm ml-1  btn-danger text-white"><i class="bi bi-trash3"></i></button>
                            </td> 
                        </tr>
                    </tbody>
                </table>
                <PAGINATE :next="teams.next_page_url" :prev="teams.prev_page_url"></PAGINATE>
            </div>
            
        </div>
        </div>            
      <!-- <Head title="Admin Config Panel" /> -->    

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{data.team_name}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input class="form-control w-50 mb-2" placeholder="search" type="text" @keyup="searchBox($event)">
                <div class="w-100" style="height:64vh;overflow-y:scroll;">
                    <table class="mt-2 table table-condensed table-striped table-bordered position-relative" id="vtablex">
                        <thead class="bg-dark text-white">
                            <tr style="width:500px;">
                                <td width="25%" class="p-1" >SN</td>
                                <td width="25%" class="p-1">Name</td>
                                <td width="25%" class="p-1" >Pix</td>
                                <td width="25%" class="p-1">Option <div v-if="data.addingTeamMember" class="spinner-border text-white fs1" role="status"></div></td>
                            </tr>                            
                        </thead>
                        <tbody >
                            <tr v-for="(volunteer,i) in data.volunteers?.data" v-show="!data.members_id.includes(volunteer.id)" :key="'v'+volunteer.id">
                                <td width="25%" >{{data.volunteers?.from +i}}</td> 
                                <td width="25%" class="tags p-1">{{volunteer.volunteer_id}}</td>
                                <td width="25%" class="tags p-1">{{volunteer.name}}</td>
                                <td width="25%" class="p-1"> 
                                    <button @click="addTeamMember(volunteer.id)" class="btn btn-sm btn-danger text-white"><i class="bi bi-plus"></i></button>                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>                
                </div>
            </div>
            <div class="modal-footer">
                <div>
                    <button v-if="data.volunteers?.prev_page_url" @click="prevVolunteers()" class="btn btn-dark text-white px-3 py-2">Prev</button>
                    <button v-else disabled="disabled" :href="next" class="btn btn-dark text-white px-3 py-2 ml-1">Prev</button>
                    <button v-if="data.volunteers?.next_page_url"  @click="nextVolunteers()" class="btn btn-dark text-white px-3 py-2 ml-1">Next</button>
                    <button v-else disabled="disabled" :href="next" class="btn btn-dark text-white px-3 py-2 ml-1">Next</button>
                </div>    
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>                
            </div>
            </div>
        </div>
        </div>   
  </div>
</template>
<style>
tr > td {
    cursor: pointer;
}
tr > td:focus {
    background: #555;
    color:white !important;
}

tr:first-child > td {
  border-top: 1px solid #ccc;
}
td:first-child {
  padding-left: 20px !important;
  border-right: none !important;
}
td:last-child {
  border-left: none !important;
}
.d-flexx {
  display: flex;
}
#add{
    transition: .2s all; 
}
#list{
    transition: .2s all ;
}
</style>
    