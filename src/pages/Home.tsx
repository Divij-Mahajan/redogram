import { Devvit, useState } from '@devvit/public-api';

interface Props {
    userId: string;  
    postId: string;  
    isModerator:boolean;
    setScreen:Function;
}

export default function Home({userId,postId,isModerator,setScreen}:Props) {
    
    return <vstack alignment='center middle' height="100%" width="100%" gap='small'>
        <image
        imageHeight={104}
        imageWidth={200}
        url="logo text.png"
        description="logo image"
      />
      <button appearance='destructive' onPress={()=>{setScreen("play")}}>Start Game</button>
      
    </vstack>
}