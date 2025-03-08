export interface Medication {
  name: string;
  dosage: string;
  icon: string;
  status: string;
}

export interface Pill {
  name: string;
  dotColor: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  title: string;
  pills: Pill[];
  completed?: boolean;
  missed?: boolean;
  showOptions?: boolean;
}
