import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Details() {
  const [enquiries, setEnquiries] = useState<any[]>([])

  useEffect(() => {
  fetch('https://solarsonform-details.onrender.com/api/enquiries')
    .then(async (res) => {
      console.log('STATUS:', res.status)

      const text = await res.text()
      console.log('RAW RESPONSE:', text)

      try {
        const data = JSON.parse(text)
        setEnquiries(data)
      } catch (e) {
        console.error('Not JSON')
      }
    })
    .catch((err) => console.error(err))
}, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Saved Enquiries</h1>

      <Link to="/">⬅ Back to Form</Link>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: '100%',
          marginTop: '20px',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Bill</th>
            <th>Property</th>
            <th>District</th>
            <th>Call Slot</th>
          </tr>
        </thead>

        <tbody>
          {enquiries.map((item) => (
            <tr key={item.id}>
              <td>{item.customer_name}</td>
              <td>{item.phone_number}</td>
              <td>{item.power_bill}</td>
              <td>{item.property_type}</td>
              <td>{item.district}</td>
              <td>{item.call_slot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Details