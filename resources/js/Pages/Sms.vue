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
  sentMessages:Array,
  config:Object,
  contacts:Object,
});

const data = reactive({
  switch: "compose",  
});

const form = useForm({
    message_to:'',
    message:"",
});

//configuration
const form2 = useForm({
    api:props.config.api,
    others: props.config.others,
    sender: props.config.sender,
});

async function sendSMS() {
  const payload = {    
    to: form.message_to,
    message: form.message
  };
    
  let response = await axios.post(route('sendsms'),payload);
  let resp = response.data   
  if (resp.ok) {
      alert("congrats! messages are on their way!");
      Inertia.reload();
  } else {
    alert("oh-no! something went wrong...");
  }
}
</script>
<template>
  <HEADER></HEADER>
  <SIDENAV active="SMS"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">SMS</h4>
    </div>
    <button @click="data.switch='compose'" :disabled="data.switch=='compose'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Compose</button>
    <button @click="data.switch='config'" :disabled="data.switch=='config'" class="ml-3 mb-3 btn btn-sm bg-dark text-white">Configuration</button>
    <div v-show="data.switch=='compose'">
        <div class="row mt-3">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-2 mb-2">  
                        SMS To: 
                    </div>
                    <div class="col-md-10 mb-2">  
                        <label>All Voters</label>                      
                        <input  v-model="form.message_to" value="voters" name="to" type="radio" >                            
                        <label class="ml-2">All Volunteers</label>                      
                        <input  v-model="form.message_to" value="volunteers" name="to" type="radio" >                            
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-2 mb-2 ">  
                        Message
                    </div>
                    <div class="col-md-10 mb-2">                      
                        <textarea  rows="4"  style="height:300px;" class="form-control" required v-model="form.message" type="radio" ></textarea>                                               
                        <button @click="sendSMS()"  class="btn btn-dark mt-3">Send</button>
                    </div>
                </div>            
            </div>
            <div class="col-md-6">
                <b><label class="w-100 text-center alert alert-warning"> Sent SMS</label></b>
                <div class="w-100" style="overflow-x:scroll; overflow-y: scroll;height: 60vh;">
                    <table class="table p-3">
                        <tbody>
                            <tr v-for="(sentMessage,d) in sentMessages.data" :key="d">
                                <td>
                                    <div class="text-dark"><b>All {{sentMessage.message_to}}</b></div>
                                    <div class="text-secondary">{{sentMessage.message}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PAGINATE :next="sentMessages.next_page_url" :prev="sentMessages.prev_page_url"></PAGINATE>
            </div>            
        </div>
    </div>
    <div v-show="data.switch=='config'">
        <form>
            <div class="col-md-4 mb-2">  
                <label>Api Token</label>                      
                <input required v-model="form2.api" type="text" class="form-control">                            
            </div>
            <div class="col-md-4 mb-2">  
                <label>webhook</label>                      
                <input required v-model="form2.others" type="text" class="form-control">                            
            </div>
            <div class="col-md-4 mb-2">  
                <label>Sender</label>                      
                <input required v-model="form2.sender" type="text" class="form-control">                            
            </div>
            <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">                                
                Save</PrimaryButton>              
        </form>
    </div>
  </div>
</template>