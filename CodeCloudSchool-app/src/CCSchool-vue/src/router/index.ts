import { createRouter, createWebHistory } from 'vue-router'

// Add type declarations for route meta fields
declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    allowedRoles?: ('student' | 'lecturer' | 'admin')[]
    layout?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'dashboard',
        allowedRoles: ['student'] 
      },

    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CoursesView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'course',
      },
    },
    {
      path: '/modules',
      name: 'modules',
      component: () => import('@/views/ModulesView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'modules',
        allowedRoles: ['student', 'lecturer']
      },
       
    },
    // Nested course routes
    {
  path: '/courses/:courseId',
  component: () => import('@/layouts/CourseLayout.vue'),
  children: [
    {
      path: '',
      redirect: { name: 'stu-course-layout' }
    },
    {
      path: 'home',
      name: 'CourseHome',
      component: () => import('@/views/courses/CourseHome.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-home'
      }
    },
    {
      path: 'announcements',
      name: 'CourseAnnouncements',
      component: () => import('@/views/courses/CourseAnnouncements.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-announcements'
      }
    },
    {
      path: 'modules',
      name: 'CourseModules',
      component: () => import('@/views/courses/CourseModules.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-modules'
      }
    },
    {
      path: 'modules/:moduleId',
      name:'ModuleDetail',
      component: () => import('@/views/ModuleDetailsView.vue'),
      meta: {
        layout: 'TwoCol', 
        page: 'module-details'
      }
    },
    {
      path: 'assignments',
      name: 'CourseAssignments',
      component: () => import('@/views/courses/CourseAssignments.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-assignments'
      }
    },
    {
      path: 'assignments/:assignmentId',
      name: 'AssignmentDetails',
      component: () => import('@/views/StudentAssignmentDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-assignment-details'
      }
    },
    {
      path: 'grades',
      name: 'CourseGrades',
      component: () => import('@/views/courses/CourseGrades.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'stu-course-grades'
      }
    }
  ]
},
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'groups',
      },
    },
    {
      path: '/timetable',
      name: 'timetable',
      component: () => import('@/views/TimetableView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'timetable'
      },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/UserAccountView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'account',
        allowedRoles: ['student', 'lecturer', 'admin']
      },
       
    },

    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'settings'
      },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'help'
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        layout: 'LoginReg',
        page: 'login'
      },
    },
    {
      path: '/2fa',
      name: '2FAView',
      component: () => import('@/views/student/2FAView.vue'),
      meta: {
        layout: 'LoginReg',
        page: '2fa'
      }
    },
    {
      path: '/register-majors',
      name: 'RegisterMajors',
      component: () => import('@/views/student/MajorsSelectView.vue'),
      meta: {
        layout: 'TwoCol',
        allowedRoles: ['student'],
        page: 'register-majors',
      }
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: () => import('@/views/admin/SystemSettings.vue'),
      meta: { allowedRoles: ['admin'] }
    },

    {
      path: '/layout-sandbox',
      name: 'layout-sandbox',
      component: () => import('@/views/LayoutSandbox.vue'),
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('@/views/Sandbox.vue')
    },

    {
      path: '/studentModuleDetails',
      name: 'studentModuleDetails',
      component: () => import('@/views/StudentModuleDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'student-module-details'
      },
    },
    {
      path: '/announcements/:announcementId',
      name: 'AnnouncementDetails',
      component: () => import('@/views/StudentAnnouncementDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'student-announcement-details'
      },
    },
    //lecturer pages

    {
      path: '/lecturer-dash',
      name: 'lecturer-dash',
      component: () => import('@/views/LectureDashboardView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-dashboard'
      },
    },
    {
      path: '/lecturer-courses',
      name: 'lecturer-courses',
      component: () => import('@/views/LecturerCourses.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-courses'
      },
    },
    {
      path: '/lecturer-course-details',
      name: 'lecturer-course-details',
      component: () => import('@/views/LecturerCourseDetails.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-course-details'
      },
    },

    {
      path: '/LecturerAnnounce',
      name: 'LecturerAnnounce',
      component: () => import('@/views/Lecturer-AnnouncementsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'LecturerAnnounce'
      },
    },

     {
      path: '/LecturerAnnounceOver',
      name: 'LecturerAnnounceOver',
      component: () => import('@/views/LecturerAnnounceOver.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'LecturerAnnounceOver'
      },
    },

     {
      path: '/LecturerAssign',
      name: 'LecturerAssign',
      component: () => import('@/views/Lecturer-AssignmentsView.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'LecturerAssign'
      },
    },

    {
      path: '/LecturerAssignOver',
      name: 'LecturerAssignOver',
      component: () => import('@/views/LecturerAssignOver.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'LecturerAssignOver'
      },
    },
    {
      path: '/lecturer-modules',
      name: 'lecturer-modules',
      component: () => import('@/views/LecturerModules.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-modules'
      },
    },
    {
      path: '/lecturer-create-modules',
      name: 'lecturer-create-modules',
      component: () => import('@/views/LecturerCreateModule.vue'),
      meta: {
        layout: 'TwoCol',
        page: 'lecturer-create-modules',
        public: true
      },
    },
  ]
})

export default router
