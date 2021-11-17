/* PWA  code start*/
if ("serviceWorker" in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('To_Do_List_App_Service_Worker.js').then(() => {
      console.log('Service Worker Registered')
    })
  })
}
/* PWA  code end*/

window.document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})

var Current_Scroll_position;
var Cheked_Time = 250;
var edit_Var = false;
var Local_Storage_data_number;
var complete_Storage_number;

to_do_list_app_body = document.querySelector('.to_do_list_app_body');

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(element) {
    var node = new Node(element);
    var current;

    if (this.head == null) {
      this.head = node;
    }
    else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  insert(element) {
    var node = new Node(element);
    var current;

    if (this.head == null) {
      this.head = node;
    }
    else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  print() {
    var curr = this.head;
    var str = '';
    while (curr) {
      str += curr.element + " ";

      console.log(curr.element)
      curr = curr.next;
    }
  }

  extract() {
    var curr = this.head;
    const to_do_list_arr = [];
    while (curr) {
      to_do_list_arr.push(curr.element);
      curr = curr.next;
    }
    return to_do_list_arr;
  }

  short() {
    /*var start = this.head;
    var list='';
    while(start){
      list+=start.element+" -> ";
      start=start.next;
    }
    console.log(list)*/

    /*var n;
    var temp = this.head;
    var temp1;

    while (temp != null) {
      temp1=temp.next;
      while (temp1 != null) {
        if(temp.element>temp1.element){
          n = temp.element;
          temp.element=temp1.element;
          temp1.element=n;
        }
        temp1=temp1.next;
      }
      temp=temp.next;
    }
    */

    var n;
    var temp = this.head;
    var temp1;

    var temp_time;
    var temp_date;
    var temp_time_date;

    var temp1_time;
    var temp1_date;
    var temp1_time_date;

    while (temp != null) {
      temp1 = temp.next;
      while (temp1 != null) {

        temp_time = ((temp.element)[1]);
        temp_date = ((temp.element)[2]);
        temp_time_date = temp_date + temp_time + '';
        temp_time_date = temp_time_date.replace('-', '');
        temp_time_date = temp_time_date.replace('-', '');
        temp_time_date = temp_time_date.replace(':', '');
        temp_time_date = parseInt(temp_time_date);

        temp1_time = ((temp1.element)[1]);
        temp1_date = ((temp1.element)[2]);
        temp1_time_date = temp1_date + temp1_time + '';
        temp1_time_date = temp1_time_date.replace('-', '');
        temp1_time_date = temp1_time_date.replace('-', '');
        temp1_time_date = temp1_time_date.replace(':', '');
        temp1_time_date = parseInt(temp1_time_date);

        //if(temp.element>temp1.element){
        if (temp_time_date > temp1_time_date) {
          n = temp.element;
          temp.element = temp1.element;
          temp1.element = n;
        }
        temp1 = temp1.next;
      }
      temp = temp.next;
    }

  }
}

function date_time_updated() {
  datetime = new Date();

  hours_time = datetime.getHours()
  minutes_time = datetime.getMinutes();

  if ((hours_time.toString().length) < 2) {
    hours_time = '0' + hours_time;
  }

  if ((minutes_time.toString().length) < 2) {
    minutes_time = '0' + minutes_time;
  }

  yaer_date = datetime.getFullYear();
  month_date = datetime.getMonth();
  month_date = month_date + 1;
  day_date = datetime.getDate();


  if ((month_date.toString().length) < 2) {
    month_date = '0' + month_date;
  }

  if ((day_date.toString().length) < 2) {
    day_date = '0' + day_date;
  }

  time = hours_time + ':' + minutes_time;
  date = yaer_date + '-' + month_date + '-' + day_date;
}
date_time_updated()

function Convert_Time(time24) {
  var Time_24 = time24.split(":")
  var hours = Time_24[0];
  var minutes = Time_24[1];
  if (hours < 12) {
    AM_PM = "AM";
  }
  if (hours > 12) {
    AM_PM = "PM";
    hours = hours - 12;
  }
  if (hours == 12) {
    AM_PM = "PM";
  }
  if (hours == 00) {
    AM_PM = "AM";
    hours = 12;
  }
  Time_24 = hours + ':' + minutes + ' ' + AM_PM;
  return Time_24;
}

function Convert_Day(Dates) {
  var Dates = Dates.split('-');
  var Year = Dates[0];
  var Month = Dates[1];
  var Day = Dates[2];

  Current_Date = new Date();
  Current_yaer = Current_Date.getFullYear();
  Current_month = Current_Date.getMonth();
  Current_month = Current_month + 1 + '';
  Current_day = Current_Date.getDate();

  var Day_name;

  if (Current_yaer == Year && Current_month == Month && Current_day == Day) {
    Day_name = 'Toady';
  }
  else if (Current_yaer == Year && Current_month == Month && Current_day + 1 == Day) {
    Day_name = 'Tomorrow';
  }
  else if (Current_yaer == Year && Current_month == Month && Current_day - 1 == Day) {
    Day_name = 'Yesterday';
  }
  else if (Current_yaer <= Year && Current_month <= Month && Current_day + 1 <= Day) {
    Day_name = 'Upcoming';
  }
  else {
    Day_name = Day + '/' + Month + '/' + Year;
  }
  return Day_name;
}

function Check_Current_Time_function(Given_Times, Given_Dates) {
  date_time_updated();

  var Current_Dates = date.split('-');
  var Current_Year = Current_Dates[0];
  var Current_Month = Current_Dates[1];
  var Current_Hours = Current_Dates[2];

  var Current_Date = Current_Year + Current_Month + Current_Hours;
  Current_Date = parseInt(Current_Date);

  var Given_Date = Given_Dates.split('-');
  var Given_Year = Given_Date[0];
  var Given_Month = Given_Date[1];
  var Given_Day = Given_Date[2];

  var Given_Date = Given_Year + Given_Month + Given_Day;
  Given_Date = parseInt(Given_Date);

  var Current_Time = time.split(':');
  var Current_Hours = Current_Time[0];
  var Current_Minutes = Current_Time[1];

  var Current_Time = Current_Hours + Current_Minutes;
  Current_Time = parseInt(Current_Time);

  var Given_Time = Given_Times.split(':');
  var Given_Hours = Given_Time[0];
  var Given_Minutes = Given_Time[1];
  var Given_Time = Given_Hours + Given_Minutes;
  Given_Time = parseInt(Given_Time);

  var Day_date_name;

  if (Given_Date == Current_Date && Given_Time < Current_Time) {
    Day_date_name = 'Overdue';
  }
  else if (Given_Date < Current_Date) {
    Day_date_name = 'Overdue';
  }
  else if (Given_Date == Current_Date && Given_Time >= Current_Time) {
    Day_date_name = 'Toady';
  }
  return Day_date_name;
}

function Formate_Date_Function(Formate_Date) {
  var Formate_Date = Formate_Date.split('-');
  Formate_Date = Formate_Date[2] + '/' + Formate_Date[1] + '/' + Formate_Date[0];
  return Formate_Date;
}


add_task_section = document.querySelector('.to_do_list_add_task_section');
to_do_list_add_section_done_btn = document.querySelector('.to_do_list_add_section_done_btn');

to_do_list_add_section_input = document.querySelector('#to_do_list_add_section_input');
to_do_list_add_section_time = document.querySelector('#to_do_list_add_section_time');
to_do_list_add_section_date = document.querySelector('#to_do_list_add_section_date');
to_do_list_add_section_repeat = document.querySelector('#to_do_list_add_section_repeat');

edit_task_section = document.querySelector('.to_do_list_Edit_task_section');
to_do_list_edit_section_done_btn = document.querySelector('.to_do_list_Edit_section_done_btn');

to_do_list_edit_section_input = document.querySelector('#to_do_list_Edit_section_input');
to_do_list_edit_section_time = document.querySelector('#to_do_list_Edit_section_time');
to_do_list_edit_section_date = document.querySelector('#to_do_list_Edit_section_date');
to_do_list_edit_section_repeat = document.querySelector('#to_do_list_Edit_section_repeat');


to_do_list_add_section_time.value = (time);
to_do_list_add_section_date.value = (date);

to_do_list_add_section_input.addEventListener('input', function () {
  if (to_do_list_add_section_input.value != '' && to_do_list_add_section_input.value != ' ') {
    to_do_list_add_section_done_btn.disabled = false;
  }
  else {
    to_do_list_add_section_done_btn.disabled = true;
  }
});

function add_task_button_function() {
  to_do_list_app_body.style.overflow = 'hidden'
  add_task_section.style.display = 'block';
  setTimeout(function () {
    add_task_section.style.opacity = 1;
  }, 2)
  to_do_list_add_section_time.value = (time);
  to_do_list_add_section_date.value = (date);
  to_do_list_add_section_done_btn.disabled = true;
}

function close_add_task_section() {
  to_do_list_app_body.style.overflow = ''
  add_task_section.style.opacity = 0;
  add_task_section.scrollTop = 0;
  setTimeout(function () {
    add_task_section.style.display = 'none';
  }, 200)
  to_do_list_add_section_input.value = ''
  to_do_list_add_section_time.value = (time);
  to_do_list_add_section_date.value = (date);
  to_do_list_add_section_repeat.value = 'Once'
  to_do_list_add_section_done_btn.disabled = true;
}

var edit_task_data_storage_id;
var edit_task_complete;
function edit_task_section_function(edit_task_data, edit_task_data_storage, edit_tasknumber) {
  to_do_list_app_body.style.overflow = 'hidden';
  edit_task_section.style.display = 'block';
  setTimeout(function () {
    edit_task_section.style.opacity = 1;
  }, 2)

  edit_task_data = edit_task_data.split(',');

  to_do_list_edit_section_input.value = edit_task_data[0];
  to_do_list_edit_section_time.value = edit_task_data[1];
  to_do_list_edit_section_date.value = edit_task_data[2];
  to_do_list_edit_section_repeat.value = edit_task_data[3];
  edit_task_complete = edit_task_data[4];
  edit_task_data_storage_id = edit_task_data_storage + edit_tasknumber;
  edit_Var = true;
}

function to_do_edit_task_done_function() {

  var to_do_list_edit_input = to_do_list_edit_section_input.value;
  var to_do_list_edit_time = to_do_list_edit_section_time.value;
  var to_do_list_edit_date = to_do_list_edit_section_date.value;
  var to_do_list_edit_repeat = to_do_list_edit_section_repeat.value;

  localStorage.setItem(edit_task_data_storage_id, [to_do_list_edit_input, to_do_list_edit_time, to_do_list_edit_date, to_do_list_edit_repeat, edit_task_complete]);
  re_sort_local_storage_function();
  to_do_list_factch_all_data_remove();
  setTimeout(function () {
    to_do_list_fatch_data_function();
  }, 2)
  close_edit_task_section();
}

function close_edit_task_section() {
  to_do_list_app_body.style.overflow = ''
  edit_task_section.style.opacity = 0;
  edit_task_section.scrollTop = 0;
  setTimeout(function () {
    edit_task_section.style.display = 'none';
  }, 200)
  edit_Var = false;
}


to_do_list_add_section_done_btn.addEventListener('click', function () {
  Current_Scroll_position = to_do_list_app_body.scrollTop;
  var to_do_list_add_input = to_do_list_add_section_input.value;
  var to_do_list_add_time = to_do_list_add_section_time.value;
  var to_do_list_add_date = to_do_list_add_section_date.value;
  var to_do_list_add_repeat = to_do_list_add_section_repeat.value;
  var to_do_list_add_completed = false;

  if (localStorage.getItem('to_do_list_number')) {
    to_do_list_numbers = parseInt(localStorage.getItem('to_do_list_number'));
    to_do_list_numbers = to_do_list_numbers + 1;
    localStorage.setItem(('to_do_list_number' + to_do_list_numbers), [to_do_list_add_input, to_do_list_add_time, to_do_list_add_date, to_do_list_add_repeat, to_do_list_add_completed]);
    localStorage.setItem('to_do_list_number', to_do_list_numbers);
  }
  else {
    localStorage.setItem('to_do_list_number', '1');
    localStorage.setItem('to_do_list_number1', [to_do_list_add_input, to_do_list_add_time, to_do_list_add_date, to_do_list_add_repeat, to_do_list_add_completed]);

  }
  short_local_storage();
  to_do_list_factch_all_data_remove();
  to_do_list_fatch_data_function();
  close_add_task_section();
})

function short_local_storage() {
  var ll = new LinkedList();
  var to_do_list_numbers = parseInt(localStorage.getItem('to_do_list_number'));

  Local_Storage_data_number = to_do_list_numbers;
  Local_Storage_data_number = Local_Storage_data_number + 1;

  if (to_do_list_numbers) {
    for (let to_do_list_fatch_data_index = 1; to_do_list_fatch_data_index < to_do_list_numbers + 1; to_do_list_fatch_data_index++) {
      to_do_list_fatch_data = localStorage.getItem(('to_do_list_number' + to_do_list_fatch_data_index));
      to_do_list_fatch_data = to_do_list_fatch_data.split(",");
      ll.insert(to_do_list_fatch_data)
    }
  }

  if (to_do_list_numbers) {
    for (let to_do_list_fatch_data_index = 1; to_do_list_fatch_data_index < to_do_list_numbers + 1; to_do_list_fatch_data_index++) {
      localStorage.removeItem(('to_do_list_number' + to_do_list_fatch_data_index));
    }
    localStorage.removeItem('to_do_list_number')
  }

  ll.short();

  var to_do_list_data_sort = ll.extract();

  // Today Started
  if (localStorage.getItem('to_do_list_today_number')) {
    var to_do_list_today_numbers = parseInt(localStorage.getItem('to_do_list_today_number'));
    to_do_list_today_numbers = to_do_list_today_numbers + 1;
    for (let i = 1; i < to_do_list_today_numbers; i++) {
      localStorage.removeItem(('to_do_list_today_number' + i));
    }
    localStorage.removeItem('to_do_list_today_number')
  }
  var to_do_list_today_link_list = new LinkedList();
  for (let T = 0; T < to_do_list_data_sort.length; T++) {
    if (Check_Current_Time_function(((to_do_list_data_sort[T])[1]), (((to_do_list_data_sort[T])[2]))) == 'Toady' && ((to_do_list_data_sort[T])[4]) == 'false') {
      to_do_list_today_link_list.insert(to_do_list_data_sort[T])
    }
  }
  to_do_list_today_link_list.short();
  var to_do_list_today_link_list_extracted = to_do_list_today_link_list.extract();
  for (let i = 0; i < to_do_list_today_link_list_extracted.length; i++) {
    if (localStorage.getItem('to_do_list_today_number')) {
      to_do_list_today_numbers = parseInt(localStorage.getItem('to_do_list_today_number'));
      to_do_list_today_numbers = to_do_list_today_numbers + 1;
      localStorage.setItem(('to_do_list_today_number' + to_do_list_today_numbers), (to_do_list_today_link_list_extracted[i]));
      localStorage.setItem('to_do_list_today_number', to_do_list_today_numbers);
    }
    else {
      localStorage.setItem('to_do_list_today_number', '1');
      localStorage.setItem('to_do_list_today_number1', (to_do_list_today_link_list_extracted[0]));
    }
  }
  // Today End

  // Tomorrow Started
  if (localStorage.getItem('to_do_list_tomorrow_number')) {
    var to_do_list_tomorrow_numbers = parseInt(localStorage.getItem('to_do_list_tomorrow_number'));
    to_do_list_tomorrow_numbers = to_do_list_tomorrow_numbers + 1;
    for (let i = 1; i < to_do_list_tomorrow_numbers; i++) {
      localStorage.removeItem(('to_do_list_tomorrow_number' + i));
    }
    localStorage.removeItem('to_do_list_tomorrow_number')
  }
  var to_do_list_tomorrow_link_list = new LinkedList();
  for (let TT = 0; TT < to_do_list_data_sort.length; TT++) {
    if (Convert_Day((to_do_list_data_sort[TT])[2]) == 'Tomorrow' && ((to_do_list_data_sort[TT])[4]) == 'false') {
      to_do_list_tomorrow_link_list.insert(to_do_list_data_sort[TT])
    }
  }
  to_do_list_tomorrow_link_list.short();
  var to_do_list_tomorrow_link_list_extracted = to_do_list_tomorrow_link_list.extract();
  for (let i = 0; i < to_do_list_tomorrow_link_list_extracted.length; i++) {
    if (localStorage.getItem('to_do_list_tomorrow_number')) {
      to_do_list_tomorrow_numbers = parseInt(localStorage.getItem('to_do_list_tomorrow_number'));
      to_do_list_tomorrow_numbers = to_do_list_tomorrow_numbers + 1;
      localStorage.setItem(('to_do_list_tomorrow_number' + to_do_list_tomorrow_numbers), (to_do_list_tomorrow_link_list_extracted[i]));
      localStorage.setItem('to_do_list_tomorrow_number', to_do_list_tomorrow_numbers);
    }
    else {
      localStorage.setItem('to_do_list_tomorrow_number', '1');
      localStorage.setItem('to_do_list_tomorrow_number1', (to_do_list_tomorrow_link_list_extracted[0]));
    }
  }
  // Tomorrow end

  // Upcoming Started
  if (localStorage.getItem('to_do_list_Upcoming_number')) {
    var to_do_list_Upcoming_numbers = parseInt(localStorage.getItem('to_do_list_Upcoming_number'));
    to_do_list_Upcoming_numbers = to_do_list_Upcoming_numbers + 1;
    for (let i = 1; i < to_do_list_Upcoming_numbers; i++) {
      localStorage.removeItem(('to_do_list_Upcoming_number' + i));
    }
    localStorage.removeItem('to_do_list_Upcoming_number')
  }
  var to_do_list_Upcoming_link_list = new LinkedList();
  for (let Up = 0; Up < to_do_list_data_sort.length; Up++) {
    if (Convert_Day((to_do_list_data_sort[Up])[2]) == 'Upcoming' && ((to_do_list_data_sort[Up])[4]) == 'false') {
      to_do_list_Upcoming_link_list.insert(to_do_list_data_sort[Up])
    }
  }
  to_do_list_Upcoming_link_list.short();
  var to_do_list_Upcoming_link_list_extracted = to_do_list_Upcoming_link_list.extract();
  for (let i = 0; i < to_do_list_Upcoming_link_list_extracted.length; i++) {
    if (localStorage.getItem('to_do_list_Upcoming_number')) {
      to_do_list_Upcoming_numbers = parseInt(localStorage.getItem('to_do_list_Upcoming_number'));
      to_do_list_Upcoming_numbers = to_do_list_Upcoming_numbers + 1;
      localStorage.setItem(('to_do_list_Upcoming_number' + to_do_list_Upcoming_numbers), (to_do_list_Upcoming_link_list_extracted[i]));
      localStorage.setItem('to_do_list_Upcoming_number', to_do_list_Upcoming_numbers);
    }
    else {
      localStorage.setItem('to_do_list_Upcoming_number', '1');
      localStorage.setItem('to_do_list_Upcoming_number1', (to_do_list_Upcoming_link_list_extracted[0]));
    }
  }
  // Upcoming End

  // Completed Started
  if (localStorage.getItem('to_do_list_Completed_number')) {
    var to_do_list_Completed_numbers = parseInt(localStorage.getItem('to_do_list_Completed_number'));
    to_do_list_Completed_numbers = to_do_list_Completed_numbers + 1;
    complete_Storage_number = to_do_list_Completed_numbers;
    for (let i = 1; i < to_do_list_Completed_numbers; i++) {
      localStorage.removeItem(('to_do_list_Completed_number' + i));
    }
    localStorage.removeItem('to_do_list_Completed_number')
  }
  var to_do_list_Completed_link_list = new LinkedList();
  for (let Co = 0; Co < to_do_list_data_sort.length; Co++) {
    if (((to_do_list_data_sort[Co])[4]) == 'true') {
      to_do_list_Completed_link_list.insert(to_do_list_data_sort[Co])
    }
  }
  to_do_list_Completed_link_list.short();
  var to_do_list_Completed_link_list_extracted = to_do_list_Completed_link_list.extract();
  for (let i = 0; i < to_do_list_Completed_link_list_extracted.length; i++) {
    if (localStorage.getItem('to_do_list_Completed_number')) {
      to_do_list_Upcoming_numbers = parseInt(localStorage.getItem('to_do_list_Completed_number'));
      to_do_list_Upcoming_numbers = to_do_list_Upcoming_numbers + 1;
      localStorage.setItem(('to_do_list_Completed_number' + to_do_list_Upcoming_numbers), (to_do_list_Completed_link_list_extracted[i]));
      localStorage.setItem('to_do_list_Completed_number', to_do_list_Upcoming_numbers);
    }
    else {
      localStorage.setItem('to_do_list_Completed_number', '1');
      localStorage.setItem('to_do_list_Completed_number1', (to_do_list_Completed_link_list_extracted[0]));
    }
  }
  // Completed End

  // Overdue Started
  if (localStorage.getItem('to_do_list_Overdue_number')) {
    var to_do_list_Overdue_numbers = parseInt(localStorage.getItem('to_do_list_Overdue_number'));
    to_do_list_Overdue_numbers = to_do_list_Overdue_numbers + 1;
    for (let i = 1; i < to_do_list_Overdue_numbers; i++) {
      localStorage.removeItem(('to_do_list_Overdue_number' + i));
    }
    localStorage.removeItem('to_do_list_Overdue_number')
  }
  var to_do_list_Overdue_link_list = new LinkedList();
  for (let Cv = 0; Cv < to_do_list_data_sort.length; Cv++) {
    if (Check_Current_Time_function(((to_do_list_data_sort[Cv])[1]), ((to_do_list_data_sort[Cv])[2])) == 'Overdue' && ((to_do_list_data_sort[Cv])[4]) == 'false') {
      to_do_list_Overdue_link_list.insert(to_do_list_data_sort[Cv])
    }
  }
  to_do_list_Overdue_link_list.short();
  var to_do_list_Overdue_link_list_extracted = to_do_list_Overdue_link_list.extract();
  for (let i = 0; i < to_do_list_Overdue_link_list_extracted.length; i++) {
    if (localStorage.getItem('to_do_list_Overdue_number')) {
      to_do_list_Overdue_numbers = parseInt(localStorage.getItem('to_do_list_Overdue_number'));
      to_do_list_Overdue_numbers = to_do_list_Overdue_numbers + 1;
      localStorage.setItem(('to_do_list_Overdue_number' + to_do_list_Overdue_numbers), (to_do_list_Overdue_link_list_extracted[i]));
      localStorage.setItem('to_do_list_Overdue_number', to_do_list_Overdue_numbers);
    }
    else {
      localStorage.setItem('to_do_list_Overdue_number', '1');
      localStorage.setItem('to_do_list_Overdue_number1', (to_do_list_Overdue_link_list_extracted[0]));
    }
  }
  // Overdue End
  for (let i = 0; i < to_do_list_data_sort.length; i++) {

    if (localStorage.getItem('to_do_list_number')) {

      to_do_list_numbers = parseInt(localStorage.getItem('to_do_list_number'));
      to_do_list_numbers = to_do_list_numbers + 1;

      localStorage.setItem(('to_do_list_number' + to_do_list_numbers), (to_do_list_data_sort[i]));
      localStorage.setItem('to_do_list_number', to_do_list_numbers);
    }
    else {
      localStorage.setItem('to_do_list_number', '1');
      localStorage.setItem('to_do_list_number1', (to_do_list_data_sort[0]));
    }

  }
}

short_local_storage();



function re_sort_local_storage_function() {
  Current_Scroll_position = to_do_list_app_body.scrollTop;
  //console.log(Current_Scroll_position)
  var to_do_list_re_link_list = new LinkedList();

  // Today
  if (localStorage.getItem('to_do_list_today_number')) {
    var to_do_list_today_numbers = parseInt(localStorage.getItem('to_do_list_today_number'));
    to_do_list_today_numbers = to_do_list_today_numbers + 1;
    for (let i = 1; i < to_do_list_today_numbers; i++) {
      var to_do_list_today_data = localStorage.getItem(('to_do_list_today_number' + i));
      if (to_do_list_today_data == ' ') { }
      else {
        to_do_list_today_data = to_do_list_today_data.split(",");
        to_do_list_re_link_list.insert(to_do_list_today_data);
      }
    }
  }

  // Tomorrow Started
  if (localStorage.getItem('to_do_list_tomorrow_number')) {
    var to_do_list_tomorrow_numbers = parseInt(localStorage.getItem('to_do_list_tomorrow_number'));
    to_do_list_tomorrow_numbers = to_do_list_tomorrow_numbers + 1;
    for (let i = 1; i < to_do_list_tomorrow_numbers; i++) {
      var to_do_list_tomorrow_data = localStorage.getItem(('to_do_list_tomorrow_number' + i));
      if (to_do_list_tomorrow_data == ' ') { }
      else {
        to_do_list_tomorrow_data = to_do_list_tomorrow_data.split(",");
        to_do_list_re_link_list.insert(to_do_list_tomorrow_data);
      }
    }
  }

  // Upcoming

  if (localStorage.getItem('to_do_list_Upcoming_number')) {
    var to_do_list_Upcoming_numbers = parseInt(localStorage.getItem('to_do_list_Upcoming_number'));
    to_do_list_Upcoming_numbers = to_do_list_Upcoming_numbers + 1;
    for (let i = 1; i < to_do_list_Upcoming_numbers; i++) {
      var to_do_list_upcoming_data = localStorage.getItem(('to_do_list_Upcoming_number' + i));
      if (to_do_list_upcoming_data == ' ') { }
      else {
        to_do_list_upcoming_data = to_do_list_upcoming_data.split(",");
        to_do_list_re_link_list.insert(to_do_list_upcoming_data);
      }
    }
  }

  // Completed 
  if (localStorage.getItem('to_do_list_Completed_number')) {
    var to_do_list_Completed_numbers = parseInt(localStorage.getItem('to_do_list_Completed_number'));
    to_do_list_Completed_numbers = to_do_list_Completed_numbers + 1;
    complete_Storage_number = to_do_list_Completed_numbers;
    for (let i = 1; i < to_do_list_Completed_numbers; i++) {
      var to_do_list_Completed_data = localStorage.getItem(('to_do_list_Completed_number' + i));
      if (to_do_list_Completed_data == ' ') { }
      else {
        to_do_list_Completed_data = to_do_list_Completed_data.split(",");
        to_do_list_re_link_list.insert(to_do_list_Completed_data);
      }
    }
  }

  // Overdue 
  if (localStorage.getItem('to_do_list_Overdue_number')) {
    var to_do_list_Overdue_numbers = parseInt(localStorage.getItem('to_do_list_Overdue_number'));
    to_do_list_Overdue_numbers = to_do_list_Overdue_numbers + 1;
    for (let i = 1; i < to_do_list_Overdue_numbers; i++) {
      var to_do_list_Overdue_data = localStorage.getItem(('to_do_list_Overdue_number' + i));
      if (to_do_list_Overdue_data == ' ') { }
      else {
        to_do_list_Overdue_data = to_do_list_Overdue_data.split(",");
        to_do_list_re_link_list.insert(to_do_list_Overdue_data);
      }

    }
  }

  to_do_list_re_link_list.short();
  var to_do_list_re_link_list_extracted = to_do_list_re_link_list.extract();

  var to_do_list_numbers = parseInt(localStorage.getItem('to_do_list_number'));
  if (to_do_list_numbers) {
    for (let to_do_list_fatch_data_index = 1; to_do_list_fatch_data_index < to_do_list_numbers + 1; to_do_list_fatch_data_index++) {
      localStorage.removeItem(('to_do_list_number' + to_do_list_fatch_data_index));
    }
    localStorage.removeItem('to_do_list_number')
  }

  for (let i = 0; i < to_do_list_re_link_list_extracted.length; i++) {

    if (localStorage.getItem('to_do_list_number')) {

      to_do_list_numbers = parseInt(localStorage.getItem('to_do_list_number'));
      to_do_list_numbers = to_do_list_numbers + 1;

      localStorage.setItem(('to_do_list_number' + to_do_list_numbers), (to_do_list_re_link_list_extracted[i]));
      localStorage.setItem('to_do_list_number', to_do_list_numbers);
    }
    else {
      localStorage.setItem('to_do_list_number', '1');
      localStorage.setItem('to_do_list_number1', (to_do_list_re_link_list_extracted[0]));
    }

  }

  /*var to_do_list_numbers = parseInt(localStorage.getItem('to_do_list_number'));
  Local_Storage_data_number = to_do_list_numbers;
  Local_Storage_data_number = Local_Storage_data_number + 1;*/

  short_local_storage();
  to_do_list_factch_all_data_remove();
  to_do_list_fatch_data_function();
}


to_do_list_app_overdue_section = document.querySelector('.to_do_list_app_overdue_section');
to_do_list_app_today_section = document.querySelector('.to_do_list_app_today_section')
to_do_list_app_completed_section = document.querySelector('.to_do_list_app_completed_section')
to_do_list_app_tomorrow_section = document.querySelector('.to_do_list_app_tomorrow_section')
to_do_list_app_thisweek_section = document.querySelector('.to_do_list_app_thisweek_section')


to_do_list_app_overdue_main_box = document.querySelector('.to_do_list_app_overdue_main_box');
to_do_list_app_today_main_box = document.querySelector('.to_do_list_app_today_main_box');
to_do_list_app_completed_main_box = document.querySelector('.to_do_list_app_completed_main_box');
to_do_list_app_tomorrow_main_box = document.querySelector('.to_do_list_app_tomorrow_main_box');
to_do_list_app_thisweek_main_box = document.querySelector('.to_do_list_app_thisweek_main_box');


function to_do_list_factch_all_data_remove() {
  to_do_list_app_overdue_main_box.remove();
  to_do_list_app_today_main_box.remove();
  to_do_list_app_completed_main_box.remove();
  to_do_list_app_tomorrow_main_box.remove();
  to_do_list_app_thisweek_main_box.remove();


  to_do_list_app_overdue_section.insertAdjacentHTML('beforeend', `<div class="to_do_list_app_overdue_main_box"></div>`);
  to_do_list_app_today_section.insertAdjacentHTML('beforeend', `<div class="to_do_list_app_today_main_box"></div>`);
  to_do_list_app_completed_section.insertAdjacentHTML('beforeend', `<div class="to_do_list_app_completed_main_box"></div>`);
  to_do_list_app_tomorrow_section.insertAdjacentHTML('beforeend', `<div class="to_do_list_app_tomorrow_main_box"></div>`);
  to_do_list_app_thisweek_section.insertAdjacentHTML('beforeend', `<div class="to_do_list_app_thisweek_main_box"></div>`);
}


function to_do_list_fatch_data_function() {
  to_do_list_app_overdue_main_box = document.querySelector('.to_do_list_app_overdue_main_box');
  to_do_list_app_today_main_box = document.querySelector('.to_do_list_app_today_main_box');
  to_do_list_app_completed_main_box = document.querySelector('.to_do_list_app_completed_main_box');
  to_do_list_app_tomorrow_main_box = document.querySelector('.to_do_list_app_tomorrow_main_box');
  to_do_list_app_thisweek_main_box = document.querySelector('.to_do_list_app_thisweek_main_box');

  // Overdue

  if (localStorage.getItem('to_do_list_Overdue_number')) {
    var to_do_list_Overdue_numbers = parseInt(localStorage.getItem('to_do_list_Overdue_number'));
    to_do_list_Overdue_numbers = to_do_list_Overdue_numbers + 1;

    for (let overdue_index = 1; overdue_index < to_do_list_Overdue_numbers; overdue_index++) {
      var to_do_list_overdue_data = localStorage.getItem(('to_do_list_Overdue_number' + overdue_index));
      to_do_list_overdue_data = to_do_list_overdue_data.split(",");

      to_do_list_app_overdue_main_box.insertAdjacentHTML('beforeend', ` <div class="material-slide material-slide--info">
        <input type="hidden" value="${[(to_do_list_overdue_data[0]), (to_do_list_overdue_data[1]), (to_do_list_overdue_data[2]), (to_do_list_overdue_data[3]), (to_do_list_overdue_data[4])]}">
        <button class="material-slide__info" aria-expanded="false">

          <div class="to_do_list_check_box_section">

              <div class="to_do_list_check_box_main_box">

                <div class="worngbutton" id="overduecheckbtnid_${overdue_index}">
                  <div class="worngbutton_check"></div>
                </div>

              </div>

          </div>

          <div class="to_do_list_detail_box_section">
              <span class="to_do_list_detail_box_section_title">${(to_do_list_overdue_data[0])}</span>
              <span class="to_do_list_detail_box_section_detail">${Convert_Time((to_do_list_overdue_data[1])) + "  " + Convert_Day(to_do_list_overdue_data[2])}</span>
          </div>

          </button>
          <div class="material-slide__options">
          <span>
            <button title="Edit Task" aria-label="Edit Task"  id="Overdue_edit_btn_id_${overdue_index}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
              </button>

              <button title="delete" aria-label="delete"  id="Overdue_delete_btn_id_${overdue_index}">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                  class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512">
                  <path fill="currentColor"
                      d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                  </path>
              </svg>
            </button>
          </span>
        </div>
        <div class="material-slide__outline"></div>
        </div>`);

      var Overdue_check_btn_id = "overduecheckbtnid_" + overdue_index;
      var Overdue_check_button = document.getElementById(Overdue_check_btn_id);

      Overdue_check_button.addEventListener('click', function () {
        var Overdue_check_btn = document.getElementById(this.id);
        Overdue_check_btn.children[0].classList.add('checked');
        var to_do_list_Overdue_number = this.id;
        to_do_list_Overdue_number = to_do_list_Overdue_number.split('_');
        var to_do_list_Overdue_data = localStorage.getItem(('to_do_list_Overdue_number' + to_do_list_Overdue_number[1]));
        to_do_list_Overdue_data = to_do_list_Overdue_data.split(",");
        var to_do_list_Overdue_new_data = [(to_do_list_Overdue_data[0]), (to_do_list_Overdue_data[1]), (to_do_list_Overdue_data[2]), (to_do_list_Overdue_data[3]), ('true')]
        localStorage.setItem(('to_do_list_Overdue_number' + to_do_list_Overdue_number[1]), to_do_list_Overdue_new_data);

        setTimeout(function () {
          re_sort_local_storage_function();
        }, Cheked_Time)
      });


      var Overdue_edit_btn_id = "Overdue_edit_btn_id_" + overdue_index;
      var Overdue_edit_button = document.getElementById(Overdue_edit_btn_id);

      Overdue_edit_button.addEventListener('click', function () {
        var Overdue_edit_btn_number = this.id;
        Overdue_edit_btn_number = Overdue_edit_btn_number.split('_');
        var Overdue_edit_btn_data = localStorage.getItem(('to_do_list_Overdue_number' + Overdue_edit_btn_number[4]));
        edit_task_section_function(Overdue_edit_btn_data, 'to_do_list_Overdue_number', Overdue_edit_btn_number[4]);
      })


      var Overdue_delete_btn_id = "Overdue_delete_btn_id_" + overdue_index;
      var Overdue_delete_button = document.getElementById(Overdue_delete_btn_id);

      Overdue_delete_button.addEventListener('click', function () {
        var Overdue_delete_btn_number = this.id;
        Overdue_delete_btn_number = Overdue_delete_btn_number.split('_');
        localStorage.setItem(('to_do_list_Overdue_number' + Overdue_delete_btn_number[4]), ' ');
        re_sort_local_storage_function();
      })

    }
  }

  // Today


  if (localStorage.getItem('to_do_list_today_number')) {
    var to_do_list_today_numbers = parseInt(localStorage.getItem('to_do_list_today_number'));
    to_do_list_today_numbers = to_do_list_today_numbers + 1;

    for (let today_index = 1; today_index < to_do_list_today_numbers; today_index++) {
      var to_do_list_today_data = localStorage.getItem(('to_do_list_today_number' + today_index));
      to_do_list_today_data = to_do_list_today_data.split(",");

      to_do_list_app_today_main_box.insertAdjacentHTML('beforeend', ` <div class="material-slide material-slide--info">
        <input type="hidden" value="${[(to_do_list_today_data[0]), (to_do_list_today_data[1]), (to_do_list_today_data[2]), (to_do_list_today_data[3]), (to_do_list_today_data[4])]}">
        <button class="material-slide__info" aria-expanded="false">

          <div class="to_do_list_check_box_section">

              <div class="to_do_list_check_box_main_box">
              <div class="checkbutton" id="todaycheckbtnid_${today_index}">
              <div class="checkbutton_check"></div>
              </div>
              </div>

          </div>

          <div class="to_do_list_detail_box_section">
              <span class="to_do_list_detail_box_section_title">${(to_do_list_today_data[0])}</span>
              <span class="to_do_list_detail_box_section_detail">${Convert_Time((to_do_list_today_data[1])) + "  " + Convert_Day(to_do_list_today_data[2])}</span>
          </div>

          </button>
          <div class="material-slide__options">
          <span>
              <button title="Edit Task" aria-label="Edit Task" id = "today_edit_btn_id_${today_index}">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square"
                      viewBox="0 0 16 16">
                      <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
              </button>
              <button title="delete" aria-label="delete" id ="today_delete_btn_id_${today_index}">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                      class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512">
                      <path fill="currentColor"
                          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                      </path>
                  </svg>
              </button>
          </span>
        </div>
        <div class="material-slide__outline"></div>
        </div>`);

      var today_check_btn_id = "todaycheckbtnid_" + today_index;
      var today_check_button = document.getElementById(today_check_btn_id);

      today_check_button.addEventListener('click', function () {
        var today_check_btn = document.getElementById(this.id);
        today_check_btn.children[0].classList.add('checked');
        var to_do_list_today_number = this.id;
        to_do_list_today_number = to_do_list_today_number.split('_');
        var to_do_list_today_data = localStorage.getItem(('to_do_list_today_number' + to_do_list_today_number[1]));
        to_do_list_today_data = to_do_list_today_data.split(",");
        var to_do_list_today_new_data = [(to_do_list_today_data[0]), (to_do_list_today_data[1]), (to_do_list_today_data[2]), (to_do_list_today_data[3]), ('true')]
        localStorage.setItem(('to_do_list_today_number' + to_do_list_today_number[1]), to_do_list_today_new_data);

        setTimeout(function () {
          re_sort_local_storage_function();
        }, Cheked_Time)
      });

      var today_edit_btn_id = "today_edit_btn_id_" + today_index;
      var today_edit_button = document.getElementById(today_edit_btn_id);

      today_edit_button.addEventListener('click', function () {
        var today_edit_btn_number = this.id;
        today_edit_btn_number = today_edit_btn_number.split('_');
        var today_edit_btn_data = localStorage.getItem(('to_do_list_today_number' + today_edit_btn_number[4]));
        edit_task_section_function(today_edit_btn_data, 'to_do_list_today_number', today_edit_btn_number[4]);
      })


      var today_delete_btn_id = "today_delete_btn_id_" + today_index;
      var today_delete_button = document.getElementById(today_delete_btn_id);

      today_delete_button.addEventListener('click', function () {
        var today_delete_btn_number = this.id;
        today_delete_btn_number = today_delete_btn_number.split('_');
        localStorage.setItem(('to_do_list_today_number' + today_delete_btn_number[4]), ' ')
        re_sort_local_storage_function();
      })

    }
  }

  // completed

  if (localStorage.getItem('to_do_list_Completed_number')) {
    var to_do_list_Completed_numbers = parseInt(localStorage.getItem('to_do_list_Completed_number'));
    to_do_list_Completed_numbers = to_do_list_Completed_numbers + 1;

    for (let completed_index = 1; completed_index < to_do_list_Completed_numbers; completed_index++) {
      var to_do_list_completed_data = localStorage.getItem(('to_do_list_Completed_number' + completed_index));
      to_do_list_completed_data = to_do_list_completed_data.split(",");

      to_do_list_app_completed_main_box.insertAdjacentHTML('beforeend', ` <div class="material-slide material-slide--info">
        <input type="hidden" value="${[(to_do_list_completed_data[0]), (to_do_list_completed_data[1]), (to_do_list_completed_data[2]), (to_do_list_completed_data[3]), (to_do_list_completed_data[4])]}">
        <button class="material-slide__info" aria-expanded="false">

          <div class="to_do_list_check_box_section">

              <div class="to_do_list_check_box_main_box">

              <div class="checkedbutton" id="completed_checkedbutton_id_${completed_index}">
                <div class="checkedbutton_check"></div>
              </div>
              </div>

          </div>

          <div class="to_do_list_detail_box_section">
              <span class="to_do_list_detail_box_section_title">${(to_do_list_completed_data[0])}</span>
              <span class="to_do_list_detail_box_section_detail">${Convert_Time((to_do_list_completed_data[1])) + "  " + Convert_Day(to_do_list_completed_data[2])}</span>
          </div>

          </button>
          <div class="material-slide__options">
          <span>
          <button title="Edit Task" aria-label="Edit Task" id="completed_edit_btn_id_${completed_index}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
            </button>
            <button title="delete" aria-label="delete" id="completed_delete_btn_id_${completed_index}">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path fill="currentColor"
                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                </path>
            </svg>
          </button>
          </span>
        </div>
        <div class="material-slide__outline"></div>
        </div>`);

      var completed_check_btn_id = "completed_checkedbutton_id_" + completed_index;
      var completed_check_button = document.getElementById(completed_check_btn_id);

      completed_check_button.addEventListener('click', function () {
        var completed_check_btn = document.getElementById(this.id);
        completed_check_btn.children[0].classList.add('unchecked');
        var to_do_list_completed_number = this.id;
        to_do_list_completed_number = to_do_list_completed_number.split('_');

        var to_do_list_completed_data = localStorage.getItem(('to_do_list_Completed_number' + to_do_list_completed_number[3]));

        to_do_list_completed_data = to_do_list_completed_data.split(",");

        var to_do_list_completed_new_data = [(to_do_list_completed_data[0]), (to_do_list_completed_data[1]), (to_do_list_completed_data[2]), (to_do_list_completed_data[3]), ('false')]
        localStorage.setItem(('to_do_list_Completed_number' + to_do_list_completed_number[3]), to_do_list_completed_new_data);

        setTimeout(function () {
          re_sort_local_storage_function();
        }, Cheked_Time)

      });

      var completed_edit_btn_id = "completed_edit_btn_id_" + completed_index;
      var completed_edit_button = document.getElementById(completed_edit_btn_id);

      completed_edit_button.addEventListener('click', function () {
        var completed_edit_btn_number = this.id;
        completed_edit_btn_number = completed_edit_btn_number.split('_');
        var completed_edit_btn_data = localStorage.getItem(('to_do_list_Completed_number' + completed_edit_btn_number[4]));
        edit_task_section_function(completed_edit_btn_data, 'to_do_list_Completed_number', completed_edit_btn_number[4]);
      })

      var completed_delete_btn_id = "completed_delete_btn_id_" + completed_index;
      var completed_delete_button = document.getElementById(completed_delete_btn_id);

      completed_delete_button.addEventListener('click', function () {
        var completed_delete_btn_number = this.id;
        completed_delete_btn_number = completed_delete_btn_number.split('_');
        localStorage.setItem(('to_do_list_Completed_number' + completed_delete_btn_number[4]), ' ');
        re_sort_local_storage_function();
      })

    }
  }

  // Tomorrow

  if (localStorage.getItem('to_do_list_tomorrow_number')) {
    var to_do_list_tomorrow_numbers = parseInt(localStorage.getItem('to_do_list_tomorrow_number'));
    to_do_list_tomorrow_numbers = to_do_list_tomorrow_numbers + 1;

    for (let tomorrow_index = 1; tomorrow_index < to_do_list_tomorrow_numbers; tomorrow_index++) {
      var to_do_list_completed_data = localStorage.getItem(('to_do_list_tomorrow_number' + tomorrow_index));
      to_do_list_completed_data = to_do_list_completed_data.split(",");

      to_do_list_app_tomorrow_main_box.insertAdjacentHTML('beforeend', ` <div class="material-slide material-slide--info">
        <input type="hidden" value="${[(to_do_list_completed_data[0]), (to_do_list_completed_data[1]), (to_do_list_completed_data[2]), (to_do_list_completed_data[3]), (to_do_list_completed_data[4])]}">
        <button class="material-slide__info" aria-expanded="false">

          <div class="to_do_list_check_box_section">

              <div class="to_do_list_check_box_main_box">
              <div class="checkbutton" id="tomorrowcheckbtnid_${tomorrow_index}">
              <div class="checkbutton_check"></div>
              </div>
              </div>

          </div>

          <div class="to_do_list_detail_box_section">
              <span class="to_do_list_detail_box_section_title">${(to_do_list_completed_data[0])}</span>
              <span class="to_do_list_detail_box_section_detail">${Convert_Time((to_do_list_completed_data[1])) + "  " + Convert_Day(to_do_list_completed_data[2])}</span>
          </div>

          </button>
          <div class="material-slide__options">
          <span>
          <button title="Edit Task" aria-label="Edit Task" id="tomorrow_edit_btn_id_${tomorrow_index}" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
            </button>
            <button title="delete" aria-label="delete" id="tomorrow_delete_btn_id_${tomorrow_index}">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path fill="currentColor"
                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                </path>
            </svg>
          </button>
          </span>
        </div>
        <div class="material-slide__outline"></div>
        </div>`);

      var tomorrow_check_btn_id = "tomorrowcheckbtnid_" + tomorrow_index;
      var tomorrow_check_button = document.getElementById(tomorrow_check_btn_id);

      tomorrow_check_button.addEventListener('click', function () {
        var tomorrow_check_btn = document.getElementById(this.id);
        tomorrow_check_btn.children[0].classList.add('checked');
        var to_do_list_tomorrow_number = this.id;
        to_do_list_tomorrow_number = to_do_list_tomorrow_number.split('_');
        var to_do_list_tomorrow_data = localStorage.getItem(('to_do_list_tomorrow_number' + to_do_list_tomorrow_number[1]));
        to_do_list_tomorrow_data = to_do_list_tomorrow_data.split(",");
        var to_do_list_tomorrow_new_data = [(to_do_list_tomorrow_data[0]), (to_do_list_tomorrow_data[1]), (to_do_list_tomorrow_data[2]), (to_do_list_tomorrow_data[3]), ('true')]
        localStorage.setItem(('to_do_list_tomorrow_number' + to_do_list_tomorrow_number[1]), to_do_list_tomorrow_new_data);

        setTimeout(function () {
          re_sort_local_storage_function();
        }, Cheked_Time)
      });

      var tomorrow_edit_btn_id = "tomorrow_edit_btn_id_" + tomorrow_index;
      var tomorrow_edit_button = document.getElementById(tomorrow_edit_btn_id);

      tomorrow_edit_button.addEventListener('click', function () {
        var tomorrow_edit_btn_number = this.id;
        tomorrow_edit_btn_number = tomorrow_edit_btn_number.split('_');
        var tomorrow_edit_btn_data = localStorage.getItem(('to_do_list_tomorrow_number' + tomorrow_edit_btn_number[4]));
        edit_task_section_function(tomorrow_edit_btn_data, 'to_do_list_tomorrow_number', tomorrow_edit_btn_number[4]);
      })

      var tomorrow_delete_btn_id = "tomorrow_delete_btn_id_" + tomorrow_index;
      var tomorrow_delete_button = document.getElementById(tomorrow_delete_btn_id);

      tomorrow_delete_button.addEventListener('click', function () {
        var tomorrow_delete_btn_number = this.id;
        tomorrow_delete_btn_number = tomorrow_delete_btn_number.split('_');
        localStorage.setItem(('to_do_list_tomorrow_number' + tomorrow_delete_btn_number[4]), ' ');
        re_sort_local_storage_function();
      })

    }
  }

  // UP Coming

  if (localStorage.getItem('to_do_list_Upcoming_number')) {
    var to_do_list_Upcoming_numbers = parseInt(localStorage.getItem('to_do_list_Upcoming_number'));
    to_do_list_Upcoming_numbers = to_do_list_Upcoming_numbers + 1;

    for (let Upcoming_index = 1; Upcoming_index < to_do_list_Upcoming_numbers; Upcoming_index++) {
      var to_do_list_Upcoming_data = localStorage.getItem(('to_do_list_Upcoming_number' + Upcoming_index));
      to_do_list_Upcoming_data = to_do_list_Upcoming_data.split(",");

      to_do_list_app_thisweek_main_box.insertAdjacentHTML('beforeend', ` <div class="material-slide material-slide--info">
        <input type="hidden" value="${[(to_do_list_Upcoming_data[0]), (to_do_list_Upcoming_data[1]), (to_do_list_Upcoming_data[2]), (to_do_list_Upcoming_data[3]), (to_do_list_Upcoming_data[4])]}">
        <button class="material-slide__info" aria-expanded="false">

          <div class="to_do_list_check_box_section">

              <div class="to_do_list_check_box_main_box">
              <div class="checkbutton" id="Upcomingcheckbtnid_${Upcoming_index}">
              <div class="checkbutton_check"></div>
              </div>
              </div>

          </div>

          <div class="to_do_list_detail_box_section">
              <span class="to_do_list_detail_box_section_title">${(to_do_list_Upcoming_data[0])}</span>
              <span class="to_do_list_detail_box_section_detail">${Convert_Time((to_do_list_Upcoming_data[1])) + "  " + Formate_Date_Function(to_do_list_Upcoming_data[2])}</span>
          </div>

          </button>
          <div class="material-slide__options">
          <span>
          <button title="Edit Task" aria-label="Edit Task" id="Upcoming_edit_btn_id_${Upcoming_index}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
            </button>
            <button title="delete" aria-label="delete" id="Upcoming_delete_btn_id_${Upcoming_index}">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
                class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path fill="currentColor"
                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                </path>
            </svg>
          </button>
          </span>
        </div>
        <div class="material-slide__outline"></div>
        </div>`);

      var Upcoming_check_btn_id = "Upcomingcheckbtnid_" + Upcoming_index;
      var Upcoming_check_button = document.getElementById(Upcoming_check_btn_id);

      Upcoming_check_button.addEventListener('click', function () {
        var Upcoming_check_btn = document.getElementById(this.id);
        Upcoming_check_btn.children[0].classList.add('checked');
        var to_do_list_Upcoming_number = this.id;
        to_do_list_Upcoming_number = to_do_list_Upcoming_number.split('_');
        var to_do_list_Upcoming_data = localStorage.getItem(('to_do_list_Upcoming_number' + to_do_list_Upcoming_number[1]));
        to_do_list_Upcoming_data = to_do_list_Upcoming_data.split(",");
        var to_do_list_Upcoming_new_data = [(to_do_list_Upcoming_data[0]), (to_do_list_Upcoming_data[1]), (to_do_list_Upcoming_data[2]), (to_do_list_Upcoming_data[3]), ('true')]
        localStorage.setItem(('to_do_list_Upcoming_number' + to_do_list_Upcoming_number[1]), to_do_list_Upcoming_new_data);

        setTimeout(function () {
          re_sort_local_storage_function();
        }, Cheked_Time)
      });



      var Upcoming_edit_btn_id = "Upcoming_edit_btn_id_" + Upcoming_index;
      var Upcoming_edit_button = document.getElementById(Upcoming_edit_btn_id);

      Upcoming_edit_button.addEventListener('click', function () {
        var Upcoming_edit_btn_number = this.id;
        Upcoming_edit_btn_number = Upcoming_edit_btn_number.split('_');
        var Upcoming_edit_btn_data = localStorage.getItem(('to_do_list_Upcoming_number' + Upcoming_edit_btn_number[4]));
        edit_task_section_function(Upcoming_edit_btn_data, 'to_do_list_Upcoming_number', Upcoming_edit_btn_number[4]);
      })


      var Upcoming_delete_btn_id = "Upcoming_delete_btn_id_" + Upcoming_index;
      var Upcoming_delete_button = document.getElementById(Upcoming_delete_btn_id);

      Upcoming_delete_button.addEventListener('click', function () {
        var Upcoming_delete_btn_number = this.id;
        Upcoming_delete_btn_number = Upcoming_delete_btn_number.split('_');
        localStorage.setItem(('to_do_list_Upcoming_number' + Upcoming_delete_btn_number[4]), ' ');
        re_sort_local_storage_function();
      })

    }
  }

  material_slider_function()
  to_do_list_app_body.scrollTop = Current_Scroll_position;
}
to_do_list_fatch_data_function()

to_do_list_menu_dots = document.querySelector('.to_do_list_menu_dots');
to_do_list_dot_menu_section = document.querySelector('.to_do_list_dot_menu_section');

to_do_list_info_section = document.querySelector('.to_do_list_info_section');


to_do_list_menu_dots.addEventListener('click', function () {
  to_do_list_dot_menu_section.classList.add('open');
  document.removeEventListener('click', to_do_list_close_menu);
  document.addEventListener('click', to_do_list_close_menu);
  function to_do_list_close_menu(Event) {
    if (Event.target != to_do_list_menu_dots && Event.target != to_do_list_menu_dots.children[0] && Event.target != to_do_list_menu_dots.children[1] && Event.target != to_do_list_menu_dots.children[2]) {
      to_do_list_dot_menu_section.classList.remove('open');
    }
  }
})

function to_do_list_info_open_function() {
  to_do_list_app_body.style.overflow = 'hidden'
  to_do_list_info_section.style.display = 'block';
  setTimeout(function () {
    to_do_list_info_section.style.opacity = 1;
  }, 2)
}

function to_do_list_info_close_function() {
  to_do_list_app_body.style.overflow = ''
  to_do_list_info_section.style.opacity = 0;
  setTimeout(function () {
    to_do_list_info_section.style.display = 'none';
  }, 200)
}


window.setInterval(function () {
  var Local_Storage_data_number_var = parseInt(localStorage.getItem('to_do_list_number'));
  Local_Storage_data_number_var = Local_Storage_data_number_var + 1;

  if (Local_Storage_data_number != Local_Storage_data_number_var) {
    re_sort_local_storage_function();
  }

  if (localStorage.getItem('to_do_list_today_number') && edit_Var == false) {

    date_time_updated();

    var to_do_list_today_numbers = parseInt(localStorage.getItem('to_do_list_today_number'));
    to_do_list_today_numbers = to_do_list_today_numbers + 1;

    for (let today_index = 1; today_index < to_do_list_today_numbers; today_index++) {
      try {
        var to_do_list_today_data = localStorage.getItem(('to_do_list_today_number' + today_index));
        to_do_list_today_data = to_do_list_today_data.split(",");

        var Given_Time_var = to_do_list_today_data[1];
        var Given_Time_var = Given_Time_var.split(':');
        var Given_Hours_var = Given_Time_var[0];
        var Given_Minutes_var = Given_Time_var[1];
        var Given_Time_var = Given_Hours_var + Given_Minutes_var;
        var Given_Time_var = parseInt(Given_Time_var);

        var Current_Time_var = time.split(':');
        var Current_Hours_var = Current_Time_var[0];
        var Current_Minutes_var = Current_Time_var[1];
        var Current_Time_var = Current_Hours_var + Current_Minutes_var;
        var Current_Time_var = parseInt(Current_Time_var);

        if (Given_Time_var < Current_Time_var) {
          re_sort_local_storage_function();
        }
      }
      catch { }
    }
  }
}, 1000)


// slide js

function material_slider_function() {

  const materialSlides = document.querySelectorAll('.material-slide');

  materialSlides.forEach(slide => {
    const state = {
      isActive: false,
      isOpen: false,
      isOpenLast: false,
      startPos: null,
      currentPos: null,
    }

    const infoPanel = slide.querySelector('.material-slide__info');
    const buttonPanel = slide.querySelector('.material-slide__options > span');
    const buttons = buttonPanel.querySelectorAll('button');

    // when mouse is down set contol class and mark as active
    const onMouseDown = (e) => {
      state.isActive = true;
      state.startPos = e.clientX;
      infoPanel.classList.add('material-slide__options--user-control');
    }

    // if active calculate new position of card
    const onMouseMove = (e) => {
      const {
        isActive,
        isOpenLast,
        startPos
      } = state;

      if (!isActive) return;

      const buttonsWidth = buttonPanel.offsetWidth;

      const offset = isOpenLast ? e.clientX - startPos - buttonsWidth : e.clientX - startPos;

      if (offset > 0) return;

      if (buttonsWidth < Math.abs(offset)) {
        state.isOpen = true;
      } else {
        state.isOpen = false;
      }

      state.currentPos = offset;

      infoPanel.style.transform = `translatex(${offset}px)`
    }

    // on release animate card to correct position
    const updateState = () => {
      const {
        isOpen
      } = state;

      state.isActive = false;
      state.startPos = null;
      state.currentPos = null;
      state.isOpenLast = isOpen;
      infoPanel.classList.remove('material-slide__options--user-control');
      infoPanel.style.transform = isOpen ? `translatex(-${buttonPanel.offsetWidth}px)` : '';
      infoPanel.setAttribute('aria-expanded', isOpen);
      buttonPanel.setAttribute('aria-hidden', !isOpen);

      buttons.forEach(button => {
        if (isOpen) {
          button.removeAttribute('disabled');
        } else {
          button.setAttribute('disabled', '');
        }
      });
    }

    // keyboard interactions with cards
    const onKeyUp = (e) => {
      if ([32, 13].indexOf(e.which) < 0 || e.target !== infoPanel) return;
      state.isOpen = !state.isOpen;
      updateState();
    }

    // keyboard interactions with cards
    const onDoubleClick = (e) => {
      state.isOpen = !state.isOpen;
      updateState();
    }

    // keyboard listeners
    infoPanel.addEventListener('keyup', onKeyUp);

    // mouse listeners
    infoPanel.addEventListener('dblclick', onDoubleClick);
    infoPanel.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mouseup', updateState);
    document.body.addEventListener('mouseleave', updateState);
    document.body.addEventListener('mousemove', onMouseMove);

    // touch listeners
    infoPanel.addEventListener("touchstart", (e) => onMouseDown(e.touches[0]));
    document.body.addEventListener("touchend", updateState);
    document.body.addEventListener("touchcancel", updateState);
    document.body.addEventListener("touchmove", (e) => onMouseMove(e.touches[0]));

    // init
    updateState();
  })
}
