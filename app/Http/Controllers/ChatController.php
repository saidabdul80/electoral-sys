<?php

namespace App\Http\Controllers;

use App\Events\ChatMessage;
use App\Events\ChatTyping;
use App\Events\MessageNotification;
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
        $users = Volunteer::paginate(100);     
        $currentUser = auth()->user();       
        //return view('chat',['users'=> $users]); */
        return Inertia::render('Chat',['users'=>$users, 'currentUser'=>$currentUser]);
    }
    public function fetchStatus(Request $request){
        $from_user_id = $request->get('from_user_id');
        return Chat::where(['to_user_id'=>$from_user_id, 'read'=>0])->get()->count();
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
        $user = Volunteer::find($from_user_id);
        $messageTo = Volunteer::find($to_user_id);

        broadcast(new MessageSent($user, $newMessage, $messageTo))->toOthers();        
        return $newMessage;
    }

    public function typing(Request $request){
        $user = Volunteer::find($request->get('from_user_id'));        
        $toID = $request->get('to_user_id');
        broadcast(new ChatTyping($user, toID:$toID))->toOthers();
        return "true";
    }

    public function markRead(Request $request){                
        //$res = Chat::where('from_user_id',$request->to_user_id)->update(['read' => 1]);        
        $token2 = $request->to_user_id.$request->from_user_id;
        Chat::where(['token'=>$token2])->update(['read' => '1']); 
        $user = Volunteer::find($request->from_user_id);//current login
        $messageTo = Volunteer::find($request->to_user_id);           
        MessageSent::dispatch($user, null, $messageTo, true);  
    }

    public function fetchConversation(Request $request)
    {   
        $token1 = $request->from_user_id.$request->to_user_id;//current user
        $token2 = $request->to_user_id.$request->from_user_id;
       
        $chats = Chat::where('token',$token1)->orWhere('token',$token2)->get();            
        $this->markRead($request);
        return $chats;                
    }


    
}
