/**
 * @file initialData.js
 * @description Initial seed dataset replicating Enterprise CRM / HRMS data.
 */

export const INITIAL_EMPLOYEES = [
  {
    _id: 'emp_001',
    employeeCode: 'EMP-001',
    name: 'Avinash',
    email: 'avinash@company.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: 'Digital Marketing Strategic',
    department: 'Marketing & Growth',
    status: 'active',
    joiningDate: '2023-01-15',
    isCurrentUser: true,
    leaveBalance: { casual: 8, sick: 6, earned: 12, maternity: 0 }
  },
  {
    _id: 'emp_002',
    employeeCode: 'EMP-002',
    name: 'Priya Sharma',
    email: 'priya.s@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    role: 'Lead UI/UX Designer',
    department: 'Product Design',
    status: 'active',
    joiningDate: '2023-03-01',
    isCurrentUser: false,
    leaveBalance: { casual: 5, sick: 4, earned: 10, maternity: 0 }
  },
  {
    _id: 'emp_003',
    employeeCode: 'EMP-003',
    name: 'Rahul Verma',
    email: 'rahul.v@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    role: 'Senior Full Stack Developer',
    department: 'Engineering',
    status: 'active',
    joiningDate: '2022-11-10',
    isCurrentUser: false,
    leaveBalance: { casual: 7, sick: 5, earned: 14, maternity: 0 }
  },
  {
    _id: 'emp_004',
    employeeCode: 'EMP-004',
    name: 'Sneha Patel',
    email: 'sneha.p@company.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    role: 'HR & Operations Lead',
    department: 'Human Resources',
    status: 'active',
    joiningDate: '2022-08-20',
    isCurrentUser: false,
    leaveBalance: { casual: 10, sick: 8, earned: 15, maternity: 0 }
  },
  {
    _id: 'emp_005',
    employeeCode: 'EMP-005',
    name: 'Amit Kumar',
    email: 'amit.k@company.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    role: 'DevOps & Cloud Engineer',
    department: 'Infrastructure',
    status: 'active',
    joiningDate: '2023-06-12',
    isCurrentUser: false,
    leaveBalance: { casual: 6, sick: 3, earned: 8, maternity: 0 }
  }
];

export const INITIAL_LEAVES = [
  {
    _id: 'lv_001',
    employeeId: 'emp_001',
    employeeName: 'Avinash',
    employeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    employeeRole: 'Digital Marketing Strategic',
    leaveType: 'Casual Leave',
    startDate: '2026-09-15',
    endDate: '2026-09-16',
    durationDays: 2,
    durationText: '2 Days',
    reason: 'Family urgent function in hometown',
    isPaid: true,
    status: 'approved',
    appliedOn: '2026-09-10T10:30:00Z',
    approvedBy: 'Sneha Patel',
    createdAt: '2026-09-10T10:30:00Z'
  },
  {
    _id: 'lv_002',
    employeeId: 'emp_002',
    employeeName: 'Priya Sharma',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    employeeRole: 'Lead UI/UX Designer',
    leaveType: 'Sick Leave',
    startDate: '2026-09-22',
    endDate: '2026-09-22',
    durationDays: 1,
    durationText: '1 Day',
    reason: 'Viral fever and doctor consultation',
    isPaid: true,
    status: 'approved',
    appliedOn: '2026-09-21T18:45:00Z',
    approvedBy: 'Sneha Patel',
    createdAt: '2026-09-21T18:45:00Z'
  },
  {
    _id: 'lv_003',
    employeeId: 'emp_003',
    employeeName: 'Rahul Verma',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    employeeRole: 'Senior Full Stack Developer',
    leaveType: 'Earned Leave',
    startDate: '2026-10-02',
    endDate: '2026-10-05',
    durationDays: 4,
    durationText: '4 Days',
    reason: 'Planned vacation travel',
    isPaid: true,
    status: 'pending',
    appliedOn: '2026-09-25T14:10:00Z',
    approvedBy: null,
    createdAt: '2026-09-25T14:10:00Z'
  },
  {
    _id: 'lv_004',
    employeeId: 'emp_005',
    employeeName: 'Amit Kumar',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    employeeRole: 'DevOps & Cloud Engineer',
    leaveType: 'Casual Leave',
    startDate: '2026-09-28',
    endDate: '2026-09-28',
    durationDays: 0.5,
    durationText: 'Half Day (Second Half)',
    reason: 'Vehicle servicing appointment',
    isPaid: true,
    status: 'approved',
    appliedOn: '2026-09-26T09:15:00Z',
    approvedBy: 'Sneha Patel',
    createdAt: '2026-09-26T09:15:00Z'
  }
];

