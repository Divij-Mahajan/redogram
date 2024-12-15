import { Devvit, useAsync, useState } from "@devvit/public-api";
import Home from "./pages/Home.js";
import Play from "./pages/Play.js";
import Wait from "./pages/Wait.js";
import Configure from "./pages/Configure.js";

export const Router: Devvit.CustomPostComponent =(_context) => {
    const [counter, setCounter] = useState(0);
    let userId=_context.userId || "";
    let postId=_context.postId || "";
    let redis=_context.redis
    let ui=_context.ui
    let live=useAsync(async()=>{
      let f=await redis.get(postId+"live");
      if(f&&JSON.parse(f))return true;
      else return false;
    }).data;
    const [screen, setScreen] = useState("home");
    const isModerator=useAsync(
        async ()=>{
          const e=await _context.reddit.getModerators({subredditName:_context.subredditName||""}).get(1)
            if(e[0].id==userId){
              return true
            }
            return false;
        }
      ).data||false
  
    return (
      <zstack width="100%" height="100%" alignment="top start">
        
        <image
        imageHeight={1024}
        imageWidth={2048}
        height="100%"
        width="100%"
        url="background.png"
        description="Red background"
        resizeMode="cover"
      />
      <vstack width="100%" height="100%"  alignment="center middle" grow>
        {
          
            (live&&screen=="home")?<Home userId={userId} postId={postId} isModerator={isModerator} setScreen={setScreen}/>:
            (live&&screen=="play")?<Play userId={userId} postId={postId} isModerator={isModerator} ui={ui} redis={redis} setScreen={setScreen}/>:
            (screen=="configure")?<Configure userId={userId} postId={postId} isModerator={isModerator} ui={ui} redis={redis} setScreen={setScreen}/>:
            <Wait userId={userId} postId={postId} isModerator={isModerator} setScreen={setScreen}/>
        }
      </vstack>
      
        </zstack>
    );
  }