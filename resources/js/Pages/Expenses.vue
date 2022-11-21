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
  expenses: Array,  
  categories:Array
});
const data = reactive({
saving:false,
  switch: "list",  
  states: [], 
  page:'expenses', 
  deleting:false,
  category:{
    name:'',
    description:'',
  },
  form:{    
    category_id:'',
    date:'',    
    description:'',
    amount:'',
    id:''
    },  
});

function edit(item,i) {
    data.form.category_id = item.category_id
    data.form.amount = item.amount    
    data.form.description = item.description
    data.form.date = item.date
    data.form.id = item.id
  data.switch = "add";
}
function editCategory(item,i) {
    data.category.name = item.name
    data.category.description = item.description
    data.category.id = item.id    
    data.switch = "add";
}

function add() {
    data.form.category_id =''
    data.form.amount =''
    data.form.description =''
    data.form.date =''
    data.form.id =''

    data.category.name =''
    data.category.description =''
    data.category.id =''
    data.switch = "add";
}

async function saveExpense() {
    data.saving = true;
  let response = await axios.post(route('save_expense'),data.form);
  let resp = response.data   
  data.saving = false
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

async function deleteExpense(id) {
    data.deleting = true
  let response = await axios.post(route('delete_expense'),{id:id});
  let resp = response.data   
  data.deleting =false
  if (resp) {

      showAlert("Deleted Successfuly");
      Inertia.reload();
  } else {
    showAlert("oh-no! something went wrong...");
  }
}

async function saveCategory() {
    data.saving = true;
  let response = await axios.post(route('save_category'),data.category);
  let resp = response.data   
  data.saving = false
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

async function deleteCategory(id) {
    data.deleting = true
  let response = await axios.post(route('delete_category'),{id:id});
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
      <h4 class="ml-3 my-0">Expenses Management </h4>
    </div>
    <div class="float-right">
        <button @click="data.page='expenses'" :disabled="data.page=='expenses'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Expenses</button>
        <button @click="data.page='categories'" :disabled="data.page=='categories'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Categories</button>
    </div>
    <button @click="add()" :disabled="data.switch=='add'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Add</button>
    <button @click="data.switch='list'" :disabled="data.switch=='list'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">List</button>
    <div v-if="data.page=='expenses'">
        <div v-show="data.switch=='list'" class="px-3" >
            <table class="table table-bordered">
                <thead>
                    <tr>                                                                                                
                        <td>S/N</td>
                        <td>Category</td>                                        
                        <td>Amount</td>
                        <td>Description</td>
                        <td>Date</td>
                        <td><div v-if="data.deleting" class="spinner-border text-danger" role="status"></div></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(expense,i) in expenses.data" :key="i">
                        <td>{{ expenses.from + i }}</td>
                        <td>{{expense.category}}</td>                    
                        <td>{{expense.amount}}</td>                                        
                        <td>{{expense.description}}</td>
                        <td>{{expense.date}}</td>
                        <td>
                            <button @click="edit(expense,i)" class="btn btn-sm bg-primary text-white">Edit</button>
                            <button @click="deleteExpense(expense.id)" class="btn btn-sm ml-2 bg-danger text-white">Delete </button>                        
                        </td>                    
                    </tr>
                </tbody>
            </table>
            <PAGINATE :next="expenses.next_page_url" :prev="expenses.prev_page_url"></PAGINATE>
        </div>
        <div v-show="data.switch=='add'" class="px-3" >
            <h5 class="p-2" v-if="data.form.id == ''">New Category </h5>
            <h5 v-else>Update Category </h5>
            <form @submit.prevent="saveExpense()">
                <div class="row w-100">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                                      
                        <div class="col-md-4 mb-2">  
                            <label>Category</label>                      
                            <select v-model="data.form.category_id" type="text" class="form-control">
                                <option value="0">-</option>
                                <option v-for="(category) in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                            </select>   
                        </div>          
                        <div class="col-md-4 mb-2">  
                            <label>Description</label>                      
                            <input required v-model="data.form.description" type="text" class="form-control">                            
                        </div>
                        <div class="col-md-4 mb-2">  
                            <label>Amount</label>                      
                            <input required v-model="data.form.amount" type="text" class="form-control">                            
                        </div>                         
                        <div class="col-md-4 mb-2">  
                            <label>Date</label>                      
                            <input required v-model="data.form.date" type="date" class="form-control">                            
                        </div>     
                        <div class="col-md-4 mb-2">
                            <label style="visibility: hidden;">Area Description</label>                      
                            <button class="ml-4 d-flex btn btn-dark" :disabled="data.saving==true" :class="{ 'opacity-25': data.processing }" >                                
                                    <span v-if="data.form.id==''">Add </span>
                                    <span v-else>Update</span>
                                    <div v-if="data.saving" class="spinner-border text-white h6" role="status"></div>
                            </button>  
                        </div>
                    </div>
                </div>
                </div>
            </form>
        </div>
    </div>  
    <div v-if="data.page=='categories'">
        <div v-show="data.switch=='list'" class="px-3" >
            <table class="table table-bordered">
                <thead>
                    <tr>                                                                                                
                        <td>S/N</td>
                        <td>Name</td>                                                                
                        <td>Description</td>                        
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(category,i) in categories" :key="'c-'+i">
                        <td>{{ i+1 }}</td>
                        <td>{{category.name}}</td>                                                                           
                        <td>{{category.description}}</td>                        
                        <td>
                            <button @click="editCategory(category,i)" class="btn btn-sm bg-primary text-white">Edit</button>
                            <button @click="deleteCategory(category.id)" class="btn btn-sm ml-2 bg-danger text-white">Delete <div v-if="data.deleting" class="spinner-border text-white" role="status"></div></button>                        
                        </td>                    
                    </tr>
                </tbody>
            </table>
            <PAGINATE :next="expenses.next_page_url" :prev="expenses.prev_page_url"></PAGINATE>
        </div>
        <div v-show="data.switch=='add'" class="px-3" >            
            <h5 v-if="data.category.id == ''">New Category </h5>
            <h5 v-else>Update Category </h5>
            <form @submit.prevent="saveCategory()">
                <div class="row w-100">
                    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                                                              
                        <div class="col-md-4 mb-2">  
                            <label>Name</label>                      
                            <input required v-model="data.category.name" type="text" class="form-control">                            
                        </div>                         
                        <div class="col-md-4 mb-2">  
                            <label>Description</label>                      
                            <input required v-model="data.category.description" type="text" class="form-control">                            
                        </div>                       
                        <div class="col-md-4 mb-2">
                            <label style="visibility: hidden;">Description</label>                      
                            <button class="ml-4 d-flex btn btn-dark" :disabled="data.saving==true" >                                
                                    <span v-if="data.category.id==''">Add</span>
                                    <span v-else>Update</span>
                                    <div v-if="data.saving" class="spinner-border text-white h6" role="status"></div>
                            </button>  
                        </div>
                    </div>
                </div>
                </div>
            </form>
        </div>
    </div>

  </div>
</template>

<style scoped>
.spinner-border {
    margin-left:4px !important;
    width:15px !important;
    height:15px !important;
}
</style>