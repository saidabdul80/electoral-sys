<?php

namespace App\Http\Controllers;

use App\Models\AreaList;
use App\Models\Lga;
use App\Models\State;
use App\Models\Ward;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PDO;

class AreaListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        return Inertia::render('AreaList',$this->data());
    }

    private function data(){
        $states = State::all();        
        $areaList = AreaList::orderBy('id', 'DESC')->paginate(10);                
        return ['arealists'=>$areaList, 'states'=>$states];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addArea(Request $request)
    {        
        if($request->get('id') != ''){
            $areaList = $request->toArray();
            $id = $areaList['id'];
            unset($areaList['id']);
            AreaList::where('id',$id)->update($areaList);            
            //return Inertia::render('AreaList',$this->data());
        }else{
            $areaList = $request->toArray();            
            unset($areaList['id']);
            AreaList::insert($areaList);
            //return Inertia::render('AreaList',$this->data());
        }
        return "<div style='display:flex;flex-direction:column; justify-content:center;align-item:center;height:100%'><h1 style='background:#2c61;color:#2c6; border:1px solid #2c6; border-radius:7px; text-align:center;padding:25px;'>Uploaded Successfully</h1><a href='' style='margin-top:30px; padding:10px 23px; background:#2c6; color white;border-radius:5px;'>Ok</a></div>";                
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
     * @param  \App\Models\AreaList  $areaList
     * @return \Illuminate\Http\Response
     */
    public function show(AreaList $areaList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AreaList  $areaList
     * @return \Illuminate\Http\Response
     */
    public function edit(AreaList $areaList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AreaList  $areaList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AreaList $areaList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AreaList  $areaList
     * @return \Illuminate\Http\Response
     */
    public function destroy(AreaList $areaList)
    {
        //
    }
}
