<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import './../dtables/datatable.css'
import './../dtables/datatables.min.js'
import Chart from 'chart.js/auto';
import LightLoader from './../Components/LightLoader.vue';
const props = defineProps({   
    user: Object,
    config:Object,
    states:Array
})
const data = reactive({
    
    lgas:[],
    wards:[],
    loading:false,
    results:{},
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
    $(e.target).toggleClass('bi-arrow-right-short')
    $(e.target).toggleClass('bi-arrow-left-short')
    $(e.target).parent().toggleClass('show-config')
}
function trigerLgas(){
    data.lga_ready =false
    // let state = document.getElementById('state_id').value;    
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
const fetchResultData = async ()=>{
    data.loading = true;
    let response = await axios.post(route('get_data'),data.queries);
    data.results = response.data            
    overAllAnalysis()
    data.loading = false
}
onMounted(()=>{
    data.queries.election_year_id = props.config.current_year    
    data.queries.election_month_id = props.config.current_month
    data.queries.state_id = props.config.default_state_id    
    trigerLgas();
    data.queries.lga_id = props.config.default_lga_id
    fetchResultData()    
    $('#lga_list_ward_count').DataTable({
        pageLength:5,
        dom: 'Bfrtip',
        buttons: [
            'colvis',
            'excel',
            'print'
        ]
    });
    
    
})
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
    function overAllAnalysis(){
        console.log()
        const DATA_COUNT = 2;
        const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
        const chart = new Chart('overall_analysis_chart', {
            type: 'pie',
            data: {
                labels: ['#2c6','#c26'],
                datasets:[
                    {
                    label: 'Dataset 1',
                    data: data.results.overall,
                    backgroundColor:['#2c62','#c262'],
                    borderWidth: 1,
                    borderColor:['#2c6','#c26'],
                }   ]              
            },
            options: {
              /*   onClick: (e) => {
                const canvasPosition = getRelativePosition(e, chart);
                const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
                const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
                }, */
                responsive: true,
                maintainAspectRatio: false,                
                plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
                }
            }
            });
    }

</script>

<template>
    <Head title="Welcome" />
    <div>
        <LightLoader v-if="data.loading" />       
        <div class="config-x">
            <i @click="toggleConfig($event)" class="bi bi-arrow-right-short text-white bg-primary config-toggler"></i>
        <!--     <div class="d-flex justify-between w-100 my-3 px-3">
                    <span> Total Lga: <i class="badge bg-warning">{{config.total_lgas}}</i> Total Wards: <i class="badge bg-warning">{{config.total_wards}}</i></span>
                    <button v-if="data.election_for_id !== 0 && data.election_type_id !== 0" @click="save" class="btn btn-sm px-4  bg-success text-white">Save</button>                
                    <button v-else disabled  class="btn btn-sm px-4  bg-success text-white">Save</button>                
                </div> -->
                <ul class="px-3 py-3" style="background: #ffffffc7;border-radius: 5px;">
                    <li>  
                        <label>States</label>                      
                        <select @change="trigerLgas()" v-model="data.queries.state_id" type="text" class="form-control">
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
                        <button class="btn btn-primary">Load Result</button>
                    </li>
                </ul>
        </div>
        <div class="row w-100 m-0">
            <div class="col-md-12 p-2 row">
                <div class="col-md-4 card-h">
                    <div style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px">
                    <table class="table table-bordered table-sm" id="lga_list_ward_count">
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
                <div class="col-md-4">
                    <div class=" card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding:20px">
                        <div id="overall_analysis p-3 " >
                            <canvas id="overall_analysis_chart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-4" v-if="!data.loading">
                    <div class="card-h" style="box-shadow: #444 1px 3px 10px -8px;border-radius: 7px;padding: 5px 20px; font-size: 1em;">
                        <table class="table table-hover">
                            <tbody>
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

            </div>
            <div class="col-md-4">                
                <table class="table table-bordered">
                    <thead>
                        <th>State</th>
                        <th>Total Registered Voters</th>
                        <th>Total Supporters</th>
                    </thead>
                    <tbody>
                        <tr v-for="state in data.results.state" :key="'sk'+state.id">
                            <td>{{state.name}}</td>
                            <td>{{state.total_v}}</td>
                            <td>{{state.total_s}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-4">                
                <table class="table table-bordered">
                    <thead>
                        <th>L.G.A</th>
                        <th>Total Registered Voters</th>
                        <th>Total Supporters</th>
                    </thead>
                    <tbody>
                        <tr v-for="lga in data.results.lga" :key="'skl'+lga.id">
                            <td>{{lga.name}}</td>
                            <td>{{lga.total_v}}</td>
                            <td>{{lga.total_s}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-4">                
                <table class="table table-bordered">
                    <thead>
                        <th>Ward</th>
                        <th>Total Registered Voters</th>
                        <th>Total Supporters</th>
                    </thead>
                    <tbody>
                        <tr v-for="ward in data.results.ward" :key="'skw'+ward.id">
                            <td>{{ward.name}}</td>
                            <td>{{ward.total_v}}</td>
                            <td>{{ward.total_s}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4"></div>
            
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
    transition: all 0.8s cubic-bezier(0, 1.39, 0.79, 0.87) 0.4s !important;
}
.config-x> ul>li{
    margin-top:9px;
}
.config-x>ul>li>.form-control{
    height: 29px !important;
    padding: 0px 9px !important;
}
.config-toggler{
    position: absolute;
    right: -17px;
    display: flex;
    width: 17px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.4s;
}
.show-config{
    transform: translateX(0px) !important;
}
table{
    margin:0;
}
.card-h{
max-height:  360px;
height: 360px !important;
}
div.dataTables_wrapper div.dataTables_info{
    padding-top:0px !important;
    margin-top:0px !important;

}
</style>