// Generate September 2026 Matrix data matching Screenshot 2 (Avinash has 17: X, 18: !, 19: X, 21: ✔️, 22: ✔️, 23: ✔️, 24: ✔️, 25: ✔️, 26: ✔️, Total: 6/30)
export const generateInitialAttendance = () => {
  const records = [];
  const year = 2026;
  const month = 9; // September

  // Avinash attendance map
  const avinashDayStatus = {
    5: 'day_off', 6: 'day_off', // Sat, Sun
    12: 'day_off', 13: 'day_off',
    17: 'absent',
    18: 'late',
    19: 'absent',
    20: 'day_off',
    21: 'present',
    22: 'present',
    23: 'present',
    24: 'present',
    25: 'present',
    26: 'present',
    27: 'day_off'
  };

  INITIAL_EMPLOYEES.forEach((emp) => {
    for (let day = 1; day <= 30; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const d = new Date(year, month - 1, day);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;

      let status = isWeekend ? 'day_off' : null;

      if (emp._id === 'emp_001') {
        status = avinashDayStatus[day] || (isWeekend ? 'day_off' : (day < 17 ? 'present' : (day > 26 ? 'present' : null)));
      } else {
        if (!isWeekend) {
          if (day % 11 === 0) status = 'absent';
          else if (day % 7 === 0) status = 'late';
          else if (day % 15 === 0) status = 'half_day';
          else status = 'present';
        }
      }

      if (status) {
        records.push({
          _id: `att_${emp._id}_${day}`,
          employeeId: emp._id,
          date: dateStr,
          status: status,
          clockInTime: status === 'present' ? '09:12:00' : (status === 'late' ? '10:45:00' : null),
          clockOutTime: status === 'present' ? '18:15:00' : (status === 'late' ? '19:00:00' : null),
          totalWorkingHours: status === 'present' ? 8.5 : (status === 'late' ? 7.5 : 0),
          isLate: status === 'late',
          notes: status === 'late' ? 'Traffic delay on main highway' : ''
        });
      }
    }
  });

  return records;
};

export const INITIAL_HOLIDAYS = [
  {
    _id: 'hol_001',
    name: 'New Year Day',
    date: '2026-01-01',
    dayOfWeek: 'Thursday',
    type: 'National Holiday',
    description: 'First day of the year 2026 celebration',
    isRecurringYearly: true
  },
  {
    _id: 'hol_002',
    name: 'Republic Day',
    date: '2026-01-26',
    dayOfWeek: 'Monday',
    type: 'National Holiday',
    description: '77th Republic Day of India',
    isRecurringYearly: true
  },
  {
    _id: 'hol_003',
    name: 'Maha Shivratri',
    date: '2026-02-17',
    dayOfWeek: 'Tuesday',
    type: 'Gazetted Holiday',
    description: 'Traditional celebration of Maha Shivratri',
    isRecurringYearly: false
  },
  {
    _id: 'hol_004',
    name: 'Holi (Festival of Colors)',
    date: '2026-03-04',
    dayOfWeek: 'Wednesday',
    type: 'Gazetted Holiday',
    description: 'Spring festival of colors and joy',
    isRecurringYearly: false
  },
  {
    _id: 'hol_005',
    name: 'Independence Day',
    date: '2026-08-15',
    dayOfWeek: 'Saturday',
    type: 'National Holiday',
    description: 'Celebration of Indian Independence',
    isRecurringYearly: true
  },
  {
    _id: 'hol_006',
    name: 'Gandhi Jayanti',
    date: '2026-10-02',
    dayOfWeek: 'Friday',
    type: 'National Holiday',
    description: 'Birth anniversary of Mahatma Gandhi',
    isRecurringYearly: true
  },
  {
    _id: 'hol_007',
    name: 'Dussehra (Vijayadashami)',
    date: '2026-10-20',
    dayOfWeek: 'Tuesday',
    type: 'Gazetted Holiday',
    description: 'Victory of good over evil festival',
    isRecurringYearly: false
  },
  {
    _id: 'hol_008',
    name: 'Diwali (Deepavali)',
    date: '2026-11-08',
    dayOfWeek: 'Sunday',
    type: 'Gazetted Holiday',
    description: 'Festival of Lights',
    isRecurringYearly: false
  },
  {
    _id: 'hol_009',
    name: 'Christmas',
    date: '2026-12-25',
    dayOfWeek: 'Friday',
    type: 'National Holiday',
    description: 'Christmas celebration',
    isRecurringYearly: true
  }
];

export const INITIAL_APPRECIATIONS = [
  {
    _id: 'app_001',
    givenToId: 'emp_001',
    givenToName: 'Avinash',
    givenToAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    givenToRole: 'Digital Marketing Strategic',
    awardName: 'Marketing Campaign MVP',
    awardBadgeIcon: 'trophy',
    givenOn: '2026-09-18',
    givenById: 'emp_004',
    givenByName: 'Sneha Patel',
    rewardPointsOrCash: '₹5,000 Voucher',
    appreciationNote: 'Exceptional performance leading the Q3 organic acquisition funnel with +45% conversion increase!'
  },
  {
    _id: 'app_002',
    givenToId: 'emp_003',
    givenToName: 'Rahul Verma',
    givenToAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    givenToRole: 'Senior Full Stack Developer',
    awardName: 'Star Developer of the Month',
    awardBadgeIcon: 'star',
    givenOn: '2026-09-10',
    givenById: 'emp_004',
    givenByName: 'Sneha Patel',
    rewardPointsOrCash: '₹10,000 Bonus',
    appreciationNote: 'Flawless architecture implementation of real-time event pipeline with zero downtime.'
  },
  {
    _id: 'app_003',
    givenToId: 'emp_002',
    givenToName: 'Priya Sharma',
    givenToAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    givenToRole: 'Lead UI/UX Designer',
    awardName: 'Design Excellence Award',
    awardBadgeIcon: 'award',
    givenOn: '2026-08-25',
    givenById: 'emp_004',
    givenByName: 'Sneha Patel',
    rewardPointsOrCash: '₹7,500 Gift Card',
    appreciationNote: 'Crafting stunning enterprise UI/UX system loved by all clients.'
  }
];
