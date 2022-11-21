<script setup>
    import { Head, Link } from '@inertiajs/inertia-vue3';
    import './../../css/app.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
    
    defineProps({
        canLogin: Boolean,
        canRegister: Boolean,
        laravelVersion: String,
        phpVersion: String,
    })

    function navToggle(){
        $(".navMenu>ul>li>button").click(function(e){
            e.stopPropagtion();
        /*     'showDLga'
            'lgaShow'                 */
        });
    }
    </script>
    
    <template>
        <Head title="Welcome" />
        <div class="sm:items-center sm:pt-0">
            <div class="relative flex items-top justify-center" >
            <div v-if="$page.props.auth.user">                                
                <div v-if="$page.props.auth.user.role==='admin'">
                    <ul class="navMenu w-100">
                        <li><div class=" badge rouned alert alert-success text-center">Hi <b>{{$page.props.auth.user.first_name}}</b>,</div></li>
                        <ul class="menuCox">
                            <li><Link :href="route('dashboard')" class="text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100">Dashboard</Link></li>
                            <li><Link :href="route('data-upload')" class="text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100">Upload Data</Link></li>
                            <li><Link :href="route('register')" class="text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100">Register</Link></li>
                            <li><Link :href="route('logout')" method="post"  class="text-sm text-gray-700 dark:text-gray-500 btn btn-light w-100">Logout</Link></li>
                        </ul>
                    </ul>
                </div>            
                <div v-else>
                    <ul>
                        <li><Link :href="route('data-upload')" class="">Upload Data</Link></li>
                        <li><Link :href="route('logout')" method="post" class="">Logout</Link></li>
                    </ul>
                </div>            
            </div>        
            </div>            
        </div>
    </template>
    <style>
        .navMenu{
            position:relative;
            padding: 0px;
            margin:0px;
        }
        .navMenu >li{
            padding:0px;
            margin:0px;
        }
        .navMenu:hover > .menuCox{
            visibility: visible !important;
            transform: translateX(0px) !important;
            -webkit-transform: translateX(-20px) !important;
        }
        .menuCox{
            position: absolute;            
            visibility: hidden;            
            padding:0px;            
            margin:0px;
            transform: translateX(-250px);
            -webkit-transform: translateX(-50px);
            transition:transform 1s cubic-bezier(0, 1.39, 0.79, 0.87) !important;
            -webkit-transition:transform 1s cubic-bezier(0, 1.39, 0.79, 0.87) !important;
            z-index: 10;             
            top: 48px;
            width:130px;
        }        
    </style>