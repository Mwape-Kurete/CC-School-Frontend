import api from './api';

export interface GradedAssignment {
  assignmentId: number;
  studentId: number;
  lecturerId: number;
  grade: number;
  feedback: string;
  gradedAt: string;
}

export interface AssignmentSubmission {
  id: number;
  assignmentId: number;
  studentId: number;
  submissionContent: string;
  submittedAt: string;
  fileUrl?: string;
}

export const GradingService = {
  async submitGrade(assignmentId: number, studentId: number, lecturerId: number, grade: number, feedback: string): Promise<GradedAssignment | string> {
    try {
      const response = await api.post('/grading', {
        assignmentId,
        studentId,
        lecturerId,
        grade,
        feedback
      });
      return response.data;
    } catch (error: any) {
      console.error('Error submitting grade:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  },

  async getSubmissionsForAssignment(assignmentId: number): Promise<AssignmentSubmission[] | string> {
    try {
      const response = await api.get(`/assignments/${assignmentId}/submissions`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  },

  async getGradesForStudent(studentId: number): Promise<GradedAssignment[] | string> {
    try {
      const response = await api.get(`/students/${studentId}/grades`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching student grades:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  },

  async getGradesByLecturer(lecturerId: number): Promise<GradedAssignment[] | string> {
    try {
      const response = await api.get(`/lecturers/${lecturerId}/graded-assignments`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching lecturer grades:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return 'An unknown error occurred';
    }
  }
};