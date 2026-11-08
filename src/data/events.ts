export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  { id: 1, title: 'React Study Night', date: '2026-10-22', place: 'Room 302', seats: 20 },
  { id: 2, title: 'Figma UI Workshop', date: '2026-10-23', place: 'Lab 4', seats: 15 },
  { id: 3, title: 'KBTU IT Networking', date: '2026-10-25', place: 'Main Hall', seats: 50 },
  { id: 4, title: 'Advanced TS Seminar', date: '2026-10-28', place: 'Room 101', seats: 2 }
]