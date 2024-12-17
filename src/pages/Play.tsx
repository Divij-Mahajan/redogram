import { Devvit, Listing, useAsync, useForm, useState } from '@devvit/public-api';
import Header from '../components/header.js';
import Redogram from '../components/redogram.js';
import Win from '../components/win.js';

interface Props {
    userId: string;  
    postId: string;  
    isModerator:boolean;
    setScreen:Function;
    ui:any;
    redis:any;
}

export default function Play({userId,postId,isModerator,setScreen,ui,redis}:Props) {
    const [round, setRound] = useState<number>(
    async()=>{
        let f=await redis.get(postId+userId+"round");
        if(f){
            return (JSON.parse(f));
        }
        else {
            await redis.set(postId+userId+"round",JSON.stringify(1));
            return (1);
        }
    })

    
    let data:Array<any>=useAsync(async()=>{
        let f=await redis.get(postId+"rounds");
        if(f)return JSON.parse(f);
        else return [];
        }).data;
    
    let reward=useAsync(async()=>{
        let f=await redis.get(postId+"reward");
        if(f)return JSON.parse(f);
        else return [];
        }).data;
    
    const [current, setCurrent] = useState(0)
    return <vstack width="100%" height="100%" alignment='center top' padding='small'>
        <Header total={data?.length} current={current} user={round} setCurrent={setCurrent}/>
        {(current==data?.length)?
        <Win setCurrent={setCurrent} rewardPhrase={reward||""}></Win>
        :<Redogram redis={redis} ui={ui} data={data} current={current} postId={postId} round={round} userId={userId} setCurrent={setCurrent} setRound={setRound}/>
    }
        
    </vstack>
}