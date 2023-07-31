import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  count: 10,
  cartItems: [],
  notes: [],
};


const fetchItemsFromAPI = async (item) => {
  let dataToAttach = new FormData();
  dataToAttach.append('cartItems',item);
  console.log(dataToAttach)
 
  try {
    let reqoptions ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:dataToAttach
      
    }
    const response = await fetch('http://localhost:3197/updatingCart',reqoptions);
    if (!response.ok) {
      throw new Error('Failed to fetch items from the server');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching items:', error.message);
  }
};

export const fetchItems = createAsyncThunk('cartSlice/fetchItems', async (item) => {
  const response = await fetchItemsFromAPI(item);
  return response;
});


export const itemSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    addCartItems: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: 1
      };
      state.cartItems.push(newItem);
    },
    deleteCartItem: (state, action) => {
      const index = action.payload;
      state.cartItems.splice(index, 1);
    },
    addNotes: (state, action) => {
      state.notes.push(action.payload);
    },
    quantityIncrement: (state, action) => {
      const index = action.payload;
      state.cartItems[index].quantity += 1;
    },
    quantityDecrement: (state, action) => {
      const index = action.payload;
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
      }
    },
    totalPrice: (state) => {
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        // Handle loading state if needed
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        // Add fetched items to state
        return action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        // Handle error state if needed
      });
  }
});




export const {
  increment,
  addCartItems,
  deleteCartItem,
  addNotes,
  quantityIncrement,
  quantityDecrement,
  totalPrice,
} = itemSlice.actions;

export default itemSlice.reducer;