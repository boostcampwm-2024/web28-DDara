import React from 'react';
import { motion } from 'framer-motion';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { BOTTOM_SHEET_HEIGHT } from '@/component/bottomsheet/BottomSheetOption';

interface IBottomSheetProps {
  children: React.ReactNode;
}

export const BottomSheet = (props: IBottomSheetProps) => {
  const { sheet } = useBottomSheet();

  return (
    <motion.div
      ref={sheet}
      className="fixed left-0 right-0 top-[calc(100%-90px)] z-10 flex flex-col rounded-t-lg bg-gradient-to-b shadow-lg transition-transform duration-700"
      style={{ height: `${BOTTOM_SHEET_HEIGHT}px`, background: '#FEFEFEF2' }}
    >
      {props.children}
    </motion.div>
  );
};
