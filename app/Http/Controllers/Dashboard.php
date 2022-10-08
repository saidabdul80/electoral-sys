<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\Data;
use App\Models\ElectionFor;
use App\Models\ElectionMonth;
use App\Models\ElectionType;
use App\Models\ElectionYear;
use App\Models\Lga;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class Dashboard extends Controller
{
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
    
    public function getData(Request $request){
        $queries = 
        [
            'state_id' =>$request->state_id,
            'lga_id' =>$request->lga_id,            
            'election_year_id' =>$request->year_id,
            'election_month_id' => $request->month_id,
            'election_type_id' =>$request->election_type_id,
            'election_for_id' =>$request->election_for_id
        ];
        $nquery = "";
        foreach($queries as $query => $value){
            if(empty($value)){
                unset($queries[$query]);
            }else{
                $nquery .= 'd.'.$query.' = '.$value.' and ';
            }

        }
        $result = [];
        
        /* by state */        
        $overall = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v from data as d where $nquery d.deleted_at IS NULL"));        
        $rByState = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v, d.state_id, s.name from data as d inner join states s on s.id= d.state_id where $nquery d.deleted_at IS NULL group by d.state_id"));        
        $rByLga = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v, d.lga_id, l.name from data as d inner join lgas l on l.id= d.lga_id where $nquery d.deleted_at IS NULL group by d.lga_id"));        
        $rByWard = DB::select(DB::raw("select sum(d.total_registered_supporters) total_s,sum(d.total_registered_voters) total_v, d.ward_id, w.name from data as d inner join wards w on w.id= d.ward_id where $nquery d.deleted_at IS NULL group by d.ward_id"));                
         
    $result= [
        'overall' =>[intval($overall[0]->total_s??0), intval($overall[0]->total_v??0)],
        'state'=>$rByState,        
        'lga'=>$rByLga,        
        'ward'=>$rByWard        
    ]; 

        return $result;
    }   

}
