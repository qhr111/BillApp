//账单列表相关store
import axios from 'axios';

import {createSlice} from '@reduxjs/toolkit';
import { add } from 'lodash';

const billstore =  createSlice({
    name: 'bill',
    initialState: {
        billList:[]
    },
    reducers: {
       setBillList(state,action){
           state.billList = action.payload;
       },
       addBill(state,action){
           state.billList.push(action.payload);}
    }
});


//解构actionCreater函数
const {setBillList , addBill} = billstore.actions;
//编写异步
const getBillList = ()=>{
    return async(dispatch) =>{
        //编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        //触发同步reducer
        dispatch(setBillList(res.data));
    }
}

const addBillList = (data) =>{
    return async(dispatch) =>{
        //发送请求
        const res = await axios.post('http://localhost:8888/ka',data);
        //触发同步reducer
        dispatch(addBill(res.data)); 
    }
}

export {getBillList, addBillList};

//导出reducer
const reducer = billstore.reducer;

export default reducer;
