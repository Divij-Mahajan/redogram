import { Devvit, Listing, useAsync, useForm, useState } from '@devvit/public-api';
import Header from '../components/header.js';
import Redogram from '../components/redogram.js';

interface Props {
    userId: string;  
    postId: string;  
    isModerator:boolean;
    setScreen:Function;
    ui:any;
    redis:any;
}

export default function Play({userId,postId,isModerator,setScreen,ui,redis}:Props) {
    let round=useAsync(async()=>{
        let f=await redis.get(postId+userId+"round");
        if(f)return JSON.parse(f);
        else return 3;
        }).data;
    let data:Array<any>=useAsync(async()=>{
        let f=await redis.get(postId+"rounds");
        if(f)return JSON.parse(f);
        else return [];
        }).data;
    const [current, setCurrent] = useState(0)
    return <vstack width="100%" height="100%" alignment='center top' padding='small'>
        <Header total={data?.length} current={current} user={round} setCurrent={setCurrent}/>
        <Redogram redis={redis} ui={ui} data={data} current={current} postId={postId} userId={userId} />
        
    </vstack>
}