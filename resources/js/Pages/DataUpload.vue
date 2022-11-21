<script setup>
import './../../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm, Link} from '@inertiajs/inertia-vue3';
import { Inertia } from '@inertiajs/inertia'
import { computed } from '@vue/reactivity';
import { onMounted, reactive} from 'vue';
import HEADER from "./../Components/Header.vue";
import SIDENAV from "./../Components/Sidenav.vue";
import LightLoader from './../Components/LightLoader.vue';
import axios from 'axios';


const data = reactive({
    ward_id:0,
    state_id:0,
    lga_id:0,
    lgas:[],
    wards:[],
    lga_ready:false,
    ward_ready:false,
    collectedData:{},
    election_year_id:0,
    election_month_id:0,
    election_for_id:0,
    election_type_id:0,
    states:[],
    bParser:{},
    loading:false,
    storedArray:[]
})
const form = useForm({
    state_lga_ward: '',
    terms: false,
 });

const formRecord = useForm({
    records: '',
    election_for_id: 0,
    election_type_id: 0,
    election_month_id: 0,
    election_year_id: 0,
    terms: false,
});

const props = defineProps({
    states: Array,   
    config:Object, 
    msg:{
        type:String,
        default:function(){
            return null;
        }
    }
})
    /* const totalLga = computed(()=>{
        
        let c = data.states.reduce((a,b)=>a + b.lgas.length,0);
        return c;
    })
    const totalWard = computed(()=>{
        return data.states.reduce((a,b)=>a + b.lgas.reduce((c,d)=> c + d.wards.length,0),0);
    })
 */

function lightName(e){        
    e.target.parentElement.parentElement.firstElementChild.classList.add('highlight');    
}
function removeOnName(e){
    e.target.parentElement.parentElement.firstElementChild.classList.remove('highlight');    
}
function searchBox(e){
    let val = e.target.value.toLowerCase();
    $(".wardTagText").each(function () {
      $(this).parent().parent().toggle($(this).text().toLowerCase().includes(val));          
    });

    $(".lga_container").each(function(){
        $(this).toggle($(this).attr("data-text").toLowerCase().includes(val));            
    })
}

function check_if_all_are_hidden(elt)
{
    let all_are_hidden = true;
    elt.children().each(function(){
        if($(this).css('display') !== 'none')
        {
            all_are_hidden = false;
            return false;
        }
    });
    return all_are_hidden;
}

function getPer(v,s){         
    return parseInt( (parseInt(s)/parseInt(v)) * 100);
}
function colorCode(v,s){
    if(getPer(v,s) < 40){            
        return 'poor'
    }
    if(getPer(v,s) > 39 && getPer(v,s) < 59){
        return 'normal'
    }
    if(getPer(v,s) >58 ){
        return 'strong' 
    }
}
function dataEntry(state,lga,ward,e){
    let elt = $(e.target).parent().parent().find(':first-child');
    let inputs = e.target.parentElement.parentElement.querySelectorAll("input[type=number]")
    let voters = Array.from(inputs)[0].value;
    let supporters = Array.from(inputs)[1].value;
    let charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    let flag = colorCode(voters,supporters)
    let per = getPer(voters,supporters)
    data.collectedData[state.name+lga.id+ward.id] = {
        state_id:state.id,
        lga_id:lga.id,
        ward_id:ward.id,
        total_registered_voters:voters,
        total_registered_supporters:supporters,        
        election_year_id: props.config.election_year.id,
        election_month_id: props.config.election_month.id,
        election_for_id:data.election_for_id,
        election_type_id:data.election_type_id,
        created_by: props.config.user.id,
        flag:flag,
        percentage:per,
        data_token: state.name+lga.id+ward.id+data.election_type_id+data.election_for_id+props.config.election_month.id+props.config.election_year.id
    } 
        
    if(Array.from(inputs)[0].value >0 && Array.from(inputs)[1].value >0){
        elt.addClass('successLight');
    }else{ 
        elt.removeClass('successLight')
    }
}

