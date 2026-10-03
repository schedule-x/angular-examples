import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarComponent, randomStringId} from "@schedule-x/angular";
import {createCalendar, createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import {createInteractiveEventModal} from '@sx-premium/interactive-event-modal';
import {createEventsServicePlugin} from '@schedule-x/event-recurrence'; // can alternatively be added in your angular.json
import {createSidebarPlugin} from '@sx-premium/sidebar';
import {createDragToCreatePlugin} from '@sx-premium/drag-to-create';
import 'temporal-polyfill/global';

import {
  calendars,
  NAME_CALENDAR_INTERNAL,
  NAME_CALENDAR_MANAGEMENT,
  NAME_CALENDAR_TEAM_BUILDING
} from './calendars';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-sidebar-modal-drag-to-create';

  eventsService = createEventsServicePlugin()

  modalPlugin = createInteractiveEventModal({
    eventsService: this.eventsService,

    onAddEvent: (event) => {
      console.log('onAddEvent', event)
    },

    fields: {
      title: {
        label: 'Event Title',
        name: 'event-title',
        validator: (value) => {
          return {
            isValid: !!value && value.length >= 3,
            message: 'Title must be at least 3 characters long'
          }
        }
      },
      description: {},
      startDate: {},
      startTime: {},
      endDate: {},
      endTime: {},
    },
  })

  sidebar = createSidebarPlugin({
    eventsService: this.eventsService,

    activeCalendarIds: [
      NAME_CALENDAR_INTERNAL,
      NAME_CALENDAR_MANAGEMENT,
      NAME_CALENDAR_TEAM_BUILDING,
    ],

    placeholderEvents: [
      {
        title: 'Some internal meeting',
        calendarId: NAME_CALENDAR_INTERNAL,
        location: 'Room 1',
        people: ['John Doe', 'Jane Doe', 'John Smith'],
      },
      {
        title: 'Management meeting',
        calendarId: NAME_CALENDAR_MANAGEMENT,
      }
    ]
  })

  dragToCreatePlugin = createDragToCreatePlugin({
    onAddEvent: (event) => {
      // send event to your server
    },
  })

  calendarApp = createCalendar({
    calendars,
    plugins: [
      this.modalPlugin,
      this.eventsService,
      this.dragToCreatePlugin,
      this.sidebar,
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.ZonedDateTime.from('2024-06-11T03:00:00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2024-06-11T05:00:00+00:00[UTC]'),
      },
    ],
    selectedDate: Temporal.PlainDate.from('2024-06-11'),
    timezone: 'UTC',
    views: [createViewWeek(), createViewMonthGrid(), createViewDay()],
    callbacks: {
      onDoubleClickDateTime: (dateTime) => {
        this.modalPlugin.clickToCreate(dateTime, {
          calendarId: NAME_CALENDAR_INTERNAL
        })
      },

      onDoubleClickDate: (date) => {
        this.modalPlugin.clickToCreate(date)
      }
    }
  })
}
