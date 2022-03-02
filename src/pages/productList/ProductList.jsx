import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import ProductCard from "../../components/Productcard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { categoryFilter, getData } from "../../features/productFilterSlice";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
}));

export const ProductList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const { status, filteredList, categoryList } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getData());
    }
  }, [dispatch, status]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Header />
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">
          Category Filter
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={handleChange}
        >
          {categoryList.map((category) => (
            <MenuItem
              onClick={() => dispatch(categoryFilter(category.id))}
              value={10}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="product-list">
        <div className="products-menu">
          {filteredList.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
