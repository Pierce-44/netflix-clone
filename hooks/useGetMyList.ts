import React from 'react';
import { RowData } from '../typings';

interface Props {
  setMyListData: React.Dispatch<React.SetStateAction<RowData>>;
}

export default function useGetMyList({ setMyListData }: Props) {
  React.useEffect(() => {
    // wait
  }, []);
}
