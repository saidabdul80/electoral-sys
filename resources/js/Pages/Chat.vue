<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
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
//import './../boostrap5.js'
import LightLoader from './../Components/LightLoader.vue';
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
  laravelVersion: String,
  phpVersion: String,
  users:Array,
  currentUser:Object
});


const data = reactive({
  chatTab:true,
  loading:false,
  conversations:[],
  conversation_with_id:0,
  is_typing:false,
  clear_timeout:setTimeout(function(){}, 0)
});

const formUpload = useForm({
    from_user_id: '',
    to_user_id: '',
    message: '',
    message_type:'',    
    date: '...',    
});


async function fetchConversation(volunteer_id, e) {
    //e.stopPropagation();    
    $('.user-x').parent().removeClass('activex');
    $('#'+volunteer_id+'user').addClass('activex');
    data.loading = true; 
    data.is_typing =false
    data.conversation_with_id = volunteer_id;
    let response =  await axios.post(`/fetch_conversation`,{from_user_id: props.currentUser.id,to_user_id:volunteer_id});    
    data.conversations = response.data;    
    data.loading = false;
    setTimeout(()=>{
        gotoBottom('main-chat-env')
    },50)
    
}

function checkUser(user_id){
    if(props.currentUser.id == user_id){
        return "float-right";
    }else{
        return "float-left";
    }
}

function checkUser2(user){
    if(props.currentUser.id == user.from_user_id){        
        if(user.read){            
            return "float-right text-primary";
        }else{
            return "float-right text-secondary";
        }
    }else{
        return "d-none";
    }
}

function checkUserForColor(user_id){
    if(props.currentUser.id == user_id){
        return "bg_faint2 round1";
    }else{
        return "bg-white round2";
    }
}

async function uploadMessageFile(e){    
    if(formUpload.message !=''){        
        let index = data.conversations.length;                      
        formUpload.message_type = 'file'
        formUpload.from_user_id = props.currentUser.id
        formUpload.to_user_id = data.conversation_with_id
        formUpload.date= '...'        
        data.conversations.push(formUpload);

        let response = await axios.post('send_message',formUpload, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });        
        data.conversations[index]= response.data;        
    }
}
function gotoBottom(id){
   var element = document.getElementById(id);
   
   element.scrollTop = element.scrollHeight - element.clientHeight;
}

async function sendMessage(e,btn=false){      
    if(e.key === "Enter" || btn == true){ 
       let index = data.conversations.length;
       let text = $("#textField").val();
        if(text !== ''){
            let xdata = {message:e.target.value,message_type:'text',from_user_id:props.currentUser.id,to_user_id:data.conversation_with_id,date:'...'}
            data.conversations.push(xdata);
            $("#textField").val('')
            let response = await axios.post('send_message',{message:text,message_type:'text',from_user_id:props.currentUser.id,to_user_id:data.conversation_with_id});
            data.conversations[index]= response.data;
        }
    }
    clearTimeout(data.clear_timeout)
    data.clear_timeout = setTimeout(function(){
        axios.post('typing',{from_user_id:props.currentUser.id,to_user_id:data.conversation_with_id})
    },100)
}

function typing(e){
    
}

window.Echo.private('chat')
  .listen('MessageSent', (e) => {
    if(data.conversation_with_id != 0){

        if(e.user.id==data.conversation_with_id){
            data.conversations.push(e.message)
            setTimeout(()=>{
                gotoBottom('main-chat-env')
            },500)
        }
      /*   if(e.messageTo.id==props.currentUser.id){
            data.conversations.push(e.message)
        } */
    }

});

