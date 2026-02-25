export interface Course {
  id: number;
  name: string;
  instructor: string;
  instructorAvatar: string;
  duration: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  students: { avatar: string }[];
  moreStudents: number;
  status: 'In progress' | 'Completed' | 'All';
}

export interface SuggestedCourse {
  id: number;
  name: string;
  period: string;
  level: string;
  date: string;
  progress: number;
  avatar: string;
}

export interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  subject: string;
}

export interface ScheduleEvent {
  day: string;
  time: string;
  instructor: string;
  subject: string;
  avatar: string;
  color: 'mint' | 'peach' | 'orange' | 'blue' | 'lavender' | 'yellow';
}

export const currentUser = {
  name: 'Adam Youssef',
  email: 'adam.y@thync.com',
  avatar: 'https://i.pravatar.cc/80?img=5'
};

export const navItems = [
  { name: 'Home', icon: 'home', active: false },
  { name: 'Courses', icon: 'courses', active: true },
  { name: 'Schedule', icon: 'schedule', active: false },
  { name: 'Results', icon: 'results', active: false },
  { name: 'Certifications', icon: 'certifications', active: false },
];

export const courses: Course[] = [
  {
    id: 1,
    name: 'Cloud Computing',
    instructor: 'Ali Othman',
    instructorAvatar: 'https://i.pravatar.cc/64?img=1',
    duration: '34h 30m',
    progress: 25,
    totalLessons: 16,
    completedLessons: 4,
    students: [
      { avatar: 'https://i.pravatar.cc/64?img=10' },
      { avatar: 'https://i.pravatar.cc/64?img=11' },
      { avatar: 'https://i.pravatar.cc/64?img=12' },
      { avatar: 'https://i.pravatar.cc/64?img=13' },
    ],
    moreStudents: 3,
    status: 'In progress'
  },
  {
    id: 2,
    name: 'Generative AI',
    instructor: 'Sama Samer',
    instructorAvatar: 'https://i.pravatar.cc/64?img=2',
    duration: '50h 45m',
    progress: 33,
    totalLessons: 24,
    completedLessons: 8,
    students: [
      { avatar: 'https://i.pravatar.cc/64?img=14' },
      { avatar: 'https://i.pravatar.cc/64?img=15' },
      { avatar: 'https://i.pravatar.cc/64?img=16' },
      { avatar: 'https://i.pravatar.cc/64?img=17' },
    ],
    moreStudents: 8,
    status: 'In progress'
  },
  {
    id: 3,
    name: 'Behavioral Economics',
    instructor: 'Julie Dawson',
    instructorAvatar: 'https://i.pravatar.cc/64?img=3',
    duration: '44h 32m',
    progress: 10,
    totalLessons: 32,
    completedLessons: 3,
    students: [
      { avatar: 'https://i.pravatar.cc/64?img=18' },
      { avatar: 'https://i.pravatar.cc/64?img=19' },
      { avatar: 'https://i.pravatar.cc/64?img=20' },
      { avatar: 'https://i.pravatar.cc/64?img=21' },
    ],
    moreStudents: 2,
    status: 'In progress'
  },
  {
    id: 4,
    name: 'Marketing Strategy',
    instructor: 'Rory Todd',
    instructorAvatar: 'https://i.pravatar.cc/64?img=4',
    duration: '28h 12m',
    progress: 99,
    totalLessons: 22,
    completedLessons: 22,
    students: [
      { avatar: 'https://i.pravatar.cc/64?img=22' },
      { avatar: 'https://i.pravatar.cc/64?img=23' },
      { avatar: 'https://i.pravatar.cc/64?img=24' },
      { avatar: 'https://i.pravatar.cc/64?img=25' },
    ],
    moreStudents: 6,
    status: 'Completed'
  }
];

