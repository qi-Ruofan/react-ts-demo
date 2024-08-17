import React, { useState, useEffect }  from 'react'
import styles from './Apply.module.scss'
import { Button, Space, Input, Divider, Radio, Table, Modal, Form, Select, DatePicker, Row, message } from 'antd'
import type { RadioChangeEvent } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store';
import { getApplyList, updateApplyList, postApply } from '../../store/modules/checks'
import type { Infos } from '../../store/modules/checks';
import _ from 'lodash'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const columns:ColumnsType<Infos> = [
  { title: '申请人', key: 'applicantname',dataIndex: 'applicantname', width: 180},
  { title: '审批事由', key: 'reason', dataIndex:'reason', width: 180},
  { title: '时间', key: 'time', dataIndex: 'time', render(_) {
    return _.join(' - ')
  }},
  { title: '备注', key: 'note', dataIndex: 'note' },
  { title: '审批人', key: 'approvername', dataIndex: 'approvername', width: 180},
  { title: '状态', key: 'state', dataIndex: 'state', width: 180},
]
interface PropsType {
  open: boolean
  closeApply: Function
  submitApply: Function
}
interface FormInfos {
  approvername: string
  note: string
  reason: string
  time: [string, string]
  applicantid: string
  applicantname: string
  approverid: string
}
/**
 * 添加审核——弹框
 * @param props 
 * @returns 
 */
function AddApplyDialog(props:PropsType) {
  const {open, closeApply, submitApply} = props
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const usersInfos = useSelector((state: RootState) => state.users.infos)
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  useEffect(() => {
    handleReset()
  }, [open])
  const handleCancel = () => {
    closeApply()
  }
  const handleReset = () => {
    console.log('充值')
    form.resetFields()
  }
  const onFinish = (values: FormInfos) => {
    // 格式化日期
    values.time[0] = dayjs(values.time[0]).format('YYYY-MM-DD hh:mm:ss')
    values.time[1] = dayjs(values.time[1]).format('YYYY-MM-DD hh:mm:ss')

    const applyList = {
      ...values,
      applicantid: usersInfos._id,
      applicantname: usersInfos.name,
      approverid: Array.isArray(usersInfos.approver) && usersInfos.approver.find((item) => item.name === values.approvername)._id
    }
    submitApply(applyList, handleReset)
  }
  const onFinishFailed = () => {

  }
  return (
    <Modal
      title="添加审批"
      open={open}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <Form 
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className={styles['apply-form']}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="审批人" name="approvername" rules={[{ required: true, message: '请选择审批人' }]} required>
          <Select placeholder="请选择审批人" allowClear>
            {
              Array.isArray(usersInfos.approver) && usersInfos.approver.map((item) => <Select.Option key={item._id} value={item.name} >{item.name}</Select.Option>)
            }
            {/* <el-option v-for="item in approver" :key="item._id" :label="item.name" :value="item.name" /> */}
          </Select>
        </Form.Item>
        <Form.Item label="审批事由" name="reason" rules={[{ required: true, message: '请选择审批事由' }]} required>
          <Select v-model="formData.reason" placeholder="请选择审批事由" allowClear options={[
            {
              value: '年假',
              label: '年假',
            },
            {
              value: '事假',
              label: '事假',
            },
            {
              value: '病假',
              label: '病假',
            },
            {
              value: '外出',
              label: '外出',
            },
            {
              value: '补签卡',
              label: '补签卡',
            }
          ]}>
          </Select>
        </Form.Item>
        <Form.Item label="时间" name="time" rules={[{ required: true, message: '请选择审批时间' }]} required>
        <RangePicker showTime format={dateFormat} locale={locale}/>
        </Form.Item>
        <Form.Item label="备注" name="note" rules={[{ required: true, message: '请填写备注' }]} required>
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          {/* <Input v-model="formData.note" type="textarea" /> */}
        </Form.Item>
        <Row justify="end">
          <Space>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Space>
        </Row>
      </Form>
    </Modal>
  )
}



export default function Apply() {
  const [searchWord, setSearchWord] = useState('')
  const [open, setOpen] = useState(false);
  const [approverVal, setApproverVal] = useState('全部')
  const usersInfos = useSelector((state: RootState) => state.users.infos)
  const applyList = useSelector((state:RootState) => state.checks.applyList).filter(v => (v.state === approverVal || approverVal === '全部') && (v.note as string).includes(searchWord))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(_.isEmpty(applyList)) {
      dispatch(getApplyList({applicantid: usersInfos._id as string})).then(res => {
        const { errcode, rets } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
        if(errcode === 0) {
          dispatch(updateApplyList(rets as Infos[]))
          // setApplyList(rets as Infos[])
        }
      })
    }
  }, [applyList, dispatch, usersInfos])

  // 切换状态
  const approverTypeChange = (e: RadioChangeEvent) => {
    setApproverVal(e.target.value)
    console.log(e.target.value)
  }

  // 搜索关键词
  const searchWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }
  const submitApply = (value: FormInfos, fn: Function) => {
    dispatch(postApply(value)).then(res => {
      const { errcode, rets } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
      if(errcode === 0) {
        message.success('提交成功')
        setOpen(false)
        fn()
        dispatch(getApplyList({applicantid: usersInfos._id as string})).then(res => {
          const { errcode, rets } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
          if(errcode === 0) {
            dispatch(updateApplyList(rets as Infos[]))
          }
        })
      } else {
        message.error('提交失败')
      }
    })
  }
  // 添加审核弹框显示
  const handleAdd = () => {
    setOpen(true)
  }
  // 添加审核弹框关闭
  const closeApplyDialog = () => {
    setOpen(false)
  }
  return (
    <div>
       <div className={styles['apply-title']}>
          <Button type="primary" onClick={handleAdd}>添加审批</Button>
          <Space>
            <Input placeholder="请输入搜索关键词" value={searchWord} onChange={searchWordChange}></Input>
            <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
            <Divider type="vertical"></Divider>
            <Radio.Group defaultValue="全部" size="middle" buttonStyle="solid" onChange={approverTypeChange}>
              <Radio.Button value="全部">全部</Radio.Button>
              <Radio.Button value="待审批">待审批</Radio.Button>
              <Radio.Button value="已通过">已通过</Radio.Button>
              <Radio.Button value="未通过">未通过</Radio.Button>
            </Radio.Group>
          </Space>
        </div>
        <div className={styles['apply-table']}>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={applyList}
            bordered
            size='small'
            pagination={{defaultPageSize: 5}}
          />
        </div>
        <AddApplyDialog open={open} closeApply={closeApplyDialog} submitApply={submitApply} />
    </div>
  )
}
