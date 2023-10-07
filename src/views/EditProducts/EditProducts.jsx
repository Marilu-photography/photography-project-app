
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { productSchema } from "../../utils/product.schema";
import { editProduct, getProductDetails } from "../../services/ProductsServices";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useNavigate, useParams } from "react-router-dom";

const categories = ["Camera", "Lens", "Accessory"];

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const handleNavigation = () => {
    navigate("/");
  };

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
      image: "",
      description: "",
      category: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: productSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("image", values.image);
      formData.append("description", values.description);
      formData.append("category", values.category);

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
            const { name, price, image, description, category } = response;
            setFieldValue("name", name);
            setFieldValue("price", price);
            setFieldValue("image", image);
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
                <InputGroup
                    label="Image"
                    id="image"
                    name="image"
                    type="file"
                    placeholder="Enter image"
                    onChange={(e) => {
                        setFieldValue('image', e.target.files[0]);
                    }}
                    onBlur={handleBlur}
                    error={touched.image && errors.image}
                />
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
                {isSubmitting ? "Submitting..." : "update Product"}
            </button>


        </form>
      </div>
    </>
  );
};

export default EditProduct;