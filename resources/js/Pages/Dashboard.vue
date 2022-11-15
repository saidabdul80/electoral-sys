<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import './../dtables/datatable.css'
import './../dtables/datatables.min.js'
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import LightLoader from './../Components/LightLoader.vue';
import Panel from './Panel.vue';
const props = defineProps({   
    user: Object,
    config:Object,
    states:Array
})
const data = reactive({
    poor:{
        c:"#dd0000",
        b:"#dd000022"
    },
    normal:{
        c:"rgb(249, 135, 3)",
        b:"rgba(249, 135, 3,.2)"
    },
    strong:{
        c:"#198754",
        b:"#1987543d"
    },
    lgas:[],
    wards:[],
    loading:false,
    results:{},
    chart:undefined,
    loading2:false,
    queries:{
        election_for_id:1,
        election_type_id:1,
        election_month_id:0,
        election_year_id:0,
        state_id:0,
        lga_id:0,
        ward_id:0,
    }
})
function toggleConfig(e){    
    /* $(e.target).toggleClass('bi-arrow-right-short')
    $(e.target).toggleClass('bi-arrow-left-short') */
    $('.config-toggler-ico').toggleClass('config-toggler-ico-toggle')
    $(e.target).parent().parent().toggleClass('show-config')
    e.stopPropagation() 
}
function trigerLgas(){
    data.lga_ready =false
    // let state = document.getElementById('state_id').value;   
    data.queries.lga_id = null 
    data.queries.ward_id = null
    props.states.every((item) =>{
        if(item.id == data.queries.state_id ){
            data.lgas = item.lgas 
            //console.log(data.lgas)                       
           // data.lga_ready =true
            return false
        }
        return true
    })    
}

function trigerWards(){
    data.ward_ready =false
    data.queries.ward_id = null 
    // let state = document.getElementById('state_id').value;    
    data.lgas.every((item) =>{
        if(item.id == data.queries.lga_id ){            
            data.wards = item.wards                        
           // data.ward_ready =true
            return false
        }
        return true
    })    
}
function getTheCode (val, s = 0){
    
    if(colorCode(val, s) === 'poor'){
        return data.poor.c
    }
    if(colorCode(val, s) === 'normal'){
        return data.normal.c
    }
    if(colorCode(val,s) === 'strong'){ 
        return data.strong.c
    }
}
const fetchResultData = async ()=>{
    data.loading = true;
    data.loading2 = true;
    console.log(data.queries)
    let response = await axios.post(route('get_data'),data.queries);
    data.results = response.data            
    console.log(response.data)
    /* if (data.chart != undefined){
        data.chart.destroy();  
    }   */
    data.loading2 = false;
    setTimeout(function(){
        
        overAllAnalysis('overall_analysis_chart',
                        data.results.overall,
                        ['Supporters','Voters'],
                        'Overall Count',
                        [colorCodeCode(data.results.overall[1],data.results.overall[0]), '#47b'],
                        ['#fff','#fff']
                        ) 
                        
        overAllAnalysis(
                        'analysis_chart_by_state', 
                        flagAnalytics('states'),
                        ['normal','poor','strong'],
                        'Strengths in States',
                        ['#cd8303','#c35','#199954'],
                        ['#fff','#fff'],false
        )                    
        overAllAnalysis(
                'analysis_chart_by_lga', 
                flagAnalytics('lga'),
                ['normal','poor','strong'],
                'Strengths in L.G.As',
                ['#cd8303','#c35','#199954'],
                ['#fff','#fff'],false
        )
        overAllAnalysis(
            'analysis_chart_by_ward', 
            flagAnalytics('wards'),
            ['normal','poor','strong'],
            'Strengths in Wards',
            ['#cd8303','#c35','#199954'],
            ['#fff','#fff'],false
        )
        genTable('.table1' , 'analysis_chart_by_state')
        genTable('.table2' , 'analysis_chart_by_lga')
        genTable('.table3' , 'analysis_chart_by_ward')
        data.loading = false
    },1000)
}
function flagAnalytics(type){
    if(type=='lga'){
        return [$(".for_lga_analytics tr.normal").length,$(".for_lga_analytics tr.poor").length,$(".for_lga_analytics tr.strong").length]
    }
    if(type=='states'){
        return [$(".for_state_analytics tr.normal").length,$(".for_state_analytics tr.poor").length,$(".for_state_analytics tr.strong").length]
    }
    if(type=='wards'){
        return [$(".for_ward tr.normal").length,$(".for_ward tr.poor").length,$(".for_ward tr.strong").length]
    }
    


}
 function loadResult(){
    fetchResultData
 }

