<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\Data;
use App\Models\ElectionFor;
use App\Models\ElectionType;
use App\Models\Lga;
use App\Models\State;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataUpload extends Controller
{
    public function index(){
   /*      $states = State::with(['lgas'=>function($query){
            $query->with('wards');
        }])->get();     */  
        $year = Configuration::where('name','current_year')->first();                
        $month = Configuration::where('name','current_month')->first();
        $electionType = ElectionType::all();
        $electionFor = ElectionFor::all();

        $config = ['election_year'=>$year,'election_month'=>$month, 'election_for'=>$electionFor, 'election_types'=>$electionType];
        
        $user = Auth::user();
        if($user->role=='admin'){
            
            $states = State::with(['lgas'=>function($query){
                $query->with('wards');
            }])->get();  
            
            $total_states = State::count();
            $total_lgas = Lga::count();
            $total_wards = Ward::count();

        }else{

            $state_ids =[];
            $lgas =[];
            if($user->lgas != ''){
                $lgas = explode(',',$user->lgas);
                $state_ids = Lga::whereIn('id',$lgas)->get()->pluck('state_id')->unique();            
            }
            $states = State::with(['lgas'=>function($query) use($lgas){
                $query->whereIn('id', $lgas)->with('wards');
            }])->whereIn('id', $state_ids)->paginate(5);   
            
            $total_states = sizeof($state_ids);
            $total_lgas = sizeof($lgas);
            $total_wards = Ward::whereIn('lga_id', $lgas)->count();
        }
        
        $config['total_states'] = $total_states;
        $config['total_lgas'] = $total_lgas;
        $config['total_wards'] = $total_wards;
        $config['user'] = Auth::user();

        return Inertia::render('DataUpload',["states"=>$states, 'config'=>$config]);
    }

    public function save(Request $request){
        $data = $request->all();        
        foreach($data as $datum => $value){            
            $data[]=$value;
            unset($data[$datum]);
        }
        Data::upsert($data,['data_token'],['total_registered_voters','total_registered_supporters']);
        return "<h1 class='text-center'>Saved Successfully</h1>";
    }

    public function getData(Request $request){
        $user = $request->user;
        if($user['role']=='admin'){
            $response =  Data::where([
                "election_for_id" => $request->election_for_id,
                "election_year_id" => $request->election_year_id,
                "election_month_id"=> $request->election_month_id,
                "election_for_id"=> $request->election_for_id,
                "election_month_id"=> $request->election_month_id,
                "election_year_id"=> $request->election_year_id,
            ])->get();
        }else{
            $state_ids =[];
            $lgas =[];
            if($user['lgas'] != ''){
                $lgas = explode(',',$user['lgas']);
                $state_ids = Lga::whereIn('id',$lgas)->get()->pluck('state_id')->unique();            
            }

          $response =  Data::where([
                "election_for_id" => $request->election_for_id,
                "election_year_id" => $request->election_year_id,
                "election_month_id"=> $request->election_month_id,
                "election_for_id"=> $request->election_for_id,
                "election_month_id"=> $request->election_month_id,
                "election_year_id"=> $request->election_year_id,
            ])->whereIn('lga_id', $lgas)->get();
        }            
        return $response;
    }

}

