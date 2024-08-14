import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import http from '../../utils/http'

type Token = string
export type Infos = {
  [index:string]: unknown // 索引签名
}

export interface SignsState {
  infos: Infos
}

const signsSlice = createSlice({
  name: 'signs',
  initialState: {
    infos: {}
  } as SignsState,
  // 同步方法
  reducers: {
    updateInfos(state, action:PayloadAction<Infos>) {
      state.infos = action.payload
    }
  }
})

type TimeProps = {
  userid: string
}
// 异步方法
export const getTimeAction = createAsyncThunk('/signs/getTimeAction', async (payload: TimeProps) => {
  const ret = await http.get('/signs/time', payload)
  return ret
})
export const putTimeAction = createAsyncThunk('/signs/putTimeAction', async (payload: TimeProps) => {
  const ret = await http.put('/signs/time', payload)
  return ret
})


export const { updateInfos } = signsSlice.actions

export default signsSlice.reducer
