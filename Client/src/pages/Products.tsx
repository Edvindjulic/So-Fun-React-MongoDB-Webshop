import { Box, Button, Card, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import { useCart } from '../contexts/CartContext';
import { useProduct } from '../contexts/ProductContext';
import { CartItem } from '../data';

export default function Products() {
  const { product } = useProduct();
  const { addProduct } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<
    | {
        title: string;
        price: number;
        image: string;
      }
    | undefined
  >(undefined);

  const handleSnackbarClose = (
    event: React.SyntheticEvent<Element, Event> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const matches = useMediaQuery('(min-width:500px)');
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'primary.main',
        '& a': {
          color: 'black',
          textDecoration: 'none',
        },
      }}
    >
      {product.map(product => (
        <Card
          key={product.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1rem',

            maxHeight: matches ? '33rem' : 'none',
            justifyContent: 'center',
            height: '100%',
            width: matches ? '22rem' : '100%',
            backgroundColor: 'primary.main',
          }}
          data-cy='product'
        >
          <Link to={'/product/' + product.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '27rem',
                width: '22rem',
                overflow: 'hidden',
              }}
            >
              <img src={product.image} alt={product.title} width='100%' />
            </Box>
          </Link>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                margin: '1rem',
              }}
            >
              <Box>
                <Typography variant='h5' data-cy='product-title'>
                  {product.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant='subtitle2' data-cy='product-price'>
                  Pris {product.price} kr
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '1rem',
                marginTop: '2rem',
                width: '100%',
                height: '2rem',
              }}
            >
              <Button
                variant='contained'
                color='primary'
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'secondary.contrastText',
                  '&:hover': {
                    backgroundColor: 'secondary.light',
                  },
                }}
                data-cy='product-buy-button'
                onClick={() => {
                  addProduct(product as CartItem);
                  setSnackbarOpen(true);
                  setLastAddedProduct({
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  });
                }}
              >
                Lägg i kundvagnen
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
      <Snackbar
        data-cy='added-to-cart-toast'
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        lastAddedProduct={lastAddedProduct}
      />
    </Box>
  );
}
