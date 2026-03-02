'use strict';

const { useState, useEffect, useCallback, useRef, useMemo, memo } = React;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */

const COURSES = [
  { id:1, name:'Cloud Computing',      instructor:'Ali Othman',   avatarId:1,  duration:'34h 30m', completed:4,  total:16, percent:25, studentImgs:[10,11,12,13], extraStudents:3, action:'Continue' },
  { id:2, name:'Generative AI',        instructor:'Sama Samer',   avatarId:2,  duration:'50h 45m', completed:8,  total:24, percent:33, studentImgs:[14,15,16,17], extraStudents:8, action:'Continue' },
  { id:3, name:'Behavioral Economics', instructor:'Julie Dawson', avatarId:3,  duration:'44h 32m', completed:3,  total:32, percent:10, studentImgs:[18,19,20,21], extraStudents:2, action:'Continue' },
  { id:4, name:'Marketing Strategy',   instructor:'Rory Todd',    avatarId:4,  duration:'28h 12m', completed:22, total:22, percent:99, studentImgs:[22,23,24,25], extraStudents:6, action:'Complete' },
];

const SUGGESTED_COURSES = [
  { id:1, name:'Web Development',    period:'5 months', avatarId:33, level:'Beginner',    date:'June 21', percent:59, dashOffset:41 },
  { id:2, name:'Cyber Security',     period:'6 months', avatarId:45, level:'Expert',       date:'June 1',  percent:35, dashOffset:65 },
  { id:3, name:'Computer Vision',    period:'3 months', avatarId:52, level:'Intermediate', date:'May 16',  percent:86, dashOffset:14 },
  { id:4, name:'Python Foundations', period:'3 months', avatarId:48, level:'Beginner',     date:'May 2',   percent:23, dashOffset:77 },
];

const CALENDAR_EVENTS_DEC_2016 = new Set([5, 6, 12, 22]);

const SCHEDULE_DATA = {
  Mon: Array(8).fill(null),
  Tue: [null,{instructor:'Sarah Johnson',   subject:'Mathematics',    avatarId:47,color:'mint'},   {instructor:'Sarah Johnson',   subject:'Mathematics',    avatarId:47,color:'mint'},   null,null,null, {instructor:'David Chen',     subject:'Physics',        avatarId:68,color:'peach'}, {instructor:'David Chen',     subject:'Physics',        avatarId:68,color:'peach'}],
  Wed: [null,null,null, {instructor:'Emily Rodriguez', subject:'Chemistry',      avatarId:32,color:'mint'},   {instructor:'Emily Rodriguez', subject:'Chemistry',      avatarId:32,color:'mint'},   null,null,null],
  Thu: [null,null, {instructor:'James Wilson',   subject:'Literature',     avatarId:59,color:'blue'}, {instructor:'Monica Richard',  subject:'Music lesson',   avatarId:5, color:'peach'},null,null,null,null],
  Fri: [null,null,null,null,null,null,null, {instructor:'Lisa Anderson',  subject:'Art History',    avatarId:44,color:'lavender'}],
  Sat: [{instructor:'Robert Martinez',subject:'Computer Science',avatarId:70,color:'blue'},null,null,null, {instructor:'Michael Brown',  subject:'Economics',      avatarId:12,color:'orange'}, {instructor:'Jennifer Lee',   subject:'Biology',        avatarId:38,color:'yellow'}, {instructor:'Jennifer Lee',   subject:'Biology',        avatarId:38,color:'yellow'},null],
  Sun: [null,null, {instructor:'Amanda White',  subject:'Psychology',     avatarId:31,color:'lavender'},null,null,null,null,null],
};
const SCHEDULE_DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const SCHEDULE_TIMES = ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];

const RECOMMENDED = [
  { id:1, tag:'Economics', tagClass:'tag-economics', lessons:46, title:'Economics of Innovation & Technology', description:'This course examines how technological advancements influence economic growth…' },
  { id:2, tag:'History',   tagClass:'tag-history',   lessons:25, title:'A Global History: About Empires',      description:'This course explores the rise, expansion, and decline of major empires…' },
  { id:3, tag:'Math',      tagClass:'tag-math',      lessons:34, title:'Advanced Mathematical Concepts',       description:'This course covers advanced mathematical concepts including calculus…' },
];

