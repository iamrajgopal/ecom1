import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Container} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/slices/itemSlice";
import { Link } from "react-router-dom";
import Pagination1 from "./Pagination";
// import Search1 from "./Search";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Productlist() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let dispatch = useDispatch();

  let cartItem = useSelector((store) => store.item.cartItems) || [];

  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const productsToShow = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, endIndex);

 
  const totalPages = Math.ceil(products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).length / itemsPerPage);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1)
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 
  
  

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
    gettingProducts(currentPage);
  }, [currentPage,searchTerm]);

  const handleExpandClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
  {/* <Search1 handleChangeSearch={handleSearchChange} /> */}
      {productsToShow.map((item, index) => {
        const isItemInCart = cartItem.some(
          (cartItem) => cartItem.id === item.id
        );
        return (
          <Card
            sx={{
              width: "18rem",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              display: "flex",
            }}
            key={index}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <img
                    src={item.image}
                    style={{ objectFit: "contain" }}
                    alt=""
                  ></img>
                </Avatar>
              }
              title={item.title.substring(0, 25)}
            />
            <CardMedia
              component="img"
              sx={{ width: "10rem", height: "15rem", objectFit: "contain" }}
              image={item.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                category : {item.category.toUpperCase()}
              </Typography>
              <Typography sx={{ marginTop: ".5rem", marginBottom: "1rem" }}>
                Price : {item.price}
              </Typography>

              {isItemInCart ? (
                <Link to="/drawer">
                  <Button
                    variant="contained"
                  >
                    Go To Cart
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(addCartItems(item));
                  }}
                >
                  ADD TO CART
                </Button>
              )}
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedIndex === index}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedIndex === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph> Item description: {item.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    <Pagination1 onPageChange={handlePageChange} totalPages={totalPages} />
    </Container>
  );
}
