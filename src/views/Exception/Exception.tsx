import React, {useState,useEffect} from 'react'
import styles from './Exception.module.scss'
import { Row, Col, Empty, Timeline, Card, Space, Button, Select } from 'antd'
import { toZero } from '../../utils/common'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store';
import { Link, useSearchParams } from 'react-router-dom'
import { getTimeAction,updateInfos } from '../../store/modules/signs'
import type { Infos } from '../../store/modules/signs';
import _ from 'lodash'

const date = new Date()
export default function Exception() {
  const [year, setYear] = useState(date.getFullYear())
  const [searchParams, setSearchParams] = useSearchParams()
  const signsInfos = useSelector((state: RootState) => state.signs.infos)
  const usersInfos = useSelector((state: RootState) => state.users.infos)
  const [month, setMonth] = useState( searchParams.get('month') ? Number(searchParams.get('month'))-1 : date.getMonth())
  const dispatch = useAppDispatch()

  // 初始数据获取
  useEffect(() => {
    if(_.isEmpty(signsInfos)) {
      dispatch(getTimeAction({userid: usersInfos._id as string})).then(res => {
        const { errcode, infos } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
        if(errcode === 0) {
          dispatch(updateInfos(infos as Infos))
        }
      })
    }
  }, [signsInfos,dispatch,usersInfos])

  const renderTime = (date: string) => {
    const ret = ((signsInfos.time as {[index: string]: unknown})[toZero(month+1)] as {[index: string]: unknown})[date];
    if( Array.isArray(ret) ){
      return ret.join('-');
    }
    else{
      return '暂无打卡记录';
    }
  }

  let details
  if(signsInfos.detail) {
    const detailMonth = (signsInfos.detail as {[index: string]: unknown})[toZero(month + 1)] as {[index: string]: string}
    details = Object.entries(detailMonth).filter(v => v[1] !== '正常出勤').sort()
  }

  
  const applyHandle = () => {
    
  }
  const handleChange = (value: number) => {
    setMonth(value)
    setSearchParams({month: String(value+1)})
  }
  const monthOptions = []
  for(let i = 0; i < 12; i++) {
    monthOptions.push(<Select.Option key={i} value={i}>{i+1}月</Select.Option>)
  }
  return (
    <div className={styles.exception} >
      <Row justify="space-between" align="middle">
        <Link to="/apply">
          <Button type="primary" onClick={applyHandle}>异常处理</Button>
        </Link>
        
        <Space>
          <Button>2022年</Button>
          <Select value={month} onChange={handleChange}>
              {monthOptions}
          </Select>
        </Space>
      </Row>
      <Row className={styles['exception-line']} gutter={20}>
        <Col span={12}>
          {
            details 
                ?   
                <Timeline>
                  {
                    details.map(v => {
                      return (
                        <Timeline.Item key={v[0]}>
                          <h3>{year}/{month+1}/{v[0]}</h3>
                          <Card className={styles['exception-card']}>
                            <Space>
                              <h4>{v[1]}</h4>
                              <p>{renderTime(v[0])}</p>
                            </Space>
                          </Card>
                        </Timeline.Item>
                      )
                    })
                  }
                 
                </Timeline>
                : 
                <Empty description="暂无申请审批" imageStyle={{height: 200}}/>
          }
          {/* {
            detailMonth.length as number === 0 ? (<Empty description="暂无申请审批" imageStyle={{height: 200}}/>) : (
              <Timeline>
                {
                  Object.entries(detailMonth).map((v) => <Timeline.Item key={v[0]} label={year + '/' + month + '/' + v[0]}>
                    <Card style={{ width: 300 }}>
                      <Space>
                        <h4>{ v[1] as string }</h4>
                        <p>考勤详情：{ renderTime(v[0]) }</p>
                      </Space>
                    </Card>
                  </Timeline.Item>)
                }
              </Timeline>
            )
          } */}
        </Col>
        <Col span={12}>
          {/* <Empty description="暂无申请审批" imageStyle={{height: 200}}/> */}
          <Timeline>
              <Timeline.Item>
                <h3>事假</h3>
                <Card className={styles['exception-card']}>
                  <h4>带审批</h4>
                  <p className={styles['exception-context']}>申请日期：2022-12-09</p>
                  <p className={styles['exception-context']}>申请详情 啊啊啊啊啊</p>
                </Card>
              </Timeline.Item>
              <Timeline.Item>
                <h3>2022/12/01</h3>
                <Card className={styles['exception-card']}>
                  <h4>带审批</h4>
                  <p className={styles['exception-context']}>申请日期：2022-12-09</p>
                  <p className={styles['exception-context']}>申请详情 啊啊啊啊啊</p>
                </Card>
              </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </div>
  )
}
