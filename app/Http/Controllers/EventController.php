<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\State;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::paginate(20);
        $states = State::all();
        return Inertia::render('Event',['events'=>$events, 'states'=>$states]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function saveEvent(Request $request)
    {
        if($request->get('id') != ''){
            $event = $request->toArray();
            $id = $event['id'];
            unset($event['id']);
            Event::where('id',$id)->update($event);            
            return true;
            //return Inertia::render('event',$this->data());
        }else{
            $event = $request->toArray();            
            unset($event['id']);
            Event::insert($event);
            return true;
            //return Inertia::render('event',$this->data());
        }
    }

    public function deleteEvent(Request $request){
        Event::where('id',$request->get('id'))->delete();
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
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        //
    }
}
