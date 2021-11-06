import React, { Component } from 'react'
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import styles from "./product-post.module.css";
import Button from "react-bootstrap/Button";


const currencies = [
    {
      value: 'Sell',
      label: 'Sell',
    },
    {
      value: 'Exchange',
      label: 'Exchange',
    },
    {
      value: 'Both',
      label: 'Both',
    },
  ];

export default function ProductPost()  {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(''); 


}
        return (

            <Box
                sx={{
                    width: 960,
                    height: 650,
                    marginLeft: 85,
                    backgroundColor: 'white',
                    border: '1px solid black',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <h2 style={{textAlign: 'center', marginTop: '20px'}}>Upload Stuff Newfeed</h2>
                <form onSubmit={handleSubmit}> 
                <TextField id="outlined-basic" label="Name" variant="outlined" style={{ marginTop: '20px', width: '608px', marginLeft: '185px' }} color="secondary" />
                <TextField id="outlined-basic" label="Description" variant="outlined" style={{ marginTop: '20px', width: '608px', marginLeft: '185px' }}  color="secondary" />
                <TextField id="outlined-basic" type="number" label="Quantity" variant="outlined" style={{ marginTop: '20px', width: '608px', marginLeft: '185px' }}  color="secondary"  />
                <TextField id="outlined-basic" type="number" label="Price" variant="outlined" style={{ marginTop: '20px', width: '608px', marginLeft: '185px' }} color="secondary"  />
                <TextField
                    id="outlined-select-currency"
                    select
                    variant="outlined" 
                    label="Status"
                    value={currency}
                    color="secondary"
                    onChange={handleChange}
                    helperText="Please select your status"
                    style={{ marginTop: '20px', width: '608px', marginLeft: '185px' }} 
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="outlined-basic" type="file" variant="outlined" style={{ marginTop: '20px', width: '612px', marginLeft: '180px' }} color="secondary"  />
                <Button className={styles.cartbtn} variant="primary" type="submit">
                  Upload
                </Button>
                </form>
            </Box>
        )
    }


