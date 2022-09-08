import React from 'react';
import { Input, Button, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl, Stack, Modal } from '@mui/material';
import axios from 'axios'


const AddModal = () => {

    const [custName, setCustName] = React.useState('');
    const [createdBy, setCreatedBy] = React.useState('');
    const [type, setType] = React.useState('');
    const [postError, setPostError] = React.useState(false);

    const handleCustNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        setPostError(false)
        setCustName(value);
    };
    const handleCreatedByChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        setPostError(false)
        setCreatedBy(value);
    };
    const handleOrderTypeChange = (event: SelectChangeEvent) => {
        let value = event.target.value;
        setPostError(false)
        setType(value); 
    };
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let newId = crypto.randomUUID();
        let order: Order = {
            id: newId,
            type: type,
            customerName: custName,
            createdDate: new Date(),
            createdbyUsername: createdBy
        };
       axios.post('http://45.33.84.231/api/Orders', order)
       .then((res) => {
            console.log(res)
          if (res.status === 200) {
            //running out of time. best way to pull data up for now.
            window.location.reload();
          }
       })
       .catch((error) => {
        console.log(error)
        setPostError(true);
       })
        
    };

    return(
        <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column"}} spacing={{ xs: 4}}>
                <h2>Add New Order</h2>
                <Input placeholder='Customer Name' onChange={handleCustNameChange} value={custName} error={custName === ''}></Input>
                <FormControl sx={{ m: 1, minWidth: 120 }} >   
                    <InputLabel id="dropdownLabel">Order Type</InputLabel>
                    <Select 
                    labelId="dropdownLabel"
                    label="OrderType"
                    variant='standard'
                    onChange={handleOrderTypeChange}
                    value={type}
                    error={type === ''}
                    >
                    <MenuItem value="Standard">Standard</MenuItem>
                    <MenuItem value="SaleOrder">Sale Order</MenuItem>
                    <MenuItem value="PurchaseOrder">Purchase Order</MenuItem>
                    <MenuItem value="TransferOrder">Transfer Order</MenuItem>
                    <MenuItem value="ReturnOrder">Return Order</MenuItem>   
                    </Select>
                </FormControl>
                <Input placeholder='Created By' onChange={handleCreatedByChange} value={createdBy} error={createdBy === ''}></Input>
                <Button type="submit">Add Order</Button>
                {postError && (<h3>There was an error adding order. Please try again later.</h3>)}
            </Stack>
        </form>
    )
}

export default AddModal;