//겹치는 람수는 따로 빼서 사용
export const getStringDate=(date)=>{
    return date.toISOString().slice(0,10);
};
