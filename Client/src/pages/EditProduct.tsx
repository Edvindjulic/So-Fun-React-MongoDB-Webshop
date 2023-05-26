import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AdminForm from '../components/AdminForm';
import { Product, useProduct } from '../contexts/ProductContext';

export default function EditProduct() {
  const params = useParams();
  const { product, updateProduct } = useProduct();

  const selectedProduct = product.find(chosen => chosen._id === params.id) as Product;

  const handleSubmit = (updatedProduct: Product) => {
    if (params?.id) {
      updateProduct(params.id, updatedProduct);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Typography variant='h4' sx={{ marginBottom: '1rem' }}>
        Redigera produkt
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <AdminForm product={selectedProduct} isNewProduct={false} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}
