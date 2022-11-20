<?php

namespace App\Http\Controllers;

use App\Models\Sms;
use App\Models\Volunteer;
use App\Models\VoterDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SmsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sms = Sms::paginate(100);
        $config = DB::table('smsconfiguration')->first();
        return Inertia::render('Sms', ['sentMessages' => $sms, "config" => $config]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function send(Request $request)
    {
        if($request->get('to') =='voters'){
            // $recipient_phone_numbers = implode(',',VoterDatabase::all()->pluck('phone')->toArray());
             $recipient_phone_numbers = VoterDatabase::all()->pluck('phone')->toArray();
        }else{
            //$recipient_phone_numbers = implode(',',Volunteer::all()->pluck('phone')->toArray());
            $recipient_phone_numbers = Volunteer::where('user_type', $request->get('to'))->pluck('phone')->toArray();
        }

        $config = DB::table('smsconfiguration')->first();
        $service_plan_id = $config->others;
        $bearer_token = $config->api;

        //Any phone number assigned to your API
        $send_from = $config->number_from;
        //May be several, separate with a comma ,
        
        $message = $request->get('message');

       /*  // Check recipient_phone_numbers for multiple numbers and make it an array.
        if (stristr($recipient_phone_numbers, ',')) {
            $recipient_phone_numbers = explode(',', $recipient_phone_numbers);
        } else {
            $recipient_phone_numbers = [$recipient_phone_numbers];
        } */

        // Set necessary fields to be JSON encoded
        $content = [
            'to' => array_values($recipient_phone_numbers),
            'from' => $send_from,
            'body' => $message
        ];        
        //$data = json_encode($content);
        $response = Http::accept('application/json')->withToken($bearer_token)->post("https://us.sms.api.sinch.com/xms/v1/{$service_plan_id}/batches",$content);               
        return $response;
        if(!$response->failed()){
            Sms::insert(['message_to'=>$request->to, 'message'=>$message,'created_at'=>date('Y-m-d h:i:s')]);
            return ['ok' => true];
        }
        return ['ok' => false];        
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
     * @param  \App\Models\Sms  $sms
     * @return \Illuminate\Http\Response
     */
    public function show(Sms $sms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sms  $sms
     * @return \Illuminate\Http\Response
     */
    public function edit(Sms $sms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sms  $sms
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sms $sms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sms  $sms
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sms $sms)
    {
        //
    }
}
