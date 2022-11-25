import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React from 'react';

import '../../scss/component/_toast.scss';

export function NewOrderToastContent({ order }) {
  return (
    <div className='toast-content toast-new-order'>
      <div className='toast-header'>
        <h2 className='toast-title'>새로운 주문</h2>
        <div className='text-rsv-date'>
          <span className='name'>예약일</span>
          {format(new Date(order.rsvDate), 'PPP (eee) p', { locale: ko })}
        </div>
      </div>
      <div className='toast-body'>
        <div className='order-dinners'>총 {order.orderDinners.length} 디너</div>
        <div className='order-address'>{order.deliveryAddress}</div>
      </div>
    </div>
  );
}
