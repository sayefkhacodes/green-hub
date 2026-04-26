import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    // Load from localStorage on first render
    try {
      const saved = localStorage.getItem('greenhub_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('greenhub_cart', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id)
      if (existing) {
        return current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        co2_saved_kg: product.co2_saved_kg,
        quantity: 1
      }]
    })
  }

  const removeItem = (productId) => {
    setItems(current => current.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    setItems(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  // Computed totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCO2 = items.reduce((sum, item) => sum + (item.co2_saved_kg || 0) * item.quantity, 0)

  const value = { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, totalCO2 }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}