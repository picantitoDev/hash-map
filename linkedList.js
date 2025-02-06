export default class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  append(key, value) {
    if (this.size === 0) {
      let newNode = new Node(key, value)
      this.head = newNode
      this.tail = newNode
    } else {
      let newNode = new Node(key, value)
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size++
  }

  contains(key) {
    if (this.size === 0) {
      return false
    }

    let current = this.head // at (0)
    while (current) {
      if (current.key === key) {
        return true
      }
      current = current.next
    }
    return false
  }

  at(key) {
    let current = this.head
    while (current) {
      if (current.key === key) {
        return current
      }
      current = current.next
    }
    return null
  }

  remove(key) {
    let current = this.head

    if (!this.contains(key) || this.size === 0) {
      return false
    }

    if (current.key === key) {
      //eliminate head
      this.head = current.next
      this.size--
      return true
    }

    while (current) {
      if (current.next === null) {
        this.pop() // if it's at the last position
        this.size--
        return true
      }

      if (current.next.key === key) {
        current.next = current.next.next
        this.size--
        return true
      }
      current = current.next
    }
    return false
  }

  size() {
    return this.size
  }
  pop() {
    if (this.size === 0) {
      return
    }

    if (this.size === 1) {
      this.head = null
      this.tail = null
      return
    }

    let newTail = this.at(this.size - 2)
    if (newTail) {
      this.tail = secondToLast
      this.tail.next = null
    }

    this.size--
    return
  }

  clear() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  getKeys() {
    if (this.size === 0) {
      return null
    }

    let keys = []
    let current = this.head
    while (current) {
      keys.push(current.key)
      current = current.next
    }
    return keys
  }

  getValues() {
    if (this.size === 0) {
      return null
    }

    let values = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }
    return values
  }
}

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}
