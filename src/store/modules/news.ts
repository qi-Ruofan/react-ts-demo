import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import http from '../../utils/http'

export interface Infos {
  [index: string]: unknown
}

export interface NewsState {
  info: Infos
}
const state: NewsState = {
  info: {}
}

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    info: {}
  } as NewsState,
  reducers: {
    updateInfo(state, action:PayloadAction<Infos[]>) {
      state.info = action
    }
  }
})
type NewsProps = {
  userid: string
}
// 异步方法
export const getRemind = createAsyncThunk('/news/getRemind', async (payload:NewsProps) => {
  const ret = await http.get('/news/remind', payload)
  return ret
})
export const putRemind = createAsyncThunk('/news/putRemind', async (payload:NewsProps) => {
  const ret = await http.put('/news/remind', payload)
  return ret
})

export const { updateInfo} = newsSlice.actions

export default newsSlice.reducer
