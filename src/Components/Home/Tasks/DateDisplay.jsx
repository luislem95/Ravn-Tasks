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

    let style2 = { color: '#da584b' }; // Define style2 fuera de las condiciones

    if (isToday(date)) {
      return {
        text: 'TODAY',
        style: { color: '#ffffff', background: '#94979A10', padding: '5px 15px',borderRadius:'5px' },
        style2: { color: '#ffffff' },
      };
    } else if (isYesterday(date)) {
      return {
        text: 'YESTERDAY',
        style: { color: '#da584b', background: '#da584b10', padding: '5px 15px',borderRadius:'5px' },
        style2,
      };
    } else if (differenceInDays > 2) {
      return {
        text: format(date, 'do MMMM, yyyy'),
        style: { color: '#da584b', background: '#da584b10', padding: '5px 15px',borderRadius:'5px' },
        style2,
      };
    } else {
      const formattedDay = format(date, 'do');
      const formattedMonth = format(date, 'MMMM');
      const formattedYear = format(date, 'yyyy');
      const formattedDate = `${formattedDay.replace(/\D/g, '')} ${formattedMonth}, ${formattedYear}`;
      return { text: formattedDate, style: { color: '#ffffff', background: '#94979A10', padding: '5px 15px',borderRadius:'5px' }, style2: { color: '#ffffff' }, };
    }
  };

  const { text, style, style2 } = formatDate(dueDate);

  return (
    <div className='flex' style={{ ...style }}>
      <svg className="w-6 h-6 mr-2" style={{ ...style2 }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      {text}
    </div>
  );
}
