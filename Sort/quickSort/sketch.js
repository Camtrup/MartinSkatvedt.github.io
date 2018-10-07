
function swap(items, firstIndex, secondIndex){
    let temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)],
        i     = left,
        j     = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

let tall = [4, 2, 1, 1, 1, 6, 5, 3, 9, 2, 4, 1, 7, 4234, 21, 12, 45];

let result = quickSort(tall, 0, tall.length - 1);
console.log(result);