function TypingInterval(){
    setInterval(function(){
        data.is_typing = false
    },5000)
}
window.Echo.private('chat-typing')
  .listen('ChatTyping', (e) => {    
      if(e.user.id==data.conversation_with_id){
          !data.is_typing? data.is_typing= true:'';
      }else{
        data.is_typing = false;
      }
      
});
TypingInterval()
function changeTab(){    
    data.chatTab = !data.chatTab
}
</script>
<template class="">
  <HEADER class="bg-white text-dark"></HEADER>
  <SIDENAV active="Chats"></SIDENAV>
  <div class="height-100" id="body-pd" >
    <div class="p-3 d-flex text-dark align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0 ">Chats</h4>
    </div>
    <div  style="height:78vh;box-shadow:2px 8px 27px -12px #888;" class="chat-page row mx-auto w-100">
        <div id="chat-list" v-show="data.chatTab" class="position-relative px-0 col-md-3 bg-white " style="height:100%; overflow-y:scroll">
            <div class="mt-3 px-3 mb-3 position-absolute bg-white w-100 ">
                <input type="text" class="bg-light form-control w-10 rounded" placeholder="Search or start new chat" >
            </div>
            <div style="height:75px;"></div>
            <div v-for="user in users.data" :id="user.id+'user'" @click="fetchConversation(user.id, $event)" :key="user.id+'_c'">
                <div  v-if="user.id !== currentUser.id"  class="d-flex px-2 w-100 align-items-center user-x " style="user-select:none;" >                                                                        
                    <span v-if="user?.image == ''">                    
                        <img :src="'/photos/'+user.image" width="50" style="border-radius:50px;" class="img1" />
                    </span>
                     <i v-else class="bi bi-person-fill img1" style=" font-size: 2.3em;background: black;color: white;border-radius: 50px;display: flex;"></i>
                    <div class="py-3 pl-2 w-100" style=" border-bottom:1px solid #ccc;height: 100%;user-select: none;">
                        <span class="name">{{user.first_name}} {{user.surname}}</span> 
                         (<span class="name">{{user.email.slice(0,14)}}</span>)
                    </div>                    
                </div>  
            </div>
            <div class="position-absolute" style="bottom:0px;">
                <PAGINATE :next="users.next_url_page" :prev="users.prev_url_page"></PAGINATE>
            </div>
        </div> 
        <div id="chat-env" class="col-md-9 p-0">
            <div class="">
                <div class="wrapper position-relative">
                    <div  class="chat-env-header bg-light"> 
                        <button @click="changeTab()" class="shadow btn bg-white mt-2 ml-2 mr-2"><i class="bi bi-arrow-left text-dark"></i></button>
                        <span class="d-inline-block p-3" v-if="data.is_typing">typing ...</span>       
                    </div>
                    <div id="main-chat-env" class="main  px-4" style="height:65vh; overflow-y:scroll;overflow-x: none; overflow-anchor: none;">

                        <div class="px-2">
                            <div style="clear:both; margin-top: 4px;" v-for="chat in data.conversations" :key="chat.id+'_ch'">                            
                                <div :class="checkUser(chat.from_user_id)" class="pt-2">                            
                                    <div :class="checkUserForColor(chat.from_user_id)" class="d-inline-block align-items-center pt shdowx">                                       
                                        <div class="pstyle pb-2 d-inline-block" > 
                                            <p v-if="chat.message_type=='text'" style="font-size:0.97em" class="mb-0">{{chat.message}}</p>
                                            <div v-if="chat.message_type=='image'" class="mb-0">                                                
                                                <img :src="'/uploads/'+chat.message" style="width:100px" />
                                                <p>{{chat.message}}</p>
                                            </div>
                                            <p v-if="chat.message_type=='file'" class="mb-0"> 
                                                <a  :href="chat.message" target="_blank">{{chat.message}}</a>
                                            </p>
                                            <span  :class="checkUser2(chat)" style="font-size:1em"  class="bi-check2-all"></span>
                                            <span  :class="checkUser(chat.from_user_id)" style="font-size:0.8em">{{chat.date}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                                                    
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </div>
                    </div>
                    <nav v-if="data.conversation_with_id != 0" style="position:absolute;left:-4px;bottom:-43px;width:100%;" class="px-4 navbar bg-light navbar-expand-sm d-flex justify-content-between">
                        <div class="d-flex justify-between w-100 align-items-center">
                            <input @input="formUpload.message= $event.target.files[0]" type="file" id="upload-photo" >
                            <label id="upload-photo-label" for="upload-photo">Browse {{formUpload.message.name}}</label>
                            <input @keyup="sendMessage($event)" id="textField" type="text number" name="text" class="form-control w-50" placeholder="Type a message...">
                            <button @click="uploadMessageFile($event); sendMessage($event, true)" class="btn btn-sm btn-success">Send</button>
                        </div>
                        <div class="icondiv d-flex justify-content-end align-content-center text-center ml-2"> <i class="fa fa-paperclip icon1"></i> <i class="fa fa-arrow-circle-right icon2"></i> </div>
                    </nav>
                </div>
        </div>

    </div>
  </div>
  </div>
</template>
<style>
#chat-env{
    background-color: #e6e2eb;
    background-color: #e6e2eb;
    background-color: #fbf9ff;
    background-color: #f0e9fb;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2384818a' fill-opacity='0.07'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");
}
.chat-env-header{
    height: 55px;        
}
.user-x{
    cursor: pointer;
}
.user-x:hover {
    background: #0001 !important;
}
.w-90{
    width:90% !important;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.bg_faint{
    background: #eae4f4 !important;
}
.bg_faint2{
    background: #fdfde9 !important;
}
.shdowx{
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.round2{
border-radius: 0px 15px 8px 8px;
position:relative
}
.round1{
border-radius: 15px 0px 8px 8px; 
position:relative
}
.round1:after{
    content: "";
    position: absolute;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid transparent;
    border-bottom: 5px solid #fdfde9;
    border-width: 10px;
    height: 27px;
    right: -20px;
    transform: rotateZ(90deg);
    /* background: #fdfde9; */
    /* display: block; */
    /* box-shadow: rgb(0 0 0 / 12%) 0px -5px 10px, rgb(0 0 0 / 24%) 0px 1px 2px; */
    top: 0px;
    z-index: 0;
}

.round2:after{
    content: "";
    position: absolute;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-top: 5px solid #fff;
    border-width: 10px;
    height: 27px;
    left: -20px;
    transform: rotateZ(90deg);
    /* background: #fdfde9; */
    /* display: block; */
    /* box-shadow: rgb(0 0 0 / 12%) 0px -5px 10px, rgb(0 0 0 / 24%) 0px 1px 2px; */
    top: 0px;
    z-index: 0;
}

#upload-photo {
    height: 0;
    width: 0;
}

#upload-photo-label {
    border: 1px solid #cccccc;
    padding: 5px 30px;
    font-family:arial;
    font-size: 13px;
}
#upload-photo-label:active{
    background:#ccc;
}
.pstyle{
    padding: 6px 7px 8px 9px;
    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
}
</style>