onMounted(()=>{
    data.queries.election_year_id = props.config.current_year    
    data.queries.election_month_id = props.config.current_month
    data.queries.state_id = props.config.default_state_id    
    trigerLgas();
    data.queries.lga_id = props.config.default_lga_id
    data.loading = false
    
    setTimeout(function(){
        fetchResultData()   
    },1000)

    $('#lga_list_ward_count').DataTable({
        pageLength:5,
        lengthChange:false 
        /* dom: 'Bfrtip',
        buttons: [
            'colvis',
            'excel',
            'print'
        ] */
    });

   
    
    
})

function genTable(name, canvasId){        
    let canvas = ""    
    setTimeout(() => {
        canvas = document.getElementById(canvasId);                          
    }, 1000);
 
    $(name).DataTable({
        pageLength:13,
        destroy:true,
        lengthChange:false ,
        dom: 'Bfrtip',
        buttons: [
            'colvis',
            'excel',
            {
                extend: 'print',
                customize: function ( win ) {                                            
                        $(win.document.body)
                            .css( 'font-size', '10pt' )
                            .prepend(
                                `<div style="display:flex;justify-content:center;align-item:center"><img src="${canvas.toDataURL()}" /></div>`
                            );
                        
                        $(win.document.body).find( 'table' )
                            .addClass( 'compact' )
                            .css( 'font-size', 'inherit' );                                    
                },
                title: function(){
                    var printTitle = canvasId.replaceAll('_', ' ');
                    return printTitle
                }
            }
        ]        
    });
}
function getMonthName(){
    let m = props.config.election_months.filter(x=>x.id==data.queries.election_month_id);
    if(m.length >0){
        return m[0].month
    }
    return 'none';
}
function getYearName(){
    let m = props.config.election_years.filter(x=>x.id==data.queries.election_year_id)
    if(m.length >0){
        return m[0].year
    }
    return 'none';
}
function getStateName(){
    let m = props.states.filter(x=>x.id==data.queries.state_id)
    if(m.length >0){
        return m[0].name
    }
    return 'none';
}

function getLgaName(){
    let m = props.states.filter(x=>x.id==data.queries.state_id)
    if(m.length >0){
        let n = m[0].lgas.filter(x=>x.id==data.queries.lga_id)
        if(n.length >0){
            return n[0].name
        }
    }
    return 'none';
}

function overAllAnalysis(idx, data,label,text,background,bcolor,con=true){        
       Chart.defaults.set('plugins.datalabels', {
        color: '#fff'
    });
    const DATA_COUNT = 2;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
    data.chart = new Chart(idx, {
        type: 'pie',
        data: {
            labels: label,
            datasets:[
                {
                label: 'Dataset 1',
                data: data,
                backgroundColor: background,
                borderWidth: 3,
                borderColor:bcolor,
            }   ]              
        },
        plugins: [ChartDataLabels],
        options: {
            onClick: (e) => {            
            const canvasPosition = getRelativePosition(e, chart);
            const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
            },                 
            maintainAspectRatio: false,   
            tooltips: {
                enabled: true
            },                           
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: text
                },            
                datalabels: {
                    formatter: (value, ctx) => {
             /*            if(con){
                            const datapoints = ctx.chart.data.datasets[0].data
                            return parseInt( (value/parseInt(datapoints[1])+ parseInt(datapoints[0])) *100) +'%'
                        } */
                        const datapoints = ctx.chart.data.datasets[0].data
                        let sum = datapoints.reduce((a,b)=> parseInt(a)+ parseInt(b),0)                        
                        return parseInt( (value/sum) *100) +'%'
                    }, 
                    color: '#fff',
                }
                
            }
        }
        });
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
function getRealPer(v,s){         
    return parseInt( parseInt(s)/(parseInt(s)+parseInt(v)) * 100);
}

