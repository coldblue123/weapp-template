import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/test'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['numA', 'numB', 'sum'],
    // 需要调用的action
    actions: ['handleUpdate']
  }
})
