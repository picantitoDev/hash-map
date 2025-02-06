import LinkedList from "./linkedList.js"
export default class HashMap {
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
    if (index < 0 || index >= this.buckets.capacity) {
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