const save = () => {  
    data.loading =true
    Inertia.post(route('save_data_entry'), data.collectedData,{
        onFinish: (res) => {
            data.loading =false
        },
    });
};

const fetchSavedData = async ()=>{
    data.loading = true;
    let response = await axios.post(route('get_saved_data'),data.bParser);
    let da = response.data    
    let code = '';    
    $('.r_supports').each(function(){
        $(this).val('')
    })
    $('.r_voters').each(function(){
        $(this).val('')
    })    
    da.forEach((obj)=>{
        code = obj.state_id+'_'+obj.lga_id+'_'+obj.ward_id;
        $('#'+code).find('.r_supports').val(obj.total_registered_supporters)
        $('#'+code).find('.r_voters').val(obj.total_registered_voters)
    })
    data.loading = false
}

function storeArray(value){
   // data.storedArray.push(value)    
}


function checkIfSelected(e=null, x=null){
    if(data.election_for_id !== 0 && data.election_type_id !== 0){        
        data.bParser.election_for_id =   data.election_for_id
        data.bParser.election_year_id =  props.config.election_year.id
        data.bParser.election_month_id = props.config.election_month.id
        data.bParser.election_type_id = data.election_type_id
        data.bParser.user =              props.config.user
        fetchSavedData()
    }
    if(x=='eF'){
        localStorage.setItem('election_for_id',data.election_for_id)
    }
    if(x=='eT'){
        localStorage.setItem('election_type_id',data.election_type_id)
    }
}
function getStorageItem(name){
    return localStorage.getItem(name);
}

function getCol(matrix, col){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);
       }
       return column; // return column data..
}

function showMessage(msg){ 
    alert(msg)
}

onMounted(() => {
    
    if(data.election_for_id !== 0 && data.election_type_id !== 0){            
        checkIfSelected(); //load stored data
    }   
   /*  $("iframe").on('click',function(){
        parent.$.magnificPopup.close();
    }) */
})

const nextBtn = async()=>{
    //window.location.href = data.states.next_page_url    
    Inertia.visit(data.states.next_page_url, { method: 'get' })
}

const prevBtn = async()=>{
    //window.location.href = data.states.prev_page_url    
    Inertia.visit(data.states.prev_page_url, { method: 'get' })
}

const submit = () => {
    form.post(route('upload_slw'), {
        onFinish: () => form,
    });
};

const submit2 = () => {
    formRecord.election_for_id = data.election_for_id;
    formRecord.election_type_id = data.election_type_id;
    formRecord.election_month_id = props.config.election_month.id;
    formRecord.election_year_id = props.config.election_year.id

    formRecord.post(route('upload_records'), {
        onFinish: () => formRecord,
    });
};
data.election_for_id = getStorageItem('election_for_id')== null?0:getStorageItem('election_for_id');
data.election_type_id = getStorageItem('election_type_id')==null?0:getStorageItem('election_type_id')
data.states = props.states
</script>

