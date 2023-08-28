import React, {useEffect} from 'react';
import DiaryEditor from '../components/DiaryEditor';


const New = () => {
    //page title 바꾸기
    useEffect(()=>{
        const titleElement =document.getElementsByTagName('title')[0];
        titleElement.innerHTML=`감정 일기장_새 일기`
    },[])
    return (
        <div>
            <DiaryEditor />
        </div>
    );
};

export default New;