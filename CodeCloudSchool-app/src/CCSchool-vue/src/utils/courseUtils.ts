// utils/courseUtils.ts
export function generateCourseSummary(course: any) {
  const name = course.courseName || ''
  const code = course.courseCode || ''

  // Generate prefix from course name
  let prefix = ''
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    prefix = words[0].substring(0, 3).toUpperCase()
  } else {
    prefix = words.map((w:string) => w[0][0].toUpperCase()).join('')
  }

  return {
    id: course.id,
    courseName: name,
    courseCode: `${prefix} ${code}`,
    studentCount: course.students?.$values?.length || 0,
    moduleCount: course.modules?.$values?.length || 0,
  }
}
