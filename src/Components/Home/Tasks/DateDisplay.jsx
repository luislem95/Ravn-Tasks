import React from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

export default function DateDisplay({ dueDate }) {
  const formatDate = (dueDate) => {
    if (!dueDate) {
      return null;
    }
    const date = parseISO(dueDate);
    const today = new Date();
    const differenceInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    if (isToday(date)) {
      return {
        text: 'TODAY',
        style: { color: '#da584b' },
      };
    } else if (isYesterday(date)) {
      return {
        text: 'YESTERDAY',
        style: {  color: '#da584b' },
      };
    } else if (differenceInDays > 2) {
      return {
        text: format(date, 'do MMMM, yyyy'),
        style: {  color: '#da584b' },
      };
    } else {
      const formattedDay = format(date, 'do');
      const formattedMonth = format(date, 'MMMM');
      const formattedYear = format(date, 'yyyy');
      const formattedDate = `${formattedDay.replace(/\D/g, '')} ${formattedMonth}, ${formattedYear}`;
      return { text: formattedDate, style: { color: '#da584b' } }; // Cambiado aquí
    }
  };

  const { text, style } = formatDate(dueDate);

  return <div className='flex' style={{ ...style }}>{text}</div>;
}
