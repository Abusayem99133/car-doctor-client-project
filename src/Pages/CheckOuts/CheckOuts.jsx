import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import CheckOutes from "./CheckOutes";

const CheckOuts = () => {
  const { user } = useContext(AuthContext);
  const [checkouts, setCheckOuts] = useState([]);
  const url = `http://localhost:5000/checkOuts?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCheckOuts(data);
      });
  }, []);
  return (
    <div>
      <h2>Your CheckOut: {checkouts.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {checkouts?.map((checkout) => (
              <CheckOutes key={checkout._id} checkOut={checkout}></CheckOutes>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckOuts;
