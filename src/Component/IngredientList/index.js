import React, { useState } from 'react';

//import { format } from 'date-fns';
//import { BiPlus, BiMinus } from 'react-icons/bi';

import IngredientListTable from './IngredientListTable';
import IngredientScheduleTable from './IngredientScheduleTable';

const tabs = ['재료 목록', '재료 스케줄'];

export default function IngredientList() {

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className='nexttonav'>
            <div className='ingredientlist-container'>
                <div className='title-container'>
                    <div className='title-main'>
                        재고 현황
                    </div>
                    <div className='title-detail'>
                        현재 재고 현황을 간단하게 보여줍니다.<br />
                        술 상품은 입고 수량을 직접 변경할 수 있습니다.
                    </div>
                </div>
                <div className='content-container'>
                    <div className='content-tab'>
                        {tabs.map((tab, index) =>
                            <label key={index}>
                                <input
                                    type='radio'
                                    name='tab'
                                    value={index}
                                    checked={tabIndex === index}
                                    onClick={() => setTabIndex(index)} />
                                <span>{tab}</span>
                            </label>
                        )}
                    </div>
                    <div className='content-body'>
                        {tabIndex === 0
                            ? <IngredientListTable />
                            : <IngredientScheduleTable />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}