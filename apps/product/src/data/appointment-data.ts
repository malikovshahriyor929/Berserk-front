import { avatarIds } from '@core/utils/get-avatar';
import { getRandomArrayElement } from '@core/utils/get-random-array-element';

export const appointmentTypes = {
  'Routine Checkup': 'Routine Checkup',
  'Pregnant Yoga': 'Pregnant Yoga',
  Consultant: 'Consultant',
  Training: 'Training',
};
export const appointmentStatuses = {
  Scheduled: 'Scheduled',
  Waiting: 'Waiting',
};

export type Type = keyof typeof appointmentTypes;
export type StatusType = keyof typeof appointmentStatuses;

export const appointmentData = [
  {
    id: '3416',
    patient: {
      name: 'Ziyoda Karimova',
      email: 'ziyoda.karimova@example.com',
    },
    doctor: {
      name: 'Prof. Anvar Qodirov',
      email: 'anvar.qodirov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'Essay Review for Stanford',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Scheduled',
    amount: 'B34 UCA',
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3417',
    patient: {
      name: 'Sardor Yusupov',
      email: 'sardor.yusupov@example.com',
    },
    doctor: {
      name: 'Prof. Dilshod Ergashev',
      email: 'dilshod.ergashev@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'Common App Strategy Session',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Waiting',
    amount: 'A23 A Block',
    duration: 120,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3418',
    patient: {
      name: 'Mukhammad Aliyev',
      email: 'mukhammad.aliyev@example.com',
    },
    doctor: {
      name: 'Prof. Nargiza Xolmatova',
      email: 'nargiza.xolmatova@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'Recommendation Letter Guidance',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Waiting',
    amount: 'C12 Main Hall',
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3419',
    patient: {
      name: 'Shahlo Mirzayeva',
      email: 'shahlo.mirzayeva@example.com',
    },
    doctor: {
      name: 'Prof. Askar Karimov',
      email: 'askar.karimov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'Portfolio Review for Art Schools',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Scheduled',
    amount: 'Room D204',
    duration: 10,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3420',
    patient: {
      name: 'Dilbar Qosimova',
      email: 'dilbar.qosimova@example.com',
    },
    doctor: {
      name: 'Prof. Azizbek Rasulov',
      email: 'azizbek.rasulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'SAT Preparation Strategy',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    amount: 'Lab B3',
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3421',
    patient: {
      name: 'Shoxrux Ibragimov',
      email: 'shoxrux.ibragimov@example.com',
    },
    doctor: {
      name: 'Prof. Nodira Tursunova',
      email: 'nodira.tursunova@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'Mock Interview for Princeton',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Waiting',
    amount: 'Room A1',
    duration: 30,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    patient: {
      name: 'Madina Rasulova',
      email: 'madina.rasulova@example.com',
    },
    doctor: {
      name: 'Prof. Ulugbek Mamatqulov',
      email: 'ulugbek.mamatqulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'College List Review',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 'F12 Conference Room',
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    patient: {
      name: 'Madina Rasulova',
      email: 'madina.rasulova@example.com',
    },
    doctor: {
      name: 'Prof. Ulugbek Mamatqulov',
      email: 'ulugbek.mamatqulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'College List Review',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 'F12 Conference Room',
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    patient: {
      name: 'Madina Rasulova',
      email: 'madina.rasulova@example.com',
    },
    doctor: {
      name: 'Prof. Ulugbek Mamatqulov',
      email: 'ulugbek.mamatqulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'College List Review',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 'F12 Conference Room',
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    patient: {
      name: 'Madina Rasulova',
      email: 'madina.rasulova@example.com',
    },
    doctor: {
      name: 'Prof. Ulugbek Mamatqulov',
      email: 'ulugbek.mamatqulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'College List Review',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 'F12 Conference Room',
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    patient: {
      name: 'Madina Rasulova',
      email: 'madina.rasulova@example.com',
    },
    doctor: {
      name: 'Prof. Ulugbek Mamatqulov',
      email: 'ulugbek.mamatqulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'College List Review',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 'F12 Conference Room',
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
  {
    id: '3422',
    patient: {
      name: 'Madina Rasulova',
      email: 'madina.rasulova@example.com',
    },
    doctor: {
      name: 'Prof. Ulugbek Mamatqulov',
      email: 'ulugbek.mamatqulov@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(avatarIds)}.webp`,
    },
    type: 'College List Review',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 'F12 Conference Room',
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA',
  },
]