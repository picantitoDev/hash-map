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
  }

  get(key) {
    let index = this.hash(key)
    let bucket = this.buckets[index] // We retrieve the correct bucket which we are consulting
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
    return bucket.contains(key)
  }

  remove(key) {
    let index = this.hash(key)
    let bucket = this.buckets[index]
    if (bucket.contains(key)) {
      this.size--
      return bucket.remove(key)
    }
    return false
  }
  length() {
    return this.size
  }
}

const table = new HashMap()
table.set("Piero", "Alcantara")
table.set("ASD", "Alcantara")
table.set("ADS", "Alcantara")
table.set("AVD", "Alcantara")
table.set("ACV", "Alcantara")

console.log(table.length())
table.set("Piero", "Albondiga")
console.log(table.length())
table.remove("Piero")
console.log(table.length())
