import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Gridtest() {
    const [products, setProducts] = useState([]);

    let gettingProducts = async () => {
        let data = await fetch("https://fakestoreapi.com/products");
        try {
          let Jsondata = await data.json();
          setProducts(Jsondata);
        } catch (error) {
          console.error("Error occurred while getting products:", error);
        }
      };
    
      useEffect(() => {
        gettingProducts();
      }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={{ xs: 5, md: 3 }} columns={{ xs:4, sm: 8, md: 12 }}>
        {products.map((item, index) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <Item>{item.id}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
 