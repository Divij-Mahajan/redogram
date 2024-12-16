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
        l.push("_")
    }
    return <hstack alignment='center middle' width="100%" padding='small'>
            <spacer grow/>
            <spacer />
        <hstack gap='small'>
            {l.map((r,i)=>{
                if(i== current){
                    return <vstack>
                    <text size='xxlarge' style='heading' color={i<user-1?"#FF3F18":"#FFFFFF"}>_</text>
                    <text size='xxlarge' style='heading' color={i<user-1?"#FF3F18":"#FFFFFF"}>^</text>
                    </vstack>
                }
                return <text size='xxlarge' style='heading' color={i<user-1?"#FF3F18":"#FFFFFF"}>_</text>
            })}
             <vstack alignment='center'>
                <spacer grow></spacer>
                    <icon name="contest" color={user==total+1?"#FF3F18":"#FFFFFF"}></icon>
                    {current==total?
                    <text size='xxlarge' style='heading' color="#FF3F18">^</text>:<></>
                    }
            </vstack>
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