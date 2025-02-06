class LinkedList {
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

class HashMap {
  constructor() {
    this.loadFactor = 0.75
    this.capacity = 16
    this.size = 0
    // We do need that our buckets array uses a new LinkedList for every new key,value pair
    // This is going to help us on dealing with collisions on the large run
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList())
  }

  hash(key) {
    let hashCode = 0

    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      // We operate everytime because using the previous hashCode value and using modulo % we are ensuring that
      // our function returns a hashCode in a valid range of the capacity of the table

      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
    }

    return hashCode
  }

  set(key, value) {
    let index = this.hash(key)
    let bucket = this.buckets[index]

    if (index < 0 || index >= this.buckets.capacity) {
      throw new Error("Trying to access index out of bounds")
    }
    // If a key already exists
    if (bucket.contains(key)) {
      // Then the old value is overwritten
      bucket.at(key).value = value
      return // And we should terminate our operations
    }

    //Recall that collisions occur when TWO DIFFERENT keys generate
    // the same hash code and get assigned to the same bucket.
    bucket.append(key, value) // Since we are using linked lists, then appending handles it
    this.size++
    this.#grow()
  }

  get(key) {
    let index = this.hash(key)
    let bucket = this.buckets[index] // We retrieve the correct bucket which we are consulting
    if (index < 0 || index >= this.buckets.capacity) {
      throw new Error("Trying to access index out of bounds")
    }
    if (bucket.contains(key)) {
      //If the key exists then its value exists
      return bucket.at(key).value // return the value
    } else {
      return null // return null otherwise
    }
  }

  has(key) {
    let index = this.hash(key)
    let bucket = this.buckets[index] // We retrieve the correct bucket which we are consulting
    if (index < 0 || index >= this.buckets.capacity) {
      throw new Error("Trying to access index out of bounds")
    }
    return bucket.contains(key)
  }

  remove(key) {
    let index = this.hash(key)
    let bucket = this.buckets[index]
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds")
    }
    if (bucket.contains(key)) {
      this.size--
      return bucket.remove(key)
    }
    return false
  }

  length() {
    return this.size
  }

  clear() {
    this.size = 0
    this.buckets.forEach((bucket) => bucket.clear())
  }

  keys() {
    let keys = []
    this.buckets.forEach((bucket) => (keys = keys.concat(bucket.getKeys())))
    let isNotNull = (value) => value != null
    return keys.filter(isNotNull)
  }

  values() {
    let values = []
    this.buckets.forEach(
      (bucket) => (values = values.concat(bucket.getValues()))
    )
    let isNotNull = (value) => value != null
    return values.filter(isNotNull)
  }

  entries() {
    let entries = []
    let keys = []
    let values = []

    this.buckets.forEach((bucket) => (keys = keys.concat(bucket.getKeys())))
    this.buckets.forEach(
      (bucket) => (values = values.concat(bucket.getValues()))
    )

    let isNotNull = (value) => value != null
    keys = keys.filter(isNotNull)
    values = values.filter(isNotNull)

    for (let i = 0; i < this.size; i++) {
      entries.push([keys[i], values[i]])
    }
    return entries
  }

  #grow() {
    if (this.size > this.loadFactor * this.capacity) {
      // If we overflow the load factor of entries
      this.capacity = this.capacity * 2 // Double the capacity
      let newBuckets = new Array(this.capacity) // Create a new array of linked lists with the doubled capacity
        .fill(null)
        .map(() => new LinkedList())

      for (let i = 0; i < this.buckets.length; i++) {
        // Iterate over the old length of buckets
        if (this.buckets[i].size > 0) {
          // If not null then
          let current = this.buckets[i].head // get current node
          while (current) {
            let newIndex = this.hash(current.key) // Rehash the index
            newBuckets[newIndex].append(current.key, current.value) // Append the rehashed pair
            current = current.next // Update current
          }
        }
      }
      this.buckets = newBuckets // Update this.buckets
    }
  }
}

const test = new HashMap()
test.set("apple", "red")
test.set("banana", "yellow")
test.set("carrot", "orange")
test.set("dog", "brown")
test.set("elephant", "gray")
test.set("frog", "green")
test.set("grape", "purple")
test.set("hat", "black")
test.set("ice cream", "white")
test.set("jacket", "blue")
test.set("kite", "pink")
test.set("lion", "golden")
test.set("lion", "yellow")
console.log(test)
test.set("moon", "silver")
console.log(test)
