<?php

namespace App\Http\Controllers;

use App\Models\State;
use App\Models\Team;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $team = Team::with('members')->orderBy('id','DESC')->paginate(20);
        
        return Inertia::render('Team',['teams'=>$team,"states"=>State::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add_team(Request $request)
    {
                
        if($request->get('id') != ''){
            $team = $request->toArray();
            $id = $team['id'];
            unset($team['id']);
            Team::where('id',$id)->update($team);            
            //return Inertia::render('team',$this->data());
        }else{
            $team = $request->toArray();            
            unset($team['id']);
            Team::insert($team);
            //return Inertia::render('team',$this->data());
        }
        return true;
    
    }

    function delete_team(Request $request){
        $team_id = $request->id;
        DB::beginTransaction();
            Team::find($team_id)->delete();
            TeamMember::where('team_id',$team_id)->delete();
        DB::commit();
        return true;
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
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function edit(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Team $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(Team $team)
    {
        //
    }
}
