const products = [
  { name: '冰霸杯', price: 57.6 },
  { name: '餐盘', price: 32.6 },
  { name: '百贴布', price: 32.6 },
  { name: '毛毡板', price: 37.6 },
  { name: '手提箱', price: 47.6 },
  { name: '丝巾', price: 17.6 },
  { name: '脏衣篓', price: 42.6 },
  { name: '雨伞', price: 47.6 },
  { name: '地垫', price: 45.6 },
  { name: '便签本', price: 9.9 },
  { name: '毛绒吧唧', price: 9.9 },
  { name: '卡砖', price: 17.6 },
  { name: '门挂', price: 23.6 },
  { name: '摇摇乐', price: 7.6 },
  { name: '编织袋2.0', price: 32.6 },
  { name: '擦手巾', price: 27.6 },
  { name: '鼠标垫栗梓', price: 17.6 },
  { name: '鼠标垫草莓梓', price: 17.6 },
  { name: '鼠标垫蓝莓梓', price: 17.6 },
  { name: '大头帆布包', price: 37.6 },
  { name: '随身镜草莓梓', price: 17.6 },
  { name: '随身镜栗梓', price: 17.6 },
  { name: '随身镜蓝莓梓', price: 17.6 },
  { name: '带刀墩', price: 37.6 },
  { name: '呆瓜墩', price: 27.6 }
].map((item) => ({ ...item, qty: 0 }));

const productList = document.querySelector('#product-list');
const selectedTypes = document.querySelector('#selected-types');
const selectedCount = document.querySelector('#selected-count');
const totalPrice = document.querySelector('#total-price');
const clearBtn = document.querySelector('#clear-btn');

const money = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
});

function updateSummary() {
  const types = products.filter((item) => item.qty > 0).length;
  const count = products.reduce((sum, item) => sum + item.qty, 0);
  const total = products.reduce((sum, item) => sum + item.price * item.qty, 0);

  selectedTypes.textContent = String(types);
  selectedCount.textContent = String(count);
  totalPrice.textContent = money.format(total);
}

function changeQty(index, delta) {
  const target = products[index];
  target.qty = Math.max(0, target.qty + delta);
  document.querySelector(`[data-qty-index="${index}"]`).textContent = String(target.qty);
  updateSummary();
}

function renderProducts() {
  const cards = products
    .map(
      (item, index) => `
      <article class="card">
        <h2>${item.name}</h2>
        <p class="price">${money.format(item.price)}</p>
        <div class="controls">
          <button type="button" data-action="dec" data-index="${index}" aria-label="减少 ${item.name}">-</button>
          <span class="qty" data-qty-index="${index}">0</span>
          <button type="button" data-action="inc" data-index="${index}" aria-label="增加 ${item.name}">+</button>
        </div>
      </article>
    `
    )
    .join('');

  productList.innerHTML = cards;
}

productList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }

  const index = Number(button.dataset.index);
  const delta = button.dataset.action === 'inc' ? 1 : -1;
  changeQty(index, delta);
});

clearBtn.addEventListener('click', () => {
  products.forEach((item, index) => {
    item.qty = 0;
    document.querySelector(`[data-qty-index="${index}"]`).textContent = '0';
  });
  updateSummary();
});

renderProducts();
updateSummary();
