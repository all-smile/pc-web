// eventBus
import { ArraySpliceOne } from './utils'

function EventBus() {
  this._events = {}
}

EventBus.prototype.on = function (type, fn, ctx = this) {
  if (!this._events[type]) {
    this._events[type] = []
  }
  this._events[type].push([fn, ctx])
}

EventBus.prototype.once = function (type, fn, ctx = this) {
  function magic() {
    this.off(type, magic)
    fn.apply(ctx, arguments)
  }
  magic.fn = fn
  this.on(type, magic)
}

EventBus.prototype.off = function (type, fn) {
  let _events = this._events[type]
  if (!_events) {
    return
  }
  if (!fn) {
    this._events[type] = null
    return
  }
  let count = _events.length
  while (count--) {
    if (_events[count][0] === fn || (_events[count][0] && _events[count][0].fn === fn)) {
      ArraySpliceOne(_events, count)
    }
  }
}

EventBus.prototype.emit = function (type) {
  let events = this._events[type]
  if (!events) { return }

  let len = events.length
  let copyEvents = [...events]
  for (let i = 0; i < len; i++) {
    let event = copyEvents[i]
    let [fn, ctx] = event
    if (fn) {
      fn.apply(ctx, [].slice.call(arguments, 1))
    }
  }
}

EventBus.prototype.offAll = function () {
  this._events = {}
}
export default new EventBus()
