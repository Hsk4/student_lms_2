import { Connection } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourse: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateStudentInput = Omit<
  Student,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdateStudentInput = Partial<CreateStudentInput>;

export async function insertStudent(
  input: CreateStudentInput
): Promise<string> {
  const id = crypto.randomUUID();
  const query = `
    INSERT INTO students (id, name, email, enrolled_course)
    VALUES (?, ?, ?, ?)
  `;
  await Connection.execute(query, [
    id,
    input.name,
    input.email,
    input.enrolledCourse,
  ]);
  return id;
}

export async function getStudentById(id: number): Promise<Student | null> {
  const query = `
    SELECT id, name, email, enrolled_course as enrolledCourse, 
           created_at as createdAt, updated_at as updatedAt 
    FROM students WHERE id = ?
  `;
  const [rows] = await Connection.execute<RowDataPacket[]>(query, [id]);
  if (rows.length === 0) return null;
  return rows[0] as Student;
}
