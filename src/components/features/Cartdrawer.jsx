import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Cartitems from './Cartitems';
import {useSelector,useDispatch } from 'react-redux';
import {Typography } from '@mui/material';
import {fetchItems} from '../redux/slices/itemSlice'

export default function Cartdrawer() {
  let dispatch = useDispatch();

  const [state, setState] = React.useState({
    right: false,
  });

  let cartItem = useSelector((store)=>store.item.cartItems);
  const [items, setItems] = useState([]);
  
  // let prices = cartItem.price.reduce((acc,cur)=> acc + cur,0);

  let prices = cartItem.reduce((acc, cur) => acc + ((cur.price)*(cur.quantity)), 0);

  const handlingAsyncData = (items) =>{
    dispatch(fetchItems(items))
      }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if(open){
      handlingAsyncData(items);
     
    }
   
  };

  useEffect(() => {
    setItems(cartItem);
  }, [cartItem]);

  return (
    <div style={{display:'flex',gap:'30px'}}>
      
      <Button onClick={toggleDrawer('right', true)}>
      </Button>
      <Drawer
        anchor="right"
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <Typography sx={{textAlign:'center'}}>
          Cart Items Added
        </Typography>
        <Box sx={{ width: 300, padding: 2 }}>
          {/* Render CartItem component for each cart item */}
          {cartItem.map((item,index) => (
            <Cartitems
              key={item.id}
              title={item.title.substring(0,18)}
              image={item.image}
              price={item.price}
              value={index}
            />
          ))}
        </Box>
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <Typography>
          SubTotal : {prices.toFixed(2)}
        </Typography>
        <Button sx={{margin:'8px 0px 8px 0px'}} variant='contained'>Proceed To Pay</Button>
        </Box>
      </Drawer>
    </div>
  );
}

