import {
  f1,
  f2,
  f3,
  n1,
  vid1,
  vid2,
  vid3,
  s1,
  s2,
  s3,
  s4,
  principal,
  founder1,
  founder2,
  BEd,
  BA,
  BBS,
  MBA,
  MEd,
  administrativeProfessor1,
  administrativeProfessor2,
  administrativeProfessor3,
  administrativeProfessor4,
  academicProfessor1,
  academicProfessor2,
  academicProfessor3,
  academicProfessor4,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "HOME",
    route: "/",
  },
  {
    id: "academics",
    title: "ACADEMICS",
    route: "#",
  },
  {
    id: "contact",
    title: "CONTACT",
    route: "#",
  },
  {
    id: "blog",
    title: "BLOG",
    route: "/blog",
  },
  {
    id: "admission",
    title: "ADMISSION",
    route: "/admission",
  },
  {
    id: "about",
    title: "ABOUT",
    route: "#",
  },
  {
    id: "faculty",
    title: "FACULTY",
    route: "#",
  },
];

export const heroElements = [
  {
    video: vid1,
    text: "Building Human Capital",
  },
  {
    video: vid2,
    text: "Building Human Capital",
  },
  {
    video: vid3,
    text: "Building Human Capital",
  },
];

export const footerConstants = [
  {
    img: f1,
    header: "EDUCATION",
    content: "Physical, cognitive, social and spiritual education.",
  },
  {
    img: f2,
    header: "FACULTY",
    content: "A professional, motivated and competent team.",
  },
  {
    img: f3,
    header: "EXPOSURE",
    content: "Community and international outreach programs.",
  },
];

export const notices = [
  {
    img: n1,
    title: "College semester exam postponed",
  },
  {
    img: n1,
    title: "Nothing's here",
  },
  {
    img: n1,
    title: "What do you want",
  },
];

export const specConst = [
  {
    img: s1,
    content: "20+ year of excellence",
  },
  {
    img: s2,
    content: "2000+ enrolled students",
  },
  {
    img: s3,
    content: "189+ Teachers",
  },
  {
    img: s4,
    content: "99% pass",
  },
];

export const messageItems = [
  {
    img: principal,
    title: "Message from Principal",
    name: "Avash Neupane",
    content:
      "Whether you visit us online or in person, we hope you will get a sense of what Gorkha School is and the mission that drives us. We are a progressive learning community that works to educate the whole person and prepare them for life.",
  },
  {
    img: founder1,
    title: "Message from Founder",
    name: "Pawan Pandey",
    content:
      "Education is the basis of all progress. It is for this very reason that we forayed into education, about 22 years ago. Over 22 years of experience has taught us that progress is possible only, if men and women are equally well-educated. ",
  },
  {
    img: founder2,
    title: "Message from Founder",
    name: "Kiran Sharma",
    content:
      "Education is the basis of all progress. It is for this very reason that we forayed into education, about 22 years ago. Over 22 years of experience has taught us that progress is possible only, if men and women are equally well-educated. ",
  },
  {
    img: founder2,
    title: "Message from Founder",
    name: "Kiran Sharma",
    content:
      "Education is the basis of all progress. It is for this very reason that we forayed into education, about 22 years ago. Over 22 years of experience has taught us that progress is possible only, if men and women are equally well-educated. ",
  },
];

export const graduateItems = [
  {
    title: "MBA",
    fullTitle: "Masters in Business Studies",
    img: MBA,
    content:
      "The MBA at Deukhuri multiple campus helps you develop your own personalized, comprehensive view of the education world and provides you the skills to navigate your way to the top.",
  },
  {
    title: "MED",
    fullTitle: "Masters in Education",
    img: BA,
    content:
      "Through a steadfast commitment to excellence in education, our program strives to foster a community of passionate educators dedicated to inspiring minds and empowering futures.",
  },
  {
    title: "MBS",
    fullTitle: "Masters in Business Studies",
    img: BEd,
    content:
      "The Master of Business Studies program at DMC provides our students with an analytical and critical viewpoint in terms of industries, corporate curriculum and strategic organizational growth on a global level.",
  },
];

export const underGraduateItems = [
  {
    title: "B.ED",
    fullTitle: "Bachelors Of Education",
    img: BEd,
    content:
      "Through a steadfast commitment to excellence in education, our program strives to foster a community of passionate educators dedicated to inspiring minds and empowering futures.",
  },

  {
    title: "BBS",
    fullTitle: "Bachelors in Business Studies",
    img: BBS,
    content:
      "The Bachelor of Business Studies program at DMC provides our students with an analytical and critical viewpoint in terms of industries, corporate curriculum and strategic organizational growth on a global level.",
  },
  {
    title: "BA",
    fullTitle: "Bachelors in Administration",
    img: BA,
    content:
      "Guided by a commitment to excellence and a passion for leadership, our Bachelor's in Administration program is dedicated to nurturing a community of dynamic professionals equipped with the skills and knowledge to thrive in the ever-evolving world of business.",
  },
];

export const programs = [
  {
    title: "Graduate Programs",
    items: graduateItems,
  },
  {
    title: "Undergraduate Programs",
    items: underGraduateItems,
  },
];


export const administrativeTeam =[
  {
    img:administrativeProfessor1,
    name:"Kiran Sharma",
    post:"Deputy Professor"
  },
  {
    img:administrativeProfessor2,
    name:"Pawan Pandey",
    post:"Deputy Professor"
  },
  {
    img:administrativeProfessor3,
    name:"Dipendra Bhatta",
    post:"Deputy Professor"
  },
  {
    img:administrativeProfessor4,
    name:"Avash Neupane",
    post:"Deputy Professor"
  }
]

export const academicTeam = [
  {
    img: academicProfessor1,
    name: "Kiran Sharma",
    post: "Deputy Professor",
  },
  {
    img: academicProfessor2,
    name: "Pawan Pandey",
    post: "Deputy Professor",
  },
  {
    img: academicProfessor3,
    name: "Avash Neupane",
    post: "Deputy Professor",
  },
  {
    img: academicProfessor4,
    name: "Dipendra Bhatta",
    post: "Deputy Professor",
  },
];


export const faculties = [academicTeam, administrativeTeam];

