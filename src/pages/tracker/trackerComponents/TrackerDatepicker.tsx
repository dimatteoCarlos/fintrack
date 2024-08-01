//TrackerDatePicker.tsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//---

import { showDate } from '../../../helpers/functions';

// import es  from 'date-fns/locale/es';
// import { registerLocale } from 'react-datepicker';
// registerLocale('es', es, );

//-------

// Define el tipo para el estado del componente
interface DatePickerProps {
  date: Date;
  changeDate: (selectedDate: Date) => void;
}

function TrackerDatepicker({ date = new Date(), changeDate }: DatePickerProps) {
  // Estado para manejar la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<Date>(date);

  // Maneja el cambio de fecha
  const dateChangeHandler = (date: Date) => {
    setSelectedDate(date);
    changeDate(date);
    showDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(selectedDate) => dateChangeHandler(selectedDate!)}
      placeholderText='DD/MM/YYYY'
      dateFormat='dd/MMM/YYY'
      className='tracker__datepicker__input'
      calendarClassName='tracker__datepicker--calendar'
      // isClearable
    />
  );
}

export default TrackerDatepicker;
