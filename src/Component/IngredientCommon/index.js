import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import { BiX } from 'react-icons/bi';
import { createPortal } from 'react-dom';

import { format } from 'date-fns';

async function getAllItems(url) {
    let page = 1;
    let pageMax;

    const result = [];

    do {
        await axios.get(`${url}?page=${page}`)
            .then(res => res.data)
            .then(it => {
                if (pageMax === undefined) pageMax = it.pageMax;
                result.push(...it.items);
            })
            .catch(e => console.log(e));
    } while (++page <= pageMax)

    console.log(result);

    return result;
}

export const API = {
    getIngredientList: async () => getAllItems(`ingredients/items`),
    getIngredientCategories: async () => getAllItems(`ingredients/categories`),

    getTodayIngredientSchedule: async () => await axios.get(`ing-schedule`)
        .then(res => {
            console.log('Schedule', res.data);
            return res.data[0].items
        }),
    
    getIngredient: async (ingredientId) => await axios.get(`ingredients/items/${ingredientId}`).then(res => res.data),

    getIngredientSchedule: async (dateFrom, dateTo) => await axios.get(`ing-schedule?date_from=${format(dateFrom, 'yyyy-MM-dd')}&date_to=${format(dateTo, 'yyyy-MM-dd')}`)
        .then(res => res.data),

    postIngredientInAmount: async (ingredientId, amount) => await axios.post(`ingredients/stocks`, { 
        ingredientId: ingredientId, amount: amount
    }),

    putIngredientInAmount: async (ingredientId, amount) => await axios.put(`ingredients/stocks`, { 
        ingredientId: ingredientId, amount: amount
    }),
}

export function NumberPickerModal({ active, onClose, title, onSave, value }) {
    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (document) ref.current = document.body;
    }, []);

    if (!ref.current || !mounted || !active) return null;

    return createPortal(<NumberPickerModalContainer onClose={onClose} title={title} onSave={onSave} value={value} />, ref.current);
}

function NumberPickerModalContainer({ onClose, title, value, onSave }) {
    const input = useRef();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        input.current.value = value;
    }, []);

    return (
        <ModalContainer onClose={onClose}>
            <div className='number-picker-dialog'>
                <div className='dialog-top'>
                    <div className='dialog-title-container'>
                        <h2 className='dialog-title'>{title}</h2>
                    </div>
                    <a className='dialog-top-button-exit' onClick={onClose}>
                        <BiX />
                    </a>
                </div>
                <div className='dialog-body'>
                    <input type='number' ref={input} />
                </div>
                <div className='dialog-foot'>
                    <a className={`dialog-button-ok ${loading ? '--loading' : ''}`} onClick={() => {
                        setLoading(true);
                        (async () => {
                            await onSave(input.current.value)
                        })().finally(() => setLoading(false));
                    }}>저장</a>
                </div>
            </div>
        </ModalContainer>
    );
}

function ModalContainer({ children, onClose }) {
    return (
        <div className='h-modal-container'>
            <div className='h-modal-background' onClick={onClose} />
            {children}
        </div>
    );
}

export function LoadingPlaceholder() {
    return (
        <div className='h-loading-container'>
            <div className='h-loading-indicator'></div>
        </div>
    );
}