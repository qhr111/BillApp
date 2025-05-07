import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icons'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billstore'
import { set } from 'lodash'
import dayjs from 'dayjs'


const New = () => {
  const navigate = useNavigate()

  const [datevisible, setdatevisible] = useState(false)

  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))


  // 1. 区分账单状态
  const [billType, setBillType] = useState('income')

  //2.收集账单类型
  const [useFor, setuseFor] = useState('')

  //3.收集账单金额
    const [Money, setMoney] = useState()
    const MoneyChange = (value) => {
        setMoney(value)
    }

    const dispatch = useDispatch()
    //4.收集表单
    const saveBill = () => {
        const data = {
            useFor:useFor,
            money: billType === 'pay' ? -Money : +Money,
            type:billType,
            data:new Date()
        }
        console.log(data)
        dispatch(addBillList(data))
    }

    const toCancel = () => {
        setdatevisible(false)
    }

    const toConfirm = (date) => {
        setDate(dayjs(date).format('YYYY-MM-DD'))
        setdatevisible(false)
    }

    const toClose = () => {
        setdatevisible(false)
    }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType==='pay'?'selected':'')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType==='income'?'selected':'')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setdatevisible(true)}>{date}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={datevisible}
                onConfirm={toConfirm}
                onClose={toClose}
                onCancel={toCancel}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={Money}
                onChange={MoneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}

                    >
                      <div className="icon" onClick={() => setuseFor(item.type)}>
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New