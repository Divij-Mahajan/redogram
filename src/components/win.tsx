import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    setCurrent:Function;
    rewardPhrase:string;
}

export default function Win({setCurrent,rewardPhrase}:Props) {
    
    return <vstack alignment='center top' width="100%" height="100%" padding='small'>
        <spacer grow></spacer>
            <text style='heading' size='xxlarge'>Congratulations</text>
            <spacer></spacer>
            <text size='large'>You have completed the Redogram</text>
        <spacer grow></spacer>
            <text size='xlarge' color='#FFDDDD'>{rewardPhrase}</text>
        <spacer grow></spacer>
        <spacer grow></spacer>
    </vstack>
}