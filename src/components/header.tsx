import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    total:number;
    current:number;
    user:number;
    setCurrent:Function;
}

export default function Header({total,current,user,setCurrent}:Props) {
    let l=[
    ]
    for(let i=0;i<total;i++){
        l.push(".")
    }
    return <hstack alignment='center middle' width="100%" padding='small'>
            <spacer grow/>
        <hstack gap='small'>
            {l.map((r)=>{
                return <text>.</text>
            })}
        </hstack>
        <spacer grow/>
        <hstack gap='small'>
            <button appearance='destructive' onPress={()=>{
                if(current>0)setCurrent(current-1)
            }}>{"<"}</button>
            
            <button  appearance='destructive' onPress={()=>{
                if(current<user-1)setCurrent(current+1)
            }}>{">"}</button>
        </hstack>
    </hstack>
}