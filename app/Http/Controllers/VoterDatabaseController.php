<?php

namespace App\Http\Controllers;

use App\Models\AreaList;
use App\Models\State;
use App\Models\VoterDatabase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoterDatabaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $voters = VoterDatabase::paginate(10);
        $data = $this->data();
        $data['voters']=$voters;
        return Inertia::render('Voters',$data);        
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
    public function addVoters(Request $request)
    {        
        if($request->get('id') != ''){
            $voters = $request->toArray();
            $id = $voters['id'];
            unset($voters['id']);
            VoterDatabase::where('id',$id)->update($voters);            
            //return Inertia::render('volunteers',$this->data());
        }else{
            $voters = $request->toArray();            
            unset($voters['id']);
            VoterDatabase::insert($voters);
            //return Inertia::render('volunteers',$this->data());
        }
        return "<div style='display:flex;flex-direction:column; justify-content:center;align-item:center;height:100%'><h1 style='background:#2c61;color:#2c6; border:1px solid #2c6; border-radius:7px; text-align:center;padding:25px;'>Uploaded Successfully</h1><a href='' style='margin-top:30px; padding:10px 23px; background:#2c6; color white;border-radius:5px;'>Ok</a></div>";                
    }
    public function create()
    {
        //
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
     * @param  \App\Models\VoterDatabase  $voterDatabase
     * @return \Illuminate\Http\Response
     */
    public function show(VoterDatabase $voterDatabase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\VoterDatabase  $voterDatabase
     * @return \Illuminate\Http\Response
     */
    public function edit(VoterDatabase $voterDatabase)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VoterDatabase  $voterDatabase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VoterDatabase $voterDatabase)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VoterDatabase  $voterDatabase
     * @return \Illuminate\Http\Response
     */
    public function destroy(VoterDatabase $voterDatabase)
    {
        //
    }
}
