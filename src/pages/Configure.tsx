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
    const [questions, setQuestions] = useState<string[]>([])
    let phraseForm=useForm(
        {
        fields: [
            {
            type: 'string',
            name: 'phrase',
            label: 'Phrase (case insensitive, only alphanumeric values and spaces, max 70 characters):',
            },
        ],
        },
        (values) => {
            setQuestions((l)=>{
                return [...l,valid(values.phrase)];
            })
        }
    )
    let rewardForm=useForm(
        {
        fields: [
            {
            type: 'string',
            name: 'phrase',
            label: 'Reward Phrase :',
            },
        ],
        },
        (values) => {
            if(values){
                setReward(values.phrase||"")
                setEntered(true)
            }
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
        let j=0
        for(let i=0;i<s.length;i++){
            let b=s[i].toLowerCase()
            if(a.includes(b)){
                z+=b
                j++;
                if(j==80)break
            }
        }
        return z;
    }
    const [reward, setReward] = useState("Click here to add text.")
    const [entered, setEntered] = useState(false)
    
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
                if(entered){
                    await redis.set(postId+"reward",JSON.stringify(reward));
                }else{
                    await redis.set(postId+"reward",JSON.stringify("Keep Up the good work!!"));
                }
                ui.showToast("Success! Please reload.")
            }}>Submit</button>
        </hstack>

        <vstack alignment='center' height="100%" width="100%" gap='small'>
            <hstack alignment='start' width="100%">
                <spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer>
                <text size='xlarge' style='heading' color='#AA7777'>Reward Phrase :</text>
                <spacer></spacer>
                <spacer></spacer>
                <hstack padding='small' border='thin' borderColor='white' cornerRadius='small' width="70%" onPress={() => {
                            ui.showForm(rewardForm);
                        }}>
                       <text width="100%" color={entered?"#FFFFFF":"#888888"}>{reward}</text>
                    </hstack>
            </hstack>
            <hstack alignment='start' width="100%">
                <spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer>
                <text size='xlarge' style='heading' color='#AA7777'>Phrases:</text>
            </hstack>
            <hstack width="100%">
                    <spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer><spacer></spacer>
                <vstack  gap="small" alignment='start top'>
                    {questions.map((q,i)=>{
                        return <hstack width="100%">

                        <text size='large'>{i+1}. {q}</text>
                        <spacer grow></spacer>
                        <spacer grow></spacer>
                        <spacer grow></spacer>
                        <spacer grow></spacer>
                        <icon name='delete' onPress={()=>{
                            setQuestions([...questions.slice(0,i),...questions.slice(i+1)])
                        }}></icon>
                        </hstack>
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