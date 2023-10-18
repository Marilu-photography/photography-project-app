
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { productSchema } from "../../utils/product.schema";
import { editProduct, getProductDetails, getProductList } from "../../services/ProductsServices";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useNavigate, useParams } from "react-router-dom";
import { Trash3 } from "react-bootstrap-icons";


const categories = ["Camera", "Lens", "Accessory"];

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  const handleNavigation = () => {
    navigate(-1);
  };

  useEffect(() => {
    getProductList()
      .then((products) => {
        const productToEdit = products.find(product => product._id === productId);
        setProduct(productToEdit);
        setImages(productToEdit.images);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }
    , []);

    const handleDelete = (image) => {
      const filteredImages = images.filter((img) => img !== image);
      setImages(filteredImages);
    }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      price: "",
      images: [],
      description: "",
      category: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: productSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);

      for (let i = 0; i < values.images.length; i++) {
        formData.append(`images`, values.images[i]);
      }
      formData.append('description', values.description);
      formData.append('category', values.category);

      editProduct(productId, formData)
        .then((response) => {
          if (response) {
            console.log(response);
            handleNavigation();
          } else {
            console.error("Response or response.data is undefined");
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    if (productId) {
      setIsEditing(true);
      getProductDetails(productId)
        .then((response) => {
          if (response) {
            const { name, price, images, description, category } = response;
            setFieldValue("name", name);
            setFieldValue("price", price);
            setFieldValue("images", images);
            setFieldValue("description", description);
            setFieldValue("category", category);
          } else {
            console.error("La respuesta o response.data está indefinida");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productId, setFieldValue, setIsEditing]);

  return (
    <>
      <h1>{isEditing ? "Edit Product" : "Create Product"}</h1>
      <div className="create-Product">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <InputGroup
            label="Name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
          <InputGroup
            label="Price"
            name="price"
            type="number"
            placeholder="Enter price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && errors.price}
          />
          <input
            label="Images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);
              setFieldValue("images", values.images.concat(selectedFiles));


            }}
          />
          <div>
            {product && images.map((image, index) => (
              <div key={index}>
              <img src={image} alt={image.name} style={{ width: "100px" }} />
                <button
                  type="button"
                  className="delete-btn mb-3"
                  data-mdb-ripple-color="dark"
                  onClick={() => handleDelete(image)}
                >
                  <Trash3 style={{ color: 'red' }} />
                </button></div>
            ))
            }
          </div>

          <InputGroup
            label="Description"
            name="description"
            type="text"
            placeholder="Enter description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.category}
          >
            <option value="" label="Select a category" />
            {categories.map((category) => (
              <option key={category} value={category} label={category} />
            ))}
          </select>
          {touched.category && errors.category && (
            <div style={{ color: 'red' }}>{errors.category}</div>
          )}
          <button type="submit" className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Edit Product"}
          </button>

        </form>
      </div>
    </>
  );
};

export default EditProduct;