import { Devvit, Listing, useForm, useState } from '@devvit/public-api';

interface Props {
    setCurrent:Function;
}

export default function Win({setCurrent}:Props) {
    
    return <vstack alignment='center top' width="100%" height="100%" padding='small'>
        <spacer grow></spacer>
            <text style='heading' size='xxlarge'>Congratulations</text>
            <text size='large'>You have completed the Redogram</text>
        <spacer grow></spacer>
        <spacer grow></spacer>
    </vstack>
}