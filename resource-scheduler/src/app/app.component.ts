import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CalendarComponent, randomStringId} from "@schedule-x/angular";
import {createCalendar, createViewDay, createViewMonthGrid, createViewWeek} from "@schedule-x/calendar";
import {createInteractiveEventModal} from '@sx-premium/interactive-event-modal';
import {createEventsServicePlugin} from '@schedule-x/event-recurrence'; // can alternatively be added in your angular.json
import {createConfig, createHourlyView, createDailyView} from '@sx-premium/resource-scheduler';

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/interactive-event-modal/index.css'
import '@sx-premium/resource-scheduler/index.css'

let viewConfig = createConfig();
viewConfig.resources.value = [
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
  title = 'angular-example';

  eventsService = createEventsServicePlugin()

  modalPlugin = createInteractiveEventModal({
    eventsService: this.eventsService,

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
        start: '2025-01-01 02:00',
        end: '2025-01-01 04:00',
        resourceId: 'red'
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2025-01-01 06:00',
        end: '2025-01-01 08:00',
        resourceId: '2'
      },
      {
        id: '3',
        title: 'Event 3',
        start: '2025-01-01 10:00',
        end: '2025-01-01 12:00',
        resourceId: '3'
      }
    ],
    views: [
      this.hourlyView,
      this.dailyView,
    ],
    selectedDate: '2025-01-01'
  })
}
