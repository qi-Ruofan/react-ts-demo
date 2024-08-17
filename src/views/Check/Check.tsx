import React, { useState, useEffect }  from 'react'
import styles from './Check.module.scss'
import { Button, Space, Input, Divider, Radio, Table, Modal, Form, Select, DatePicker, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { RadioChangeEvent } from 'antd';
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store';
import { getApplyList, updateCheckList, putApply } from '../../store/modules/checks'
import type { Infos } from '../../store/modules/checks';
import _ from 'lodash'


export default function Check() {
  const [searchWord, setSearchWord] = useState('')
  const [checkVal, setCheckVal] = useState('全部')
  const checkList = useSelector((state:RootState) => state.checks.applyList).filter(v => (v.state === checkVal || checkVal === '全部') && (v.note as string).includes(searchWord))
  const dispatch = useAppDispatch()
  const usersInfos = useSelector((state: RootState) => state.users.infos)
  const handlePutApply = (_id: string, state:'已通过'|'未通过' ) => {
    return () => {
      dispatch(putApply({_id, state})).then(res => {
        const { errcode, rets } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
        if(errcode === 0) {
          message.success('审批成功')
          dispatch(getApplyList({applicantid: usersInfos._id as string})).then(res => {
            const { errcode, rets } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
            if(errcode === 0) {
              dispatch(updateCheckList(rets as Infos[]))
            }
          })
        }
      })
    }
  }
  const columns:ColumnsType<Infos> = [
    { title: '申请人', key: 'applicantname',dataIndex: 'applicantname',},
    { title: '审批事由', key: 'reason', dataIndex:'reason' },
    { title: '时间', key: 'time', dataIndex: 'time'},
    { title: '备注', key: 'note', dataIndex: 'note' },
    { title: '操作', key: 'action',     
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="circle" icon={<CheckOutlined />} size="small" style={{background: '#67c23a'}} onClick={handlePutApply(record._id as string, '已通过')}/>
          <Button type="primary" shape="circle" icon={<CloseOutlined />} danger size="small" onClick={handlePutApply(record._id as string, '未通过')}/>
        </Space>
      )
    },
    { title: '状态', key: 'state', dataIndex: 'state'  },
  ]
  useEffect(() => {
    if(_.isEmpty(checkList)) {
      console.log(123)
      dispatch(getApplyList({applicantid: usersInfos._id as string})).then(res => {
        const { errcode, rets } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
        if(errcode === 0) {
          dispatch(updateCheckList(rets as Infos[]))
          // setApplyList(rets as Infos[])
        }
      })
    }
  }, [checkList, dispatch, usersInfos])
  const checkTypeChange = (e: RadioChangeEvent) => {
    setCheckVal(e.target.value)
  }
  // 搜索关键词
  const searchWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }
  return (
    <div>
       <div className={styles['check-title']}>
          <Space>
            <Input placeholder="请输入搜索关键词" value={searchWord} onChange={searchWordChange}></Input>
            <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
            <Divider type="vertical"></Divider>
            <Radio.Group defaultValue="全部" size="middle" buttonStyle="solid" onChange={checkTypeChange}>
              <Radio.Button value="全部">全部</Radio.Button>
              <Radio.Button value="待审批">待审批</Radio.Button>
              <Radio.Button value="已通过">已通过</Radio.Button>
              <Radio.Button value="未通过">未通过</Radio.Button>
            </Radio.Group>
          </Space>
        </div>
        <div className={styles['check-table']}>
          <Table
            columns={columns}
            dataSource={checkList}
            bordered
            size='small'
          />
        </div>
    </div>
  )
}
