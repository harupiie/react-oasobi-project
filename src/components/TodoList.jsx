import React, { useState } from "react";
import '../TodoList.css';

export const TodoList = (props) => {
  const [incompleteTodoList, setIncompleteTodoList] = useState(['aaaa', 'bbbbb']);
  const [completeTodoList, setCompleteTodoList] = useState(['cccc', 'ddddd']);
  const [todoText, setTodoText] = useState('');

  // 入力されたテキストを検知
  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  // 追加ボタン押下時
  const onClickAdd = () => {
    addIncompleteTodo();
    setTodoText('');
  };

  // 削除ボタン押下時
  const onClickRemove = (i) => {
    removeIncompleteTodo(i);
  };

  // 完了ボタン押下時
  const onClickComplete = (i) => {
    addÇompleteTodo(i);
    removeIncompleteTodo(i);
  };

  // 戻すボタン押下時
  const onClickIncomplete = (i) => {
    addIncompleteTodo(i);
    removeCompleteTodo(i);
  };

  // 未完了リストへTODO追加
  const addIncompleteTodo = (i = null) => {
    if (i === null) {
      // 新規追加
      if (todoText === "") {
        return;
      }
      setIncompleteTodoList([...incompleteTodoList, todoText]);
    } else {
      // 完了から未完了へ戻す
      setIncompleteTodoList([...incompleteTodoList, completeTodoList[i]]);
    }
  };

  // 未完了リストからTODO削除
  const removeIncompleteTodo = (i) => {
    let arr = [...incompleteTodoList];
    arr.splice(i, 1);
    setIncompleteTodoList(arr);
  };

  // 完了リストへTODO追加
  const addÇompleteTodo = (i) => {
    setCompleteTodoList([...completeTodoList, incompleteTodoList[i]]);
  }

  // 完了リストからTODO削除
  const removeCompleteTodo = (i) => {
    let arr = [...completeTodoList];
    arr.splice(i, 1);
    setCompleteTodoList(arr);
  };

  return (
    <div className="container">
      {/* 入力エリア */}
      <div className="inputArea">
        <input type="text" placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>追加</button>
      </div>

      {/* 未完了エリア */}
      <div className="incompleteArea">
        <h2>未完了</h2>
        <ul>
          {incompleteTodoList.map((todoText, i) => {
            return (
              // 要素のループ表示時は, 仮想DOM向けにkeyが必須
              <li key={i}>
                <div>{todoText}</div>
                <button onClick={() => onClickComplete(i)}>完了</button>
                <button onClick={() => onClickRemove(i)}>削除</button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 完了エリア */}
      <div className="completeArea">
        <h2>完了</h2>
        <ul>
          {completeTodoList.map((todoText, i) => {
            return (
              <li key={i}>
                <div>{todoText}</div>
                <button onClick={() => onClickIncomplete(i)}>戻す</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}