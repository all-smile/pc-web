import * as types from './mutation-types'
export const set_customerInfo = function ({ commit, state }) {
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        'customerName': '111'
      });
    }, 300)
  });
  promise1.then((data) => {
    commit(types.SET_CUSTOMERINFO, data)
  })
}
