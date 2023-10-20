import { useFormik } from "formik";
import { productSchema } from "../../utils/product.schema";
import { createProduct } from "../../services/ProductsServices";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useNavigate } from "react-router-dom";
import "./CreateProducts.css";

const categories = ['Camera', 'Lens', 'Accessory'];

const initialValues = {
  name: "",
  price: "",
  images: [],
  description: "",
  category: "",
  brand: "",
  model: "",
};

const CreateProducts = () => {
  const navigate = useNavigate();

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
    initialValues: initialValues,
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
      formData.append('brand', values.brand);
      formData.append('model', values.model);

      createProduct(formData)
        .then(response => {
          if (response) {
            handleNavigation();
          } else {
            console.error("Response or response.data is undefined");
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <>
    <div className="create-product-header">
      <h1 className="h1-create-product">Create Products</h1>
      <div className="">
        <form className="form-create" onSubmit={handleSubmit} encType="multipart/form-data">
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

              console.log(selectedFiles);

            }}
          />
          <InputGroup
           style={{ marginTop: '10px' }}
            label="Description"
            name="description"
            type="text"
            placeholder="Enter description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
          />
          <InputGroup
            label="Brand"
            name="brand"
            type="text"
            placeholder="Enter brand"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.brand && errors.brand}
          />
          <InputGroup
            label="Model"
            name="model"
            type="text"
            placeholder="Enter model"
            value={values.model}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.model && errors.model}
          />
          <label htmlFor="category" style={{ marginRight: '10px' }}>Category: </label>
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
          <button type="submit" className={`btn-create btn-${isSubmitting ? 'secondary' : 'btn-create'}`} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Product"}
          </button>

        </form>

      </div>
    </div>
    </>
  )
}

export default CreateProducts;