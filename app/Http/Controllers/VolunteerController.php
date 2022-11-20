<?php

namespace App\Http\Controllers;

use App\Models\AreaList;
use App\Models\Department;
use App\Models\State;
use App\Models\Status;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class VolunteerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $exist;
    private $success;
    public function __construct()
    {
        $this->exist =  `<div style=display:flex;flex-direction:column; justify-content:center;align-item:center;height:100%'>
        <h1 style='background:6c21;color:#6c2; border:1px solid #2c6; border-radius:7px; text-align:center;padding:25px;'>
            Email Already Exist
        </h1>
        <a href='' style='margin-top:30px; padding:10px 23px; background:#2c6; color white;border-radius:5px;'>Ok</a>
        </div>`;
        $this->success ="<div style='display:flex;flex-direction:column; justify-content:center;align-item:center;height:100%'><h1 style='background:#2c61;color:#2c6; border:1px solid #2c6; border-radius:7px; text-align:center;padding:25px;'>Uploaded Successfully</h1><a href='/volunteer_management' style='margin-top:30px; padding:10px 23px; background:#2c6; color white;border-radius:5px;'>Ok</a></div>";                
    }
    public function index()
    {
        $volunteers = Volunteer::where('user_type','Volunteer')->paginate(10);        
        $partyMembers = Volunteer::where('user_type','Party Member')->paginate(10);   
        $committeeMembers = Volunteer::where('user_type','Committee Member')->paginate(10);   
             
        $data = $this->data();
        $data['volunteers']=$volunteers;
        $data['partyMembers']=$partyMembers;
        $data['committeeMembers'] = $committeeMembers;
        return Inertia::render('Volunteers',$data);
    }

    private function data(){
        $states = State::all();                
        $departments = Department::all();
        $status = Status::all(); 
        return ['states'=>$states,'departments'=>$departments, 'statuses'=>$status];
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addVolunteers(Request $request)
    {        
        if($request->get('id') != ''){
            $volunteers = $request->toArray();
            if($volunteers['password'] !==''){
                $volunteers['password'] = Hash::make($volunteers['password']);             
            }            
            $id = $volunteers['id'];
            $email = $volunteers['email'];
            if(Volunteer::where('email',$email)->where('id','!=',$id)->exists()){
                return "Email Already Exist";
            }
            unset($volunteers['id']);
            Volunteer::where('id',$id)->update($volunteers);            
            //return Inertia::render('volunteers',$this->data());
            return ["ok"=>true, "msg"=>"Volunteer Updated Successfuly"];
        }else{
            $volunteers = $request->toArray();      
            $newID = $request->get('volunteer_id');      
            $volunteers['volunteer_id'] = $newID;
            $volunteers['password'] = Hash::make($newID);
            unset($volunteers['id']);
            $email = $volunteers['email'];
            if(Volunteer::where('email',$email)->exists()){
              return "Email Already Exist";        
            }

            Volunteer::insert($volunteers);
           //return Inertia::render('volunteers',$this->data());
            return ["ok"=>true, "msg"=>"Volunteer Created with the ID: $newID"];
        }
    }

    public function all()
    {
        return Volunteer::paginate(500);
    }

    public function volunteers_not_in_team(Request $request)
    {
        return Volunteer::with('team')->paginate(500);
    }

    public function uploadData(Request $request){
        try{

            $datas = $this->fileToArray($request->file_to_upload); 
            $errors = "";        
            $volunteerIds = Volunteer::pluck("volunteer_id")->toArray();
            $insertData = [];
            foreach ($datas as $index => &$data) {
                if(isset($data['volunteer_id'])){
                    if(!in_array($data['volunteer_id'], $volunteerIds)){

                        if($request->get('user_type')=='Party Member'){
                            $data['department_id'] = $request->get('department_id');
                            $data['status_id'] = $request->get('status_id');
                        }
                        if(isset($data['password'])){
                            $data['password'] = Hash::make($data['password']);
                        }else{
                            $data['password'] = Hash::make($data['volunteer_id']);                    
                        }
                    }else{
                        $errors .= '<p style="font-size:0.8em !important;margin:1px">Error: Already exist volunteer ID on line '. $index+1 . ' </p> ';                
                        
                    }
                }else{                    
                    $errors .= '<p style="font-size:0.8em !important;margin:1px">Error: Volunteer ID required on  line '. $index+1 . ' </p> ';                
                }
            }
            
            if($errors ==''){
                Volunteer::insert($datas);
                return ["ok"=>true, "msg"=>'uploaded successfuly'];
            }else{
                return ["ok"=>false, "msg"=>$errors];
            }
            
        }catch(\Exception $e){

            return ["ok"=>false, "msg"=>$e->getMessage()];
        }
    }

    public function fileToArray($filename = '', $delimiter = ',')
    {
        if (!file_exists($filename) || !is_readable($filename))
            return response()->json(['error' => "Error while reading file"], 400);

        $header = null;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== false) {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false) {
                if (!$header){
                    $header =  $row;
                    foreach($header as &$hd){
                        $hd = strtolower($hd);
                    }                
                }
                else{
                    if(sizeof($header) != sizeof($row)){
                        if(sizeof($header) > sizeof($row)){
                           $row[] = '';
                        }else{
                            unset($row[sizeof($row)-1]);
                        }
                    }                    
                    $data[] = array_combine($header, $row);                
                }                    
            }
            fclose($handle);
        }

        return $data;
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Volunteer  $Volunteer
     * @return \Illuminate\Http\Response
     */
    public function show(Volunteer $Volunteer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Volunteer  $Volunteer
     * @return \Illuminate\Http\Response
     */
    public function edit(Volunteer $Volunteer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Volunteer  $Volunteer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Volunteer $Volunteer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Volunteer  $Volunteer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Volunteer $Volunteer)
    {
        //
    }
}
