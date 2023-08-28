import React, { useContext, useEffect, useState } from 'react';
import MyHeader from './../components/MyHeader'
import MyButton from './../components/MyButton'
import { DiaryStateContext } from '../App';
import DiaryList from '../components/DiaryList';

const Home = () => {
    const diaryList=useContext(DiaryStateContext)
    const [data,setData]=useState([]);

    const [curDate,setCurDate]=useState(new Date());
    // console.log(curDate)
    const headText=`${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`  //1월 =0월이라 +1

    //page title 바꾸기
    useEffect(()=>{
        const titleElement =document.getElementsByTagName('title')[0];
        titleElement.innerHTML=`감정 일기장`
    },[])

    useEffect(()=>{
        if(diaryList.length >=1){
            const firstDay=new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            // console.log(new Date(firstDay))
            const lastDay=new Date(
                curDate.getFullYear(),
                curDate.getMonth() +1,
                0,  // 0이 아니라 그날의 끝으로 설정해야함
                23, //시간
                59, //분
                59 //초
            ).getTime();
            // console.log(new Date(lastDay))
            setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
        }
    },[diaryList,curDate])

    const increaseMonth=()=>{
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
    }
    const decreaseMonth=()=>{
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
    }

    useEffect(()=>{
        // console.log(data)
    },[data])

    return (
        <div>
            <MyHeader headText={headText} 
            leftChild={<MyButton text={'<'} onClick={decreaseMonth}/>}
            rightChild={<MyButton text={'>'} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}></DiaryList>
        </div>
    );
};

export default Home;