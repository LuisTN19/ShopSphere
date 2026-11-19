const products = [
  { id: 1, name: 'Everyday Canvas Tote', category: 'Fashion', price: 32, old: 45, img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=700&q=85', tag: 'BESTSELLER' },
  { id: 2, name: 'Wireless Studio Headphones', category: 'Electronics', price: 89, old: 119, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85', tag: 'HOT PICK' },
  { id: 3, name: 'Minimalist Gold Watch', category: 'Accessories', price: 74, old: 99, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85', tag: 'NEW' },
  { id: 4, name: 'Classic Everyday Sneakers', category: 'Fashion', price: 68, old: 90, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85', tag: 'POPULAR' },
  { id: 5, name: 'Modern Ceramic Vase', category: 'Lifestyle', price: 38, old: 50, img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=85', tag: 'NEW' },
  { id: 6, name: 'Retro Instant Camera', category: 'Electronics', price: 125, old: 149, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=85', tag: 'TRENDING' },
  { id: 7, name: 'Signature Sunglasses', category: 'Accessories', price: 46, old: 60, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85', tag: 'BESTSELLER' },
  { id: 8, name: 'Soft Knit Sweater', category: 'Fashion', price: 54, old: 72, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85', tag: 'COZY PICK' }
];

let active = 'All';
let cart = [];
const liked = new Set();

const money = n => '$' + n.toFixed(2);

function notify(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.display = 'block';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.style.display = 'none', 2600);
}

function render() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  const shown = products.filter(p => (active === 'All' || p.category === active) && (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  document.getElementById('products').innerHTML = shown.length
    ? shown.map(p => `<article class="product"><div class="photo"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="badge">${p.tag}</span><button class="heart ${liked.has(p.id) ? 'liked' : ''}" data-like="${p.id}" aria-label="Toggle wishlist for ${p.name}">${liked.has(p.id) ? '♥' : '♡'}</button></div><div class="productbody"><small>${p.category} · ★ 4.8</small><h3>${p.name}</h3><div class="price">${money(p.price)} <del>${money(p.old)}</del></div><button class="add" data-add="${p.id}">Add to Bag +</button></div></article>`).join('')
    : '<p class="empty">No products found. Try another search.</p>';
}

function renderCart() {
  document.getElementById('cartCount').textContent = cart.length;
  document.getElementById('cartItems').innerHTML = cart.length
    ? cart.map((id, i) => {
        const p = products.find(p => p.id === id);
        return `<div class="cartrow"><span>${p.name}<br><b>${money(p.price)}</b></span><button data-remove="${i}">Remove</button></div>`;
      }).join('')
    : 'Your bag is empty. Add something you love!';
  document.getElementById('cartTotal').textContent = money(cart.reduce((sum, id) => sum + products.find(p => p.id === id).price, 0));
}

document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('[data-filter]');
  if (!b) return;
  active = b.dataset.filter;
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('active', x === b));
  render();
});

document.querySelectorAll('.category').forEach(el => el.addEventListener('click', () => {
  active = el.dataset.category;
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('active', x.dataset.filter === active));
  render();
}));

document.getElementById('search').addEventListener('input', render);

document.getElementById('products').addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  const like = e.target.closest('[data-like]');
  if (add) {
    const id = Number(add.dataset.add);
    cart.push(id);
    renderCart();
    notify('Added to your bag! 🛍️');
  }
  if (like) {
    const id = Number(like.dataset.like);
    liked.has(id) ? liked.delete(id) : liked.add(id);
    render();
    notify(liked.has(id) ? 'Added to wishlist ♥' : 'Removed from wishlist');
  }
});

document.getElementById('cartToggle').onclick = () => document.getElementById('cartPanel').classList.add('open');
document.getElementById('closeCart').onclick = () => document.getElementById('cartPanel').classList.remove('open');

document.getElementById('cartItems').onclick = e => {
  const b = e.target.closest('[data-remove]');
  if (b) {
    cart.splice(Number(b.dataset.remove), 1);
    renderCart();
  }
};

document.getElementById('checkout').onclick = () => notify('Checkout is not connected yet — this is a frontend demo.');

document.getElementById('newsletter').onsubmit = e => {
  e.preventDefault();
  notify('Thanks! Newsletter signup is a demo.');
  e.target.reset();
};

render();
renderCart();