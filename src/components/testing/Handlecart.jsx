// import { useDispatch, useSelector } from 'react-redux';
// import { addCartItems } from './path-to-itemSlice'; 

// export default function Handlecart() {
//   // ...

//   let dispatch = useDispatch();
//   let cartItems = useSelector((store) => store.item.cartItems);

//   const handleAddToCart = (item) => {
//     fetch('/api/addCartItem', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(item),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(addCartItems(item));
//         console.log('Item added to cart:', data);
//       })
//       .catch((error) => {
//         console.error('Error adding item to cart:', error);
//       });
//   };

//   return (
//     // ...
//     {products.map((item, index) => {
//       const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

//       return (
//         <Card key={index}>
//           {/* ... Rest of the card content ... */}
//           {isItemInCart ? (
//             <Button variant='contained'>Go To Cart</Button>
//           ) : (
//             <Button variant='contained' onClick={() => handleAddToCart(item)}>
//               Add To Cart
//             </Button>
//           )}
//         </Card>
//       );
//     })}
//     // ...
//   );
// } 