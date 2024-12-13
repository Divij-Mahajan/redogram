import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    userId: string;  
    postId: string;  
    isModerator:boolean;
    setScreen:Function;
    ui:any;
    redis:any;
}

export default function Play({userId,postId,isModerator,setScreen,ui,redis}:Props) {
    return <vstack>
        <text>Play</text>
    </vstack>
}