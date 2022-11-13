<?php

namespace App\Http\Controllers;

use App\Models\AreaList;
use App\Models\State;
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
        $volunteers = Volunteer::paginate(10);        
        $data = $this->data();
        $data['volunteers']=$volunteers;
        return Inertia::render('Volunteers',$data);
    }

    private function data(){
        $states = State::with(['lgas'=>function($query){
            $query->with('wards');
        }])->get();        
        $areaList = AreaList::all();                
        return ['areas'=>$areaList, 'states'=>$states];
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
                User::where('email',$volunteers['volunteer_id'])->update([
                    'first_name'=>$volunteers['name'],                                
                    'password'=>$volunteers['password'],                
                ]);        
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
            $newID = 'ECMS-'.date('d').rand(100,900).date('i');      
            $volunteers['volunteer_id'] = $newID;
            $volunteers['password'] = Hash::make($newID);
            unset($volunteers['id']);
            $email = $volunteers['email'];
            if(Volunteer::where('email',$email)->exists()){
              return "Email Already Exist";        
            }

            Volunteer::insert($volunteers);
            User::insert([
                'first_name'=>$volunteers['name'],
                'email'=>$newID,
                'lga'=>$volunteers[null],
                'state'=>null,
                'password'=>Hash::new($newID),
                'role'=>'user'
            ]);
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
