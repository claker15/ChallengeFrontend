import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import Table from './components/table/table';
import Menu from './components/menu/menu';
import axios from 'axios';
import { Alert } from '@mui/material'


function App() {

  const [masterList, setMasterList] = React.useState<Order[]>([]);
  const [filteredList, setFilteredList] = React.useState<Order[]>([]);
  const [selectedList, setSelectedList] = React.useState<String[]>([]);
  const [error, setError] = React.useState(false);

  const getAllOrders = () => {
    axios.get('http://45.33.84.231/api/Orders')
    .then((res) => {
      if (res.status === 200) {
        setMasterList(res.data);
        setFilteredList(res.data);
      }
    })
    //need to handle error to show user something went wrong.
    .catch((error) => {
      setError(true)
    })
  }

  React.useEffect(() => {
    getAllOrders()
  }, []);

  const onFilterChange = (value: string) => {
    if (value === '') {
      getAllOrders();
      return;
    }
    axios.get(`http://45.33.84.231/api/Orders/ByType?type=${value}`)
    .then((res) => {
      if (res.status === 200) {
        setMasterList(res.data);
        setFilteredList(res.data);
      }
    })
    .catch((error) => {
      setError(true)
    })
  };

  const onSearchChange = (value: string) => {
    let filtered = masterList.filter((order: Order) => order.id.includes(value));
    setFilteredList(filtered);
  };

  const onSelectChange = (selected: String[]) => {
    setSelectedList(selected);
  }

  const onDeleteClick = () => {
    console.log(selectedList);
    if (selectedList.length === 0) {
      return
    }
    axios.post('http://45.33.84.231/api/Orders/Delete', selectedList)
    .then((res) => {
      if (res.status === 200) {
        getAllOrders();
      }
    })
    .catch((error) => {
      setError(true)
    })
  }

  return (
    <div className="App">
      <Nav></Nav>
      {/* This could be a dynamic string */}
      {error && <Alert severity='error' onClose={() => setError(false)}>Something went wrong. Please try again later</Alert>}
      <Menu onFilterChange={onFilterChange} onSearchChange={onSearchChange} onDeleteClick={onDeleteClick}></Menu>
      <Table rows={filteredList} onSelectChange={onSelectChange}></Table>
    </div>
  );
}

export default App;
