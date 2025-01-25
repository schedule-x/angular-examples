export const NAME_CALENDAR_INTERNAL = 'internal'
export const NAME_CALENDAR_CLIENTS = 'clients'
export const NAME_CALENDAR_TEAM_BUILDING = 'teamBuilding'
export const NAME_CALENDAR_MANAGEMENT = 'management'

export const calendars = {
  [NAME_CALENDAR_INTERNAL]: {
    label: 'Internal',
    colorName: 'internal',
    lightColors: {
      main: '#d0b316',
      container: '#fff5aa',
      onContainer: '#594800',
    },
    darkColors: {
      main: '#fff5c0',
      onContainer: '#fff5de',
      container: '#a29742',
    },
  },
  [NAME_CALENDAR_CLIENTS]: {
    label: 'Clients',
    colorName: 'clients',
    lightColors: {
      main: '#f91c45',
      container: '#ffd2dc',
      onContainer: '#59000d',
    },
    darkColors: {
      main: '#ffc0cc',
      onContainer: '#ffdee6',
      container: '#a24258',
    },
  },
  [NAME_CALENDAR_TEAM_BUILDING]: {
    label: 'Team building',
    colorName: 'team-building',
    lightColors: {
      main: '#34d721',
      container: '#dafff0',
      onContainer: '#004d3d',
    },
    darkColors: {
      main: '#c0fff5',
      onContainer: '#e6fff5',
      container: '#42a297',
    },
  },
  [NAME_CALENDAR_MANAGEMENT]: {
    label: 'Management',
    colorName: 'management',
    lightColors: {
      main: '#1c7df9',
      container: '#d2e7ff',
      onContainer: '#002859',
    },
    darkColors: {
      main: '#c0dfff',
      onContainer: '#dee6ff',
      container: '#426aa2',
    },
  },
}
