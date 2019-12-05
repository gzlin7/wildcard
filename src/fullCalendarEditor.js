import moment from 'moment';
import Handsontable from 'handsontable';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import './fullCalendarEditor.css'

// convert HTML to a dom element
function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

class FullCalendarEditor extends Handsontable.editors.BaseEditor {
  constructor(hotInstance) {
    super(hotInstance);
  }

  init () {
    console.log("hey there, init-ing")
    this.selectedDate = new Date()

    let newDiv = htmlToElement(`<div id="open-apps-calendar-container"><div id="open-apps-calendar"></div></div>`)
    document.body.appendChild(newDiv);

    this.calendarDiv = document.getElementById('open-apps-calendar');

    this.calendar = new Calendar(this.calendarDiv, {
      plugins: [ interactionPlugin, dayGridPlugin ],
      selectable: true,
      select: (info) => {
        console.log("selected ", info.start, info.end)
        this.selectedDate = info.start
      }
    });

    this.calendar.render();
  }

  getValue() {
    return this.selectedDate;
  }

  setValue(newValue) {
    if (newValue) {
      console.log("setting new value", newValue)
      this.calendar.select( newValue )
    }
  }

  open() {
    this.calendarDiv.style.display = '';
  }

  close() {
    this.calendarDiv.style.display = 'none';
  }

  focus() {
    this.calendarDiv.focus();
  }
}

Handsontable.editors.registerEditor('fullcalendar', FullCalendarEditor);

export { FullCalendarEditor };
