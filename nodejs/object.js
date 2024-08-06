
var member = ['fender','squire','ephiphone'];
var i = 0;
while(i < member.length){
    console.log(member[i]);
    i = i + 1;
}

var product = {
    'telecaster' : 'fender',
    'ES-335' : 'Gibson',
    'Staratocaster' : 'squire'
}

for (var guitar in product){
    console.log(guitar, product[guitar]);
}
console.log(product.telecaster);

