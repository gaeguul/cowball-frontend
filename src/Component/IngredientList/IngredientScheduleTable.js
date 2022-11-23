/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { addDays, differenceInDays, format, subDays } from 'date-fns';

import { API, LoadingPlaceholder, NumberPickerModal } from '../IngredientCommon';

export default function IngredientScheduleTable() {
    const [loading, setLoading] = useState(true);

    const [days, setDays] = useState(7);

    const [ingredients, setIngredients] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const [todayIndex, setTodayIndex] = useState(-1);

    useEffect(() => {
        setLoading(true);

        const td = new Date();
        const from = subDays(td, parseInt(days / 2));
        const to = addDays(td, parseInt(days / 2));

        Promise.all([
            API.getIngredientList().then(setIngredients),
            API.getIngredientSchedule(from, to).then(setSchedule),
        ])

        .then(() => {
            const today = format(new Date(), 'yyyy-MM-dd');

            console.log('Schedules', schedule);
    
            schedule.forEach((col, index) => {
                if (col.date === today) setTodayIndex(index);
            });
        })

        .finally(() => setLoading(false));

    }, [days]);

    if (loading) return <LoadingPlaceholder />

    return (
        <table className='ingredient-schedule-table'>
            <thead>
                <tr>
                    <th rowSpan={2} colSpan={2}>재료</th>
                    {schedule && schedule.map((col, index) =>
                        <th colSpan={4} key={index} className={index === todayIndex ? 'th-today' : ''}>{
                            format(new Date(col.date), 'M/d (EEEEEE)')
                        }</th>
                    )}
                </tr>
                <tr>
                    {schedule.map((s, index) => {
                        const className = index === todayIndex ? 'th-today' : '';
                        return <>
                            <th className={className} key={index * 10}>예약</th>
                            <th className={className} key={index * 10 + 1}>입고</th>
                            <th className={className} key={index * 10 + 2}>출고</th>
                            <th className={className} key={index * 10 + 3}>주문</th>
                        </>;
                    }
                    )}
                </tr>
            </thead>
            <tbody>
                {ingredients && ingredients.map((ing, index) => {
                    const id = ing.ingredientId;
                    return (
                        <tr key={index}>
                            <td data-id={ing.ingredientId}>{ing.ingredientName}</td>
                            <td className='td-amount' onClick={() => { setNumberPickOpen(true) }}>{ing.stock}</td>
                            {schedule.map((s, index) => {
                                const itemQuery = s.items.filter((value, ix) => value.ingredientId === id);
                                const item = itemQuery.length > 0 ? itemQuery[0] : undefined;

                                const nums = [null, null, null, null];
                                if (item !== undefined) {
                                    if (item.rsvAmount) nums[0] = item.rsvAmount;
                                    if (item.inAmount) nums[1] = item.inAmount;
                                    if (item.outAmount) nums[2] = item.outAmount;
                                    if (item.orderAmount) nums[3] = item.orderAmount;
                                }
                                const classNames = ['td-rsv', 'td-in', 'td-out', 'td-order'];

                                return nums.map((num, i) =>
                                    <td key={i} className={num ? classNames[i] : 'td-empty'}>{num}</td>
                                );
                            }
                            )}
                        </tr>);
                }
                )}
            </tbody>
        </table>
    );
}