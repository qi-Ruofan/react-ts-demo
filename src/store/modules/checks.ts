import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import http from '../../utils/http'

export interface Infos {
  [index: string]: unknown
}

export interface ChecksState {
  applyList: Infos[],
  checkList: Infos[]
}

const checkSlice = createSlice({
  name: 'check',
  initialState: {
    applyList: [],
    checkList: []
  } as ChecksState,
  reducers: {
    updateApplyList(state, action:PayloadAction<Infos[]>) {
      state.applyList = action.payload
    },
    updateCheckList(state, action:PayloadAction<Infos[]>) {
      state.checkList = action.payload
    }
  }
})

type getApply = {
  applicantid?: string
  approverid?: string
}
type PostApply = {
  applicantid: string
  applicantname: string
  approverid: string
  note: string
  reason: string
  time: [string, string]
}
type PutApply = {
  _id: string
  state: '已通过' | '未通过'
}
// 异步方法
export const getApplyList = createAsyncThunk('/check/getApplyList', async (payload:getApply) => {
  const ret = await http.get('/checks/apply', payload)
  return ret
})
export const postApply = createAsyncThunk('/check/postApply', async (payload:PostApply) => {
  const ret = await http.post('checks/apply', payload)
  return ret
})
export const putApply = createAsyncThunk('/check/putApply', async (payload:PutApply) => {
  const ret = await http.put('checks/apply', payload)
  return ret
})

export const { updateApplyList, updateCheckList} = checkSlice.actions

export default checkSlice.reducer
