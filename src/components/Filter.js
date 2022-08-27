import React, {useState} from "react";
import { CartState } from "../Context/Context";
import './styles.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { Button } from "@mui/material";
import {Divider} from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';

const Filters = () => {

  const { productDispatch } = CartState();

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(0);

  const handleRadioChange = (event) => {
    setValue(event.target.value);

    if (value === "Ascending"){
      productDispatch({
        type: "SORT_BY_PRICE",
        payload: "lowToHigh",
      })
      
    }
    if (value === "Descending"){
      productDispatch({
        type: "SORT_BY_PRICE",
        payload: "highToLow",
      })
    }
  };

  const handleRating = (event, newValue) =>{
    setValue1(newValue);

    productDispatch({
      type: "FILTER_BY_RATING",
      payload: newValue,
    })
  };

  const handleDialog = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const clearFilter = () => {
      setValue('');
      setValue1(0);
      productDispatch({
        type: "CLEAR_FILTERS",
        payload: value,
    })
  }

  return (
    <div className="allFilters">
        <div className="drawer">
        <Button variant="text" color="warning" onClick={handleDialog}><SortIcon />Filters</Button>
          <Drawer
              anchor={'left'}
              open={open}
              onClose={handleClose}
            >
            <div className="title">Filter Products</div>
            <Divider sx={{marginTop: "20px"}} />
            <span>
              <form>
                <FormControl sx={{ my: 3, mx: 2 }} variant="standard">
                <Typography  component="legend">Sort Products</Typography>
                  <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="Descending" control={<Radio />} label="Ascending" />
                    <FormControlLabel value="Ascending" control={<Radio />} label="Descending" />
                  </RadioGroup>
                </FormControl>
              </form>
            </span>
            <span>
              <Typography sx={{ ml: 2 }} component="legend">By Rating</Typography>
              <Rating sx={{ ml: 2 }} 
                name="simple-controlled"
                value={value1}
                onChange={handleRating}
              />
            </span>
            <Button variant="contained" color="error" size="small" sx ={{maxWidth: "80%", marginTop: "20px", marginLeft: "15px"}} onClick={clearFilter}>Clear filters</Button>
          </Drawer>
        </div>
        <div className="filters">
          <span className="title">Filter Products</span>
          <span>
            <form>
              <FormControl sx={{ m: 3 }} variant="standard">
              <Typography  component="legend">Sort Products</Typography>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  name="quiz"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value="Descending" control={<Radio />} label="Ascending" />
                  <FormControlLabel value="Ascending" control={<Radio />} label="Descending" />
                </RadioGroup>
              </FormControl>
            </form>
          </span>
          <span>
            <Typography sx={{ ml: 3, mb: 1 }} component="legend">By Rating</Typography>
            <Rating sx={{ ml: 3, }} 
              name="simple-controlled"
              value={value1}
              onChange={handleRating}
            />
          </span>
          <Button variant="contained" color="error" onClick={clearFilter}>Clear filters</Button>
        </div>
    </div>
    
  );
};

export default Filters;
