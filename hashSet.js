export default class HashSet {
  constructor() {
    this.loadFactor = 0.75
    this.capacity = 16
    this.size = 0
    // Use an array of arrays to store elements
    this.buckets = new Array(this.capacity).fill(null).map(() => [])
  }

  hash(value) {
    let hashCode = 0

    const primeNumber = 31
    for (let i = 0; i < value.length; i++) {
      hashCode = (primeNumber * hashCode + value.charCodeAt(i)) % this.capacity
    }

    return hashCode
  }

  add(value) {
    let index = this.hash(value)
    let bucket = this.buckets[index]

    if (bucket.includes(value)) {
      // If the value already exists, we do nothing (no duplicates)
      return
    }

    bucket.push(value) // Add the value to the bucket (array)
    this.size++
    this.#grow() // Trigger resizing if necessary
  }

  contains(value) {
    let index = this.hash(value)
    let bucket = this.buckets[index]

    return bucket.includes(value) // Check if value exists in the bucket
  }

  remove(value) {
    let index = this.hash(value)
    let bucket = this.buckets[index]
    let valueIndex = bucket.indexOf(value)

    if (valueIndex !== -1) {
      // If the value exists, remove it
      bucket.splice(valueIndex, 1)
      this.size--
      return true
    }

    return false // Value not found
  }

  length() {
    return this.size
  }

  clear() {
    this.size = 0
    this.buckets.forEach((bucket) => (bucket.length = 0)) // Clear all buckets
  }

  values() {
    let values = []
    this.buckets.forEach((bucket) => values.push(...bucket)) // Combine all bucket arrays into one array
    return values
  }

  #grow() {
    if (this.size > this.loadFactor * this.capacity) {
      this.capacity = this.capacity * 2 // Double the capacity
      let newBuckets = new Array(this.capacity).fill(null).map(() => [])

      // Rehash existing values into new buckets
      for (let i = 0; i < this.buckets.length; i++) {
        let bucket = this.buckets[i]
        for (let value of bucket) {
          let newIndex = this.hash(value)
          newBuckets[newIndex].push(value) // Insert value into new bucket
        }
      }

      this.buckets = newBuckets // Update to the new buckets array
    }
  }
}
