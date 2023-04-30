import React from "react";
import { HiSearch } from "react-icons/hi";
import { TextInput, Button } from "flowbite-react";
import myordersStyles from "../styles/Myorders.module.css";
import {useRef} from "react";
import getTextCurrentLocale from "../utils/getTextCurrentLocale";

export default function MyOrdersSearch({ setSearchValue }){
  const searchValue = useRef("");

  const onChangeSearchHandler = (e) => {
    e.preventDefault();
    searchValue.current = e.target.value.toLowerCase();

    setSearchValue({value:searchValue.current, isCompleted:false});
  }

  const onClickSearchHandler = (e) => {
    e.preventDefault();
    setSearchValue({value:searchValue.current,isCompleted:true});
  }

  return (
    <div className={myordersStyles.searchBarContainer}>
      <div className={myordersStyles.searchBarTextInput}>
        <TextInput
          id="myordersSearch"
          type="text"
          icon={HiSearch}
          placeholder={getTextCurrentLocale('search_order')}
          onChange={onChangeSearchHandler}
        />
      </div>
      <div className={myordersStyles.searchBarButton}>
        <Button pill={true} onClick={onClickSearchHandler}>
          <HiSearch className="fill-white h-6 w-6" />
        </Button>
      </div>    
    </div>          
  )
}