<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    
    public function teamMembers(Request $request){
        $response = Team::with('volunteers')->where('id',$request->team_id)->get();
        return $response?->volunteers;
    }

    public function addTeamMember(Request $request){

        if(!TeamMember::where(['team_id'=>$request->get('team_id'),'volunteer_id'=>$request->get('volunteer_id')])->exists()){
            TeamMember::insert([
                'team_id'=>$request->get('team_id'),
                'volunteer_id'=>$request->get('volunteer_id'),
                'created_at'=>now(),            
            ]);
        }
        return true;    
    }

    public function removeTeamMember(Request $request){

        TeamMember::where(['team_id'=>$request->get('team_id'),'volunteer_id'=>$request->get('volunteer_id')])->delete();        
        return true;    
        
    }
    
    

}
