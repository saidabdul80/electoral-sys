<script setup>
    import GuestLayout from '@/Layouts/GuestLayout.vue';
    import InputError from '@/Components/InputError.vue';
    import InputLabel from '@/Components/InputLabel.vue';
    import PrimaryButton from '@/Components/PrimaryButton.vue';
    import TextInput from '@/Components/TextInput.vue';
    import './../dtables/datatable.css'
    import './../dtables/datatables.min.js'
    import Panel from './Panel.vue';
    import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
    import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

     const data = reactive({
            user:{},
            state_id:[],
            lgas:{},
            selected_states:""
    }) 
    const props = defineProps({
        users: Array,
        config: Object
    })
    
    const form = useForm({
        first_name: '',
        surname: '',
        email: '',
        password: '',
        lgas:[],
        states:[],
        role:'user',
        password_confirmation: '',
        terms: false,
    });
   onMounted(()=>{
       
       $('#user_table').DataTable({
           pageLength:5,
           lengthChange:false
           /* dom: 'Bfrtip',
           buttons: [
               'colvis',
               'excel',
               'print'
           ] */,
           drawCallback: function() {
               $(this.api().table().header()).hide();
           }
       });
   }) 

function checkIfTrue(item, old){
    let ms = true
    if(old.length>0){
        old.every((itemx) =>{        
            if(itemx.id == item.id){            
                ms = itemx.checked
                return false
            }
        })
    }
    return ms
}
function lgaFunc(e,lga){
    data.lgas.every((itemx,i) =>{                
        if(itemx.id == lga.id){            
            if(e.target.checked){
                data.lgas[i].checked = true 
            }else{                
                data.lgas[i].checked = false
            }
            return false
        }
        return checkIfTrue
    })
}
function trigerLgas(e){
    //{name:value,}
    let old = []
    if(data.lgas.length >0){
        old = JSON.parse(JSON.stringify(data.lgas))
    }
    data.lgas =[]
    
        data.state_id.forEach((id)=>{
            props.config.states.every((item) =>{
                    if(item.id == id){
                        item.lgas.forEach((lgax)=>{
                            data.lgas.push({
                                id:lgax.id,
                                name:lgax.name,
                                checked: checkIfTrue(lgax, old)
                            })
                        })
                        return false
                    }
                    return true
                })     
                console.log(id)
        })
    
    if(e.target.checked) {
         
    } else {
        // Checkbox is not checked..
    } 
}
function selectUser(user){    
    data.lgas = user.lgas_id
    form.first_name = user.first_name 
    form.surname = user.surname
    form.email = user.email
    form.role = user.role
    data.state_id = user.states.split(',')
}
    const submit = () => {
        form.states = data.state_id        
        form.lgas = data.lgas
        form.post(route('registerx'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };
 function searchBox(e){
    let val = e.target.value.toLowerCase();    
    $(".lgaTags").each(function () {                
      $(this).parent().toggle($(this).text().toLowerCase().includes(val));          
    });
}

</script>
    
<template>
<div class="w-100">
    <div class="container-fluid">
    <div class="row w-100">
        <div class="col-sm-auto bg-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                <!-- <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <i class="bi-bootstrap fs-1"></i>
                </a> -->
                <li> 
                    <Link :href="route('dashboard')" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">                        
                        <i class="bi-speedometer2 fs-1"></i>
                    </Link>
                </li>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li class="nav-item">
                        <Link :href="route('data-upload')" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <i class="bi-file-text-fill fs-1"></i>
                        </Link>
                    </li>                    
                    <li>
                        <a href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                            <i class="bi-tools fs-1"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                            <i class="bi-people fs-1"></i>
                        </a>
                    </li>
                </ul>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi-person-circle h2"></i>
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">                        
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><Link :href="route('logout')" method="post" class="dropdown-item" >Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm p-3 min-vh-100 row w-100">            
            <div class="col-md-4"> 
                <table  style="min-height:80vh;" id="user_table" class="shadow table rounded  table-hover">
                    <thead style="visibility: hidden !important;"> 
                        <tr style="visibility: hidden !important;">
                            <td style="visibility: hidden !important;"></td>
                            <td style="visibility: hidden !important;"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr tabindex="1" v-for="user in users.data" :key="'op_'+user.id" @click="selectUser(user)">
                            <td>{{user.first_name +' '+user.surname}}</td>
                            <td>({{user.email.split('@')[0]}}@..)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-8">
                <form @submit.prevent="submit">
                    <div style="height:87vh; overflow-y:scroll !important;">

                    
                <div>
                    <InputLabel for="first_name" value="First Name" />
                    <TextInput id="first_name" type="text" class="mt-1 block w-full" v-model="form.first_name" required autofocus autocomplete="first_name" />
                    <InputError class="mt-2" :message="form.errors.first_name" />
                </div>
                <div class="mt-4">
                    <InputLabel for="surname" value="Surname" />
                    <TextInput id="surname" type="text" class="mt-1 block w-full" v-model="form.surname" required autofocus autocomplete="surname" />
                    <InputError class="mt-2" :message="form.errors.surname" />
                </div>
    
                <div class="mt-4">
                    <InputLabel for="email" value="Email" />
                    <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autocomplete="username" />
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>
                <div class="mt-4 shadow">                    
                    <InputLabel class="badge bg-light fw-bolder fs-6 text-dark w-100" for="states" value="Assign States" />                                                          
                    <div class="mt-4">
                        <span class="d-flex  mr-4" style="float:left" v-for="(state) in config.states" :key="state.id" :value="state.id">
                            <input @change="trigerLgas($event)" :value="state.id" type="checkbox" v-model="data.state_id">
                            {{state.name}}
                        </span>
                    </div>
                    <!--
                    <select multiple="multiple" id="states" @change="trigerLgas()" v-model="data.state_id" type="text" class="form-control">
                        <option value="0">-</option>
                        <option v-for="(state) in config.states" :key="state.id" :value="state.id">{{state.name}}</option>
                    </select>    -->
                    <InputError class="mt-2" :message="form.errors.states" style="clear:left" />
                </div> 
                <div class="mt-4 " >                     
                    <InputLabel class="mt-3 shadow badge bg-light fw-bolder fs-6 text-dark w-100" for="lgas" value="Assign Lgas" />                                      
                    <input type="text" placeholder="Search Lga" class="form-control my-3  " @keyup="searchBox($event)">
                    <div style="clear:left; height: 100px; overflow-y: scroll;">
                        <span class="d-flexx mr-4 " style="float:left" v-for="(lga) in data.lgas" :key="lga.id" >
                            <input @change="lgaFunc($event, lga)" :value="lga.id" :checked="lga.checked" type="checkbox">
                            <span class="lgaTags">{{lga.name}}</span>
                        </span>              
                    </div>
                    <div class="shadow w-100 bg-light" style="height:5px"></div>
                    <InputError class="mt-2" :message="form.errors.lgas" />
                </div>
                <div class="mt-4" style="clear:left">
                    <InputLabel for="role" value="Role" />
                    <Select id="role" type="text" class="mt-1 form-control shadow-sm block w-full" v-model="form.role" required>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </Select>
                    <InputError class="mt-2" :message="form.errors.role" />
                </div>
                <div class="mt-4" style="clear:left">
                    <InputLabel for="password" value="Password" />
                    <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="new-password" />
                    <InputError class="mt-2" :message="form.errors.password" />
                </div>
    
                <div class="mt-4">
                    <InputLabel for="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" type="password" class="mt-1 block w-full" v-model="form.password_confirmation" required autocomplete="new-password" />
                    <InputError class="mt-2" :message="form.errors.password_confirmation" />
                </div>
                    </div>
                <div class="flex items-center justify-end mt-4">
                  <!--   <Link :href="route('login')" class="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link> -->
    
                    <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Register
                    </PrimaryButton>
                </div>
            
            </form> 
            </div>
    </div>
    </div>
</div>
            <!-- <Head title="Admin Config Panel" /> -->
            
            
    </div>
 </template>

    <style>
        tr:first-child>td{
            border-top: 1px solid #ccc;
            cursor: pointer;
        }
        td:first-child{
            padding-left: 20px !important;
            border-right: none !important;
        }
        td:last-child{
            border-left: none !important;
        }
        .d-flexx{
            display:flex;
        }
    </style>
    