const REVIEWS = [
  { id:1, name:'Monica Richard', avatarId:5,  stars:4, text:'Leverage agile frameworks to provide a robust synopsis for high level overviews.', loadMore:false },
  { id:2, name:'Sarah Blue',     avatarId:28, stars:5, text:'Bring to the table win-win survival strategies to ensure proactive domination.', loadMore:true },
  { id:3, name:'Monica Richard', avatarId:5,  stars:3, text:'Leverage agile frameworks to provide.', loadMore:false },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const NAV_ITEMS = [
  { label:'Home',          key:'home'           },
  { label:'Courses',       key:'courses'        },
  { label:'Schedule',      key:'schedule'       },
  { label:'Results',       key:'results'        },
  { label:'Certifications',key:'certifications' },
];

const SESSIONS = [
  { id:1,  subject:'Mathematics',    instructor:'Sarah Johnson',   avatarId:47, day:'Tue', date:'Feb 25', time:'14:00', endTime:'16:00', color:'mint',     room:'Online'    },
  { id:2,  subject:'Physics',        instructor:'David Chen',      avatarId:68, day:'Tue', date:'Feb 25', time:'19:00', endTime:'21:00', color:'peach',    room:'Room 204'  },
  { id:3,  subject:'Chemistry',      instructor:'Emily Rodriguez', avatarId:32, day:'Wed', date:'Feb 26', time:'16:00', endTime:'18:00', color:'mint',     room:'Lab 3'     },
  { id:4,  subject:'Literature',     instructor:'James Wilson',    avatarId:59, day:'Thu', date:'Feb 27', time:'15:00', endTime:'16:00', color:'blue',     room:'Room 101'  },
  { id:5,  subject:'Music Lesson',   instructor:'Monica Richard',  avatarId:5,  day:'Thu', date:'Feb 27', time:'16:00', endTime:'17:00', color:'peach',    room:'Studio B'  },
  { id:6,  subject:'Art History',    instructor:'Lisa Anderson',   avatarId:44, day:'Fri', date:'Feb 28', time:'20:00', endTime:'21:00', color:'lavender', room:'Online'    },
  { id:7,  subject:'Computer Sci.',  instructor:'Robert Martinez', avatarId:70, day:'Sat', date:'Mar 1',  time:'13:00', endTime:'14:00', color:'blue',     room:'Lab 1'     },
  { id:8,  subject:'Economics',      instructor:'Michael Brown',   avatarId:12, day:'Sat', date:'Mar 1',  time:'17:00', endTime:'18:00', color:'orange',   room:'Room 305'  },
  { id:9,  subject:'Biology',        instructor:'Jennifer Lee',    avatarId:38, day:'Sat', date:'Mar 1',  time:'18:00', endTime:'20:00', color:'yellow',   room:'Lab 2'     },
  { id:10, subject:'Psychology',     instructor:'Amanda White',    avatarId:31, day:'Sun', date:'Mar 2',  time:'15:00', endTime:'16:00', color:'lavender', room:'Online'    },
];

const RESULTS = [
  { id:1, course:'Cloud Computing',           instructor:'Ali Othman',   avatarId:1,  score:88, grade:'B+', status:'In Progress',   completed:4,  total:16 },
  { id:2, course:'Generative AI',             instructor:'Sama Samer',   avatarId:2,  score:92, grade:'A',  status:'In Progress',   completed:8,  total:24 },
  { id:3, course:'Behavioral Economics',      instructor:'Julie Dawson', avatarId:3,  score:74, grade:'C+', status:'In Progress',   completed:3,  total:32 },
  { id:4, course:'Marketing Strategy',        instructor:'Rory Todd',    avatarId:4,  score:97, grade:'A+', status:'Near Complete', completed:22, total:22 },
  { id:5, course:'Web Development Basics',    instructor:'Thomas Park',  avatarId:33, score:85, grade:'B',  status:'Completed',     completed:24, total:24 },
  { id:6, course:'Data Analysis Fundamentals',instructor:'Rachel Kim',   avatarId:52, score:91, grade:'A',  status:'Completed',     completed:18, total:18 },
];

const CERTIFICATIONS_DATA = [
  { id:1, title:'AWS Cloud Practitioner',         issuer:'Amazon Web Services',   course:'Cloud Computing',     issuedDate:'January 15, 2024',  validUntil:'January 15, 2027', earned:true,  credentialId:'AWS-CP-2024',  avatarId:1,  accentColor:'#f97316', earned_bgColor:'#fff7ed' },
  { id:2, title:'Digital Marketing Professional', issuer:'Google Digital Academy', course:'Marketing Strategy',  issuedDate:'March 22, 2024',    validUntil:'March 22, 2026',   earned:true,  credentialId:'GDA-DMP-2024', avatarId:4,  accentColor:'#4338ca', earned_bgColor:'#eef2ff' },
  { id:3, title:'Generative AI Expert',           issuer:'Thync Academy',         course:'Generative AI',       issuedDate:null, earned:false, progress:33, expectedDate:'Aug 2025',  avatarId:2,  accentColor:'#339f93' },
  { id:4, title:'Behavioral Econ. Specialist',    issuer:'Thync Academy',         course:'Behavioral Economics',issuedDate:null, earned:false, progress:10, expectedDate:'Dec 2025',  avatarId:3,  accentColor:'#8b5cf6' },
  { id:5, title:'Data Science Professional',      issuer:'Thync Academy',         course:'Data Analysis',       issuedDate:null, earned:false, progress:60, expectedDate:'May 2025',  avatarId:52, accentColor:'#06b6d4' },
];

const NOTIF_SETTINGS_DATA = [
  { id:'n1', label:'Course updates',      description:'New lessons, materials and announcements', defaultOn:true  },
  { id:'n2', label:'Grades & results',    description:'Scores, feedback and quiz results',        defaultOn:true  },
  { id:'n3', label:'Session reminders',   description:'1 hour before each scheduled session',     defaultOn:true  },
  { id:'n4', label:'Certificate earned',  description:'When you complete a certification',         defaultOn:true  },
  { id:'n5', label:'Instructor messages', description:'Direct messages from your instructors',    defaultOn:false },
  { id:'n6', label:'New courses & deals', description:'Curated recommendations for you',          defaultOn:false },
];

const PRIVACY_SETTINGS_DATA = [
  { id:'p1', label:'Public profile',         description:'Allow other students to view your profile',    defaultOn:true  },
  { id:'p2', label:'Show learning progress', description:'Display course progress on your profile',      defaultOn:false },
  { id:'p3', label:'Show certificates',      description:'Make earned certificates visible to others',   defaultOn:true  },
  { id:'p4', label:'Usage analytics',        description:'Share anonymous usage data to improve Thync',  defaultOn:true  },
];

const SESSION_COLORS = {
  mint:     { bg:'#d1fae5', text:'#065f46', dot:'#10b981' },
  peach:    { bg:'#fef3c7', text:'#78350f', dot:'#f59e0b' },
  blue:     { bg:'#dbeafe', text:'#1e40af', dot:'#3b82f6' },
  lavender: { bg:'#ede9fe', text:'#4c1d95', dot:'#8b5cf6' },
  orange:   { bg:'#ffedd5', text:'#7c2d12', dot:'#f97316' },
  yellow:   { bg:'#fef9c3', text:'#713f12', dot:'#eab308' },
};

/* ═══════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════ */

const avatar = (id) => `https://i.pravatar.cc/96?img=${id}`;

function buildCalendarGrid(year, month) {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month+1, 0).getDate();
  const cells = [];
  for (let i=0;i<first;i++)   cells.push({day:null,blank:true});
  for (let d=1;d<=days;d++)   cells.push({day:d,blank:false});
  const trail = (7 - (cells.length%7)) % 7;
  for (let i=0;i<trail;i++)   cells.push({day:null,blank:true});
  return cells;
}

const gradeColor  = g => g==='A+'||g==='A' ? 'grade-a' : g==='B+'||g==='B' ? 'grade-b' : 'grade-c';
const statusColor = s => s==='Completed' ? 'status-done' : s==='Near Complete' ? 'status-near' : 'status-prog';

