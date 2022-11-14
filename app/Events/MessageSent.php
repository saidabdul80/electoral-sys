<?php

namespace App\Events;

use App\Models\Chat;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var User
     */
    public $user;

    /**
     * Message details
     *
     * @var Message
     */
    public $message;
    public $messageTo;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Volunteer $user, Chat $message,  Volunteer $messageTo)
    {
        $this->user = $user;
        $this->message = $message;
        $this->messageTo = $messageTo;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }
    
}
