import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
import { billTypeToName } from '@/contants'
import { useState } from 'react'
import Icon from '@/components/Icons'

const DailyBill = ({date, dailyBillList}) => {
  console.log('dailyBillList', dailyBillList)
  const dailyOverview = useMemo(() => {
          if (!dailyBillList) return { income: 0, pay: 0, total: 0 }
          const pay = dailyBillList.filter(item => item.type === 'pay').reduce((pre, cur) => pre + cur.money, 0)
          const income = dailyBillList.filter(item => item.type === 'income').reduce((pre, cur) => pre + cur.money, 0)
          const total = income + pay
          return {
              pay,
              income,
              total
          }
      },[dailyBillList])

      //添加打开关闭逻辑
      const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyOverview.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dailyOverview.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dailyOverview.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{display: visible ? 'block' : 'none'}}>
        {dailyBillList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor}/>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill