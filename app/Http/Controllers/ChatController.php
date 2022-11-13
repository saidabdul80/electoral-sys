<?php

namespace App\Http\Controllers;

use App\Events\ChatMessage;
use App\Events\ChatTyping;
use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate(100);     
        $currentUser = auth()->user();       
        //return view('chat',['users'=> $users]); */
        return Inertia::render('Chat',['users'=>$users, 'currentUser'=>$currentUser]);
    }


    public function sendMessage(Request $request)
    {
        $message_type = $request->get('message_type');
        $from_user_id = $request->get('from_user_id');
        $to_user_id = $request->get('to_user_id');
        if($message_type == 'text'){
            $message = $request->get('message');
        }else{            
            $allowedMimeTypes = ['image/jpeg','image/gif','image/png'];
            $contentType = $request->message->getClientMimeType();
            if(! in_array($contentType, $allowedMimeTypes) ){
                $message_type = 'file'; 
            }else{
                $message_type = 'image';                 
            }
            $message = time().'.'.$request->message->extension();  
            $request->message->move(public_path('uploads'), $message);       
        }

        $token = $request->from_user_id.$request->to_user_id;
        $message = [            
            "from_user_id" => $from_user_id,
            "to_user_id" => $to_user_id,
            "message" => $message,
            "message_type" => $message_type,
            "read" => 0,
            'token'=>$token
        ];


        $newMessage = Chat::create($message);        
        $user = User::find($from_user_id);
        $messageTo = User::find($to_user_id);

        broadcast(new MessageSent($user, $newMessage, $messageTo))->toOthers();
        return $newMessage;
    }

    public function typing(Request $request){
        $user = User::find($request->get('from_user_id'));        
        $toID = $request->get('to_user_id');
        broadcast(new ChatTyping($user, toID:$toID))->toOthers();
        return "true";
    }

    public function fetchConversation(Request $request)
    {   
        $token1 = $request->from_user_id.$request->to_user_id;
        $token2 = $request->to_user_id.$request->from_user_id;
        Chat::where('from_user_id',$request->to_user_id)->update(['read' => '1']);
        $chats = Chat::where('token',$token1)->orWhere('token',$token2)->get();
        return $chats;                
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
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
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chat $chat)
    {
        //
    }
}
