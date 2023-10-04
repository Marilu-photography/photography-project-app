import { useFormik } from "formik";
import { productSchema } from "../../utils/product.schema";
import { createProduct } from "../../services/ProductsServices";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useNavigate } from "react-router-dom";

const categories = ['Camera', 'Lens', 'Accessory'];

const initialValues = {
  name: "",
  price: "",
  image: '',
  description: "",
  category: "",
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
      formData.append('image', values.image);
      formData.append('description', values.description);
      formData.append('category', values.category);

      createProduct(formData)
        .then(response => {
          if (response) {
            console.log(response.data);
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
        <h1>Create Products</h1>
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
                {isSubmitting ? "Submitting..." : "Create Product"}
            </button>

            </form>

        </div>
        </>
    )
}

export default CreateProducts;