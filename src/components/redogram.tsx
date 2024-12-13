import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    userId: string;  
    postId: string;  
    ui:any;
    redis:any;
    data:any;
    current:number;
}

export default function Redogram({userId,postId,ui,redis,data,current}:Props) {
    let phrase=[],key;
    let keyMap:{ [key: string]: string }={}
    let queryMap:{ [key: string]: string }={};
    let a="abcdefghijklmnopqrstuvwxyz0123456789";
    if(data&&data.length>0){
        let p=data[current].phrase
        let s=""
        let words=p.split(" ")
        let index=0;
        while(index<words.length){
            let newS=s+" "+words[index];
            while(s.length>17){
                phrase.push(s.substring(0,17))
                s=s.substring(17)
            }
            if(newS.length>17){
                if(s.length>0){
                    phrase.push(s);
                }
                s=words[index]
            }else{
                s=newS
            }
            index++;
        }
        key=data[current].key
        for(let i=0;i<key.length;i++){
            keyMap[a[i]]=key[i];
            queryMap[a[i]]="";
        }
    }

    return <vstack width="100%" height="100%">
        <vstack> 
        {phrase.map((p:string,i:number)=>{
            return <hstack gap='medium' width="100%" alignment='center' grow> 
                {p?.split("").map((w:string,i:number)=>{
                    if(w==" "){
                        return <spacer />
                    }
                    return <vstack width="5%">

                        <hstack width="100%" height="40px" border='thin' alignment='center middle' borderColor='white'>
                            <text width="100%" height="100%" alignment='center' >{queryMap[w]}</text>
                        </hstack>
                        <spacer></spacer>
                        <text size='large' width="100%" alignment='center'>{keyMap[w]}</text>
                    </vstack>
                })}
            </hstack>
        })}
        
        </vstack>
    </vstack>
}