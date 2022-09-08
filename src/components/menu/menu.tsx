import React  from 'react';
import { Box, Input, Button, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl, Stack, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddModal from '../addModal/modal';

const Menu = (props: menuProps) => {

    //todo: add new order model

    const [filterType, setFilterType] = React.useState('');
    const [searchString, setSearchString] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const handleModelOpen = () => setOpen(true);
    const handleModelClose = () => setOpen(false);

    const handleFilterTypeChange = (event: SelectChangeEvent) => {
        let value = event.target.value;
        setFilterType(value);
        props.onFilterChange(value);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = event.target.value;
        props.onSearchChange(value);
        setSearchString(value);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return(
        <Stack direction={{ xs: "column", sm: "row"}} spacing={{ xs: 1, sm: 4}} sx={{ marginTop: '15px', marginBottom: '15px' }}>
            <Input id="textSearch" placeholder='Search by Order Id' onChange={handleSearchChange} value={searchString}></Input>
            <Button className="menuButton" variant='contained' size='small' onClick={handleModelOpen}><AddIcon />Create Order</Button>
            <Button className="menuButton" variant='contained' size='small' onClick={() => props.onDeleteClick()}><DeleteIcon/>Delete Selected</Button>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" margin='dense'>   
                <InputLabel id="dropdownLabel">Order Type</InputLabel>
                <Select 
                labelId="dropdownLabel"
                label="OrderType"
                value={filterType}
                onChange={handleFilterTypeChange}
                className="menuSelect"
                >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="SaleOrder">Sale Order</MenuItem>
                <MenuItem value="PurchaseOrder">Purchase Order</MenuItem>
                <MenuItem value="TransferOrder">Transfer Order</MenuItem>
                <MenuItem value="ReturnOrder">Return Order</MenuItem>   
                </Select>
            </FormControl>
            <Modal open={open}
                onClose={handleModelClose}
            >
                <Box sx={style}>
                    <AddModal></AddModal>
                </Box>
            </Modal>
        </Stack>
    )

}

export default Menu