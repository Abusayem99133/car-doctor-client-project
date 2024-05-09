import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import CheckOutes from "./CheckOutes";
import axios from "axios";

const CheckOuts = () => {
  const { user } = useContext(AuthContext);
  const [checkouts, setCheckOuts] = useState([]);
  const url = `http://localhost:5000/checkOuts?email=${user?.email}`;
  useEffect(() => {
    axios.get(url, { withCredentials: true }).then((res) => {
      setCheckOuts(res.data);
    });
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setCheckOuts(data);
    // });
  }, [url]);
  const handleDelete = (id) => {
    const proceed = confirm("Are You sure you want to delete");
    if (proceed) {
      fetch(`http://localhost:5000/checkOuts/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successful");
            const remaining = checkouts.filter(
              (checkout) => checkout._id !== id
            );
            setCheckOuts(remaining);
          }
        });
    }
  };
  const handleCheckOutConfirm = (id) => {
    fetch(`http://localhost:5000/checkOuts/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = checkouts.filter((checkOut) => checkOut._id !== id);
          const updated = checkouts.find((checkOut) => checkOut._id === id);
          updated.status = "confirm";
          const newCheckOuts = [updated, ...remaining];
          setCheckOuts(newCheckOuts);
        }
      });
  };
  return (
    <div>
      <h2>Your CheckOut: {checkouts.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}

          <tbody>
            <thead>
              <tr>
                <th>Image</th>
                <th>Service</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            {checkouts?.map((checkout) => (
              <CheckOutes
                key={checkout._id}
                checkOut={checkout}
                handleDelete={handleDelete}
                handleCheckOutConfirm={handleCheckOutConfirm}
              ></CheckOutes>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckOuts;
