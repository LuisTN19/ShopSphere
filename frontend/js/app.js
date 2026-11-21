let products = [];
let active = 'All';
let cart = [];
const liked = new Set();

const API_URL = 'http://127.0.0.1:8000/api';
const money = n => '$' + Number(n).toFixed(2);

async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Error fetching products');
    products = await response.json();
    render();
    renderCart();
  } catch (error) {
    console.error(error);
    document.getElementById('products').innerHTML =
      '<p class="empty">Could not connect to the backend API. Make sure Laravel is running.</p>';
  }
}

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
    ? shown.map(p => `<article class="product"><div class="photo"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="badge">${p.tag}</span><button class="heart ${liked.has(p.id) ? 'liked' : ''}" data-like="${p.id}" aria-label="Toggle wishlist for ${p.name}">${liked.has(p.id) ? '♥' : '♡'}</button></div><div class="productbody"><small>${p.category} · ★ 4.8</small><h3>${p.name}</h3><div class="price">${money(p.price)} ${p.old ? `<del>${money(p.old)}</del>` : ''}</div><button class="add" data-add="${p.id}">Add to Bag +</button></div></article>`).join('')
    : '<p class="empty">No products found. Try another search.</p>';
}

function renderCart() {
  document.getElementById('cartCount').textContent = cart.length;
  document.getElementById('cartItems').innerHTML = cart.length
    ? cart.map((id, i) => {
        const p = products.find(p => p.id === id);
        if (!p) return '';
        return `<div class="cartrow"><span>${p.name}<br><b>${money(p.price)}</b></span><button data-remove="${i}">Remove</button></div>`;
      }).join('')
    : 'Your bag is empty. Add something you love!';
  document.getElementById('cartTotal').textContent = money(
    cart.reduce((sum, id) => {
      const p = products.find(item => item.id === id);
      return sum + (p ? Number(p.price) : 0);
    }, 0)
  );
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

loadProducts();