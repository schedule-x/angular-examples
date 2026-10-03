import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CalendarComponent, randomStringId} from "@schedule-x/angular";
import {createCalendar, createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import {createInteractiveEventModal} from '@sx-premium/interactive-event-modal';
import {createEventsServicePlugin} from '@schedule-x/event-recurrence'; // can alternatively be added in your angular.json
import {createConfig, createHourlyView, createDailyView} from '@sx-premium/resource-scheduler';
import 'temporal-polyfill/global';


let viewConfig = createConfig();
const resources = [
  {
    id: 'red',
    label: 'Resource 1',
    colorName: 'red',
    lightColors: {
      main: '#ff0000',
      container: '#ffebee',
      onContainer: '#000000',
    }
  },
  {
    id: '2',
    label: 'Resource 2'
  },
  {
    id: '3',
    label: 'Resource 3'
  }
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-resource-scheduler';

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
      startDate: {},
      startTime: {},
      endDate: {},
      endTime: {},
      resourceId: {}
    },
  })

  viewConfig = viewConfig
  dailyView = createDailyView(this.viewConfig)
  hourlyView = createHourlyView(this.viewConfig)

  calendarApp = createCalendar({
    plugins: [
      this.modalPlugin,
      this.eventsService,
    ],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: Temporal.ZonedDateTime.from('2025-01-01T02:00:00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-01T04:00:00+00:00[UTC]'),
        resourceId: 'red'
      },
      {
        id: '2',
        title: 'Event 2',
        start: Temporal.ZonedDateTime.from('2025-01-01T06:00:00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-01T08:00:00+00:00[UTC]'),
        resourceId: '2'
      },
      {
        id: '3',
        title: 'Event 3',
        start: Temporal.ZonedDateTime.from('2025-01-01T10:00:00+00:00[UTC]'),
        end: Temporal.ZonedDateTime.from('2025-01-01T12:00:00+00:00[UTC]'),
        resourceId: '3'
      }
    ],
    views: [
      this.hourlyView,
      this.dailyView,
    ],
    selectedDate: Temporal.PlainDate.from('2025-01-01'),
    timezone: 'UTC',
    resources,
  })
}
