const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");
var rec;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(rec){
        clearTimeout(rec);
    }
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');    
    fetchPrice(ctype);


}); 

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    showPrice(r.data.coin);
     rec = setTimeout(() => fetchPrice(`https://api.cryptonator.com/api/ticker/${ctype}`), 10000);
}


const showPrice = (coinData)=>{
    const price = coinData.price;
    const vol = coinData.volume;
    const change = coinData.priceChange1d;
    const coin = coinData.name;
    const img = coinData.icon;
    const rank = coinData.rank;
    const mr = coinData.marketCap ;
    const curr = 'USD';
    var col= "green";
    if(change<0){
        col = "red";
    }
    res.innerHTML = `<tr  style="color: white; background-color:black;">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>${coin}<img src="${img}"/></td>
    <td style="color:${col};"><span style="font-size: 1.1em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>Rank(24hrs)</td>
    <td>${rank}</td>
</tr>
<tr>
    <td>Volume (24hrs)</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Market Cap (24hrs)</td>
    <td>${mr}</td>
</tr>
<tr>
    <td>Change (24hrs)</td>
    <td style="color:${col};">${change} ${curr}</td>
</tr>`;
};