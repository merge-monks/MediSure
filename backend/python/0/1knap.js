const items = [
    { value: 60, weight: 10 },
    { value: 100, weight: 20 },
    { value: 120, weight: 30 }
];
let capacity = 50;

// Sort items by value-to-weight ratio in descending order
items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

let totalValue = 0;

for (const item of items) {
    if (capacity >= item.weight) {
        capacity -= item.weight;
        totalValue += item.value;
    }
}

console.log("Approximate Maximum Value:", totalValue);