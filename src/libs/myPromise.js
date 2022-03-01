class MyPromise {
  static PENDING = "待定"
  static FULFILLED = "成功"
  static REJECTED = "拒绝"
  constructor(func) {
    this.result = null
    this.resolveCallback = []
    this.rejectCallback = []
    this.status = MyPromise.PENDING
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve(result) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.FULFILLED
        this.result = result
        this.resolveCallback.forEach((cb) => {
          cb(result)
        })
      }
    })
  }
  reject(result) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED
        this.result = result
        this.rejectCallback.forEach((cb) => {
          cb(result)
        })
      }
    })
  }
  then(onResolve, onReject) {
    if (this.status === MyPromise.PENDING) {
      this.resolveCallback.push(onResolve)
      this.rejectCallback.push(onReject)
    }
    if (this.status === MyPromise.FULFILLED) {
      setTimeout(() => {
        onResolve(this.result)
      })
    }
    if (this.status === MyPromise.REJECTED) {
      setTimeout(() => {
        onReject()
      })
    }
  }
}

var p = new MyPromise((resolve, reject) => {
  console.log(123);
  setTimeout(() => {
    resolve("一定")
    reject()
  })
})
p.then(
  res => {
    console.log(res);
  },
  res => {
    console.log(res.message);
  }
)