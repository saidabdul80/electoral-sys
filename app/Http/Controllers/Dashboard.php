<?php

namespace App\Http\Controllers;

use App\Models\AreaList;
use App\Models\Configuration;
use App\Models\Data;
use App\Models\ElectionFor;
use App\Models\ElectionMonth;
use App\Models\ElectionType;
use App\Models\ElectionYear;
use App\Models\Event;
use App\Models\Expenses;
use App\Models\Lga;
use App\Models\Setting;
use App\Models\State;
use App\Models\Volunteer;
use App\Models\VoterDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class Dashboard extends Controller
{
    public function xindex(){
        return Inertia::render('XDashboard');        
    }
    public function getPer($v,$s){         
        if($v < 1){
            return 100;    
        }

        $val = floor( ($s/$v) * 100);

        if($val > 100){
            return 100;
        }

        return $val;
    }
    public function colorCode($v,$s){
        if($this->getPer($v,$s) < 40){            
            return 'poor';
        }
        if($this->getPer($v,$s) > 39 && $this->getPer($v,$s) < 59){
            return 'normal';
        }
        if($this->getPer($v,$s) >58 ){
            return 'strong'; 
        }
    }

    public function index(){
        $config_year = Configuration::where('name','current_year')->first();                
        $config_month = Configuration::where('name','current_month')->first();
        
        $year = ElectionYear::all();
        $month = ElectionMonth::all();
        $electionType = ElectionType::all();
        $electionFor = ElectionFor::all();
        $cmonth = intval($config_month->value);
        $cyear = intval($config_year->value);
        $ward_ids = DB::table('data')->selectRaw('distinct ward_id')->where(['election_month_id'=>$cmonth,'election_year_id'=>$cyear])->get()->pluck('ward_id');        
        $lga_ids = DB::table('data')->selectRaw('distinct lga_id')->where(['election_month_id'=>$cmonth,'election_year_id'=>$cyear])->get()->pluck('lga_id');        
        $state_ids = DB::table('data')->selectRaw('distinct state_id')->whereRaw("election_month_id = $cmonth and election_year_id = $cyear")->get()->pluck('state_id');        
                
        $states = State::with(['lgas'=>function($query) use($lga_ids, $ward_ids){
            $query->with(['wards'=>function($q) use($ward_ids){
                    $q->whereIn('id',$ward_ids);
            }])->whereIn('id',$lga_ids);

        }])->whereIn('id', $state_ids)->get();
        $lga_with_ward_count = Lga::with('state')->get();        
        $config = [
                    'current_month'=>$cmonth,
                    'current_year'=>$cyear,
                    'election_years'=>$year,
                    'election_months'=>$month,
                    'election_for'=>$electionFor,
                    'election_types'=>$electionType,
                    'default_state_id'=>$state_ids[0]??0,
                    'default_lga_id'=>$lga_ids[0]??0,
                    'lga_with_ward_count'=>$lga_with_ward_count
                ];
        return Inertia::render('Dashboard', ["user"=>Auth::user(),'states'=>$states, 'config'=> $config]);        
    }
    
    public function getData2(Request $request){
        $queries = 
        [
            'state_id' =>$request->state_id,
            'lga_id' =>$request->lga_id,            
            'election_year_id' =>$request->election_year_id,
            'election_month_id' => $request->election_month_id,
            'election_type_id' =>$request->election_type_id,
            'election_for_id' =>$request->election_for_id,
            'user_type'=>'Volunteer'
        ];

        $queries2=  
        [
            'state_id' =>$request->state_id,
            'lga_id' =>$request->lga_id,            
            'election_year_id' =>$request->election_year_id,
            'election_month_id' => $request->election_month_id,
            'election_type_id' =>$request->election_type_id,
            'election_for_id' =>$request->election_for_id            
        ];

        
        $nquery = "";
        
        foreach($queries as $query => $value){
            if(empty($value)){
                unset($queries[$query]);
                unset($queries2[$query]);                
            }
        }
        $result = [];
        
        /* by state */        
        //$overall = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v, d.percentage, d.flag from data as d where $nquery d.deleted_at IS NULL"));        
        $voluteers = Volunteer::where('user_type','Volunteer')->count();        
        $voters = VoterDatabase::all()->count();
        $percentage = $this->getPer($voters,$voluteers);
        $flag = $this->colorCode($voters,$voluteers);        
        $overall = [
            'total_s'=>$voluteers,
            'total_v'=>$voters,
            'percentage'=>$percentage,
            'flag'=>$flag,
        ];        

        $flags = [
            'normal'=>0,
            'poor'=>0,
            'strong'=>0,
        ];
        //$voluteers = DB::table('volunteers','v')->selectRaw('count(v.id) as total_s, v.state_id, v.lga_id, states.name as name')->join('states', 'states.id','v.state_id')->where($queries)->groupBy('state_id')->get();        
        $states = Volunteer::select(DB::raw('count(id) as total_s, state_id, lga_id'))->where($queries)->groupBy('state_id')->get();        
        $states->map(function($item) use($flags){
            $item->total_v = $item->state_total_v;
            $flag = $this->colorCode($item->state_total_v, $item->total_s);
            $item->flag = $flag;
            $perc = $this->getPer($item->state_total_v, $item->total_s);
            $item->percentage  = $perc;
            //$flags[$flag] += 1;
        });   
                
        $lgas = Volunteer::select(DB::raw('count(id) as total_s, state_id, lga_id'))->where($queries)->groupBy('lga_id')->get();        
        $lgas->map(function($item)use ($flags){
            $item->total_v = $item->lga_total_v;
            $flag = $this->colorCode($item->lga_total_v, $item->total_s);
            $item->flag = $flag;
            $perc = $this->getPer($item->lga_total_v, $item->total_s);
            $item->percentage  = $perc;
            //$flags[$flag] += 1;
        });  

        $wards = Volunteer::select(DB::raw('count(id) as total_s, state_id, lga_id'))->where($queries)->groupBy('ward_id')->get();        
        $wards->map(function($item) use($flags){
            $item->total_v = $item->ward_total_v;
            $flag = $this->colorCode($item->ward_total_v, $item->total_s);
            $item->flag = $flag;
            $perc = $this->getPer($item->ward_total_v, $item->total_s);
            $item->percentage  = $perc;
            $flags[$flag] += 1;
        });          
         
        $result= [
            'overall' =>[intval($overall['total_s']), intval($overall['total_v'])],
            'state'=>$states,        
            'lga'=>$lgas,        
            'ward'=>$wards,
            'ward_by_flag'=>$flags
        ]; 

        return $result;
    }   


    public function getData(Request $request){
        $config = Setting::where(['name'=>'upload_type'])->first();
        if($config->value == 'uploads'){
            return $this->getData3($request);
        }
        return $this->getData2($request);
    }
    public function getData3(Request $request){
        $queries = 
        [
            'state_id' =>$request->state_id,
            'lga_id' =>$request->lga_id,            
            'election_year_id' =>$request->election_year_id,
            'election_month_id' => $request->election_month_id,
            'election_type_id' =>$request->election_type_id,
            'election_for_id' =>$request->election_for_id
        ];
        $nquery = "";
        $qq = $queries;
        foreach($queries as $query => $value){
            if(empty($value)){
                unset($queries[$query]);
            }else{
                $nquery .= 'd.'.$query.' = '.$value.' and ';
            }

        }
        $result = [];
        
        /* by state */        
        $overall = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v, d.percentage, d.flag from data as d where $nquery d.deleted_at IS NULL"));        
        $rByState = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v, round(((sum(d.total_registered_supporters)/sum(d.total_registered_voters))*100)) percentage, d.flag, d.state_id, s.name from data as d inner join states s on s.id= d.state_id where $nquery d.deleted_at IS NULL group by d.state_id"));        
        $rByLga = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v,round(((sum(d.total_registered_supporters)/sum(d.total_registered_voters))*100)) percentage, d.flag, d.lga_id, l.name from data as d inner join lgas l on l.id= d.lga_id where $nquery d.deleted_at IS NULL group by d.lga_id"));        
        
        $rByWard = DB::select(DB::raw("select d.total_registered_supporters total_s,d.total_registered_voters total_v, d.percentage, d.flag, d.ward_id, w.name, l.name lga from data as d inner join wards w on w.id= d.ward_id inner join lgas l on l.id=w.lga_id where $nquery d.deleted_at IS NULL "));                

        $rByWardFlag = DB::select(DB::raw("select sum(d.id) as total, flag from data as d where $nquery d.deleted_at IS NULL group by d.flag"));                
        
         
    $result= [
        'overall' =>[intval($overall[0]->total_s??0), intval($overall[0]->total_v??0)],
        'state'=>$rByState,        
        'lga'=>$rByLga,        
        'ward'=>$rByWard,
        'ward_by_flag'=>["total"=>array_column($rByWardFlag,'total'),"flag"=>array_column($rByWardFlag,'flag')]
    ]; 

        return $result;
    }   



    public function loadDash(){
        $voluteers = Volunteer::where('user_type','Volunteer')->count();
        $partyMember = Volunteer::where('user_type','Party Member')->count();
        $committeeMember = Volunteer::where('user_type','Committee Member')->count();
       
        $voters = VoterDatabase::all()->count();
        $events = Event::where('completed',0)->count();
        $states = State::all()->count();
        $lgas = Lga::all()->count();
        $wards = Lga::all()->count();
        $areas = AreaList::all()->count();
        $unread = DB::table('chats')->where(['read'=>0,'to_user_id'=>auth()->user()->id])->get()->count();

        $data = [
            'voluteers' =>$voluteers,
            'partyMembers' =>$partyMember,
            'committeeMembers' =>$committeeMember,
            'voters' =>$voters,
            'events' =>$events,
            'states' =>$states,
            'lgas' =>$lgas,
            'wards' =>$wards,
            'areas' =>$areas,
            'unread' =>$unread
        ];
        return Inertia::render('XDashboard',$data);        
    }
}