function colorCodeCode(v,s){
    if(getRealPer(v,s) < 40){            
        return data.poor.c
    }
    if(getRealPer(v,s) > 39 && getRealPer(v,s) < 59){
        return data.normal.c
    }
    if(getRealPer(v,s) >58 ){
        return data.strong.c
    }
}

function getColorCode(v){
    if(v< 40){            
        return 'poor'
    }
    if(v > 39 && v < 59){
        return 'normal'
    }
    if(v >58 ){
        return 'strong' 
    }
}
</script>

<template>
    <Head title="Welcome" />
    <div>
        <LightLoader v-if="data.loading" />       
        <div class="config-x">
            <Panel />
            <i  @click="toggleConfig($event)" class=" bg-primary config-toggler ">
                <i class="bi bi-arrow-right-short text-white config-toggler-ico"></i>
            </i>
        <!--     <div class="d-flex justify-between w-100 my-3 px-3">
                    <span> Total Lga: <i class="badge bg-warning">{{config.total_lgas}}</i> Total Wards: <i class="badge bg-warning">{{config.total_wards}}</i></span>
                    <button v-if="data.election_for_id !== 0 && data.election_type_id !== 0" @click="save" class="btn btn-sm px-4  bg-success text-white">Save</button>                
                    <button v-else disabled  class="btn btn-sm px-4  bg-success text-white">Save</button>                
                </div> -->
                <ul class="px-3 py-3" style="background: #ffffffc7;border-radius: 5px;">
                    <li>  
                        <label>States</label>                      
                        <select  @change="trigerLgas()" v-model="data.queries.state_id" type="text" class="form-control">
                            <option value="0">-</option>
                            <option v-for="(state) in states" :key="state.id" :value="state.id">{{state.name}}</option>
                        </select>   
                    </li>
                    <li> 
                        <label>Lga</label>                      
                        <select @change="trigerWards()" v-model="data.queries.lga_id" type="text"  class="form-control">                            
                            <option v-for="(lga) in data.lgas" :key="'lg_'+lga.id" :value="lga.id">{{lga.name}}</option>
                        </select>   
                    </li>
                    <li>
                        <label>Ward</label>                      
                        <select v-model="data.queries.ward_id" type="text" class="form-control">                            
                            <option v-for="(ward) in data.wards" :key="'ward_'+ward.id" :value="ward.id">{{ward.name}}</option>
                        </select>   
                    </li>

                    <li class="label mt-3"> Settings </li>
                    <li>
                        <label>Election Year:</label>
                        <select v-model="data.queries.election_year_id" class="form-control">
                            <option v-for="elect in config.election_years" :key="'el'+elect.id" :value="elect.id">{{elect.year}}</option>
                        </select>
                    </li>
                    <li>
                        <label>Election Month:</label>
                        <select  v-model="data.queries.election_month_id" class="form-control">
                            <option v-for="elect in config.election_months"  :key="'tl'+elect.id" :value="elect.id">{{elect.month}}</option>
                        </select>
                    </li>

                    <li>
                        <label>Election For:</label>
                        <select v-model="data.queries.election_for_id" class="form-control">
                            <option v-for="elect in config.election_for" :key="'el'+elect.id" :value="elect.id">{{elect.name}}</option>
                        </select>
                    </li>
                    <li>
                        <label>Election Type:</label>
                        <select  v-model="data.queries.election_type_id" class="form-control">
                            <option v-for="elect in config.election_types"  :key="'tl'+elect.id" :value="elect.id">{{elect.name}}</option>
                        </select>
                    </li>
                    <li>
                        <button @click="fetchResultData()" class="btn btn-primary">Load Result</button>
                    </li>
                </ul>
        </div>
        <div class="row w-100 m-0 p-2" >  
            <div class="col-md-4 mb-3 cot ">
                <div class="pl-3 fw-bold bg-info text-white">Searched Parameters</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px; font-size: 1em;">
                    <table class="table table-hover">
                        <tbody>
                        <tr>
                            <td> <span class="fw-bold text-dark">Selected State: </span></td>
                            <td> <span class="fw-bold text-dark">{{getStateName()}} </span></td>
                        </tr>
                        <tr>
                            <td> <span class="fw-bold text-dark">Selected L.G.A: </span></td>
                            <td> <span class="fw-bold text-dark">{{getLgaName()}} </span></td>
                        </tr>
                        <tr>
                            <td> <span class="fw-bold text-dark">Current Set Date: </span></td>
                            <td><span class="">{{getMonthName()}},                         
                            {{getYearName()}}</span></td>                                
                        </tr>
                        <tr>
                            <td>  <span class="fw-bold text-dark">Election Analysis For: </span></td>
                            <td> <span class="">{{config.election_for.filter(x=>x.id==data.queries.election_for_id)[0].name}}</span></td>                                
                        </tr>
                        <tr>
                            <td><span class="fw-bold text-dark">Election Type Analysis of: </span></td>
                            <td> <span>{{config.election_types.filter(y=>y.id == data.queries.election_type_id)[0].name}}</span></td>                                
                        </tr>
                        
                    </tbody>
                    </table>                                                
                </div>
             </div>
             <div class="col-md-4 mb-3 cot  "> 
                <div class="pl-3 fw-bold bg-info text-white">List of L.G.A and their Total Ward</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px">
                    <table class="table w-100 table-bordered table-sm" id="lga_list_ward_count">
                        <thead>
                            <tr>
                                <td width="10%">S/N</td>
                                <td width="20%">State</td>
                                <td width="50%">L.G.A</td>
                                <td width="10%">Total Ward</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lga, ind) in config.lga_with_ward_count" :key="'lk'+lga.id">
                                <td >{{ind+1}}</td>
                                <td >{{lga.state.name}}</td>
                                <td >{{lga.name}}</td>
                                <td >{{lga.ward_count}}</td>
                            </tr>
                        </tbody>
                    </table>     
                </div> 
            </div>       
            <div class="col-md-4 my-3 cot " v-if="!data.loading2">                
                <div class="pl-3 fw-bold bg-white rounded shadow text-danger">Overall Count by Search</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding:20px;">
                    <div id="overall_analysis p-3 " >
                        <canvas id="overall_analysis_chart"></canvas>
                    </div>
                </div>
             </div>
            <div class="col-md-8 my-3 cot" v-if="!data.loading2">
                <div class="pl-3 fw-bold bg-white rounded shadow text-danger">Anylytics Accross State</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px">             
                    <table  class="table1 table w-100 table-sm table-bordered genTables   table-hover">
                        <thead>
                            <tr>
                                <td width="40%">State</td>
                                <td width="30%">Total Registered Voters</td>
                                <td width="30%">Total Supporters</td>
                            </tr>
                        </thead>
                        <tbody class="for_state_analytics">
                            <tr v-for="state in data.results.state" :key="'sk'+state.id" :class="getColorCode(state.percentage)">
                                <td>{{state.name}} <span style="visibility:hidden">{{getColorCode(state.percentage)}}</span></td>
                                <td>{{state.total_v}} </td>
                                <td class="d-flex justify-between">
                                    <span>{{state.total_s}} </span>            -                         
                                    <span class="badge bg-white text-dark fw-bold">{{state.percentage}}% </span>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </div>            
            </div>     
            <div class="col-md-4 my-3 cot " v-if="!data.loading2">                
                <div class="pl-3 fw-bold bg-white rounded shadow text-danger">State Analytics By Strength</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding:20px;">
                    <div id="overall_analysis p-3 " >
                        <canvas id="analysis_chart_by_state"></canvas>
                    </div>
                </div>
             </div>
                          
            <div class="col-md-8 my-3 cot " v-if="!data.loading2">      
                <div class="pl-3 fw-bold shadow rounded bg-white text-danger">Anylytics Accross L.G.A</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px">             
                    <table  class="table2 w-100 table table-sm table-bordered genTables  table-hover">
                        <thead>
                            <tr>
                                <td width="40%">L.G.A</td>
                                <td width="30%">Total Registered Voters</td>
                                <td width="30%">Total Supporters</td>
                            </tr>
                        </thead>
                        <tbody class="for_lga_analytics">
                            <tr v-for="lga in data.results.lga" :key="'sk'+lga.id" :class="getColorCode(lga.percentage)">
                                <td>{{lga.name}} <span style="visibility:hidden">{{getColorCode(lga.percentage)}}</span></td>
                                <td>{{lga.total_v}}</td>
                                <td class="d-flex justify-between">
                                    <span>{{lga.total_s}} </span>            -                         
                                    <span class="badge bg-white text-dark fw-bold">{{lga.percentage}}% </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>           
            </div>
            <div class="col-md-4 my-3 cot " v-if="!data.loading2">                
                <div class="pl-3 fw-bold bg-white rounded shadow text-danger">L.G.A Analytics By Strength</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding:20px;">
                    <div id="overall_analysis p-3 " >
                        <canvas id="analysis_chart_by_lga"></canvas>
                    </div>
                </div>
             </div>

            <div class="col-md-8 my-3 cot " v-if="!data.loading2"> 
                <div class="pl-3 fw-bolder shadow rounded bg-white text-danger">Anylytics Accross Wards</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px">             
                    <table  class="table3 table table-sm table-bordered genTables  table-hover ">
                        <thead>
                            <tr>
                                <td width="35%">L.G.A</td>
                                <td width="35%">Ward</td>
                                <td width="10%">Total Registered Voters</td>
                                <td width="30%">Total Supporters</td>
                            </tr>
                        </thead>
                        <tbody class="for_ward">
                            <tr v-for="ward in data.results.ward" :key="'skw'+ward.id" :class="ward.flag">
                                <td>{{ward.lga}}</td>
                                <td>{{ward.name}} <span style="visibility:hidden">{{ward.flag}}</span></td>
                                <td>{{ward.total_v}}</td>
                                <td class="d-flex justify-between">
                                    <span>{{ward.total_s}} </span>            -                         
                                    <span class="badge bg-white text-dark fw-bold">{{ward.percentage}}% </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>                        
                </div>                       
            </div>  
            <div class="col-md-4 my-3 cot " v-if="!data.loading2">                
                <div class="pl-3 fw-bold bg-white rounded shadow text-danger">Ward Analytics By Strength</div>
                <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding:20px;">
                    <div id="overall_analysis p-3 " >
                        <canvas id="analysis_chart_by_ward"></canvas>
                    </div>
                </div>
             </div>                                                                  
        </div>
    </div> 

