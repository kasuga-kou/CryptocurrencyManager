
import { reducerWithInitialState } from 'typescript-fsa-reducers';

/* すべてのActionをインポート */
import * as actions from './action';

/* tasks[] 配列に格納するオブジェクトの型を定義する */
interface ILocal {
  isLoading: boolean;
}

/* Storeの型を定義する。 */
export interface ILocalState {
  local?: ILocal;
}

/* 初期状態のStoreのデータを定義する */
export const initialLocalState: ILocalState = {
  local:
    {
      isLoading:false
    },
};



/* Taskを作成する。ILocalという指定された型を返す。 */
const showLoading = (isShow: boolean): ILocal => ({
  isLoading:isShow
})
//   this.showLoading
// )

/*
    addTodoというActionを待ち受けるとともに初期状態のStoreをセットする。
    addTodoが飛んできた場合には、新しいTaskをStoreに格納して、Storeを更新する。
 */
export default reducerWithInitialState(initialLocalState)
  .case(actions.setShowLoading, (state: ILocalState, payload ) => ({
    ...state,
    local: showLoading(payload)
  }))
  .build();
