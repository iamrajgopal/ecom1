import React from "react";
import {Card,CardHeader,Avatar,ButtonBase} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton,Button } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deleteCartItem,quantityIncrement,quantityDecrement } from "../redux/slices/itemSlice";
import { useDispatch,useSelector } from "react-redux";

const Cartitems = ({ title, image, price,value}) => {
  let dispatch = useDispatch();
  let quan = useSelector((store)=>store.item.cartItems[value].quantity)
  return (
    <Card sx={{border:'1px solid gray',mb:2}}>
       <CardHeader
          avatar={
            
            <ButtonBase sx={{ width: 30, height: 30 }}>
           <img src={image} style={{objectFit:'contain',height:'30px',width:'30px',flexGrow:1}} alt=''></img>
          </ButtonBase>
          }
         
          title={title.substring(0,25)}
        />

      <CardContent sx={{ flex: "10 auto" }}>
        <Box>
          <IconButton sx={{ float: "right" }} onClick={()=>dispatch(deleteCartItem(value))}>
            <Delete ></Delete>
          </IconButton>
        </Box>
        {/* <Typography variant="h6">{title}</Typography> */}
        <Typography variant="body1">Price: ${price}</Typography>
        <Box sx={{display:"flex",justifyContent:'center',flexDirection:'row',alignItems:'center',flexGrow:'1',marginTop:'1rem'}}>
          <Button variant="contained" onClick={()=>dispatch(quantityIncrement(value))}>+</Button>
          <span style={{margin:'0px 8px 0px 8px'}}>Quantity:{quan}</span>
          <Button variant="contained" onClick={()=>dispatch(quantityDecrement(value))}>-</Button>
        </Box>
        <Box>
          <Typography sx={{marginTop:'1rem'}}> Total Price: {(quan*price).toFixed(2)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cartitems;


