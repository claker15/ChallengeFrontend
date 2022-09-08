import React from 'react';
import './App.css';
import Nav from './components/nav/nav';
import Table from './components/table/table';
import Menu from './components/menu/menu';
import axios from 'axios';



function App() {

  const [masterList, setMasterList] = React.useState<Order[]>([]);
  const [filteredList, setFilteredList] = React.useState<Order[]>([]);
  const [selectedList, setSelectedList] = React.useState<String[]>([]);

  const getAllOrders = () => {
    axios.get('https://45.33.84.231/api/Orders')
    .then((res) => {
      if (res.status === 200) {
        setMasterList(res.data);
        setFilteredList(res.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  React.useEffect(() => {
    getAllOrders()
  }, []);

  ///todo: add new entry function

  const onFilterChange = (value: string) => {
    if (value === '') {
      getAllOrders();
      return;
    }
    //make call to database for order type
    axios.get(`http://45.33.84.231/api/Orders/ByType?type=${value}`)
    .then((res) => {
      if (res.status === 200) {
        setMasterList(res.data);
        setFilteredList(res.data);
      }
    })
    .catch((error) => {
      console.log(error)
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
    //remove from database
    axios.post('http://45.33.84.231/api/Orders/Delete', selectedList)
    .then((res) => {
      if (res.status === 200) {
        getAllOrders();
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <Nav></Nav>
      <Menu onFilterChange={onFilterChange} onSearchChange={onSearchChange} onDeleteClick={onDeleteClick}></Menu>
      <Table rows={filteredList} onSelectChange={onSelectChange}></Table>
    </div>
  );
}

export default App;
