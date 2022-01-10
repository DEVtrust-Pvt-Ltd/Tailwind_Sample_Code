import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApiService from '../../api';
import ButtonOutline from '../../components/buttonOutline/buttonOutline';
import profileImages from '../../assets/images/user.png';
import styles from '../profile/index.module.css';

/* eslint-disable */
export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const res = await ApiService.getOrders();
      console.log(res?.data);
      setOrders(res?.data?.data);
      return true;
    } catch (err) {
      console.log(err.message);
    }
  }



  const OrderTable = () => {
    
    return orders?.map((order, idx) => (
      <tr className="the-data-backgr" key={idx}>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-grey-500 order-date">
            {order.created_on}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left order-date">{order.event_name}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              {order.user_profile_image ? (
                <img
                  className="rounded-full"
                  src={order.user_profile_image}
                  width="40"
                  height="40"
                  alt={order.volunteer_name}
                  className={`${styles.profilepic}`}
                />
              ) : (
                <img
                  width={150}
                  src={profileImages}
                  className={`${styles.profilepic}`}
                />
              )}
            </div>
            <div className="font-normal volunteer-det">
              {order.volunteer_name}
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center order-date">
            ${order.total_price}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center order-date">
          {order.trn_status} 
          </div>
        </td>
      </tr>
    ));
  };
  
  
  return (
    <div className="flex flex-col pt-20 pb-20 pl-14 pr-14 justify-center">
      <div className="container mx-auto  bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 hadr-btnns text-center border-gray-100">
         <ButtonOutline
            type="button"
            text="Back"
            eventClick={() => history.push('/dashboard')}
            arrow="left"
            className=" buttonOutline_btn__3fZuR bntbck"
          />
          <h1 className="font-semibold mb-2 ordr-histry-detail">
            <span className="text-primary">Order</span> History
          </h1>

          <p className="w-8/12 m-auto	font-light srot-derc-order-hist">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mus
            eget eleifend cras nunc, tincidunt lorem ac. Natoque vitae
            pellentesque elit enim.
          </p>
        </header>
        <div className="p-3 pb-14">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-medium text-white head-oforder-tbl">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Order Date</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Event</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Volunteer</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Order Total</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Status</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                <OrderTable />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