</template>
<style scoped>
.config-x{
    position:fixed;
    top:0px; 
    left:0px; 
    z-index: 8;
    min-width:300px;
    padding:13px 15px; 
    box-shadow:#ccc 8px 12px 17px -16px;
    border-radius: 7px; 
    transform: translateX(-300px);
    min-height: 250px;
    background: white;
    overflow: none;
    transition: all 0.8s cubic-bezier(0, 1.39, 0.79, 0.87) 0.2s !important;
}
.config-x> ul>li{
    margin-top:9px;
}
.config-x>ul>li>.form-control{
    height: 29px !important;
    padding: 0px 9px !important;
}
.config-toggler-ico-toggle{
    transform: rotate3d(0, 1, 0, 180deg) !important;    
}
.config-toggler-ico{
    transition: all 0.4s;
    transform: rotate3d(0, 1, 0, 1deg);    
}
.config-toggler{
    position: absolute;
    right: -28px;
    display: flex;
    width: 31px;
    font-size: 29px;
    border-radius: 4px;
    cursor: pointer;
    top: 0px;   
}
.show-config{
    transform: translateX(0px) !important;
}
table{
    margin:0;
}
.card-h{
height: 360px !important;
}
div.dataTables_wrapper div.dataTables_info{
    padding-top:0px !important;
    margin-top:0px !important;

}
.poor{
    color: v-bind(data.poor.c)  !important;
    background:v-bind(data.poor.b) !important;
}

.strong{
    color: v-bind(data.strong.c) !important;
    background:v-bind(data.strong.b) !important;
}

.normal{
    color: v-bind(data.normal.c) !important;
    background:v-bind(data.normal.b) !important;
}

.cot{
    cursor: pointer;
}
.cot:hover{
    background:#ccc3;
}

.tr td{
    cursor: pointer !important;
}
</style>