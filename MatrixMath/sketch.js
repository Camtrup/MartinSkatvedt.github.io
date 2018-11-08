
a = new matrix(3,2);
b = new matrix(2,3);
a.random();
b.random();
let c = b.transpose();
let d = a.add(b);

console.table(a.matrix);
console.table(b.matrix);
console.table(c.matrix);
console.table(a.matrix);