/* ═══════════════════════════════════════════════════════
   ICONS (memoised SVG)
═══════════════════════════════════════════════════════ */
const IconBack          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>);
const IconSearch        = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>);
const IconHeart         = memo(()=><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/></svg>);
const IconBell          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd"/></svg>);
const IconHome          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>);
const IconCourses       = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>);
const IconCalendar      = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>);
const IconResults       = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"/></svg>);
const IconCertification = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/></svg>);
const IconSettings      = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>);
const IconBars          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"/></svg>);
const IconCalSmall      = memo(()=><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd"/></svg>);
const IconFilter        = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/></svg>);
const IconPlus          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="17" height="17"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>);
const IconDownload      = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="15" height="15"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>);
const IconShare         = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="15" height="15"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/></svg>);
const IconUser          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>);
const IconBellOutline   = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/></svg>);
const IconShield        = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>);
const IconEye           = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>);
const IconPalette       = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"/></svg>);
const IconKey           = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"/></svg>);
const IconCheck         = memo(()=><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd"/></svg>);
const IconGraduate      = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></svg>);
const IconStar          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd"/></svg>);
const IconEdit          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>);
const IconMapPin        = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="13" height="13"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>);
const IconMoon          = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/></svg>);
const IconSun           = memo(()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>);

const NAV_ICONS = {
  home:<IconHome/>, courses:<IconCourses/>, schedule:<IconCalendar/>,
  results:<IconResults/>, certifications:<IconCertification/>,
};

/* ═══════════════════════════════════════════════════════
   SHARED UI COMPONENTS
═══════════════════════════════════════════════════════ */

const TopBar = memo(({ searchQuery, onSearchChange }) => (
  <div className="top-bar-wrap">
    <div className="top-bar">
      <div className="search-box" role="search">
        <span aria-hidden="true"><IconSearch /></span>
        <input type="search" placeholder="Search courses, instructors…"
          value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search" maxLength={120} />
      </div>
      <div className="user-actions">
        <button className="icon-btn" aria-label="Wishlist">
          <div><IconHeart /></div>
          <span className="notification-badge" aria-hidden="true">2</span>
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <div><IconBell /></div>
          <span className="notification-badge" aria-hidden="true">4</span>
        </button>
        <div className="user-profile">
          <img src={avatar(5)} alt="Adam Youssef" className="user-avatar" loading="lazy" />
          <div className="user-info">
            <div className="user-name">Adam Youssef</div>
            <div className="user-email">adam.y@thync.com</div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const Sidebar = memo(({ activeNav, onNavChange }) => (
  <aside className="sidebar" aria-label="Main navigation">
    <ul className="nav-menu" role="list">
      {NAV_ITEMS.map(({ label, key }) => (
        <li key={key} className="nav-item">
          <a href="#" className={'nav-link' + (activeNav===key ? ' active' : '')}
            onClick={(e) => { e.preventDefault(); onNavChange(key); }}
            aria-current={activeNav===key ? 'page' : undefined}>
            <span className="nav-icon" aria-hidden="true">{NAV_ICONS[key]}</span>
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
    <div className="settings-link">
      <a href="#" className={'nav-link' + (activeNav==='settings' ? ' active' : '')}
        onClick={(e) => { e.preventDefault(); onNavChange('settings'); }}>
        <span className="nav-icon" aria-hidden="true"><IconSettings /></span>
        <span>Settings</span>
      </a>
    </div>
  </aside>
));

const PageHeader = memo(({ title, subtitle, children }) => (
  <div className="pg-header">
    <div>
      <h1 className="pg-title">{title}</h1>
      {subtitle && <p className="pg-subtitle">{subtitle}</p>}
    </div>
    {children && <div className="pg-actions">{children}</div>}
  </div>
));

const StatCard = memo(({ icon, iconBg, value, label, delta }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background:iconBg }}>{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    {delta && <div className="stat-delta">{delta}</div>}
  </div>
));

/* ═══════════════════════════════════════════════════════
   COURSES PAGE
═══════════════════════════════════════════════════════ */

const ProgressCircle = memo(({ percent, dashOffset }) => (
  <div className="progress-circle">
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--c-border)" strokeWidth="4" />
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--brand)" strokeWidth="4"
        strokeDasharray="100" strokeDashoffset={dashOffset} strokeLinecap="round" />
    </svg>
    <span className="progress-percentage">{percent}%</span>
  </div>
));

const CourseRow = memo(({ course, onAction }) => (
  <div className="course-row" role="row">
    <div className="course-name">{course.name}</div>
    <div className="teacher-info">
      <img src={`https://i.pravatar.cc/64?img=${course.avatarId}`} alt={course.instructor} className="teacher-avatar" loading="lazy" />
      <span className="teacher-name">{course.instructor}</span>
    </div>
    <div className="duration">{course.duration}</div>
    <div className="progress-info">
      <div className="progress-label">
        <span className="progress-text">{course.completed}/{course.total}</span>
        <span className="progress-percentage">({course.percent}%)</span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width:`${course.percent}%` }} />
      </div>
    </div>
    <div className="students-avatars">
      {course.studentImgs.map(id => <img key={id} src={`https://i.pravatar.cc/64?img=${id}`} alt="Student" className="student-avatar" loading="lazy" />)}
      <div className="more-students">+{course.extraStudents}</div>
    </div>
    <button className="action-btn" onClick={() => onAction(course.name)}>{course.action}</button>
  </div>
));

const CourseTable = memo(({ courses, activePage, totalPages, onPageChange, onAction }) => (
  <div className="course-table" role="table">
    <div className="table-header" role="row">
      <div>Course</div><div>Instructor</div><div>Duration</div>
      <div>Progress</div><div>Students</div><div><span className="sr-only">Actions</span></div>
    </div>
    {courses.map(c => <CourseRow key={c.id} course={c} onAction={onAction} />)}
    <nav className="pagination">
      <button className="page-btn" onClick={() => onPageChange(Math.max(1,activePage-1))} disabled={activePage===1}>◀</button>
      {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
        <button key={p} className={'page-btn'+(activePage===p?' active':'')} onClick={() => onPageChange(p)}>{p}</button>
      ))}
      <button className="page-btn" onClick={() => onPageChange(Math.min(totalPages,activePage+1))} disabled={activePage===totalPages}>▶</button>
    </nav>
  </div>
));

