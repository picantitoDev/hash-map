class HashMap {
  constructor() {
    this.loadFactor = 0.75
    this.capacity = 16
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
}
