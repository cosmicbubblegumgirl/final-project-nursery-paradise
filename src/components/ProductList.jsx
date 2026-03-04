import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../CartSlice.jsx';
import { plantsData, categoryOrder } from '../data/plantsData.js';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plantsByCategory = useMemo(() => {
    return categoryOrder.map((category) => ({
      category,
      plants: plantsData.filter((plant) => plant.category === category),
    }));
  }, []);

  return (
    <main className="page-shell">
      <section className="page-intro">
        <p className="eyebrow">Plant Listing</p>
        <h2>Choose your next leafy little treasure</h2>
        <p>
          Browse our handpicked nursery collection. Every plant card includes a thumbnail, name, price, and quick add-to-cart action.
        </p>
      </section>

      {plantsByCategory.map(({ category, plants }) => (
        <section key={category} className="category-section">
          <div className="category-heading">
            <h3>{category}</h3>
            <span>{plants.length} plants</span>
          </div>

          <div className="product-grid">
            {plants.map((plant) => {
              const alreadyAdded = Boolean(cartItems[plant.id]);

              return (
                <article key={plant.id} className="product-card">
                  <img src={plant.image} alt={plant.name} className="product-image" />
                  <div className="product-copy">
                    <h4>{plant.name}</h4>
                    <p>{plant.description}</p>
                    <div className="product-meta">
                      <strong>R{plant.price.toFixed(2)}</strong>
                      <button
                        type="button"
                        onClick={() => dispatch(addToCart(plant))}
                        disabled={alreadyAdded}
                      >
                        {alreadyAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
};

export default ProductList;