const SuggestedCourses = memo(({ period, onPeriodChange }) => (
  <div className="top-learners-section">
    <div className="learners-header">
      <div className="learners-title-group">
        <h2 className="learners-title">Suggested Courses</h2>
        <span className="learners-count"><strong>32 hours</strong> avg duration</span>
      </div>
      <div className="learners-toggle">
        {['week','month'].map(p => (
          <button key={p} className={'toggle-btn'+(period===p?' active':'')}
            onClick={() => onPeriodChange(p)}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
        ))}
      </div>
    </div>
    <div className="learners-list">
      {SUGGESTED_COURSES.map(c => (
        <div key={c.id} className="learner-item">
          <img src={avatar(c.avatarId)} className="learner-avatar" alt={c.name} loading="lazy" />
          <div className="learner-info">
            <div className="learner-name">{c.name}</div>
            <div className="learning-streak">Learning period: {c.period}</div>
          </div>
          <div className="learner-level"><span className="level-icon"><IconBars /></span><span>{c.level}</span></div>
          <div className="learner-date"><span className="date-icon"><IconCalSmall /></span><span>{c.date}</span></div>
          <div className="learner-progress"><ProgressCircle percent={c.percent} dashOffset={c.dashOffset} /></div>
          <button className="learner-menu-btn">⋮</button>
        </div>
      ))}
    </div>
  </div>
));

const InstructorCard = memo(({ event, onContact }) => {
  const btnRef = useRef(null);
  useEffect(() => { btnRef.current?.focus(); }, []);
  return (
    <div className="instructor-card" role="dialog" aria-modal="true">
      <div className="instructor-header">
        <img src={avatar(event.avatarId)} alt={event.instructor} className="instructor-avatar" loading="lazy" />
        <div className="instructor-info">
          <div className="instructor-name">{event.instructor}</div>
          <div className="instructor-subject">{event.subject}</div>
        </div>
      </div>
      <button ref={btnRef} className="contact-btn" onClick={() => onContact(event.instructor)}>
        Contact {event.instructor.split(' ')[0]}
      </button>
    </div>
  );
});

