<script setup>
import { Head, Link } from "@inertiajs/inertia-vue3";
import { reactive } from "@vue/reactivity";
import HEADER from "./../Components/Header.vue";
import { onMounted } from 'vue';
import SIDENAV from "./../Components/Sidenav.vue";
import './../../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  settings: Array,
});


const data = reactive({
    value:'',    
    form: props.settings,
    loaded:true
});

onMounted(()=>{
    setTimeout(()=>{
        /* data.form = props.settings;
        console.log(props)
        data.loaded = true
        console.log(data) */

    },1000)

})

async function saveIt(name,event){    
    console.log(data.form);    
    data.saving = true;
    let response = await axios.post(route('save_setting'),{data:data.form});
  let resp = response.data   
  data.saving = false
  if (resp == 'ok') {
      showAlert("Saved Successfuly");    
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
  <SIDENAV active="Settings"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Settings</h4>
    </div>
    <div v-if="data.loaded" class="m-3">    
        <div v-for="(setting, index) in settings" :key="setting.id" class="my-4">
            <legend class="h6" style="text-transform:capitalize;color:#555;">{{setting.title}}</legend>
            <div v-if="setting.type =='select'">
                <select class="form-control xvalue" v-model="data.form[index].value">
                    <option  v-for="data in setting.data" :selected="data.id==setting.value" :value="data.id" :key="'f'+data.id">{{data?.month || data?.year || data?.name}}</option>
                </select>                
            </div>

            <div v-if="setting.type == 'radio'">
                <span v-for="datas in setting.data" :key="datas.id" class="d-inline-block mx-3">
                    {{datas.name}}<input type="radio" v-model="data.form[index].value" :checked="setting.value == datas.name" :value="datas.name" :name="setting.name">
                </span>                            
            </div>
        </div>
        <button @click="saveIt()" class="btn btn-success ">Save</button>
    </div>
  </div>
</template>