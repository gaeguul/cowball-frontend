// prettier-ignore

import React, { useState, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';

import {
  API,
  LoadingPlaceholder,
  NumberPickerModal,
} from '../IngredientCommon';

const editableCategory = ['술'];

function IngredientRow({ ingredient, category, scheduleItem, requireRefresh }) {
  let rsvAmount, outAmount, inAmount;

  if (scheduleItem !== undefined) {
    if (scheduleItem.rsvAmount) rsvAmount = scheduleItem.rsvAmount;
    if (scheduleItem.outAmount) outAmount = scheduleItem.outAmount;
    if (scheduleItem.inAmount) inAmount = scheduleItem.inAmount;
  }

  const [inAmountEditDialog, setInAmountEditDialog] = useState(false);

  return (
    <>
      <NumberPickerModal
        active={inAmountEditDialog}
        onClose={() => setInAmountEditDialog(false)}
        title={`'${ingredient.ingredientName}' 입고 수량 추가`}
        onSave={async (value) => {
          await API.postIngredientInAmount(ingredient.ingredientId, value);
          await requireRefresh(ingredient.ingredientId);
          setInAmountEditDialog(false);
        }}
        value={0}
      />
      <tr>
        <td>{ingredient.ingredientName}</td>
        <td>{category.categoryName}</td>
        <td className='td-amount'>{ingredient.stock}</td>
        <td className={rsvAmount ? 'td-rsv' : 'td-empty'}>
          <span>{rsvAmount}</span>
        </td>
        <td className={outAmount ? 'td-out' : 'td-empty'}>
          <span>{outAmount}</span>
        </td>
        {editableCategory.some((c) => c === category.categoryName) ? (
          <td
            className={inAmount ? 'td-editable td-in' : 'td-editable td-empty'}
            onClick={setInAmountEditDialog}
          >
            <span>
              {inAmount}
              <span className='icon-edit'>
                <BiEdit />
              </span>
            </span>
          </td>
        ) : (
          <td className={inAmount ? 'td-in' : 'td-empty'}>
            <span>{inAmount}</span>
          </td>
        )}
      </tr>
    </>
  );
}

export default function IngredientListTable() {
  const [loading, setLoading] = useState(true);

  const [ingredientList, setIngredientList] = useState([]);
  const [ingredientCategories, setIngredientCategories] = useState([]);
  const [todayIngredientSchedule, setTodayIngredientSchedule] = useState([]);

  useEffect(() => {
    Promise.all([
      API.getIngredientList().then(setIngredientList),
      API.getIngredientCategories().then(setIngredientCategories),
      API.getTodayIngredientSchedule().then(setTodayIngredientSchedule),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingPlaceholder />;

  return (
    <table className='ingredient-list-table'>
      <thead>
        <tr>
          <th>상품명</th>
          <th>카테고리</th>
          <th>현재 재고</th>
          <th>오늘 사용 예정</th>
          <th>오늘 사용</th>
          <th>오늘 입고</th>
        </tr>
      </thead>
      <tbody>
        {ingredientList.map((ingredient, index) => {
          const category = ingredientCategories.filter(
            (value) => value.categoryId === ingredient.categoryId,
          )[0];
          const schedule = todayIngredientSchedule.filter(
            (value) => value.ingredientId === ingredient.ingredientId,
          );
          const scheduleItem = schedule.length > 0 ? schedule[0] : undefined;

          return (
            <IngredientRow
              key={ingredient.ingredientId}
              ingredient={ingredient}
              category={category}
              scheduleItem={scheduleItem}
              requireRefresh={() => {
                API.getTodayIngredientSchedule().then(
                  setTodayIngredientSchedule,
                );
                API.getIngredient(ingredient.ingredientId)
                  .then((data) => data.stock)
                  .then((stock) => {
                    ingredientList[index].stock = stock;
                    console.log(stock, ingredientList[index]);
                    setIngredientList([...ingredientList]);
                  });
              }}
            />
          );
        })}
      </tbody>
    </table>
  );
}