<template>
  
  <HEADER></HEADER>
  <SIDENAV active="data upload"></SIDENAV>
  <div class="height-100 bg-light" id="body-pd">
    <div class="p-3 d-flex align-items-center">
      <i class="bi bi-stack"></i>
      <h4 class="ml-3 my-0">Data Upload</h4>
    </div>
    <LightLoader v-if="data.loading" />
    
    <AuthenticatedLayout>     
        <!-- <div style="display:none" class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div style="padding:20px 10px" class="bg-white overflow-hidden shadow-sm sm:rounded-lg row">                    
                    <div class="col-md-4">  
                        <label>States</label>                      
                        <select @change="trigerLgas()" v-model="data.state_id" type="text" class="form-control">
                            <option value="0">-</option>
                            <option v-for="(state) in states" :key="state.id" :value="state.id">{{state.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4"> 
                        <label>Lga</label>                      
                        <select @change="trigerWards()" v-model="data.lga_id" type="text"  class="form-control">                            
                            <option v-for="(lga) in data.lgas" :key="'lg_'+lga.id" :value="lga.id">{{lga.name}}</option>
                        </select>   
                    </div>
                    <div class="col-md-4">
                        <label>Ward</label>                      
                        <select v-model="data.ward_id" type="text" class="form-control">                            
                            <option v-for="(ward) in data.wards" :key="'ward_'+ward.id" :value="ward.id">{{ward.name}}</option>
                        </select>   
                    </div>

                </div>
            </div>
        </div> -->
        <div class=" row w-100">                        
            <div class="col-md-4 pt-2 px-4" style="height:82vh;">                
                <div class="d-flex justify-between w-100 my-3 px-3">
                    <span> Total Lga: <i class="badge bg-warning">{{config.total_lgas}}</i> Total Wards: <i class="badge bg-warning">{{config.total_wards}}</i></span>
                    <button v-if="data.election_for_id !== 0 && data.election_type_id !== 0" @click="save" class="btn btn-sm px-4  bg-success text-white">Save</button>                
                    <button v-else disabled  class="btn btn-sm px-4  bg-success text-white">Save</button>                
                </div>
                <ul class="px-3 py-3" style="background: #ffffffc7;border-radius: 5px;height: 95%;overflow-y:scroll">
                    <li class="label">Select States</li>
                    <li>
                        <ul class="list_state">
                            <li v-for="state in data.states.data" :key="'s_k'+state.id"><a :href="'#state_'+state.id">{{state.name}}</a></li>
                        </ul>
                    </li>
                    <li class="label mt-3"> Settings </li>
                    <li>
                        <label>Election For:</label>
                        <select @change="checkIfSelected($event,'eF')" v-model="data.election_for_id" class="form-control">
                            <option v-for="elect in config.election_for" :key="'el'+elect.id" :value="elect.id">{{elect.name}}</option>
                        </select>
                    </li>
                    <li>
                        <label>Election Type:</label>
                        <select @change="checkIfSelected($event,'eT')" v-model="data.election_type_id" class="form-control">
                            <option v-for="elect in config.election_types"  :key="'tl'+elect.id" :value="elect.id">{{elect.name}}</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div class="col-md-4 p-0" >  
                <input type="text" placeholder="Search Wards" class="form-control my-3  " @keyup="searchBox($event)">
                <div class="card-v px-2 pt-2">                
                    <div v-for="state in data.states.data" :key="'s_'+state.id" :id="'state_'+state.id">
                    <label class="label text-center w-100">{{state.name}} State</label>
                    <div class="lga_container"  v-for="(lga) in state.lgas" :key="'l_'+lga.id" :data-text="[...getCol(lga.wards,'name')]">
                        
                        <label style="width: 100%;margin: 14px 0px 7px 0px;border-bottom: 2px solid #fff;font-weight: bold;" class="float-right">
                        {{lga.name}} L.G.A </label>
                        
                        <table class="w-100">
                                <tbody>
                                    <tr>
                                        <th class="text-center" width="50%">Wards</th><th width="25%">R Voters</th><th width="25%">R Supporters</th>
                                    </tr>
                                </tbody>
                        </table>
                        <table :title="lga.name+', '+state.name+ ' State'" class="clear-float w-100">
                            <tbody>
                                <tr  v-for="(ward, i) in lga.wards" :key="'w'+ward.id" :id="state.id+'_'+lga.id+'_'+ward.id">
                                    {{storeArray(state.id+'_'+lga.id+'_'+ward.id)}}
                                    <td width="50%" class="wardTag"><span>{{i+1}}.</span><span class="wardTagText">{{ward.name.slice(0,15)}}</span></td>
                                    <td width="25%" >
                                        <input v-if="data.election_for_id !== 0 && data.election_type_id !== 0" title="total registered voters" @focusout="removeOnName($event)"  @focus="lightName($event)" @keyup="dataEntry(state,lga,ward,$event)" type="number" min="0" class="form-control r_voters ">
                                        <input tabindex="1" @click="showMessage('Select Election Type and Election For to Open this fields')" v-else title="total registered voters" disabled type="number" min="0" class="form-control ">
                                    </td>
                                    <td width="25%">
                                        <input v-if="data.election_for_id !== 0 && data.election_type_id !== 0" title="total supporters" @focusout="removeOnName($event)" @focus="lightName($event)" @keyup="dataEntry(state,lga,ward,$event)" type="number" min="0" class="form-control r_supports">
                                        <input @click="showMessage('Select Election Type and Election For to Open this fields')" v-else title="total registered Supporters " disabled type="number" min="0" class="form-control ">
                                    </td>
                                </tr>
                            </tbody>
                        </table>                
                    </div>            
                    </div>
                </div>               
                <div class="pt-2">
                    <button @click="prevBtn" v-if="states.prev_page_url !== null" class="btn bg-light mx-1 shadow">Prev</button>
                    <button v-else disabled class="btn bg-light mx-1 shadow">Prev</button>
                    <button @click="nextBtn" v-if="states.next_page_url !== null" class="btn bg-light mx-1 shadow">Next</button>
                    <button v-else disabled class="btn bg-light mx-1 shadow">Next</button>
                    <spa>
                        From State {{states.from}} to {{states.to}} of {{states.total}}
                    </spa>
                </div>
            </div>
            <div class="col-md-4"> 
                <div v-if="$page.props.auth.user">
                    <div v-if="$page.props.auth.user.role=='admin'">
                        <form @submit.prevent="submit" enctype="multipart/form-data">                        
                            <div>
                                <InputLabel for="state_lga_ward" value="State Lga Ward File" />                                
                                <input id="state_lga_ward" @input="form.state_lga_ward = $event.target.files[0]"  type="file" class="form-control  mt-1 block w-full" />
                                <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                                    {{ form.progress.percentage }}%
                                </progress>
                                <InputError class="mt-2" :message="form.errors.state_lga_ward" />
                            </div>                            
                            <div class="flex items-center justify-end mt-4">
                                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                    Upload States Lgas Wards
                                </PrimaryButton>
                            </div>                    
                        </form>  
                        <form class="mt-5" @submit.prevent="submit2" enctype="multipart/form-data">                        
                            <div>
                                <InputLabel for="records" value="State Lga Ward File" />
                                <TextInput id="records" type="file" class="form-control mt-1 block w-full" @input="formRecord.records = $event.target.files[0]"/>
                                <progress v-if="formRecord.progress" :value="formRecord.progress.percentage" max="100">
                                    {{ formRecord.progress.percentage }}%
                                </progress>
                                <InputError class="mt-2" :message="formRecord.errors.records" />
                            </div>           
                            <p><code>Note:</code> This record will be upload with the selected options in settings</p>                 
                            <div class="flex items-center justify-end mt-2">
                                <PrimaryButton class="ml-4" :class="{ 'opacity-25': formRecord.processing }" :disabled="form.processing">
                                    Upload Record
                                </PrimaryButton>
                            </div>                     
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>    

  </div>
</template>
<style scoped>
.label{
    font-size: 1.3em;
    font-weight: bold;
}
.clear-float{
    clear:right;
}

tr>td:first-child{
    background:#eee;
    color:#333;
    border-bottom: 3.5px solid #eee;
    border-radius: 7px;
    font-size: 1.2em;
    text-align: right;
}
.highlight{
    background:#d555  !important;
    color:#d55 !important;
}
.successLight{
    background:#2c65  !important;
    color:#2c6 !important;
}
.wardTag{
    transition: background 0.4s, color 0.5s;
    display: flex;
    justify-content: space-between;
    width:100%;
    padding:0px 7px;        
    margin-top: 6px;
}
.card-v{
    max-height: 76vh;
    overflow-y: scroll;
    border-radius: 8px;
    border-top: 1px solid rgb(204, 204, 204);
    box-shadow: rgb(170 170 170) -2px 10px 36px -7px;
}
.list_state{
    display: grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
}
</style>