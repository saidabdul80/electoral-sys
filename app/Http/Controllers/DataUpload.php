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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
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
            }])->orderBy('name')->paginate(7);  
            
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
            if($value['total_registered_voters']=='' && $value['total_registered_supporters']=='' ){}
            else{
                $data[]=$value;
            }
            unset($data[$datum]);
        }
        try{
            Data::upsert($data,['data_token'],['total_registered_voters','total_registered_supporters']);
        }catch(\Exception $e){
            return explode('(SQL:',$e->getMessage())[0];
        }
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

    public function fileToArray($filename = '', $delimiter = ',')
    {
        if (!file_exists($filename) || !is_readable($filename))
            throw new \Exception("Error while reading file", 400);

        $state_id=0;
        $lga_id=0;
        $ward_id=0;
        $header = null;
        $data = array();
        $states = array();
        $lgas = array();
        $nlga = 1;
        $wards = array();
        if (($handle = fopen($filename, 'r')) !== false) {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
                if (!$header){
                    $header =  $row;
                    foreach($header as &$hd){
                        $hd = strtolower($hd);
                    }                
                }
                else{
                                    
                    $rec = array_combine($header, $row);
                    if(sizeof($data)<1){
                        $rec['state_id'] = 1;
                        $rec['lga_id'] = 1;                       

                        $state_id = 1;
                        $lga_id = 1;                        
                        $data[] = $rec;
                        $states [] = [
                            "id"=> $state_id,
                            "name" => $rec['state']
                        ];
                        $lgas[] = [
                            "id"=> $lga_id,
                            "name" => $rec['lga'],
                            "state_id" => $state_id
                        ];

                        $wards[] = [                            
                            "name" => $rec['ward'],
                            "lga_id" => $lga_id
                        ];
                    }else{

                       /*  $found = false;
                        foreach($data as $struct) {
                            if ($rec['state'] == $struct['state']) {
                                $found = true;
                                break;
                            }
                        }
                        if($found){
                             $state_id = $data[$key]['state_id'];
                            $rec['state_id'] = $state_id;
                        } */
                        /* for ($i=sizeof($data); $i >-1 ; $i--) { 
                            if($data[$i]['lga'] == $rec['lga']){
                                
                            }
                            
                        }
                        foreach ($data as $key => $value) {                            
                            $lga++;
                        } */
                        $key = array_search($rec['state'],array_reverse(array_column($data,'state'),true));                        
                        if($key!==false){   
                                                     
                            //$state_id = $data[$key]['state_id'];
                            $rec['state_id'] = $data[$key]['state_id'];
                        }else{
                            $state_id++;
                            $rec['state_id'] = $state_id;
                            $states [] = [
                                "id"=> $rec['state_id'],
                                "name" => $rec['state']
                            ];    
                        }

                        $key = array_search($rec['lga'],array_column($data,'lga'));
                        if($key !== false){    
                            $nlga = $data[$key]['lga_id'];              
                            $rec['lga_id'] = $nlga ;                            
                        }else{
                            $lga_id++;
                            $rec['lga_id'] = $lga_id;
                            $lgas[] = [
                                "id"=> $rec['lga_id'],
                                "name" => $rec['lga'],
                                "state_id" => $rec['state_id']
                            ];
    
                        }
                        $wards[] = [                            
                            "name" => $rec['ward'],
                            "lga_id" => $rec['lga_id']
                        ];
                    }
                    
                    $data[] = $rec;
                }                    
            }
            fclose($handle);
        }

        return ['states'=>$states, 'lgas'=>$lgas, 'wards'=>$wards];
    }

    public function uploadSLW(Request $request){
        $file = $request->state_lga_ward;        
        $data = $this->fileToArray($file);        
       DB::transaction(function () use($data){
            DB::table('states')->insert($data['states']);
            DB::table('lgas')->insert($data['lgas']);
            DB::table('wards')->insert($data['wards']);
        });
        //return redirect('data-upload')->with(['msg'=>"Uploaded Successfully"]);        
        return "<div style='display:flex;flex-direction:column; justify-content:center;align-item:center;height:100%'><h1 style='background:#2c61;color:#2c6; border:1px solid #2c6; border-radius:7px; text-align:center;padding:25px;'>Uploaded Successfully</h1><a href='' style='margin-top:30px; padding:10px 23px; background:#2c6; color white;border-radius:5px;'>Ok</a></div>";                
    }

    public function fileToArray2($filename = '', $delimiter = ',', $states, $wards,$election_for_id,$election_type_id,$election_month_id,$election_year_id, $by)
    {
        if (!file_exists($filename) || !is_readable($filename))
            return response()->json(['error' => "Error while reading file"], 400);

        $header = null;
        $data = array();
        $rec = [];
        $state_id = 0;
        $state_key = false;
        $ward_key = false;
        $lga_id = 0;
        $ward_id = 0;
        if (($handle = fopen($filename, 'r')) !== false) {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
                if (!$header){
                    $header =  $row;
                    foreach($header as &$hd){
                        $hd = strtolower($hd);
                    }                
                }
                else{
                    $rec = array_combine($header, $row);
                    $state_key = array_search($rec['state'],array_column($states,'name'));

                    if($state_key !== false){
                        $state_id = $states[$state_key]['id'];
                        $ward_key = array_search($rec['ward'],array_column($wards,'name'));
                        if($ward_key !== false){                          
                        $lga_id = $wards[$ward_key]['lga_id'];
                        $ward_id = $wards[$ward_key]['id'];
                        $rec['lga_id'] = $lga_id;
                        $rec['state_id'] = $state_id;
                        $rec['ward_id'] = $ward_id;
                        $rec['data_token'] = $state_id.$lga_id.$ward_id.$election_type_id.$election_for_id.$election_month_id.$election_year_id;
                        $rec['election_for_id'] = $election_for_id;
                        $rec['election_type_id'] = $election_type_id;
                        $rec['election_month_id'] = $election_month_id;
                        $rec['election_year_id'] = $election_year_id;                        
                        $rec['created_by'] = $by;                           
                        $rec['flag'] =  $this->colorCode($rec['total_registered_voters'],$rec['total_registered_supporters']);
                        $rec['percentage'] =  $this->getPer($rec['total_registered_voters'],$rec['total_registered_supporters']);
                        $rec['created_by'] = $by;                        
                        }
                        unset($rec['state']);
                        unset($rec['lga']);
                        unset($rec['ward']);
                        if(key_exists('',$rec)){
                            unset($rec['']);
                        }
                      $data[]=$rec;
                    }
                    
                }                    
            }
            fclose($handle);
        }

        return $data;
    }

    public function uploadRecords(Request $request){
        $file = $request->records;             
        $states = State::all()->toArray();
        $by = Auth::user()->id;
        $wards = Ward::all()->toArray();   
        $election_for_id = $request->election_for_id;
        $election_type_id = $request->election_type_id;
        $election_month_id = $request->election_month_id;
        $election_year_id = $request->election_year_id;
        $data = $this->fileToArray2($file,',', $states, $wards,$election_for_id,$election_type_id,$election_month_id,$election_year_id,$by);     
        DB::transaction(function () use($data){
            foreach (array_chunk($data,1000) as $t)  
            {            
                DB::table('data')->upsert($t,['data_token', ['total_registered_voters','total_registered_supporters']]);
            }
        });

        return "<div style='display:flex;flex-direction:column; justify-content:center;align-item:center;height:100%'><h1 style='background:#2c61;color:#2c6; border:1px solid #2c6; border-radius:7px; text-align:center;padding:25px;'>Uploaded Successfully</h1><a href='' style='margin-top:30px; padding:10px 23px; background:#2c6; color white;border-radius:5px;'>Ok</a></div>";        
    }
    public function getPer($v,$s){         
        return intval( (intval($s)/intval($v)) * 100);
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
}