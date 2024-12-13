import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    userId: string;  
    postId: string;  
    isModerator:boolean;
    setScreen:Function;
    ui:any;
    redis:any;
}

export default function Configure({userId,postId,isModerator,setScreen,ui,redis}:Props) {
    const [questions, setQuestions] = useState([])
    let phraseForm=useForm(
        {
        fields: [
            {
            type: 'string',
            name: 'phrase',
            label: 'Phrase (Not case sensitive, only alphanumeric values):',
            },
        ],
        },
        (values) => {
            setQuestions((l)=>{
                return [...l,valid(values.phrase)];
            })
        }
    )

    function shuffle() {
        let a="abcdefghijklmnopqrstuvwxyz0123456789";
        return a.split('').sort(function(){return 0.5-Math.random()}).join('');
    }
    function valid(s:string|undefined){
        if(!s)return ""
        let a="abcdefghijklmnopqrstuvwxyz0123456789 ";
        let z="";
        for(let i=0;i<s.length;i++){
            let b=s[i].toLowerCase()
            if(a.includes(b))z+=b
        }
        return z;
    }
    
    return <vstack alignment='center' height="100%" width="100%" gap='small'>
        
      <vstack alignment='center' height="100%" width="100%" gap='small'>
        <hstack alignment='center' width="100%" gap='small' padding='large'>
            <text size='xxlarge' style='heading'>Add Phrases for each round :</text>
            <spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer>
            <button size='large' appearance='destructive' onPress={async()=>{
                let z=[]

                for(let i=0;i<questions.length;i++){
                    z.push({
                        round:i+1,
                        phrase:questions[i],
                        key:shuffle()
                    })
                }
                await redis.set(postId+"live",JSON.stringify(true));
                await redis.set(postId+"number",JSON.stringify(questions.length));
                await redis.set(postId+"rounds",JSON.stringify(z));
                ui.showToast("Success! Please reload.")
            }}>Submit</button>
        </hstack>

        <vstack alignment='center' height="100%" width="100%" gap='small'>
            <hstack alignment='start' width="100%">
                <spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer>
                <text size='xlarge' style='heading' color='#AA7777'>Phrases:</text>
            </hstack>
            <hstack width="100%">
                    <spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer>
                <vstack  gap="small" alignment='start top'>
                    {questions.map((q,i)=>{
                        return <text size='large'>{i+1}. {q}</text>
                    })}
                    <spacer></spacer><spacer></spacer>
                    <hstack border='thin' borderColor='white' cornerRadius='medium'>
                        <button width="100%" height="100%" size='large'  appearance='plain' onPress={() => {
                            ui.showForm(phraseForm);
                        }}>+ Add</button>
                    </hstack>
                </vstack>
            </hstack>
        </vstack>
      </vstack>

      
    </vstack>
}