const ScheduleSection = memo(() => {
  const [activeCell, setActiveCell] = useState(null);
  const activeEvent = useMemo(() => {
    if (!activeCell) return null;
    return SCHEDULE_DATA[activeCell.day]?.[activeCell.slotIdx] ?? null;
  }, [activeCell]);
  const closeCard = useCallback(() => setActiveCell(null), []);
  const handleCell = useCallback((day, slotIdx, event) => {
    if (!event) return;
    setActiveCell(prev => prev?.day===day && prev?.slotIdx===slotIdx ? null : {day,slotIdx});
  }, []);
  useEffect(() => {
    const h = e => { if (e.key==='Escape') closeCard(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [closeCard]);
  const hasActive = Boolean(activeEvent);
  return (
    <section className="schedule-section">
      <div className="schedule-header">
        <h2 className="schedule-title">Current week schedule</h2>
        <p className="schedule-subtitle">Click any slot to view instructor details</p>
      </div>
      <div className={'schedule-overlay'+(hasActive?' show':'')} onClick={closeCard} aria-hidden="true" />
      <div className={'schedule-grid'+(hasActive?' has-active':'')}>
        <div className="schedule-time-header" />
        {SCHEDULE_TIMES.map(t => <div key={t} className="schedule-time-header">{t}</div>)}
        {SCHEDULE_DAYS.map(day => (
          <React.Fragment key={day}>
            <div className="schedule-day-label">{day}</div>
            {SCHEDULE_DATA[day].map((event, slotIdx) => {
              const isActive = activeCell?.day===day && activeCell?.slotIdx===slotIdx;
              return (
                <div key={slotIdx} className={'schedule-cell'+(event?' has-event':'')}
                  onClick={() => handleCell(day, slotIdx, event)}>
                  {event && <div className={'time-slot '+event.color+(isActive?' active':'')} />}
                  {isActive && activeEvent && <InstructorCard event={activeEvent} onContact={(n)=>{alert(`Contacting ${n}`);closeCard();}} />}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
});

const CalendarSection = memo(() => {
  const [cal, setCal] = useState({year:2016, month:11});
  const [sel, setSel] = useState(22);
  const isInit = cal.year===2016 && cal.month===11;
  const cells = useMemo(() => buildCalendarGrid(cal.year, cal.month), [cal.year, cal.month]);
  const go = useCallback(d => {
    setCal(({year,month}) => {
      let m=month+d, y=year;
      if(m<0){m=11;y--;}if(m>11){m=0;y++;}
      return {year:y,month:m};
    });
    setSel(null);
  }, []);
  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3 className="calendar-title">Schedule session</h3>
        <div className="calendar-nav">
          <button className="calendar-nav-btn" onClick={()=>go(-1)}>‹</button>
          <span className="calendar-month">{MONTH_NAMES[cal.month]} {cal.year}</span>
          <button className="calendar-nav-btn" onClick={()=>go(1)}>›</button>
        </div>
      </div>
      <div className="calendar-grid">
        {['S','M','T','W','T','F','S'].map((d,i)=><div key={i} className="calendar-day-header">{d}</div>)}
        {cells.map((cell,i) => {
          const isBlank = cell.blank;
          const isEvent = isInit && !isBlank && CALENDAR_EVENTS_DEC_2016.has(cell.day);
          const isSel   = !isBlank && cell.day===sel;
          let cls = 'calendar-day';
          if(isBlank) cls+=' other-month';
          if(isEvent) cls+=' has-event';
          if(isSel)   cls+=' selected';
          return <div key={i} className={cls} onClick={()=>!isBlank&&setSel(cell.day)}>{!isBlank&&cell.day}</div>;
        })}
      </div>
    </div>
  );
});

const StarRating = memo(({ stars, max=5 }) => (
  <div className="review-rating">
    {Array.from({length:max},(_,i)=>(
      <span key={i} className={'star'+(i>=stars?' empty':'')} aria-hidden="true">★</span>
    ))}
  </div>
));

const ReviewsSection = memo(() => {
  const listRef = useRef(null);
  const scroll = useCallback(dir => { listRef.current?.scrollBy({left:dir*280,behavior:'smooth'}); }, []);
  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3 className="reviews-title">Reviews</h3>
        <button className="add-review-btn" onClick={()=>alert('Add review')}>Add review</button>
      </div>
      <div className="reviews-nav">
        <span className="reviews-subject">Biology</span>
        <div className="reviews-nav-arrows">
          <button className="review-arrow-btn" onClick={()=>scroll(-1)}>‹</button>
          <button className="review-arrow-btn" onClick={()=>scroll(1)}>›</button>
        </div>
      </div>
      <div className="reviews-list" ref={listRef}>
        {REVIEWS.map(r => (
          <article key={r.id} className="review-card">
            <div className="review-header">
              <img src={`https://i.pravatar.cc/80?img=${r.avatarId}`} alt={r.name} className="review-avatar" loading="lazy" />
              <div className="review-user-info">
                <div className="review-user-name">{r.name}</div>
                <StarRating stars={r.stars} />
              </div>
            </div>
            <p className="review-text">{r.text}</p>
            {r.loadMore && <a href="#" className="load-more-link" onClick={e=>e.preventDefault()}>Load more…</a>}
          </article>
        ))}
      </div>
    </div>
  );
});

const RecommendedSection = memo(() => (
  <section className="recommended-section">
    <div className="section-header">
      <h2 className="section-title">Recommended for you</h2>
      <a href="#" className="view-all-link" onClick={e=>e.preventDefault()}>View all</a>
    </div>
    <div className="recommended-cards">
      {RECOMMENDED.map(c => (
        <div key={c.id} className="course-card">
          <span className={'course-tag '+c.tagClass}>{c.tag}</span>
          <div className="lesson-count">{c.lessons} lessons</div>
          <h3 className="card-title">{c.title}</h3>
          <p className="card-description">{c.description}</p>
          <button className="learn-more-btn" onClick={()=>alert('Learn more: '+c.title)}>Learn more</button>
        </div>
      ))}
    </div>
  </section>
));

const CoursesPage = memo(({ searchQuery }) => {
  const [tab,    setTab]    = useState('in-progress');
  const [page,   setPage]   = useState(1);
  const [period, setPeriod] = useState('week');
  const ITEMS = 4;

  const filtered = useMemo(() => {
    let list = COURSES;
    if(tab==='completed')   list = list.filter(c=>c.percent===100);
    if(tab==='in-progress') list = list.filter(c=>c.percent<100);
    const q = searchQuery.trim().toLowerCase();
    if(q) list = list.filter(c=>c.name.toLowerCase().includes(q)||c.instructor.toLowerCase().includes(q));
    return list;
  }, [tab, searchQuery]);

  const total = Math.max(1, Math.ceil(filtered.length/ITEMS));
  const paged = useMemo(()=>filtered.slice((page-1)*ITEMS,page*ITEMS),[filtered,page]);
  useEffect(()=>setPage(1),[tab,searchQuery]);

  return (
    <>
      <div className="courses-header">
        <h1 className="courses-title">Courses</h1>
        <div className="course-tabs">
          {[['all','All'],['in-progress','In progress'],['completed','Completed']].map(([key,label])=>(
            <button key={key} className={'tab-btn'+(tab===key?' active':'')} onClick={()=>setTab(key)}>{label}</button>
          ))}
        </div>
      </div>
      <div className="filters-row">
        <button className="filter-btn"><span className="filter-icon"><IconFilter /></span><span>Filters</span><span>▼</span></button>
        <div className="sort-section">
          <span style={{color:'var(--c-muted)',fontSize:'13px'}}>Sort by:</span>
          <button className="sort-dropdown"><span>Duration</span><span>▼</span></button>
        </div>
      </div>
      <CourseTable courses={paged} activePage={page} totalPages={Math.max(2,total)}
        onPageChange={setPage} onAction={n=>alert('Opening: '+n)} />
      <SuggestedCourses period={period} onPeriodChange={setPeriod} />
      <div className="top-sections-container">
        <CalendarSection />
        <ReviewsSection />
      </div>
      <ScheduleSection />
      <RecommendedSection />
    </>
  );
});

/* ═══════════════════════════════════════════════════════
   SCHEDULE PAGE
═══════════════════════════════════════════════════════ */
const SchedulePage = memo(() => {
  const [selDay, setSelDay] = useState('All');
  const days = ['All','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const visible = useMemo(()=>selDay==='All'?SESSIONS:SESSIONS.filter(s=>s.day===selDay),[selDay]);
  const grouped = useMemo(()=>{
    const g={};visible.forEach(s=>{if(!g[s.day])g[s.day]=[];g[s.day].push(s);});return g;
  },[visible]);
  const ordered = useMemo(()=>['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].filter(d=>grouped[d]),[grouped]);
  return (
    <>
      <PageHeader title="Schedule" subtitle="Manage and track your weekly sessions">
        <button className="pg-btn-outline" onClick={()=>alert('Export')}>Export</button>
        <button className="pg-btn-primary"><IconPlus /> Book Session</button>
      </PageHeader>
      <div className="stats-row">
        <StatCard icon={<IconCalendar/>} iconBg="rgba(51,159,147,.15)" value="10" label="Sessions this week" delta="↑ 2 from last week"/>
        <StatCard icon={<IconStar/>}     iconBg="rgba(238,166,117,.15)" value="2"  label="Sessions today"/>
        <StatCard icon={<IconGraduate/>} iconBg="rgba(51,159,147,.12)" value="18h" label="Hours scheduled" delta="↑ 3h from last week"/>
        <StatCard icon={<IconBars/>}     iconBg="rgba(139,92,246,.12)" value="6"  label="Subjects this week"/>
      </div>
      <div className="day-filter-row">
        {days.map(d=>(
          <button key={d} className={'day-filter-btn'+(selDay===d?' active':'')} onClick={()=>setSelDay(d)}>{d}</button>
        ))}
      </div>
      <div className="sessions-list-container">
        {ordered.length===0 && <div className="empty-state"><IconCalendar/><p>No sessions scheduled.</p></div>}
        {ordered.map(day=>(
          <div key={day} className="session-day-block">
            <div className="session-day-label">
              <span className="session-day-name">{day}</span>
              <span className="session-day-count">{grouped[day].length} session{grouped[day].length>1?'s':''}</span>
            </div>
            <div className="session-cards-row">
              {grouped[day].map(s=>{
                const c = SESSION_COLORS[s.color]||SESSION_COLORS.mint;
                return (
                  <div key={s.id} className="session-card" style={{borderLeftColor:c.dot}}>
                    <div className="session-card-top">
                      <div className="session-time-badge" style={{background:c.bg,color:c.text}}>{s.time}–{s.endTime}</div>
                      <div className="session-room-badge"><IconMapPin/>{s.room}</div>
                    </div>
                    <div className="session-card-subject">{s.subject}</div>
                    <div className="session-card-instructor">
                      <img src={avatar(s.avatarId)} alt={s.instructor} className="session-instructor-avatar" loading="lazy"/>
                      <span>{s.instructor}</span>
                    </div>
                    <div className="session-card-actions">
                      <button className="sess-btn-outline" onClick={()=>alert('Details: '+s.subject)}>Details</button>
                      <button className="sess-btn-primary" onClick={()=>alert('Joining '+s.subject)}>Join</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

/* ═══════════════════════════════════════════════════════
   RESULTS PAGE
═══════════════════════════════════════════════════════ */
const ResultsPage = memo(() => {
  const [sortField, setSortField] = useState('score');
  const sorted = useMemo(()=>[...RESULTS].sort((a,b)=>b[sortField]-a[sortField]),[sortField]);
  const avg = Math.round(RESULTS.reduce((s,r)=>s+r.score,0)/RESULTS.length);
  const completed = RESULTS.filter(r=>r.status==='Completed').length;
  return (
    <>
      <PageHeader title="Results" subtitle="Track your academic performance">
        <button className="pg-btn-outline" onClick={()=>alert('Exporting…')}>Export PDF</button>
      </PageHeader>
      <div className="stats-row">
        <StatCard icon={<IconStar/>}     iconBg="rgba(238,166,117,.15)" value={avg+'%'}     label="Average Score"    delta="↑ 3% this month"/>
        <StatCard icon={<IconCheck/>}    iconBg="rgba(34,197,94,.13)"   value={completed+'/6'} label="Completed"/>
        <StatCard icon={<IconGraduate/>} iconBg="rgba(99,102,241,.12)"  value="3.8"          label="Est. GPA"          delta="Dean's list"/>
        <StatCard icon={<IconCalendar/>} iconBg="rgba(239,68,68,.10)"   value="280h"         label="Study Hours"       delta="↑ 12h this week"/>
      </div>
      <div className="results-table-wrapper">
        <div className="results-table-hdr">
          <h2 className="results-table-title">Course Results</h2>
          <div className="results-sort">
            <span>Sort by:</span>
            {['score','completed'].map(f=>(
              <button key={f} className={'sort-chip'+(sortField===f?' active':'')} onClick={()=>setSortField(f)}>
                {f==='score'?'Score':'Progress'}
              </button>
            ))}
          </div>
        </div>
        <div className="results-cols-hdr"><div>Course</div><div>Instructor</div><div>Score</div><div>Grade</div><div>Progress</div><div>Status</div></div>
        {sorted.map(r=>(
          <div key={r.id} className="results-row">
            <div className="results-course-name">{r.course}</div>
            <div className="teacher-info">
              <img src={`https://i.pravatar.cc/64?img=${r.avatarId}`} alt={r.instructor} className="teacher-avatar" loading="lazy"/>
              <span className="teacher-name">{r.instructor}</span>
            </div>
            <div className="score-cell"><span className="score-number">{r.score}</span><span className="score-out">/100</span></div>
            <div><span className={'grade-pill '+gradeColor(r.grade)}>{r.grade}</span></div>
            <div className="results-prog-cell">
              <div className="progress-bar-container" style={{width:'100%'}}>
                <div className="progress-bar" style={{width:Math.round(r.completed/r.total*100)+'%'}}/>
              </div>
              <span style={{fontSize:'11px',color:'var(--c-muted)',marginTop:'3px'}}>{r.completed}/{r.total}</span>
            </div>
            <div><span className={'status-pill '+statusColor(r.status)}>{r.status}</span></div>
          </div>
        ))}
      </div>
      <div className="perf-overview">
        <h2 className="perf-title">Performance Overview</h2>
        <div className="perf-bars">
          {RESULTS.map(r=>(
            <div key={r.id} className="perf-bar-row">
              <span className="perf-bar-label">{r.course.length>22?r.course.slice(0,22)+'…':r.course}</span>
              <div className="perf-bar-track">
                <div className="perf-bar-fill" style={{width:r.score+'%',
                  background:r.score>=90?'var(--brand)':r.score>=80?'#3b82f6':r.score>=70?'var(--accent)':'#ef4444'
                }}/>
              </div>
              <span className="perf-bar-pct">{r.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

/* ═══════════════════════════════════════════════════════
   CERTIFICATIONS PAGE
═══════════════════════════════════════════════════════ */
const CertCard = memo(({ cert }) => {
  if (cert.earned) return (
    <div className="cert-card-earned" style={{'--accent':cert.accentColor,'--cert-bg':cert.earned_bgColor}}>
      <div className="cert-card-ribbon"/>
      <div className="cert-earned-badge" style={{background:cert.accentColor}}><IconCheck/></div>
      <div className="cert-card-body">
        <div className="cert-issuer">{cert.issuer}</div>
        <h3 className="cert-title">{cert.title}</h3>
        <div className="cert-meta">
          {[['Issued',cert.issuedDate],['Valid until',cert.validUntil],['Credential ID',cert.credentialId]].map(([l,v])=>(
            <div key={l} className="cert-meta-row"><span className="cert-meta-label">{l}</span><span className={'cert-meta-val'+(l==='Credential ID'?' cert-id':'')}>{v}</span></div>
          ))}
        </div>
      </div>
      <div className="cert-card-footer">
        <button className="cert-btn cert-btn-outline" onClick={()=>alert('Sharing: '+cert.title)}><IconShare/>Share</button>
        <button className="cert-btn cert-btn-primary" style={{background:cert.accentColor}} onClick={()=>alert('Downloading: '+cert.title)}><IconDownload/>Download</button>
      </div>
    </div>
  );
  return (
    <div className="cert-card-progress" style={{'--accent':cert.accentColor}}>
      <div className="cert-prog-top">
        <div className="cert-prog-icon" style={{background:cert.accentColor+'22',color:cert.accentColor}}><IconGraduate/></div>
        <div className="cert-prog-pct" style={{color:cert.accentColor}}>{cert.progress}%</div>
      </div>
      <div className="cert-card-body">
        <div className="cert-issuer">{cert.issuer}</div>
        <h3 className="cert-title">{cert.title}</h3>
        <div className="cert-course-tag">via {cert.course}</div>
        <div className="cert-progress-bar-wrap">
          <div className="cert-prog-track">
            <div className="cert-prog-fill" style={{width:cert.progress+'%',background:cert.accentColor}}/>
          </div>
          <div className="cert-prog-labels"><span>Progress</span><span>{cert.progress}%</span></div>
        </div>
        <div className="cert-expected">Expected: <strong>{cert.expectedDate}</strong></div>
      </div>
      <div className="cert-card-footer">
        <button className="cert-btn cert-btn-full" style={{background:cert.accentColor}} onClick={()=>alert('Continue: '+cert.course)}>Continue Learning</button>
      </div>
    </div>
  );
});

const CertificationsPage = memo(() => {
  const earned = CERTIFICATIONS_DATA.filter(c=>c.earned);
  const inprog = CERTIFICATIONS_DATA.filter(c=>!c.earned);
  return (
    <>
      <PageHeader title="Certifications" subtitle="Your credentials and milestones">
        <button className="pg-btn-outline">Browse Courses</button>
      </PageHeader>
      <div className="stats-row">
        <StatCard icon={<IconCheck/>}    iconBg="rgba(34,197,94,.13)"  value={earned.length}  label="Earned"       delta="↑ 1 this month"/>
        <StatCard icon={<IconGraduate/>} iconBg="rgba(99,102,241,.12)" value={inprog.length}  label="In Progress"/>
        <StatCard icon={<IconStar/>}     iconBg="rgba(238,166,117,.15)"value={CERTIFICATIONS_DATA.length} label="Total"/>
        <StatCard icon={<IconCalendar/>} iconBg="rgba(239,68,68,.10)"  value="May 2025"       label="Next Expected"/>
      </div>
      <section className="cert-section">
        <h2 className="cert-section-heading"><span className="cert-section-icon"><IconCheck/></span>Earned Certificates</h2>
        <div className="cert-grid">{earned.map(c=><CertCard key={c.id} cert={c}/>)}</div>
      </section>
      <section className="cert-section">
        <h2 className="cert-section-heading"><span className="cert-section-icon"><IconGraduate/></span>In Progress</h2>
        <div className="cert-grid">{inprog.map(c=><CertCard key={c.id} cert={c}/>)}</div>
      </section>
    </>
  );
});

/* ═══════════════════════════════════════════════════════
   SETTINGS PAGE  – receives darkMode state from App
═══════════════════════════════════════════════════════ */
const ToggleSwitch = memo(({ id, checked, onChange }) => (
  <label className="toggle-switch" htmlFor={id}>
    <input type="checkbox" id={id} className="toggle-input" checked={checked} onChange={e=>onChange(e.target.checked)} />
    <span className="toggle-slider"/>
  </label>
));

const SettingsPage = memo(({ darkMode, onDarkModeChange }) => {
  const [section, setSection] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name:'Adam Youssef', email:'adam.y@thync.com', phone:'+20 100 123 4567',
    bio:'Passionate learner focused on AI, cloud, and business strategy.',
    location:'Cairo, Egypt', website:'adamyoussef.io',
  });
  const [notifState, setNotifState] = useState(()=>{const s={};NOTIF_SETTINGS_DATA.forEach(n=>{s[n.id]=n.defaultOn;});return s;});
  const [privState,  setPrivState]  = useState(()=>{const s={};PRIVACY_SETTINGS_DATA.forEach(p=>{s[p.id]=p.defaultOn;});return s;});
  const [passwords,  setPasswords]  = useState({current:'',newPwd:'',confirm:''});
  const [twoFactor,  setTwoFactor]  = useState(false);
  const [fontSize,   setFontSize]   = useState('medium');
  const [saved,      setSaved]      = useState(false);

  const handleSave = useCallback(()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);},[]);

  const SECS = [
    {key:'profile',       label:'Profile',       icon:<IconUser/>},
    {key:'notifications', label:'Notifications', icon:<IconBellOutline/>},
    {key:'privacy',       label:'Privacy',       icon:<IconEye/>},
    {key:'security',      label:'Security',      icon:<IconShield/>},
    {key:'appearance',    label:'Appearance',    icon:<IconPalette/>},
  ];

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account and preferences"/>
      <div className="settings-layout">
        <nav className="settings-sidebar-nav">
          {SECS.map(({key,label,icon})=>(
            <button key={key} className={'settings-nav-btn'+(section===key?' active':'')} onClick={()=>setSection(key)}>
              <span className="settings-nav-icon">{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="settings-panel">

          {section==='profile' && (
            <div>
              <h2 className="settings-sec-title">Profile Information</h2>
              <p className="settings-sec-sub">Update your personal details.</p>
              <div className="profile-avatar-row">
                <div className="profile-avatar-wrap">
                  <img src={avatar(5)} alt="Adam Youssef" className="profile-big-avatar"/>
                  <button className="avatar-edit-btn" aria-label="Change photo"><IconEdit/></button>
                </div>
                <div>
                  <div className="profile-name-big">{profileForm.name}</div>
                  <div className="profile-email-big">{profileForm.email}</div>
                  <div className="profile-role-badge">Student · Pro Plan</div>
                </div>
              </div>
              <div className="settings-form">
                {[{field:'name',label:'Full Name',type:'text'},{field:'email',label:'Email',type:'email'},{field:'phone',label:'Phone',type:'tel'},{field:'location',label:'Location',type:'text'},{field:'website',label:'Website',type:'url'}].map(({field,label,type})=>(
                  <div key={field} className="settings-field">
                    <label className="settings-label" htmlFor={'p-'+field}>{label}</label>
                    <input id={'p-'+field} type={type} className="settings-input" value={profileForm[field]}
                      onChange={e=>setProfileForm(f=>({...f,[field]:e.target.value}))} maxLength={120}/>
                  </div>
                ))}
                <div className="settings-field settings-field-full">
                  <label className="settings-label" htmlFor="p-bio">Bio</label>
                  <textarea id="p-bio" className="settings-textarea" value={profileForm.bio}
                    onChange={e=>setProfileForm(f=>({...f,bio:e.target.value}))} rows={3} maxLength={280}/>
                </div>
              </div>
              <div className="settings-save-row">
                <button className="settings-save-btn" onClick={handleSave}>{saved?'✓ Saved!':'Save Changes'}</button>
              </div>
            </div>
          )}

          {section==='notifications' && (
            <div>
              <h2 className="settings-sec-title">Notification Preferences</h2>
              <p className="settings-sec-sub">Choose what updates you receive.</p>
              <div className="toggle-list">
                {NOTIF_SETTINGS_DATA.map(item=>(
                  <div key={item.id} className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label-text">{item.label}</div>
                      <div className="toggle-desc-text">{item.description}</div>
                    </div>
                    <ToggleSwitch id={item.id} checked={notifState[item.id]} onChange={v=>setNotifState(s=>({...s,[item.id]:v}))}/>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section==='privacy' && (
            <div>
              <h2 className="settings-sec-title">Privacy Settings</h2>
              <p className="settings-sec-sub">Control who can see your information.</p>
              <div className="toggle-list">
                {PRIVACY_SETTINGS_DATA.map(item=>(
                  <div key={item.id} className="toggle-row">
                    <div className="toggle-info">
                      <div className="toggle-label-text">{item.label}</div>
                      <div className="toggle-desc-text">{item.description}</div>
                    </div>
                    <ToggleSwitch id={item.id} checked={privState[item.id]} onChange={v=>setPrivState(s=>({...s,[item.id]:v}))}/>
                  </div>
                ))}
              </div>
              <div className="danger-zone">
                <h3 className="danger-title">Data & Account</h3>
                <div className="danger-actions">
                  <button className="danger-btn-outline" onClick={()=>alert('Downloading data…')}>Download my data</button>
                  <button className="danger-btn-red" onClick={()=>{if(window.confirm('Delete account? This cannot be undone.'))alert('Deletion requested.');}}>Delete account</button>
                </div>
              </div>
            </div>
          )}

          {section==='security' && (
            <div>
              <h2 className="settings-sec-title">Security</h2>
              <p className="settings-sec-sub">Manage your password and account access.</p>
              <div className="security-block">
                <h3 className="security-block-title">Change Password</h3>
                {[{field:'current',label:'Current Password'},{field:'newPwd',label:'New Password'},{field:'confirm',label:'Confirm Password'}].map(({field,label})=>(
                  <div key={field} className="settings-field" style={{marginBottom:'12px'}}>
                    <label className="settings-label" htmlFor={'pwd-'+field}>{label}</label>
                    <input id={'pwd-'+field} type="password" className="settings-input" value={passwords[field]}
                      onChange={e=>setPasswords(p=>({...p,[field]:e.target.value}))} autoComplete="new-password"/>
                  </div>
                ))}
                <button className="settings-save-btn" onClick={()=>{
                  if(!passwords.newPwd){alert('Enter a new password.');return;}
                  if(passwords.newPwd!==passwords.confirm){alert('Passwords do not match.');return;}
                  alert('Password updated!');setPasswords({current:'',newPwd:'',confirm:''});
                }}>Update Password</button>
              </div>
              <div className="security-block">
                <div className="toggle-row">
                  <div className="toggle-info">
                    <div className="toggle-label-text">Two-factor authentication</div>
                    <div className="toggle-desc-text">Add extra security via SMS or authenticator app.</div>
                  </div>
                  <ToggleSwitch id="two-factor" checked={twoFactor} onChange={setTwoFactor}/>
                </div>
              </div>
              <div className="security-block">
                <h3 className="security-block-title">Active Sessions</h3>
                {[{device:'Chrome on Windows 11',location:'Cairo, Egypt',current:true},{device:'Safari on iPhone 15',location:'Alexandria, EG',current:false}].map((s,i)=>(
                  <div key={i} className="session-item-security">
                    <div>
                      <div className="session-device-name">{s.device}{s.current&&<span className="current-badge">Current</span>}</div>
                      <div className="session-device-loc">{s.location}</div>
                    </div>
                    {!s.current&&<button className="revoke-btn" onClick={()=>alert('Session revoked')}>Revoke</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section==='appearance' && (
            <div>
              <h2 className="settings-sec-title">Appearance</h2>
              <p className="settings-sec-sub">Customize how Thync looks on your device.</p>

              <div className="appearance-block">
                <label className="settings-label">Theme</label>
                <div className="theme-options">
                  {[
                    {key:'light', label:'Light', icon:<IconSun/>},
                    {key:'dark',  label:'Dark',  icon:<IconMoon/>},
                  ].map(({key,label,icon})=>(
                    <button key={key} className={'theme-option'+((!darkMode&&key==='light')||(darkMode&&key==='dark')?' active':'')}
                      onClick={()=>onDarkModeChange(key==='dark')}>
                      <span className="theme-icon">{icon}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="appearance-block">
                <label className="settings-label">Font Size</label>
                <div className="font-size-options">
                  {['small','medium','large'].map(s=>(
                    <button key={s} className={'font-option'+(fontSize===s?' active':'')} onClick={()=>setFontSize(s)}>
                      {s.charAt(0).toUpperCase()+s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="appearance-block">
                <label className="settings-label" htmlFor="lang-sel">Language</label>
                <select id="lang-sel" className="settings-input" style={{width:'220px'}} onChange={e=>alert('Language: '+e.target.value)}>
                  <option>English (US)</option><option>العربية</option><option>Français</option><option>Español</option>
                </select>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════ */
function App() {
  const [activeRoute, setActiveRoute] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode,    setDarkMode]    = useState(false);

  /* Apply/remove dark class on <html> */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const renderPage = () => {
    switch(activeRoute) {
      case 'home':           return <CoursesPage searchQuery={searchQuery}/>;
      case 'courses':        return <CoursesPage searchQuery={searchQuery}/>;
      case 'schedule':       return <SchedulePage/>;
      case 'results':        return <ResultsPage/>;
      case 'certifications': return <CertificationsPage/>;
      case 'settings':       return <SettingsPage darkMode={darkMode} onDarkModeChange={setDarkMode}/>;
      default:               return <CoursesPage searchQuery={searchQuery}/>;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeRoute} onNavChange={setActiveRoute}/>
      <div className="main-col">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
        <div className="scroll-area">
          <div className="content-card">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Boot ── */
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<React.StrictMode><App/></React.StrictMode>);
} else {
  console.error('[Thync] #root not found');
}
