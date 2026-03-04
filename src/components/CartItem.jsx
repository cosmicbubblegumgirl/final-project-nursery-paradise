import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '../CartSlice.jsx';

const CartItem = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartCount);
  const totalCost = useSelector(selectCartTotal);

  return (
    <main className="page-shell">
      <section className="page-intro">
        <p className="eyebrow">Shopping Cart</p>
        <h2>Your plant basket</h2>
        <p>Review your nursery picks, adjust quantities, or remove items before checkout.</p>
      </section>

      <section className="cart-summary-card">
        <div>
          <span>Total plants</span>
          <strong>{totalItems}</strong>
        </div>
        <div>
          <span>Total amount</span>
          <strong>R{totalCost.toFixed(2)}</strong>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="empty-cart">
          <h3>Your cart is still waiting for its first plant.</h3>
          <p>Pop back to the collection and add something lovely.</p>
          <a href="#plants" className="secondary-link-button">
            Continue Shopping
          </a>
        </section>
      ) : (
        <>
          <section className="cart-list">
            {items.map((item) => (
              <article key={item.id} className="cart-card">
                <img src={item.image} alt={item.name} className="cart-image" />

                <div className="cart-copy">
                  <div>
                    <h3>{item.name}</h3>
                    <p>Unit price: R{item.price.toFixed(2)}</p>
                    <p className="line-total">Plant total: R{(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="cart-actions">
                    <div className="quantity-controls">
                      <button type="button" onClick={() => dispatch(decreaseQuantity(item.id))}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => dispatch(increaseQuantity(item.id))}>
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="checkout-panel">
            <a href="#plants" className="secondary-link-button">
              Continue Shopping
            </a>
            <button
              type="button"
              className="primary-button"
              onClick={() => window.alert('Checkout is coming soon. Your pixie-perfect order flow will bloom here shortly!')}
            >
              Checkout
            </button>
          </section>
        </>
      )}
    </main>
  );
};

export default CartItem;