export const suggestedCourses: SuggestedCourse[] = [
  {
    id: 1,
    name: 'Web Development',
    period: '5 months',
    level: 'Beginner',
    date: 'June 21',
    progress: 59,
    avatar: 'https://i.pravatar.cc/96?img=33'
  },
  {
    id: 2,
    name: 'Cyber Security',
    period: '6 months',
    level: 'Expert',
    date: 'June 1',
    progress: 35,
    avatar: 'https://i.pravatar.cc/96?img=45'
  },
  {
    id: 3,
    name: 'Computer Vision',
    period: '3 months',
    level: 'Intermediate',
    date: 'May 16',
    progress: 86,
    avatar: 'https://i.pravatar.cc/96?img=52'
  },
  {
    id: 4,
    name: 'Python Foundations',
    period: '3 months',
    level: 'Beginner',
    date: 'May 2',
    progress: 23,
    avatar: 'https://i.pravatar.cc/96?img=48'
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    userName: 'Monica Richard',
    userAvatar: 'https://i.pravatar.cc/80?img=5',
    rating: 4,
    text: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    subject: 'Biology'
  },
  {
    id: 2,
    userName: 'Sarah Blue',
    userAvatar: 'https://i.pravatar.cc/80?img=28',
    rating: 5,
    text: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward.',
    subject: 'Biology'
  },
  {
    id: 3,
    userName: 'Monica Richard',
    userAvatar: 'https://i.pravatar.cc/80?img=5',
    rating: 3,
    text: 'Leverage agile frameworks to provide.',
    subject: 'Biology'
  }
];

export const scheduleEvents: ScheduleEvent[] = [
  { day: 'Tue', time: '14:00', instructor: 'Sarah Johnson', subject: 'Mathematics', avatar: 'https://i.pravatar.cc/96?img=47', color: 'mint' },
  { day: 'Tue', time: '15:00', instructor: 'Sarah Johnson', subject: 'Mathematics', avatar: 'https://i.pravatar.cc/96?img=47', color: 'mint' },
  { day: 'Tue', time: '19:00', instructor: 'David Chen', subject: 'Physics', avatar: 'https://i.pravatar.cc/96?img=68', color: 'peach' },
  { day: 'Tue', time: '20:00', instructor: 'David Chen', subject: 'Physics', avatar: 'https://i.pravatar.cc/96?img=68', color: 'peach' },
  { day: 'Wed', time: '16:00', instructor: 'Emily Rodriguez', subject: 'Chemistry', avatar: 'https://i.pravatar.cc/96?img=32', color: 'mint' },
  { day: 'Wed', time: '17:00', instructor: 'Emily Rodriguez', subject: 'Chemistry', avatar: 'https://i.pravatar.cc/96?img=32', color: 'mint' },
  { day: 'Thu', time: '15:00', instructor: 'James Wilson', subject: 'Literature', avatar: 'https://i.pravatar.cc/96?img=59', color: 'blue' },
  { day: 'Thu', time: '16:00', instructor: 'Monica Richard', subject: 'Music lesson', avatar: 'https://i.pravatar.cc/96?img=5', color: 'peach' },
  { day: 'Fri', time: '20:00', instructor: 'Lisa Anderson', subject: 'Art History', avatar: 'https://i.pravatar.cc/96?img=44', color: 'lavender' },
  { day: 'Sat', time: '13:00', instructor: 'Robert Martinez', subject: 'Computer Science', avatar: 'https://i.pravatar.cc/96?img=70', color: 'blue' },
  { day: 'Sat', time: '17:00', instructor: 'Michael Brown', subject: 'Economics', avatar: 'https://i.pravatar.cc/96?img=12', color: 'orange' },
  { day: 'Sat', time: '18:00', instructor: 'Jennifer Lee', subject: 'Biology', avatar: 'https://i.pravatar.cc/96?img=38', color: 'yellow' },
  { day: 'Sat', time: '19:00', instructor: 'Jennifer Lee', subject: 'Biology', avatar: 'https://i.pravatar.cc/96?img=38', color: 'yellow' },
  { day: 'Sun', time: '15:00', instructor: 'Amanda White', subject: 'Psychology', avatar: 'https://i.pravatar.cc/96?img=31', color: 'lavender' },
];

export const recommendedCourses = [
  {
    id: 1,
    tag: 'Economics',
    lessons: 46,
    title: 'Economics of Innovation & Technology',
    description: 'This course examines how technological advancements influence economic growth...',
    tagClass: 'tag-economics'
  },
  {
    id: 2,
    tag: 'History',
    lessons: 25,
    title: 'A Global History: About Empires',
    description: 'This course explores the rise, expansion, and decline of major empires throughout h...',
    tagClass: 'tag-history'
  },
  {
    id: 3,
    tag: 'Math',
    lessons: 34,
    title: 'Advanced Mathematical Concepts',
    description: 'This course covers advanced mathematical concepts, including calculus, linear algebra...',
    tagClass: 'tag-math'
  }
];
