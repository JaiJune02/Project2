import { useState, useEffect } from "react";

function CustomerList() {
  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customers, setCustomers] = useState([]);

  // Load all customers on page load
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const res = await fetch("http://localhost:3000/api/customers");
    const data = await res.json();
    setCustomers(data);
  };

  const handleSearch = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customers?customerCode=${customerCode}&customerName=${customerName}`
    );
    const data = await res.json();
    setCustomers(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Customer Master</h3>

      <div>
        Customer Code :
        <input
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
        />

        Customer Name :
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <br />

      <table border="1" width="50%">
        <thead>
          <tr>
            <th>Customer Code</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, index) => (
            <tr key={index}>
              <td>{c.CustomerCode}</td>
              <td>{c.CustomerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>  
  );
}

export default CustomerList;
