import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {  useEffect, useMemo, useState } from 'react'
//控制名称是否存在
import classNames from 'classnames'
//时间格式化
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
//数据处理分组
import _ from 'lodash'
import DailyBill from './components/DailyBill'

const Month = () => {
    //按月做数据的分组
    //用后端处理比较合适
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        //return出去计算之后的值
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    //控制时间选择器打开关闭
    const [datevisible, setdateVisible] = useState(false)

    // 控制时间显示
    const [currentDate, setcurrentDate] = useState(() => {
        //初始值
        return dayjs(new Date()).format('YYYY-MM')
    })
    //当前月份的账单列表
    const [currentMonthList, setcurrentMonthList] = useState([])

    const overview = useMemo(() => {
        if (!currentMonthList) return { income: 0, pay: 0, total: 0 }
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((pre, cur) => pre + cur.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((pre, cur) => pre + cur.money, 0)
        const total = income + pay
        return {
            pay,
            income,
            total
        }
    },[currentMonthList])

    //用useeffect监听，然后读取当前的月份数据，然后过滤得到当前页的数据，渲染即可
    useEffect(() => {
        const list = monthGroup[dayjs().format('YYYY-MM')]
        if(list){
        setcurrentMonthList(list)
        }
        }, [monthGroup])

    //日分组数据
    const dayGroup = useMemo(() => {
        const group = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(group)
        //return出去计算之后的值
        return {
            keys,
            group
        }}, [currentMonthList])
    console.log(dayGroup)

    

    //时间选择框确定事件
    const dateConfirm = (date) => {
        setdateVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setcurrentDate(formatDate)
        setcurrentMonthList(monthGroup[formatDate])
        console.log(currentMonthList)
    }
    //时间选择框取消事件
    const dateCancel = () => {
        setdateVisible(false)
    }

    
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setdateVisible(true)}>
            <span className="text">
              {currentDate + ''}月账单
            </span>
            <span className={classNames('arrow', datevisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{overview.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overview.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overview.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={datevisible}
            onCancel={dateCancel}
            onConfirm={dateConfirm}
            //蒙层点击关闭事件
            onClose = {() => setdateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {dayGroup.keys.map(key => (
                    <DailyBill key={key} date={key} dailyBillList={dayGroup.group[key]} />
                ))}
      </div>
    </div >
  )
}

export default Month