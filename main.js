import HashSet from "./hashSet.js"
import HashMap from "./hashMap.js"

/* HASH MAP */
// Create a new HashMap instance
let test = new HashMap()

// Add key-value pairs to the HashMap
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
test.set("moon", "silver")

// Test inserting the same key again (it should overwrite the value)
test.set("moon", "silver")

// Output all key-value pairs in the map
console.log("All keys:", test.keys()) // Should display an array of all keys
console.log("All values:", test.values()) // Should display an array of all values
console.log("Size of the map:", test.length()) // Should return the number of elements

// Test the get() method
console.log("Value for 'apple':", test.get("apple")) // Should return 'red'
console.log("Value for 'moon':", test.get("moon")) // Should return 'silver'

// Test the has() method
console.log("Does the map contain 'banana'?", test.has("banana")) // Should return true
console.log("Does the map contain 'orange'?", test.has("orange")) // Should return false

// Test remove() method
console.log("Removing 'dog':", test.remove("dog")) // Should return true
console.log("Size after removing 'dog':", test.length()) // Should decrease size by 1
console.log("Value for 'dog' after removal:", test.get("dog")) // Should return null

// Test clear() method
test.clear()
console.log("Size after clearing:", test.length()) // Should return 0

/* HASH SET */
const hashSet = new HashSet()

// Test adding values
hashSet.add("apple")
hashSet.add("banana")
hashSet.add("orange")
console.log("After adding values:")
console.log(hashSet.values()) // Should show ['apple', 'banana', 'orange']

// Test adding duplicate value
hashSet.add("apple")
console.log("After adding duplicate value (apple):")
console.log(hashSet.values()) // Should still show ['apple', 'banana', 'orange']

// Test contains method
console.log("Contains apple?", hashSet.contains("apple")) // Should return true
console.log("Contains grape?", hashSet.contains("grape")) // Should return false

// Test removing value
hashSet.remove("banana")
console.log("After removing banana:")
console.log(hashSet.values()) // Should show ['apple', 'orange']

// Test removing a non-existent value
hashSet.remove("grape")
console.log("After trying to remove non-existent grape:")
console.log(hashSet.values()) // Should still show ['apple', 'orange']

// Test size of the set
console.log("Size of the set:", hashSet.length()) // Should return 2

// Test clear method
hashSet.clear()
console.log("After clearing the set:")
console.log(hashSet.values()) // Should show an empty array []

// Test rehashing and growth by adding more values than the load factor
for (let i = 0; i < 20; i++) {
  hashSet.add("item" + i)
}
console.log("After adding more than the load factor (20 items):")
console.log(hashSet.values()) // Should show 20 unique values
console.log("Size after adding 20 items:", hashSet.length()) // Should return 20
