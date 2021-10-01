import { toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'
const STORAGE_KEY = 'NEXT_ECOMMERCE_STARTER_'

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0
}

const SiteContext = React.createContext()

export const calculateTotal = (cart) => {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

export const addToCart = async (cartItem) => {
  const input = {
    id: cartItem.id,
    name: cartItem.name, 
    image: cartItem.image,
    price: cartItem.price,
    quantity: cartItem.quantity
  }
  const result = await axios.post(
    "/.netlify/functions/myStore",
    JSON.stringify(input),
    {
      headers: {
        fieldName: "addProductToCart",
      },
    }
  )

  // console.log(result.data.data);
  toast("Successfully added item to cart!", {
    position: toast.POSITION.TOP_LEFT
  })
}

export const getItemsInCart = async() => {
  const result = await axios.get("/.netlify/functions/myStore", {
    headers: {
      "fieldName": "getProductsInCart"
    }
  })

  // console.log(result.data);
  return result.data;
}

export const removeFromCart = async (cartItemId) => {
  await axios.post(
    "/.netlify/functions/myStore",
    JSON.stringify({ id: cartItemId }),
    {
      headers: {
        fieldName: "removeProductFromCart",
      },
    }
  )
}

export const setItemQuantity = async (cartItem) => {
  await axios.post(
    "/.netlify/functions/myStore",
    JSON.stringify(cartItem),
    {
      headers: {
        fieldName: "updateCartProductQuantity",
      },
    }
  )
}

class ContextProviderComponent extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
  }

  // setItemQuantity = (item) => {
  //   const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  //   const { cart } = storageState
  //   const index = cart.findIndex(cartItem => cartItem.id === item.id)
  //   cart[index].quantity = item.quantity
  //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
  //     cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
  //   }))
  //   this.forceUpdate()
  // }

  // addToCart = item => {
  //   const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  //   const { cart } = storageState
  //   if (cart.length) {
  //     const index = cart.findIndex(cartItem => cartItem.id === item.id)
  //     if (index >= Number(0)) {
  //       /* If this item is already in the cart, update the quantity */
  //       cart[index].quantity = cart[index].quantity + item.quantity
  //     } else {
  //       /* If this item is not yet in the cart, add it */
  //       cart.push(item)
  //     }
  //   } else {
  //     /* If no items in the cart, add the first item. */
  //     cart.push(item)
  //   }

  //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
  //     cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
  //   }))
  //   toast("Successfully added item to cart!", {
  //     position: toast.POSITION.TOP_LEFT
  //   })
  //   this.forceUpdate()
  // }

  // removeFromCart = (item) => {
  //   const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  //   let { cart } = storageState
  //   cart = cart.filter(c => c.id !== item.id)

  //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
  //     cart, numberOfItemsInCart: cart.length, total: calculateTotal(cart)
  //   }))
  //   this.forceUpdate()
  // }

  clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    this.forceUpdate()
  }

  render() {
    let state = initialState
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        state = JSON.parse(storageState)
      }
    }

    return (
      <SiteContext.Provider value={{
        ...state,
        //  addToCart: this.addToCart,
         clearCart: this.clearCart,
        //  removeFromCart: this.removeFromCart,
        //  setItemQuantity: this.setItemQuantity
      }}>
       {this.props.children}
     </SiteContext.Provider>
    )
  }
}

export {
  SiteContext,
  ContextProviderComponent
}