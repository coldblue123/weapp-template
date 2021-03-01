import { observable, action } from 'mobx-miniprogram'
export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,
  // 计算属性
  get sum() {
    return this.numA + this.numB
  },
  // actions
  handleUpdate: action(function() {
    const sum = this.sum
    this.numA = this.numB
    this.numB = sum
  })

})
