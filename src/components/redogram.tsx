import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    userId: string;  
    postId: string;  
    ui:any;
    redis:any;
    data:any;
    current:number;
    setCurrent:Function;
}

export default function Redogram({userId,postId,ui,redis,data,current,setCurrent}:Props) {
    let fillForm=useForm((data)=>({
        fields: data.fields,
        title: data.title,
    }),(values) => {
        let q=Object.keys(values)[0]
        let qm=queryMap
        qm[q]=values[q]
        setQueryMap(qm)
        if(check()){
            ui.showToast("Congratulations you have completed")
            setCurrent(current+1)
            let qm:{ [key: string]: string }={}
            for(let i=0;i<a.length;i++){
                qm[a[i]]="";
            }
            setQueryMap(qm)
        }
    })
    
    let phrase:Array<string>=[],key;
    let keyMap:{ [key: string]: string }={}
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
        while(s.length>17){
            phrase.push(s.substring(0,17))
            s=s.substring(17)
        }
        if(s.length>0)phrase.push(s)
        key=data[current].key
        for(let i=0;i<key.length;i++){
            keyMap[a[i]]=key[i];
        }
    }
    let qm:{ [key: string]: string }={}
    for(let i=0;i<a.length;i++){
        qm[a[i]]="";
    }
    const [queryMap, setQueryMap] = useState(qm)

    function check() {
        for(let p of phrase){
            for(let c of p){
                if(c==" ")continue
                if(queryMap[keyMap[c]]!=c)return false;
            }
        }
        return true;
    }

    return <vstack width="100%" height="100%" padding='small' >
        <vstack gap='medium'> 
        {phrase.map((p:string,i:number)=>{
            return <hstack gap='medium' width="100%" alignment='center' grow> 
                {p?.split("").map((w:string,i:number)=>{
                    if(w==" "){
                        return <spacer />
                    }
                    return <vstack width="5%">
                        <vstack width="100%" height="40px" border='thin' alignment='center middle' borderColor='white' onPress={async()=>{
                            ui.showForm(fillForm, {
                                fields: [{ type: 'string', name: `${keyMap[w]}`, label: `Enter Value of ${keyMap[w]} (1 character):` }],
                                title: 'Value Form'
                               });
                        }}>
                            <spacer grow></spacer>
                            <spacer grow></spacer>

                                <text width="100%" height="100%"  size='large' alignment='center bottom'>{queryMap[keyMap[w]]}</text>
                        </vstack>
                        <spacer></spacer>
                        <text size='large' width="100%" alignment='center'>{keyMap[w].toUpperCase()}</text>
                    </vstack>
                })}
            </hstack>
        })}
        
        </vstack>
    </vstack>
}