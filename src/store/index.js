//组合子模块，导出store实例

import { configureStore } from '@reduxjs/toolkit';
import billreducer from './modules/billstore';


const store = configureStore({
    reducer: {
        bill: billreducer
    }
});

export default store;